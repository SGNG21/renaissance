import type { Plugin } from "payload";
import { s3Storage } from "@payloadcms/storage-s3";

/**
 * Stockage des médias sur Supabase Storage (API compatible S3).
 *
 * Toutes les clés sont lues côté serveur uniquement : aucun préfixe NEXT_PUBLIC_.
 * Le bucket est public en lecture, donc les fichiers sont servis directement par
 * Supabase (pas de passage par une fonction Vercel), ce qui préserve le cache et
 * les performances. L'écriture reste protégée par les clés S3.
 *
 * Si les variables ne sont pas définies (développement, CI), le plugin n'est pas
 * activé : Payload retombe sur le stockage disque local.
 */
export function storagePlugins(): Plugin[] {
  const bucket = process.env.S3_BUCKET;
  const endpoint = process.env.S3_ENDPOINT;
  const accessKeyId = process.env.S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;

  if (!bucket || !endpoint || !accessKeyId || !secretAccessKey || !supabaseUrl) {
    return [];
  }

  const publicBase = `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${bucket}`;

  return [
    s3Storage({
      collections: {
        medias: {
          // Les fichiers sont servis par Supabase, pas par Payload.
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename }) => `${publicBase}/${filename}`,
        },
      },
      bucket,
      config: {
        endpoint,
        region: process.env.S3_REGION ?? "eu-west-1",
        credentials: { accessKeyId, secretAccessKey },
        // Supabase Storage exige le style « path ».
        forcePathStyle: true,
      },
    }),
  ];
}
