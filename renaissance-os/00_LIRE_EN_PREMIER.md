# RENAISSANCE OS — DOSSIER V7 POUR CLAUDE CODE ULTRA

**Date : 2026-11-20 | Nature : mandat de développement + spécifications + contrats + recette, pas une application déjà déployée.**

## Utilisation en 4 gestes

1. Extraire l'archive à côté du dépôt Renaissance, dans un dossier de référence. Ne jamais extraire par-dessus le code existant.
2. Donner à Claude Code le chemin de `MISSION_A_DONNER_A_CLAUDE.md` et lui faire lire `CLAUDE.md` du vrai dépôt avant toute modification.
3. Lui demander de reprendre son dernier travail : audit différentiel de 30 minutes MAX sur la base *documentée* avant de coder, inventaire en lecture seule puis implémentation du premier lot réellement manquant.
4. Préserver toutes les configurations et données de production ; aucune migration/destruction/dépense/déploiement sans accord. La livraison finale doit couvrir tous les modules requis, pas seulement le site vitrine.

**Priorité métier absolue :** formations + LMS + administratif + annuaire national gratuit (y compris non-stagiaires) + communauté + suivi post-formation + demandes de sites passant par le support Renaissance avant POLIVIA + tableaux de pilotage.

**Contexte infrastructure rapporté :** Frappe CRM et ERPNext déjà installés, n8n existant ; accès, versions, interfaces, isolation et intégrations **non vérifiés dans ce dossier**. Pas d'invention de preuve d'intégration.

## Navigation

- `MISSION_A_DONNER_A_CLAUDE.md` : mandat exécutable intégral à transmettre.
- `DOSSIER_MAITRE_INTEGRAL.md` : livre unique regroupant les chapitres techniques et métier.
- `docs/` : chapitres indépendants et vérifiables.
- `contracts/` : JSON Schema de référence + exemples fictifs.
- `workorders/` : 18 lots, dépendances, livrables et critères d'acceptation.
- `quality/` : matrice QA, risques, scénarios E2E, gates et go/no-go.
- `claude/` : consignes, 8 agents et 10 skills Renaissance (à intégrer sélectivement, pas automatiquement).
- `design/` : tokens CSS + visualisation conceptuelle statique.
- `references/` : cahier des charges antérieur et démonstration HTML d'octobre ; sources historiques, **non preuves de fonctionnement**.
- `scripts/` : vérificateur du pack, sans réseau ni modification de l'existant.

## Sources et niveaux de confiance

- **CONFIRMÉ PAR LES ÉCHANGES** : aspirations, parcours et exigences communiquées par le commanditaire.
- **SOURCE HISTORIQUE** : cahier des charges du 08/11 et maquette d'octobre ; ne signifie pas livré.
- **DÉCLARÉ / À VÉRIFIER** : instances Frappe, ERPNext, n8n, repo canonique, CMS, SSO, LMS.
- **PROPOSÉ** : architecture et schémas dans le présent pack ; valider contre dépôt et versions.

Ne pas mélanger Renaissance, POLIVIA et ICOS. Aucun accès transverse implicite.
