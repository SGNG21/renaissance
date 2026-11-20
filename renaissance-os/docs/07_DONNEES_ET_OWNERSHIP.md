# Entités, sources de vérité et invariants

## Entités canoniques proposées

- Identité : `Identity`, `RoleGrant`, `Profile`, `Consent`, `PrivacyRequest`.
- Commerce : `Lead`, `Contact`, `Opportunity`, `Quotation`, `Order`, `Invoice`, `Payment`.
- Formation : `Course`, `CourseVersion`, `LearningModule`, `Lesson`, `Assessment`, `Session`, `TrainerAssignment`, `CapacityReservation`, `Application`, `Enrollment`, `Attendance`, `Progress`, `CertificationEvidence`, `Certificate`.
- Annuaire : `ProfessionalProfile`, `ProfessionalCredential`, `Category`, `ServiceArea`, `ListingModeration`, `DirectoryReport`, `VisibilityConsent`.
- Communauté : `CommunityMembership`, `Thread`, `Comment`, `ModerationAction` (si Discourse retenu, ne pas dupliquer sa DB).
- Support / partenariat : `SupportCase`, `WebsiteRequest`, `TransferConsent`, `PoliviaReferralStatus`.
- Exploitation : `EventOutbox`, `IntegrationAttempt`, `AuditEvent`, `DocumentVersion`, `TaskEvidence`.

## Data ownership cible (proposition, à confirmer par ADR)

| Objet | Source à privilégier | Condition |
|---|---|---|
| Lead, opportunité | Frappe CRM | Après inspection des champs et API |
| Devis, facture, règlement | ERPNext | Selon règles fiscales validées et intégration réelle |
| Cours, progression, évaluations | LMS retenu | Frappe Learning candidat ; ne pas dupliquer |
| Session, candidature, présence, preuve | Domaine Renaissance | Choix d'hébergement à trancher, Frappe custom / Supabase existant |
| Annuaire, consentements de visibilité | Domaine Renaissance | Base Renaissance isolée, source unique |
| Forum | Moteur de communauté retenu | Stocker seulement référence et règles d'accès côté Renaissance |
| Demande de site | Support Renaissance | POLIVIA reçoit une copie limitée après validation/transfert |

**Invariants :** capacité non négative, une inscription active par apprenant/session, autorisation à chaque transition, webhook traité une seule fois logiquement, mêmes prix entre quote et paiement, jamais de création de fiche publique sans état de publication, traçabilité des changements de rôles, audit sans secrets.

## Méthode de rapprochement

Map des IDs externes, plan de migration non destructif, outbox, idempotency key, déduplication par identité vérifiée, reprise sur erreur, données anonymisées pour staging, conservation différenciée RGPD et contractuelle. Les schémas `contracts/` sont des propositions, pas migrations exécutées.
