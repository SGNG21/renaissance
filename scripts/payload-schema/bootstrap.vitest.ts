/**
 * Bootstrap du schéma Payload sur une base Postgres JETABLE, pour en extraire le DDL.
 * Ne jamais lancer sur la base du client : cette config utilise push: true.
 * Voir scripts/payload-schema/README.md.
 */
import { expect, it } from "vitest";

it("génère le schéma Payload sur la base locale jetable", async () => {
  const { postgresAdapter } = await import("@payloadcms/db-postgres");
  const { lexicalEditor } = await import("@payloadcms/richtext-lexical");
  const { buildConfig } = await import("payload");
  const { getPayload } = await import("payload");

  const { Articles } = await import("../../src/payload/collections/articles");
  const { Medias } = await import("../../src/payload/collections/medias");
  const { Pages } = await import("../../src/payload/collections/pages");
  const { Users } = await import("../../src/payload/collections/users");
  const { ZonesSeo } = await import("../../src/payload/collections/zones-seo");

  const config = await buildConfig({
    admin: { user: Users.slug },
    collections: [Pages, Articles, ZonesSeo, Medias, Users],
    editor: lexicalEditor(),
    secret: "bootstrap-local-only",
    db: postgresAdapter({
      pool: { connectionString: process.env.DATABASE_URI! },
      schemaName: "payload",
      push: true,
    }),
    typescript: { outputFile: "/dev/null" },
  });

  const payload = await getPayload({ config });
  expect(payload.collections.pages).toBeTruthy();
  await payload.destroy?.();
}, 300_000);
