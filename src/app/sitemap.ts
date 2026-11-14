import type { MetadataRoute } from "next";
import { getZonesSeo } from "@/lib/payload";
import { getSiteUrl, isIndexable } from "@/lib/site";

const PAGES = [
  { chemin: "", priorite: 1 },
  { chemin: "/formations", priorite: 0.9 },
  { chemin: "/programme", priorite: 0.8 },
  { chemin: "/immersion", priorite: 0.7 },
  { chemin: "/public-vise", priorite: 0.7 },
  { chemin: "/informations-pratiques", priorite: 0.8 },
  { chemin: "/preinscription", priorite: 0.9 },
  { chemin: "/mentions-legales", priorite: 0.2 },
  { chemin: "/confidentialite", priorite: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Tant que le site n'est pas lancé, on n'expose aucune URL à l'indexation.
  if (!isIndexable()) return [];

  const base = getSiteUrl();
  const zones = await getZonesSeo();

  return [
    ...PAGES.map((p) => ({
      url: `${base}${p.chemin}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p.priorite,
    })),
    ...zones.map((z) => ({
      url: `${base}/formation-${z.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
