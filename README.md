# Renaissance — Étape 1

Site, SEO local, blog et préinscription de Renaissance (POLIVIA). Référence : cahier technique Étape 1.

- **Stack** : Next.js (App Router), React, TypeScript, Tailwind CSS v4, shadcn/ui, Payload CMS, Supabase.
- **Déploiement** : GitHub → Vercel uniquement. Jamais de déploiement local.
- **Secrets** : jamais côté client. Voir `.env.example`. Seule exception validée : `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (clé publique).

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
- Client serveur : `src/lib/supabase/server.ts` (`server-only`, clé `service_role`, jamais côté navigateur).
- Le formulaire public écrit dans `leads` uniquement via une route serveur.
- Les policies RLS reposent sur `private.current_org_id()` et `private.current_app_role()`
  (SECURITY DEFINER). Nommée `current_app_role` et non `current_role` : `CURRENT_ROLE` est un mot
  réservé SQL qui renverrait le rôle Postgres de connexion, pas le rôle métier.
- Le schéma `payload` est créé vide et fermé à l'API Data ; la RLS de ses tables est activée au point 4.
