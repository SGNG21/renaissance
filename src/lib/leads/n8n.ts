import "server-only";

export type ChargeUtileLead = {
  leadId: string;
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  formationVisee: string;
  formationLibelle: string;
  zone?: string;
  disponibilites?: string;
  message?: string;
  source?: string;
  utm?: Record<string, string | undefined>;
  creeLe: string;
};

/**
 * Transmet le lead au workflow n8n (confirmation Brevo au prospect,
 * notification à Renaissance, ajout du contact à une liste Brevo).
 *
 * L'échec n'est JAMAIS propagé au visiteur : le lead est déjà enregistré en
 * base, c'est la source de vérité. L'incident est journalisé et tracé dans la
 * table `events` pour pouvoir être rejoué.
 */
export async function envoyerVersN8n(
  charge: ChargeUtileLead,
): Promise<{ transmis: boolean; raison?: string }> {
  const url = process.env.N8N_WEBHOOK_URL;

  if (!url) {
    console.warn("[n8n] N8N_WEBHOOK_URL absente : lead enregistré sans transmission.");
    return { transmis: false, raison: "webhook-non-configure" };
  }

  try {
    const entetes: Record<string, string> = { "Content-Type": "application/json" };

    // Secret partagé : permet à n8n de rejeter les appels non authentifiés.
    const secret = process.env.N8N_WEBHOOK_SECRET;
    if (secret) entetes["X-Renaissance-Signature"] = secret;

    const reponse = await fetch(url, {
      method: "POST",
      headers: entetes,
      body: JSON.stringify(charge),
      signal: AbortSignal.timeout(8000),
    });

    if (!reponse.ok) {
      console.error(`[n8n] Réponse ${reponse.status} pour le lead ${charge.leadId}.`);
      return { transmis: false, raison: `http-${reponse.status}` };
    }

    return { transmis: true };
  } catch (error) {
    console.error(`[n8n] Transmission impossible pour le lead ${charge.leadId} :`, error);
    return { transmis: false, raison: "erreur-reseau" };
  }
}
