# Recette intégrale Renaissance OS — scénarios prioritaires

**Jamais déclarer "recette validée" sans exécution, preuves et relecture indépendante.** Les tests détaillés figurent dans `quality/TEST_CASES.json`. Les suites suivantes doivent couvrir les bases et les éléments métier :

## R1 — Du catalogue à l'alumni

Une personne parcourt les 4 formations, consulte une fiche réelle, sélectionne une session avec capacité vérifiable, sauvegarde sa candidature, la soumet, reçoit un accusé, est validée, s'inscrit selon règles de règlement, accède au LMS, passe les évaluations, voit sa progression, fournit présence, obtient attestation vérifiée, conserve son compte et choisit librement ou non annuaire/communauté. Les données réelles requièrent autorisation ; fixtures synthétiques explicitement identifiées en staging.

## R2 — Professionnel sans formation

Compte professionnel gratuit, catégorie autorisée, zone de service, brouillon puis modération, fiche publiée, recherche mobile, modification, signalement et retrait. Vérifier qu'**aucun achat, formation ou code d'inscription** n'est demandé.

## R3 — Support → POLIVIA

Demande site, ticket Renaissance, qualification, consentement si applicable, transfert par contrat minimal, réception/retry, suivi statut limité, absence de documents pédagogiques. Sans accord, transfert refusé.

## R4 — Gestion opérationnelle

Admin crée une session, assigne formateur, ouvre les inscriptions, traite les dossiers, contrôle les pièces, émet convocations, enregistre présence, clôture, exporte les preuves, répond à une réclamation et actualise les indicateurs président sans secrets.

## R5 — Résilience

Deux candidats tentent la dernière place ; 2 webhooks paiement identiques ; CRM indisponible ; n8n 403 ; LMS temporairement hors service ; utilisateur révoqué ; upload invalide ; restauration staging. Les effets doivent être sûrs et observables, sans faux succès.

## R6 — Design, accessibilité, SEO et conformité

Captures vrais navigateurs 360/768/1440, contraste et clavier, CWV mesurés/estimés distinctement, sitemap public, aucun profil privé indexable, SEO original Yonne/Joigny/Sens/Auxerre, mentions et documents validés humainement. Aucun numéro Qualiopi inventé.

## Verdict

`PASS` seulement si tous les BLOCKER applicables sont testés et réussis, aucun PASS de démo utilisé pour certifier la production, et approbation finale humaine signée. Un échec connu bloque le GO, une réserve mineure peut être explicitement tolérée avec responsable et expiration.
