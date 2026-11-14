import "server-only";
import { getPayload } from "payload";
import config from "@/payload.config";

/** Instance Payload partagée (Local API), côté serveur uniquement. */
export async function getPayloadClient() {
  return getPayload({ config });
}

export type ZoneSeo = {
  id: number;
  nom: string;
  slug: string;
  titreH1: string;
  introduction: string;
  faq?: { question: string; reponse: string }[] | null;
  maillage?: { libelle: string; url: string }[] | null;
  seo?: { titre?: string | null; description?: string | null } | null;
};

/**
 * Zones SEO publiées, triées par nom.
 *
 * En cas d'indisponibilité de la base au moment du build, renvoie une liste
 * vide plutôt que de faire échouer la compilation : les pages de zone ne sont
 * alors pas générées, ce qui est visible et vérifiable.
 */
export async function getZonesSeo(): Promise<ZoneSeo[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "zones-seo",
      limit: 50,
      sort: "nom",
      depth: 0,
    });
    return result.docs as unknown as ZoneSeo[];
  } catch (error) {
    console.warn(
      "[zones-seo] Base inaccessible : aucune page de zone ne sera générée.",
      error instanceof Error ? error.message : error,
    );
    return [];
  }
}

export async function getZoneSeoBySlug(slug: string): Promise<ZoneSeo | null> {
  const zones = await getZonesSeo();
  return zones.find((z) => z.slug === slug) ?? null;
}

export type Article = {
  id: number;
  titre: string;
  slug: string;
  categorie: string;
  datePublication: string;
  chapo: string;
  contenu?: unknown;
  image?: { url?: string | null; alt?: string | null } | null;
  seo?: { titre?: string | null; description?: string | null } | null;
};

export const CATEGORIES_ARTICLE: Record<string, string> = {
  metiers: "Métiers de l'accompagnement",
  "se-former": "Se former",
  temoignages: "Témoignages",
  "vie-de-la-maison": "Vie de la maison",
};

/** Articles publiés, les plus récents d'abord. Brouillons exclus. */
export async function getArticles(): Promise<Article[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "articles",
      limit: 100,
      sort: "-datePublication",
      depth: 1,
      where: { _status: { equals: "published" } },
    });
    return result.docs as unknown as Article[];
  } catch (error) {
    console.warn(
      "[articles] Base inaccessible : aucun article ne sera généré.",
      error instanceof Error ? error.message : error,
    );
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find((a) => a.slug === slug) ?? null;
}
