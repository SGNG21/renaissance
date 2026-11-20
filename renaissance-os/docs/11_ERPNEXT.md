# ERPNext — devis, comptabilité, facturation, gestion

**Statut :** ERPNext déclaré installé ; versions, sociétés, catégories comptables, règles TVA et modules actifs à vérifier.

## Responsabilités candidates

Création de clients et devis, devis approuvés, commandes, factures, règlements, remboursements, suivi financier des formations, projets et coûts lorsque modules en place. Abonnements uniquement si la version et les paramètres nécessaires couvrent le besoin réel. Le parcours doit rester juridiquement conforme aux conditions Renaissance et à son régime fiscal.

## Interface et flux

`OpportunityConverted → ERPNext Customer/Quotation → Confirmation métier → Invoice/Payment → Enrollment`, ordre exact à valider. ERPNext doit détenir la facture canonique si sélectionné ; un reçu front-end n'est pas une facture officielle. Tester webhooks/paiements sandbox avant facturation réelle.

## Risques

Double facture sur webhook répété, mauvaise société/tenant, taux TVA erroné, suppression d'un règlement comptabilisé, retour paiement tardif, sync CRM/ERP en boucle, doublon de client. Interdire les écritures directes aux tables ERP sans API et contrôle d'autorisation.

Si le module financier existant fonctionne déjà, **le réutiliser avant toute autre intégration de facturation**.
