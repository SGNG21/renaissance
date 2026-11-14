import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Articles } from "./payload/collections/articles";
import { Medias } from "./payload/collections/medias";
import { Pages } from "./payload/collections/pages";
import { Users } from "./payload/collections/users";
import { ZonesSeo } from "./payload/collections/zones-seo";
import { storagePlugins } from "./payload/storage";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — Renaissance",
    },
  },
  // Back-office en français.
  i18n: { fallbackLanguage: "fr" },
  collections: [Pages, Articles, ZonesSeo, Medias, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI ?? "" },
    // Tables Payload isolées hors du schéma public (cahier technique, section 2).
    schemaName: "payload",
    // Jamais de modification automatique du schéma : uniquement des migrations.
    push: false,
    migrationDir: path.resolve(dirname, "payload/migrations"),
  }),
  plugins: storagePlugins(),
  typescript: {
    outputFile: path.resolve(dirname, "payload/payload-types.ts"),
  },
  sharp,
})
