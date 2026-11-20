# Machines d’état, événements et intégration fiable

## Candidature

`draft -> submitted -> under_review -> needs_info | accepted | rejected | waitlisted -> enrolled -> completed | withdrawn`. Transitions alternatives exactes documentées dans ADR, évitant l'acceptation rétroactive sans autorisation.

## Session

`draft -> scheduled -> open -> full -> in_progress -> completed -> archived`; `cancelled` possible depuis états permis avec notifications et traitement des remboursements selon contrat.

## Fiche annuaire

`draft -> submitted -> moderation -> published | rejected -> suspended | unpublished`. Révision de fiche publiée = version brouillon jusqu'à validation si champs sensibles.

## Support / site POLIVIA

`new -> qualified -> consent_pending -> ready_for_transfer -> transferred -> acknowledged -> closed`; l'état `transferred` ne signifie pas vente, publication ou résultat commercial.

## Contrats d'événements

Événements minimaux : `candidate.submitted`, `application.reviewed`, `enrollment.confirmed`, `payment.received`, `session.started`, `lesson.completed`, `assessment.passed`, `training.completed`, `certificate.issued`, `directory.profile.submitted`, `directory.profile.published`, `community.member.invited`, `support.website.requested`, `polivia.referral.transferred`, `privacy.deletion.requested`.

Tout événement transporte id UUID, type, version, horodatage, correlation_id, source, domaine, sujet autorisé, idem_key et classification de données. L'outbox transactionnelle est nécessaire quand l'événement déclenche un effet métier externe. Consommateur idempotent, retries plafonnés et DLQ surveillée.
