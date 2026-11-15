import "server-only";
import type { DonneesPreinscription } from "./schema";

/**
 * Envois Brevo, appelés DIRECTEMENT depuis la route serveur Vercel.
 *
 * Aucun intermédiaire : l'étape 1 n'utilise pas d'automatisation externe.
 * La clé API est lue côté serveur uniquement (jamais de NEXT_PUBLIC_).
 *
 * Règle commune à toutes les fonctions de ce fichier : elles ne lèvent JAMAIS
 * d'exception. Le lead est déjà enregistré dans Supabase quand elles sont
 * appelées ; un échec Brevo ne doit ni perdre la demande, ni faire échouer la
 * réponse au visiteur. Chaque résultat est tracé dans `events` par l'appelant.
 */

const API = "https://api.brevo.com/v3";
const DELAI_MS = 8000;

export type ResultatBrevo = { ok: boolean; raison?: string };

type Expediteur = { email: string; name?: string };

/** Accepte « Renaissance <contact@exemple.fr> » ou « contact@exemple.fr ». */
function lireExpediteur(): Expediteur | null {
  const brut = process.env.BREVO_SENDER?.trim();
  if (!brut) return null;

  const avecNom = brut.match(/^(.*)<\s*([^>]+)\s*>$/);
  if (avecNom) {
    const name = avecNom[1].trim().replace(/^["']|["']$/g, "");
    return { email: avecNom[2].trim(), name: name || undefined };
  }
  return { email: brut };
}

async function appelerBrevo(
  chemin: string,
  corps: unknown,
): Promise<ResultatBrevo> {
  const cle = process.env.BREVO_API_KEY;
  if (!cle) return { ok: false, raison: "cle-absente" };

  try {
    const reponse = await fetch(`${API}${chemin}`, {
      method: "POST",
      headers: {
        "api-key": cle,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(corps),
      signal: AbortSignal.timeout(DELAI_MS),
    });

    if (reponse.ok) return { ok: true };

    // Le corps d'erreur peut contenir l'adresse du prospect : on ne garde que
    // le code Brevo, jamais le détail, pour ne pas le recopier dans les logs.
    const details = (await reponse.json().catch(() => null)) as { code?: string } | null;
    return {
      ok: false,
      raison: `http-${reponse.status}${details?.code ? `-${details.code}` : ""}`,
    };
  } catch (error) {
    const expire = error instanceof Error && error.name === "TimeoutError";
    return { ok: false, raison: expire ? "delai-depasse" : "erreur-reseau" };
  }
}

/** Repli minimal quand aucun gabarit transactionnel n'est configuré. */
function replClHtml(titre: string, lignes: string[]): string {
  return `<!doctype html><html lang="fr"><body style="font-family:Arial,Helvetica,sans-serif;color:#20342e;background:#fbf9f4;padding:24px">
<table role="presentation" style="max-width:560px;margin:auto;background:#fff;border:1px solid #d9d7ce">
<tr><td style="background:#142820;color:#f3f0e9;padding:20px 24px;font-size:18px;letter-spacing:.06em">RENAISSANCE</td></tr>
<tr><td style="padding:24px;font-size:14px;line-height:1.8">
<p style="margin:0 0 16px;font-size:16px">${titre}</p>
${lignes.map((l) => `<p style="margin:0 0 12px">${l}</p>`).join("")}
</td></tr></table></body></html>`;
}

/** 1. Confirmation au prospect. */
export async function envoyerConfirmation(
  donnees: DonneesPreinscription,
  formationLibelle: string,
): Promise<ResultatBrevo> {
  const expediteur = lireExpediteur();
  if (!expediteur) return { ok: false, raison: "expediteur-absent" };

  const destinataire = {
    email: donnees.email,
    name: `${donnees.prenom} ${donnees.nom}`.trim(),
  };

  const gabarit = process.env.BREVO_TEMPLATE_CONFIRMATION;

  if (gabarit) {
    return appelerBrevo("/smtp/email", {
      sender: expediteur,
      to: [destinataire],
      templateId: Number(gabarit),
      params: { prenom: donnees.prenom, formation: formationLibelle },
    });
  }

  // Sans gabarit configuré, on envoie quand même : un prospect qui ne reçoit
  // aucune confirmation croit que sa demande s'est perdue.
  return appelerBrevo("/smtp/email", {
    sender: expediteur,
    to: [destinataire],
    subject: "Votre demande a bien été reçue — Renaissance",
    htmlContent: replClHtml(`Bonjour ${donnees.prenom},`, [
      `Nous avons bien reçu votre demande de préinscription concernant le parcours <strong>${formationLibelle}</strong>.`,
      "Nous revenons vers vous pour échanger sur votre projet. Aucune inscription définitive n'est engagée à ce stade.",
      "À très bientôt,<br />L'équipe Renaissance",
    ]),
  });
}

/** 2. Notification à Renaissance. */
export async function envoyerNotification(
  donnees: DonneesPreinscription,
  formationLibelle: string,
  leadId: string,
): Promise<ResultatBrevo> {
  const expediteur = lireExpediteur();
  if (!expediteur) return { ok: false, raison: "expediteur-absent" };

  const destination = process.env.NOTIFICATION_EMAIL?.trim();
  if (!destination) return { ok: false, raison: "destinataire-absent" };

  const gabarit = process.env.BREVO_TEMPLATE_NOTIFICATION;
  const params = {
    prenom: donnees.prenom,
    nom: donnees.nom,
    email: donnees.email,
    telephone: donnees.telephone || "—",
    formation: formationLibelle,
    zone: donnees.zone || "—",
    disponibilites: donnees.disponibilites || "—",
    source: donnees.source || "—",
    message: donnees.message || "—",
    leadId,
  };

  if (gabarit) {
    return appelerBrevo("/smtp/email", {
      sender: expediteur,
      to: [{ email: destination }],
      templateId: Number(gabarit),
      params,
    });
  }

  return appelerBrevo("/smtp/email", {
    sender: expediteur,
    to: [{ email: destination }],
    replyTo: { email: donnees.email },
    subject: `Nouvelle préinscription — ${params.prenom} ${params.nom}`,
    htmlContent: replClHtml("Nouvelle préinscription", [
      `<strong>${params.prenom} ${params.nom}</strong>`,
      `E-mail : ${params.email}<br />Téléphone : ${params.telephone}`,
      `Formation visée : ${params.formation}<br />Commune ou département : ${params.zone}`,
      `Disponibilités : ${params.disponibilites}<br />Source : ${params.source}`,
      `Message : ${params.message}`,
      `Identifiant du lead : ${params.leadId}`,
    ]),
  });
}

/**
 * 3. Ajout du contact à une liste Brevo — FACULTATIF.
 * Sans BREVO_LIST_ID, l'étape est sautée sans erreur.
 */
export async function ajouterContact(
  donnees: DonneesPreinscription,
  formationLibelle: string,
): Promise<ResultatBrevo & { saute?: boolean }> {
  const liste = process.env.BREVO_LIST_ID?.trim();
  if (!liste) return { ok: true, saute: true, raison: "liste-non-configuree" };

  const identifiant = Number(liste);
  if (!Number.isInteger(identifiant)) {
    return { ok: false, raison: "liste-identifiant-invalide" };
  }

  return appelerBrevo("/contacts", {
    email: donnees.email,
    updateEnabled: true,
    listIds: [identifiant],
    attributes: {
      PRENOM: donnees.prenom,
      NOM: donnees.nom,
      FORMATION: formationLibelle,
      ZONE: donnees.zone || "",
    },
  });
}
