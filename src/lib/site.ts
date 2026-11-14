/** Réglages du site partagés (URL canonique, indexation). */

/**
 * URL publique du site. Sur Vercel, VERCEL_PROJECT_PRODUCTION_URL est fournie
 * automatiquement ; SITE_URL permet de la forcer (domaine définitif).
 */
export function getSiteUrl(): string {
  const explicit = process.env.SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "https://renaissance-formation.fr";
}

/**
 * Indexation par les moteurs. Volontairement DÉSACTIVÉE par défaut : le site
 * ne doit pas être indexé tant qu'il n'est pas lancé (cahier technique).
 * À passer à "true" dans Vercel au moment de la mise en ligne.
 */
export function isIndexable(): boolean {
  return process.env.SITE_INDEXABLE === "true";
}

export const ORGANISATION = {
  nom: "Renaissance",
  description:
    "Maison de formation aux métiers de l'accompagnement : accueil familial, animation et vie sociale, présence au quotidien.",
  departement: "Yonne",
  codeDepartement: "89",
} as const;
