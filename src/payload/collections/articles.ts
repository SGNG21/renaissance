import type { CollectionConfig } from "payload";
import { seoFields } from "../fields/seo";

/** Articles de blog. */
export const Articles: CollectionConfig = {
  slug: "articles",
  labels: { singular: "Article", plural: "Articles" },
  admin: {
    useAsTitle: "titre",
    defaultColumns: ["titre", "categorie", "datePublication", "_status"],
    group: "Contenus",
  },
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
    },
    {
      name: "categorie",
      type: "select",
      required: true,
      label: "Catégorie",
      options: [
        { label: "Métiers de l'accompagnement", value: "metiers" },
        { label: "Se former", value: "se-former" },
        { label: "Témoignages", value: "temoignages" },
        { label: "Vie de la maison", value: "vie-de-la-maison" },
      ],
    },
    {
      name: "datePublication",
      type: "date",
      required: true,
      label: "Date de publication",
      admin: { date: { pickerAppearance: "dayOnly", displayFormat: "dd/MM/yyyy" } },
    },
    { name: "chapo", type: "textarea", required: true, label: "Chapô" },
    {
      name: "image",
      type: "upload",
      relationTo: "medias",
      label: "Image de couverture",
    },
    { name: "contenu", type: "richText", required: true, label: "Contenu" },
    seoFields,
  ],
};
