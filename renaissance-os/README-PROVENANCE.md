# Provenance et statut de ce dossier

Ce dossier a été reçu le 2026-11-20 sous forme d'archive `.zip` préparée hors de
cette session (dossier « RENAISSANCE_CLAUDE_ULTRA_V7 »), et versionné ici
**tel quel**, sans modification du contenu copié.

## Ce que c'est

Un pack de **planification** pour un programme bien plus large que l'Étape 1
livrée (`docs/cahier-technique-etape-1.md`, à la racine du dépôt) : CRM/ERP
(Frappe/ERPNext), e-learning complet, annuaire national gratuit, communauté,
automatisations n8n, suivi post-formation, etc.

Le dossier le dit lui-même : « nature : mandat de développement, pas une
application déjà déployée ». Aucun module de ce programme n'est implémenté à
ce jour. Voir `DELIVERY_STATUS.md` et `docs/02_VERITE_EXISTANT.md`.

## Ce qui N'A PAS été installé

- `claude-pack-reference/` contient les agents et skills proposés par le pack,
  et le `CLAUDE.md` qu'il suggère. **Rien de tout cela n'a été copié dans
  `.claude/` ni fusionné avec le vrai `CLAUDE.md` du dépôt.** Le pack
  lui-même le déconseille (`COMMENT_INSTALLER_SANS_ECRASER.md`) : « à
  intégrer sélectivement, pas automatiquement ».
- La démonstration HTML « Villa Renaissance » d'octobre (2,9 Mo, images
  intégrées) n'a volontairement pas été copiée ici : son statut de licence
  sur les visuels n'est pas vérifié (voir `references/AVERTISSEMENT.md`).

## Décision en attente, bloquante pour la suite

Frappe CRM / ERPNext / n8n évoqués dans ce pack **ne sont pas hébergés en
ligne** : à construire from scratch (open source), sur un hébergement à
choisir (Frappe Cloud, VPS, ou autre) — dépense et provisioning que seul le
commanditaire peut valider. Voir `docs/34_DECISIONS_A_FAIRE_VALIDER.md` et le
fil de discussion du 20/11/2026.
