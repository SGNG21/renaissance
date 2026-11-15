# Renaissance — Étape 1

Site, SEO local, blog et préinscription de Renaissance (POLIVIA). Référence : cahier technique Étape 1.

- **Stack** : Next.js (App Router), React, TypeScript, Tailwind CSS v4, shadcn/ui, Payload CMS, Supabase, Brevo.
- **Déploiement** : GitHub → Vercel uniquement. Jamais de déploiement local.
- **Secrets** : jamais côté client. Voir `.env.example`. Seule exception validée : `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (clé publique).

## Pages (point 5)

Routes du site dans `src/app/(site)/` : `/`, `/formations`, `/programme`, `/immersion`,
`/public-vise`, `/informations-pratiques`, `/preinscription`, `/mentions-legales`,
`/confidentialite`. Le back-office Payload vit dans `src/app/(payload)/`, chaque groupe
ayant son propre layout racine (une seule balise `<html>` par page).

Les contenus que le client doit fournir (tarifs, dates, lieux, programme, financements)
sont signalés par le composant `ACompleter`, volontairement visible : **aucune donnée
n'est inventée**.

## Organisation du code

- `src/ui/` — composants **génériques** (Button, Eyebrow, ArrowLink, SectionTitle, Field), pilotés par les tokens du thème, sans contenu propre à Renaissance. Destinés à être factorisés à part.
- `src/components/renaissance/` — composants **spécifiques** Renaissance (Logo, ParcoursCard…).
- `src/app/globals.css` — tokens de la charte (section 3 du cahier).
- `design/renaissance-vitrine.html` — maquette validée (référence de design).
- `public/images/placeholders/` — visuels générés par IA, **placeholders** à remplacer par des photos réelles.

## Scripts

`pnpm lint` · `pnpm typecheck` · `pnpm test` (Vitest) · `pnpm e2e` (Playwright, contre `E2E_BASE_URL`, une URL déployée).

## Supabase

- Projet dédié Renaissance : `oklbxxixadrqxfhtztut`.
- Migrations versionnées dans `supabase/migrations/` (création uniquement, non destructives).
- Migrations appliquées :
  - `20261113234703_foundation` — 10 tables métier, 12 policies, RLS partout, advisors sans alerte.
  - `20261114001305_payload_schema` — 16 tables Payload dans le schéma `payload`, RLS activée,
    aucune policy, aucun privilège `anon`/`authenticated`. Régénération :
    `scripts/payload-schema/README.md`.
  - `20261114002200_payload_medias_objectkey` — colonne `_objectkey` ajoutée par
    l'adaptateur de stockage S3.
- Les advisors remontent 16 notices **INFO** `rls_enabled_no_policy` sur le schéma `payload` :
  comportement voulu par le cahier (RLS sans policy), pas une anomalie.
- Client serveur : `src/lib/supabase/server.ts` (`server-only`, clé `service_role`, jamais côté navigateur).
- Le formulaire public écrit dans `leads` uniquement via une route serveur.
- Les policies RLS reposent sur `private.current_org_id()` et `private.current_app_role()`
  (SECURITY DEFINER). Nommée `current_app_role` et non `current_role` : `CURRENT_ROLE` est un mot
  réservé SQL qui renverrait le rôle Postgres de connexion, pas le rôle métier.
- Le schéma `payload` est créé vide et fermé à l'API Data ; la RLS de ses tables est activée au point 4.

## Payload CMS

- Back-office : `/admin`. API REST : `/api/*`. GraphQL : `/api/graphql`.
- Config : `src/payload.config.ts`. Collections : `src/payload/collections/`.
- Collections : Pages, Articles, Zones SEO, Médias, Utilisateurs.
- Tables dans le schéma `payload`, jamais dans `public`.
- Le premier utilisateur du back-office se crée à la première visite de `/admin`.
- Médias stockés sur **Supabase Storage** (API S3), bucket public en lecture :
  les fichiers sont servis par Supabase, pas par une fonction Vercel. Clés S3
  côté serveur uniquement (`S3_*`, aucun `NEXT_PUBLIC_`). Sans ces variables,
  Payload retombe sur le disque local (développement seulement).
- La CLI Payload ne fonctionne pas dans cet environnement (bug `tsx`/`undici`) :
  `importMap` vide et schéma régénéré par le script dédié.

## Préinscription

`/preinscription` → route serveur `/api/preinscription` → Supabase (`leads`) → Brevo.

Les appels Brevo partent **directement de la route serveur** : l'étape 1 n'utilise
aucune automatisation externe ni serveur tiers.

Ordre volontaire : la base d'abord, les e-mails ensuite. Supabase est la source de
vérité, les e-mails sont un confort. Une panne Brevo ne perd donc jamais une demande
et ne change rien à ce que voit le visiteur ; chaque envoi est tracé dans `events`
(`brevo.confirmation.*`, `brevo.notification.*`, `brevo.contact.*`) pour être rejoué.

Trois actions : confirmation au prospect, notification à Renaissance, et — uniquement
si `BREVO_LIST_ID` est défini — ajout du contact à une liste. Sans gabarit transactionnel
configuré, un e-mail de repli est envoyé plutôt que rien.
