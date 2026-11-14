import type { Field } from "payload";

/** Champs SEO communs aux pages, articles et zones. */
export const seoFields: Field = {
  name: "seo",
  type: "group",
  label: "SEO",
  fields: [
    {
      name: "titre",
      type: "text",
      label: "Titre (balise title)",
      admin: { description: "Idéalement 50 à 60 caractères." },
    },
    {
      name: "description",
      type: "textarea",
      label: "Méta description",
      admin: { description: "Idéalement 150 à 160 caractères." },
    },
  ],
};
