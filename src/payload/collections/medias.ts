import type { CollectionConfig } from "payload";

/**
 * Médias, stockés sur Supabase Storage via l'adaptateur S3 (voir ../storage.ts).
 * Le bucket est public en lecture : les fichiers sont servis directement par
 * Supabase. Sans les variables S3, Payload retombe sur le disque local
 * (utilisable en développement, inopérant sur Vercel).
 */
export const Medias: CollectionConfig = {
  slug: "medias",
  labels: { singular: "Média", plural: "Médias" },
  admin: { group: "Contenus" },
  upload: {
    mimeTypes: ["image/*"],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Texte alternatif",
      admin: { description: "Décrit l'image pour les lecteurs d'écran et le SEO." },
    },
    {
      name: "creditIA",
      type: "checkbox",
      label: "Illustration générée par IA",
      admin: {
        description:
          "À cocher pour les visuels de la maquette, en attente de photos réelles.",
      },
    },
  ],
};
