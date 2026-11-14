import type { CollectionConfig } from "payload";

/**
 * Médias. Le stockage Supabase (S3) n'est pas encore branché : les envois de
 * fichiers échoueront en production tant que l'adaptateur n'est pas configuré.
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
