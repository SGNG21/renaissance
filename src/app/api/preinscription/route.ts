import { NextResponse } from "next/server";
import { FORMATIONS, VERSION_CONSENTEMENT, schemaPreinscription } from "@/lib/leads/schema";
import { ajouterContact, envoyerConfirmation, envoyerNotification } from "@/lib/leads/brevo";
import { verifierTurnstile } from "@/lib/leads/turnstile";
import { getSupabaseAdmin } from "@/lib/supabase/server";

/**
 * Enregistrement d'une préinscription.
 *
 * Seul chemin d'écriture dans `leads` : le navigateur n'accède jamais à
 * Supabase. La clé service_role est lue ici, côté serveur uniquement.
 *
 * Ordre volontaire : Supabase d'abord, Brevo ensuite. La base est la source de
 * vérité ; les e-mails sont un confort. Une panne Brevo ne perd donc jamais une
 * demande et ne change rien à ce que voit le visiteur.
 */
export async function POST(request: Request) {
  let brut: unknown;
  try {
    brut = await request.json();
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  const analyse = schemaPreinscription.safeParse(brut);
  if (!analyse.success) {
    const champs: Record<string, string> = {};
    for (const probleme of analyse.error.issues) {
      const champ = probleme.path.join(".");
      if (champ && !champs[champ]) champs[champ] = probleme.message;
    }
    return NextResponse.json({ erreur: "Formulaire invalide.", champs }, { status: 422 });
  }

  const donnees = analyse.data;

  // Champ piège : rempli uniquement par un robot. Réponse volontairement
  // identique à un succès pour ne pas renseigner l'attaquant.
  if (donnees.siteWeb) {
    console.warn("[preinscription] Champ piège rempli : requête ignorée.");
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;

  const turnstile = await verifierTurnstile(donnees.turnstileToken, ip);
  if (!turnstile.valide) {
    return NextResponse.json(
      { erreur: "Vérification anti-robot échouée. Merci de réessayer." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();

  // Renaissance est la première organisation (socle multi-organismes).
  const { data: organisation, error: erreurOrg } = await supabase
    .from("organizations")
    .select("id")
    .eq("slug", "renaissance")
    .single();

  if (erreurOrg || !organisation) {
    console.error("[preinscription] Organisation introuvable :", erreurOrg);
    return NextResponse.json(
      { erreur: "Enregistrement impossible pour le moment." },
      { status: 500 },
    );
  }

  const maintenant = new Date().toISOString();

  const { data: lead, error: erreurLead } = await supabase
    .from("leads")
    .insert({
      organization_id: organisation.id,
      first_name: donnees.prenom,
      last_name: donnees.nom,
      email: donnees.email,
      phone: donnees.telephone || null,
      formation_visee: donnees.formationVisee,
      zone: donnees.zone || null,
      disponibilites: donnees.disponibilites || null,
      message: donnees.message || null,
      source: donnees.source || null,
      utm_source: donnees.utm?.source ?? null,
      utm_medium: donnees.utm?.medium ?? null,
      utm_campaign: donnees.utm?.campaign ?? null,
      utm_term: donnees.utm?.term ?? null,
      utm_content: donnees.utm?.content ?? null,
      consent_rgpd: true,
      consent_at: maintenant,
      consent_text_version: VERSION_CONSENTEMENT,
    })
    .select("id")
    .single();

  if (erreurLead || !lead) {
    console.error("[preinscription] Insertion impossible :", erreurLead);
    return NextResponse.json(
      { erreur: "Enregistrement impossible pour le moment." },
      { status: 500 },
    );
  }

  await journaliser(supabase, organisation.id, lead.id, "lead.created", {
    formationVisee: donnees.formationVisee,
    source: donnees.source ?? null,
  });

  const libelle =
    FORMATIONS.find((f) => f.valeur === donnees.formationVisee)?.libelle ??
    donnees.formationVisee;

  // Le lead est enregistré : à partir d'ici, plus rien ne doit faire échouer la
  // réponse au visiteur. Les trois appels Brevo sont lancés en parallèle et
  // leurs résultats sont tracés dans `events` pour pouvoir être rejoués.
  const [confirmation, notification, contact] = await Promise.all([
    envoyerConfirmation(donnees, libelle),
    envoyerNotification(donnees, libelle, lead.id),
    ajouterContact(donnees, libelle),
  ]);

  await Promise.all([
    journaliser(
      supabase,
      organisation.id,
      lead.id,
      confirmation.ok ? "brevo.confirmation.sent" : "brevo.confirmation.failed",
      { raison: confirmation.raison ?? null },
    ),
    journaliser(
      supabase,
      organisation.id,
      lead.id,
      notification.ok ? "brevo.notification.sent" : "brevo.notification.failed",
      { raison: notification.raison ?? null },
    ),
    journaliser(
      supabase,
      organisation.id,
      lead.id,
      contact.saute
        ? "brevo.contact.skipped"
        : contact.ok
          ? "brevo.contact.added"
          : "brevo.contact.failed",
      { raison: contact.raison ?? null },
    ),
  ]);

  if (!confirmation.ok || !notification.ok) {
    console.error(
      `[preinscription] Lead ${lead.id} enregistré, envoi Brevo incomplet ` +
        `(confirmation : ${confirmation.raison ?? "ok"}, ` +
        `notification : ${notification.raison ?? "ok"}).`,
    );
  }

  return NextResponse.json({ ok: true, leadId: lead.id }, { status: 201 });
}

type ClientSupabase = ReturnType<typeof getSupabaseAdmin>;

/** Journal d'événements. Un échec ici ne doit jamais perdre le lead. */
async function journaliser(
  supabase: ClientSupabase,
  organizationId: string,
  leadId: string,
  type: string,
  charge: Record<string, unknown>,
) {
  const { error } = await supabase.from("events").insert({
    organization_id: organizationId,
    lead_id: leadId,
    type,
    payload: charge,
  });
  if (error) console.error(`[preinscription] Journalisation "${type}" impossible :`, error);
}
