# Quality Gates et politique de preuves

Voir `quality/QA_MATRIX.csv` pour la matrice détaillée de contrôles et leurs sévérités, `quality/RECETTE_E2E.md` pour la recette fonctionnelle.

**Gates :** G0 inventaire/provenance → G1 contrats/source de vérité → G2 permissions/RGPD → G3 couverture métier → G4 QA tech/SEO/a11y/design → G5 scénario E2E complet → G6 sauvegarde/restauration → G7 approbation avant publication. Un FAIL bloquant interdit toute publication. `NOT_RUN` n'est jamais `PASS`; une dérogation doit être datée, motivée, révocable et approuvée.

Preuves par contrôle : test et commande, commit, environnement, captures, logs anonymisés, date, opérateur/reviewer indépendant, verdict. Séparer `demo`, `isolated`, `staging`, `production` ; aucune preuve simulée ne valide un gate de production.

Les outils types : tests TS/SQL/Playwright, contrôle de rôles et APIs, stress dernière place, webhooks répétés, Lighthouse, axe, scénarios manuels et restauration en staging. Décrire les résultats réellement exécutés, jamais une validation hypothétique.
