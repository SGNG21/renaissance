# Frappe CRM — acquisition et pipeline

**Statut :** instance déclarée installée, non diagnostiquée depuis le présent dossier.

## Domaine

Leads, contacts, organisations, opportunités, interactions, provenance, étapes du pipeline, relances, conversion de campagne. Éviter d'y stocker tous les documents pédagogiques personnels. Candidature détaillée sous la responsabilité du domaine Renaissance ; CRM conserve des identifiants de référence et les attributs strictement nécessaires.

## Interface de raccordement

`createLead`, `upsertContact`, `linkApplication`, `moveOpportunity`, `logInteraction`, `getOpportunityStatus`; test APIs REST autorisées et permissions par compte de service dédié ; champs à mapper dans un ADR. Utiliser les capacités natives d'intégration ERPNext si la configuration réelle le permet.

## Scénarios de robustesse

Doublon formulaire → 1 lead logique ; CRM indisponible → candidature conservée + événement en attente ; refus marketing → aucun email de prospection ; changement de données personnelles → synchronisation contrôlée ; prospect externe annuaire → pas automatiquement une opportunité commerciale sans fondement.

Ne pas remplacer le CRM par des tableaux fictifs dans le front. Ne pas dupliquer les identités sans stratégie de rapprochement.
