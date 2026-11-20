# Plan d’exécution : 18 lots, une recette finale intégrale

## Politique

Les lots W00–W17 sont des unités **internes** de développement. La livraison finale requise comprend formations + LMS + CRM/ERP + annuaire national gratuit + communauté + post-formation + support POLIVIA + sécurité/recette. L'ordre dépend de l'existant réel et des dépendances, non d'une chronologie arbitraire.

**Ordre recommandé :** W00/W01 reprise/inventaire → W02 identity & RBAC, W03 data ownership → W04 design & site public et W05 catalogue en parallèle → W06 candidatures/sessions → W07 LMS → W08 administration/docs → W09 CRM/ERP → W10 annuaire → W11 communauté → W12 post-formation → W13 support POLIVIA → W14 n8n → W15 cockpit/observabilité → W16 sécurité/recette → W17 lancement autorisé.

Ce séquencement n'interdit pas des branches indépendantes parallèles après contrôle des accès et isolation fichiers. Limiter les agents actifs pour préserver le quota Ultra et éviter les conflits Git.

**Mesure du progrès :** jalon « terminé » uniquement si implémentation réelle, persistance, permissions, tests, preuves et reviewer. La priorité immédiate consiste à achever le parcours vertical de candidature et formation puis l'annuaire gratuit ; ne pas consacrer tout l'effort à la landing si elle est déjà prête.

Voir `workorders/WORK_PACKAGES.json` pour livrables et dépendances.
