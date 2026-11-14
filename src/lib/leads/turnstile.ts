import "server-only";

/**
 * Vérification du jeton Cloudflare Turnstile.
 *
 * Si TURNSTILE_SECRET_KEY n'est pas configurée, la vérification est considérée
 * comme non activée et laisse passer : le champ piège reste la protection
 * minimale. Cet état est journalisé pour qu'il ne passe pas inaperçu.
 */
export async function verifierTurnstile(
  token: string | undefined,
  ip: string | undefined,
): Promise<{ valide: boolean; raison?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.warn("[turnstile] TURNSTILE_SECRET_KEY absente : anti-spam non vérifié.");
    return { valide: true, raison: "non-configure" };
  }

  if (!token) return { valide: false, raison: "jeton-manquant" };

  try {
    const corps = new URLSearchParams({ secret, response: token });
    if (ip) corps.set("remoteip", ip);

    const reponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: corps,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const resultat = (await reponse.json()) as { success?: boolean };
    return resultat.success === true
      ? { valide: true }
      : { valide: false, raison: "jeton-refuse" };
  } catch (error) {
    console.error("[turnstile] Vérification impossible :", error);
    // On ne bloque pas un candidat légitime si Cloudflare est injoignable.
    return { valide: true, raison: "verification-indisponible" };
  }
}
