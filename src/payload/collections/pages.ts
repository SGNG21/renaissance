import type { CollectionConfig } from "payload";
import { seoFields } from "../fields/seo";

/** Pages éditoriales gérées dans le CMS. */
export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  admin: { useAsTitle: "titre", defaultColumns: ["titre", "slug", "updatedAt"], group: "Contenus" },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  versions: { drafts: true },
  fields: [
    { name: "titre", type: "text", required: true, label: "Titre" },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "Slug",
      admin: { description: "Identifiant dans l'URL, par exemple : notre-approche." },
    },
    { name: "chapo", type: "textarea", label: "Chapô" },
    { name: "contenu", type: "richText", label: "Contenu" },
    seoFields,
  ],
};
