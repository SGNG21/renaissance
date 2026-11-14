# CLAUDE.md — Projet Renaissance (POLIVIA)

Instructions permanentes. Lis-les au début de chaque session et respecte-les sans exception.

## Contexte
Plateforme de l'organisme de formation **Renaissance** (métiers de l'accompagnement, Yonne 89), construite pour POLIVIA. Base contractuelle : `docs/cahier-technique-etape-1.md` — c'est la référence unique du périmètre. Maquette validée : `design/renaissance-vitrine.html`, à reproduire à l'identique.

## Règles non négociables
- **Marque** : « Renaissance » partout. « Villa Renaissance » UNIQUEMENT sur `/mentions-legales` (raison sociale : Villa Renaissance, SAS, SIREN 130 903 099, 84 avenue des Chaumes, 89330 Piffonds).
- **Déploiement** : uniquement GitHub → Vercel. JAMAIS de déploiement local, jamais de `vercel deploy`.
- **Sécurité** : aucune clé secrète côté client. Pas de `NEXT_PUBLIC_` sur les clés API. Jamais de `service_role` dans le navigateur. Seule exception : clé publique Turnstile (publique par conception).
- **Multi-organismes** : chaque table métier porte `organization_id`, RLS activée partout. Renaissance = 1re organisation. Prépare le terrain multi-OF dès maintenant, sans le livrer.
- **Domaine** : renaissance-formation.fr.
- **Périmètre** : ne code rien hors du cahier technique. Si un besoin dépasse (FLE, réseaux sociaux, messagerie, Qualiopi, annuaire national, CPF…), SIGNALE-le, ne le code pas — c'est un devis complémentaire.

## Gates humains (demande AVANT d'agir)
- Toute action irréversible : migration destructive, suppression, changement de domaine, changement de branche de production.
- Application de migrations sur la base du client : feu vert explicite requis, et confirmation que le projet Supabase est bien celui de Renaissance.
- À la fin de chaque point de « Ordre de construction » : commit, push, vérifie le déploiement Vercel, résumé court, et attends ma validation avant le point suivant.

## Structure du code
- `src/ui/` : composants réellement génériques (réutilisables sur d'autres projets POLIVIA). À garder factorisés — ils ne sont PAS cédés au client (art. 5.4).
- `src/components/renaissance/` : spécifique Renaissance.
- Le dépôt ne porte que le spécifique Renaissance. Extraction en package partagé plus tard (au 2e organisme), pas maintenant.

## Stack
Next.js (App Router) + React + TypeScript strict · Tailwind v4 + shadcn (écrit à la main si la CLI est bloquée par le proxy) · Payload CMS (schéma `payload` isolé dans Supabase, RLS activée, aucune policy) · Supabase (PostgreSQL, Auth, Storage, RLS) · n8n sur VPS OVH · Brevo · Vitest + Playwright. Node 22. Gestionnaire : pnpm.

## Qualité avant chaque push
`lint`, `typecheck`, tests unitaires et `next build` doivent passer. Lighthouse > 90 visé. `robots: noindex` tant que le site n'est pas lancé (retiré au point 8). Tests Playwright du parcours de préinscription écrits avant la recette.

## Décisions déjà prises
- Framework Vercel = Next.js, Production Branch = `main`.
- Formulaire « formation visée » = 3 parcours (Accueil familial, Animation & vie sociale, Dame de compagnie) + « Autre ». Pas de FLE.
- 5e zone SEO : slot laissé vide, à confirmer au cadrage.
- Images de la maquette = placeholders IA → extraire en WebP (next/image), signaler comme placeholders. Retirer les mentions « démonstration graphique ».
- Comptes Vercel/Supabase sur le compte POLIVIA pour le build, transfert au client avant lancement (art. 4.1).
- Logo = wordmark provisoire en Italiana, remplacé plus tard (label à trancher).
