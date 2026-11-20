# Inventaire de vérité, sources et statuts

## Ce qui est documenté, pas nécessairement déployé

- Cahier des charges du 08/11/2026 : Next.js/Supabase et LMS Front envisagés, routes détaillées, RLS/tests; **ancienne proposition**.
- Prototype Renaissance React/Vite/TypeScript mentionné dans les travaux antérieurs : site public et préinscription, statut de fonctionnement actuel **à vérifier sur dépôt**.
- Démonstration HTML Villa Renaissance d'octobre : acquisition, CRM, RDV, relances, espace membre, e-learning, communauté, kit de lancement, simulateur ; **présentation interactive, pas application métier**.
- Frappe CRM / ERPNext : déclarés déjà installés par le commanditaire ; versions, URL, auth, allocations des données, API, intégrations non inspectées.
- n8n : déclaré disponible dans l'écosystème ; instances/permissions/workflows pour Renaissance non vérifiés.
- LMS/annuaire/communauté/signature/support : solutions étudiées, pas de preuve ici de déploiement ni de raccordement.

## Procédure en lecture seule

Examiner le vrai repo, `git status`, `git log`, arborescence, tests, configs `.env.example`, GitHub Actions, migrations, permissions RLS, branches, services, Vercel, données anonymisées. Vérifier uniquement les connecteurs accessibles. Ne pas afficher les valeurs des secrets. Relier chaque preuve à commit, environnement, commande et timestamp.

## Matrice de qualification

Pour chaque module renseigner : `entity`, `owner`, `env`, `version`, `implementation`, `api_test`, `auth_verified`, `last_evidence`, `risk`, `next_action`. La colonne `implementation` distingue `DÉCLARÉ`, `IMPLÉMENTÉ`, `CONNECTÉ`, `TESTÉ`, `OPÉRATIONNEL`. Une maquette ne devient jamais `OPÉRATIONNEL`.

**Décision de migration :** le choix Supabase/Frappe ne peut être fait sur la seule base de ce dossier. Valider par ADR, matrice de données, compatibilité, rollback et POC isolé.
