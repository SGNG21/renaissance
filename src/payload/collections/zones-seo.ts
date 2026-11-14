import type { CollectionConfig } from "payload";
import { seoFields } from "../fields/seo";

/**
 * Zones SEO locales : une page par zone (cahier technique, section 7).
 * Quatre zones validées + un emplacement libre pour la cinquième.
 */
export const ZonesSeo: CollectionConfig = {
  slug: "zones-seo",
  labels: { singular: "Zone SEO", plural: "Zones SEO" },
  admin: {
    useAsTitle: "nom",
    defaultColumns: ["nom", "slug", "updatedAt"],
    group: "SEO local",
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "nom",
      type: "text",
      required: true,
      label: "Nom de la zone",
      admin: { description: "Par exemple : Yonne, Joigny, Sens, Auxerre." },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "Slug",
      admin: { description: "Donne l'URL /formation-<slug>, par exemple : yonne." },
    },
    { name: "titreH1", type: "text", required: true, label: "Titre H1" },
    {
      name: "introduction",
      type: "textarea",
      required: true,
      label: "Introduction",
      admin: { description: "Contenu différencié : à réécrire pour chaque zone." },
    },
    { name: "contenu", type: "richText", label: "Contenu différencié" },
    {
      name: "faq",
      type: "array",
      label: "FAQ",
      labels: { singular: "Question", plural: "Questions" },
      fields: [
        { name: "question", type: "text", required: true, label: "Question" },
        { name: "reponse", type: "textarea", required: true, label: "Réponse" },
      ],
    },
    {
      name: "maillage",
      type: "array",
      label: "Maillage interne",
      labels: { singular: "Lien", plural: "Liens" },
      fields: [
        { name: "libelle", type: "text", required: true, label: "Libellé" },
        {
          name: "url",
          type: "text",
          required: true,
          label: "URL",
          admin: { description: "Chemin interne, par exemple : /formations." },
        },
      ],
    },
    seoFields,
  ],
};
