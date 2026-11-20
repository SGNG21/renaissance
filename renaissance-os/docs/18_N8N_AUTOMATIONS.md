# Automatisations n8n : déclencheurs, consentements, erreurs

Réutiliser l'instance n8n existante seulement après vérification de l'environnement et des droits, via API authentifiée ou workflows exportables testés en staging. Aucune désactivation d'authentification ni exposition publique nouvelle.

**Événements possibles :** formulaire d'information, dossier soumis, documents manquants, décision candidature, convocation session, rappel, émargement, évaluation, fin de formation, attestation prête, invitation annuaire, modération, entrée communauté, ticket support, transfert POLIVIA, anomalie paiement, KPI et incident.

Chaque automatisation spécifie déclencheur, propriétaire, source de vérité, droits, variables, déclenchement transactionnel/outbox, idempotence, retries bornés, DLQ, messages et canal, preuve de réception, monitoring, test de double déclenchement et comportement de sécurité. Les paiements et droits de rôles sont appliqués au backend canonique, pas au simple niveau n8n.

Voir `automations/WORKFLOW_CATALOG.json`. Les définitions sont un **catalogue de conception**, pas des exports n8n activés.
