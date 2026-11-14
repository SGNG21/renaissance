# Régénérer le schéma des tables Payload

Payload crée ses propres tables (collections, versions, préférences, sessions).
Dans ce projet, elles vivent dans le schéma `payload`, isolé du schéma `public`.

## Pourquoi ce script et pas la CLI Payload

La CLI Payload (`payload migrate:create`) est **inutilisable dans cet
environnement** : son chargeur `tsx` provoque un double chargement d'`undici`
et plante avec `TypeError: Illegal constructor`, sur Node 22 comme sur Node 24.
Le bug est en amont, pas dans ce projet.

Contournement : on laisse Payload générer son schéma sur une base Postgres
**jetable** (via Vite, qui n'utilise pas `tsx`), puis on en extrait le DDL avec
`pg_dump` et on le versionne comme migration Supabase classique. Il n'y a donc
qu'un seul historique de migrations, celui de `supabase/migrations/`.

## Marche à suivre

1. Démarrer un Postgres jetable, créer une base et le schéma `payload`.
2. Lancer le bootstrap (il utilise `push: true`, **jamais** sur la base du client) :

```bash
DATABASE_URI="postgresql://postgres@localhost:5432/jetable" pnpm vitest run --config vitest.bootstrap.config.ts
```

3. Extraire le DDL :

```bash
pg_dump -d jetable --schema=payload --schema-only --no-owner --no-privileges --no-comments
```

4. Nettoyer la sortie (retirer les `\restrict`, `SET`, `SELECT pg_catalog.set_config`),
   remplacer `CREATE SCHEMA payload;` par `create schema if not exists payload;`,
   puis ajouter en fin de fichier le bloc de verrouillage (revoke + activation de
   la RLS sur toutes les tables du schéma) comme dans la migration existante.
5. Rejouer la migration complète sur une base vierge pour vérifier l'ordre,
   puis l'appliquer et relancer les advisors de sécurité Supabase.

## Attendu après application

- 16 tables dans `payload`, **toutes** avec RLS activée et **aucune** policy.
- Aucun privilège pour `anon` ni `authenticated`, pas même `usage` sur le schéma.
- Payload continue de fonctionner car il se connecte avec le rôle `postgres`,
  propriétaire des tables et porteur de `BYPASSRLS`.
- Les advisors Supabase remontent 16 notices `rls_enabled_no_policy` de niveau
  **INFO** : c'est le comportement voulu par le cahier, pas une anomalie.
