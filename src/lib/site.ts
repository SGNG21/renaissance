/** Réglages du site partagés (URL canonique, indexation). */

/** Domaine définitif du site (cahier technique). */
const DOMAINE_PAR_DEFAUT = "https://renaissance-formation.fr";

/**
 * URL publique utilisée pour les canoniques, le sitemap et Open Graph.
 *
 * Le domaine définitif est la valeur par défaut, volontairement : s'appuyer sur
 * VERCEL_PROJECT_PRODUCTION_URL ferait pointer les canoniques vers l'URL
 * *.vercel.app le jour de la mise en ligne, ce qui dilue le référencement.
 * SITE_URL permet de forcer une autre valeur (recette sur un autre domaine).
 */
export function getSiteUrl(): string {
  const explicite = process.env.SITE_URL;
  if (explicite) return explicite.replace(/\/$/, "");
  return DOMAINE_PAR_DEFAUT;
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
