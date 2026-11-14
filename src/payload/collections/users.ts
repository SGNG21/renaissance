import type { CollectionConfig } from "payload";

/** Collection d'authentification du back-office Payload. */
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Utilisateur", plural: "Utilisateurs" },
  auth: true,
  admin: { useAsTitle: "email", group: "Administration" },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [{ name: "nom", type: "text", label: "Nom" }],
};
