-- Renaissance — Étape 1, point 4 (suite) : stockage des médias sur Supabase Storage.
--
-- L'adaptateur @payloadcms/storage-s3 ajoute une colonne technique `_objectkey`
-- à la collection Médias (clé de l'objet dans le bucket).
--
-- Migration NON destructive : ajout de colonne uniquement.
-- La table reste dans le schéma payload : RLS déjà activée, aucune policy.

alter table payload.medias
  add column if not exists "_objectkey" character varying;
