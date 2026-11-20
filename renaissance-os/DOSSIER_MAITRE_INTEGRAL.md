# RENAISSANCE OS V7 — DOSSIER MAÎTRE INTÉGRAL

**Version 2026-11-20 — spécifications de référence, pas résultat d’audit ou système déployé.**


---

## 01_VISION_PRODUIT.md — Vision, périmètre et résultats métier

**But :** offrir une expérience premium unifiée à un organisme de formation français, de la découverte publique au suivi durable des professionnels.

**Univers du produit :** (1) vitrine/acquisition ; (2) candidature & gestion des sessions ; (3) campus/e-learning ; (4) annuaire national gratuit ; (5) communauté et suivi post-formation ; (6) back-office finance/qualité/reporting ; (7) support et demandes de sites transmises à POLIVIA.

**Principes non négociables :** un organisme exploitant à ce stade, annuaire ouvert aux professionnels non formés, données d'apprenants privées, compte conservé après formation selon droits/conservation, facturation alignée sur l'ERP retenu, aucune livraison publique avant tests et approbation.

**Personas :** visiteur, prospect, candidat, apprenant, ancien apprenant, professionnel externe, formateur, agent administratif, président, modérateur, support, opérateur technique. Un compte peut avoir plusieurs rôles explicites, jamais déduits automatiquement d'une simple URL.

**Résultats mesurables :** délai de réponse aux candidatures, taux de candidature complétée, taux d'inscription effective, remplissage de sessions, progression, taux de clôture administratif, délai de publication d'une fiche annuaire vérifiée, taux de réponse support, SEO organique et disponibilité. Baselines et objectifs chiffrés à valider ; pas de KPI inventés.

**Hors périmètre immédiat :** logiciel métier multi-organismes à revendre, manipulation de dossiers médicaux de patients, IA autonome agissant sur comptes de tiers, exploitation commerciale directe de POLIVIA dans l'interface administration Renaissance. 


---

## 02_VERITE_EXISTANT.md — Inventaire de vérité, sources et statuts

## Ce qui est documenté, pas nécessairement déployé

- Cahier des charges du 08/11/2026 : Next.js/Supabase et LMS Front envisagés, routes détaillées, RLS/tests; **ancienne proposition**.
- Prototype Renaissance React/Vite/TypeScript mentionné dans les travaux antérieurs : site public et préinscription, statut de fonctionnement actuel **à vérifier sur dépôt**.
- Démonstration HTML Villa Renaissance d'octobre : acquisition, CRM, RDV, relances, espace membre, e-learning, communauté, kit de lancement, simulateur ; **présentation interactive, pas application métier**.
- Frappe CRM / ERPNext : déclarés déjà installés par le commanditaire ; versions, URL, auth, allocations des données, API, intégrations non inspectées.
- n8n : déclaré disponible dans l'écosystème ; instances/permissions/workflows pour Renaissance non vérifiés.
- LMS/annuaire/communauté/signature/support : solutions étudiées, pas de preuve ici de déploiement ni de raccordement.

## Procédure en lecture seule

Examiner le vrai repo, `git status`, `git log`, arborescence, tests, configs `.env.example`, GitHub Actions, migrations, permissions RLS, branches, services, Vercel, données anonymisées. Vérifier uniquement les connecteurs accessibles. Ne pas afficher les valeurs des secrets. Relier chaque preuve à commit, environnement, commande et timestamp.

## Matrice de qualification

Pour chaque module renseigner : `entity`, `owner`, `env`, `version`, `implementation`, `api_test`, `auth_verified`, `last_evidence`, `risk`, `next_action`. La colonne `implementation` distingue `DÉCLARÉ`, `IMPLÉMENTÉ`, `CONNECTÉ`, `TESTÉ`, `OPÉRATIONNEL`. Une maquette ne devient jamais `OPÉRATIONNEL`.

**Décision de migration :** le choix Supabase/Frappe ne peut être fait sur la seule base de ce dossier. Valider par ADR, matrice de données, compatibilité, rollback et POC isolé.



---

## 03_PRD_PARC0URS.md — PRD détaillé et parcours utilisateur

## Parcours A — candidature formation

`Anonyme → Prospect → Candidature brouillon → Soumise → À compléter / Examen → Acceptée / Refusée / Liste attente → Inscription → Session planifiée → En cours → Évaluée → Clôturée → Ancien apprenant`. Chaque transition possède un acteur, une permission, des conditions et un événement audit. Le paiement peut précéder la confirmation selon la politique réelle : définir l'ordre avec Renaissance et le prestataire avant d'implémenter les webhooks.

Le candidat peut interrompre un formulaire et reprendre sans exposer des données dans une URL. Les documents sensibles sont stockés en privé. À la dernière place, deux concurrents ne peuvent pas confirmer simultanément.

## Parcours B — professionnel externe

`Visiteur → Compte professionnel gratuit → Profil brouillon → Soumission → Vérification/modération → Fiche publiée → Mise à jour / Suspension / Retrait`. Aucune formation ni paiement obligatoire. Professions réglementées : état « non vérifié » tant que la preuve n'est pas contrôlée.

## Parcours C — formation terminée

Le compte demeure accessible selon politique de conservation. L'ancien apprenant consulte attestations autorisées, ressources post-formation, invitation à la communauté et peut demander publication de son profil dans l'annuaire. Aucune inscription automatique visible sans consentement applicable.

## Parcours D — demande de site

`Compte Renaissance → Support Renaissance → Qualification → Vérification consentement de transfert → Transmission POLIVIA → Statut partagé limité → Clôture`. Ne pas fusionner facturation POLIVIA et gestion Renaissance.

## Parcours E — administratif

Création cursus/version → programmation session/capacité → assignation formateur → candidatures → validation documents → émargement → évaluations → attestations → réclamations/qualité → clôture et export.



---

## 04_CATALOGUE_FORMATIONS.md — Formations, prix historiques et règles de publication

| Parcours connu | Prix de référence historique | À valider avant publication |
|---|---:|---|
| Découverte du métier d'accueillant familial PA/PH | 700 € | Programme, durée, financement, TVA, modalités |
| Devenir accueillant familial PA/PH, offre historiquement associée au site | 1 490 € (à revoir) | Périmètre du site inclus, contrat et passage support/POLIVIA |
| Formation animatrice PA | 890 € | Objectifs, prérequis, calendrier |
| Dame de compagnie | 800 € | Programme, durée, documents |

Sessions historiquement envisagées pour **2–10 stagiaires** : par formation et session configurable, pas règle universelle codée en dur. Aucune date de formation inventée.

Chaque fiche doit fournir : identification du cursus et de sa version, finalité, objectifs, public, prérequis, contenu, modalités, durée, moyens mobilisés, modalités d'évaluation, accessibilité/handicap, tarifs validés, modalités d'inscription, contact, statut des sessions publiées, FAQ. Les contenus pédagogiques exacts proviennent du client et sont soumis à validation avant publication.

Règles d'édition : publication versionnée, brouillon distinct de production, validation d'un responsable autorisé ; cohérence catalogue et inscriptions actives ; prix affichés et calculés doivent être identiques, avec trace des versions acceptées.



---

## 05_DESIGN_PREMIUM.md — Direction artistique et expérience premium

## Intention

Renaissance doit inspirer confiance et humanité, transmettre le sérieux d'un organisme de formation tout en proposant un rendu de maison éditoriale premium, jamais un tableau de bord standard sans identité. Référence historique : vert forêt, ivoire, champagne, photos naturelles, typographie élégante, cartes formations généreuses, animations discrètes ; **les tokens exacts sont proposés dans `design/tokens.css`, à faire valider contre l'identité existante**.

## Système visuel

Définir 4 échelles : display éditoriale, titres fonctionnels, corps lisible, légendes. Contraste WCAG AA. Variables CSS sémantiques, états hover/focus/invalid, spacing 4px, 8–12 px de rayons selon composants, grille fluide, 360/768/1024/1440. Photographies vérifiées : consentement portraits, licences fichiers, métadonnées et alt.

## Écrans maîtres

Accueil public ; catalogue ; fiche formation ; formulaire de candidature multistep ; tableau apprenant ; cours/quiz ; tableau formateur ; cockpit président ; carte annuaire + résultats ; fiche professionnel ; communauté ; support. Tous doivent disposer des états chargement/vide/erreur/autorisations et d'une déclinaison mobile.

## Motion

Transitions de navigation et des cartes discrètes, durée courte, aucun scroll-jacking, pas de vidéo hero lourde sur mobile, `prefers-reduced-motion` respecté. La 3D ne doit pas constituer un prérequis fonctionnel.

## Process de validation

Captures Playwright véritables sur les trois largeurs, inspection humaine, contraste, tabulation, titres, vitesse, absence de faux avis/chiffres ; chaque screenshot associé à commit et route. La démo HTML historique est une **référence de scénarisation**, pas un asset de production à coller dans le dépôt.



---

## 06_ROLES_RBAC.md — Rôles, permissions, séparation et approbations

## Rôles attendus

`public`, `prospect`, `candidate`, `learner`, `alumni`, `external_professional`, `trainer`, `office_admin`, `president`, `moderator`, `support`, `technical_operator`. Multiples rôles autorisés explicitement. Un rôle ne confère jamais accès aux données médicales d'autres personnes.

## Propriétés de politique

- `subject_id`, `role`, `organization_id`, `object_owner_id`, `session_id`, `action`, `classification`, `purpose` ; la politique doit être évaluée **côté serveur** et, si Supabase utilisé, complétée par RLS.
- `trainer` : uniquement sessions affectées et documents nécessaires à l'enseignement, sans privilèges financiers globaux.
- `president` : vision synthétique et décisions selon délégation, pas les secrets infra.
- `external_professional` : uniquement son profil, sa messagerie et son usage communautaire autorisé ; zéro accès aux candidatures.
- `office_admin` : candidatures, sessions, documents et flux autorisés, avec journal ; gestion du rôle superadmin séparée.
- `moderator` : modération annuaire/forum, pas lecture des dossiers administratifs.
- `technical_operator` : maintenance technique sans accès permanent aux documents personnels, délégation temporaire journalisée.

**Tests négatifs indispensables :** candidat A ne lit pas B ; un formateur d'une session ne voit pas une autre ; un externe ne voit pas des évaluations ; IDOR et mass-assignment rejetés ; document privé signé expire ; rôle modifié sans privilège échoue ; admin non autorisé ne peut accéder secrets/productions.



---

## 07_DONNEES_ET_OWNERSHIP.md — Entités, sources de vérité et invariants

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



---

## 08_MACHINE_ET_EVENEMENTS.md — Machines d’état, événements et intégration fiable

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



---

## 09_ARCHITECTURE_CIBLE.md — Architecture intégrée, coexistence et ADR obligatoire

## Ligne directrice

**Monoproduit Renaissance / mono-organisme**, avec interfaces cohérentes, SSO ou fédération lorsque sécurisés, permissions RBAC/ABAC et systèmes de gestion métier spécialisés. Ne pas rajouter un énième CRM/ERP sous prétexte de personnalisation. Les utilisateurs n'ont pas à se connecter successivement à plusieurs panneaux sans justification.

**Architecture logique cible :** front Renaissance (réutiliser React/Vite/Next.js existant après vérification) → backend/app gateway Renaissance (identités, droits, sessions, annuaire, support) → adaptateurs Frappe CRM / ERPNext / LMS / forum / n8n → outbox+logs → suivi qualité. Les outils métiers restent sous leurs responsabilités respectives, avec identifiants corrélés.

**Choix non figés :** backend Supabase existant vs Frappe custom ; site unique ou sites Frappe isolés ; Frappe Learning vs LMS Front vs Chamilo. Ces choix exigent POC, inventaire et ADR, non un reset préalable.

**Recommandation conditionnelle** : en présence de Frappe CRM et ERPNext déjà installés, explorer Frappe Learning d'abord pour minimiser les protocoles et doubles identités. Vérifier les limites fonctionnelles et licences. Le front Renaissance peut conserver son stack existant et consommer des APIs sécurisées : ne pas exiger une migration globale du front.

**Production :** GitHub PR et CI, preview protégée, staging isolé, domaines/TLS, secrets gérés en dehors du repo, journaux et alertes, sauvegarde vérifiée, rollback et RPO/RTO fixés par exploitation.

**Garantie non supposée :** une compatibilité API affichée ou une possibilité de SSO ne prouve ni raccordement effectif ni synchronisation correcte. Les contrats JSON sont des interfaces à valider. N'expose aucun service Frappe/n8n publiquement pour contourner une protection.



---

## 10_FRAPPE_CRM.md — Frappe CRM — acquisition et pipeline

**Statut :** instance déclarée installée, non diagnostiquée depuis le présent dossier.

## Domaine

Leads, contacts, organisations, opportunités, interactions, provenance, étapes du pipeline, relances, conversion de campagne. Éviter d'y stocker tous les documents pédagogiques personnels. Candidature détaillée sous la responsabilité du domaine Renaissance ; CRM conserve des identifiants de référence et les attributs strictement nécessaires.

## Interface de raccordement

`createLead`, `upsertContact`, `linkApplication`, `moveOpportunity`, `logInteraction`, `getOpportunityStatus`; test APIs REST autorisées et permissions par compte de service dédié ; champs à mapper dans un ADR. Utiliser les capacités natives d'intégration ERPNext si la configuration réelle le permet.

## Scénarios de robustesse

Doublon formulaire → 1 lead logique ; CRM indisponible → candidature conservée + événement en attente ; refus marketing → aucun email de prospection ; changement de données personnelles → synchronisation contrôlée ; prospect externe annuaire → pas automatiquement une opportunité commerciale sans fondement.

Ne pas remplacer le CRM par des tableaux fictifs dans le front. Ne pas dupliquer les identités sans stratégie de rapprochement.



---

## 11_ERPNEXT.md — ERPNext — devis, comptabilité, facturation, gestion

**Statut :** ERPNext déclaré installé ; versions, sociétés, catégories comptables, règles TVA et modules actifs à vérifier.

## Responsabilités candidates

Création de clients et devis, devis approuvés, commandes, factures, règlements, remboursements, suivi financier des formations, projets et coûts lorsque modules en place. Abonnements uniquement si la version et les paramètres nécessaires couvrent le besoin réel. Le parcours doit rester juridiquement conforme aux conditions Renaissance et à son régime fiscal.

## Interface et flux

`OpportunityConverted → ERPNext Customer/Quotation → Confirmation métier → Invoice/Payment → Enrollment`, ordre exact à valider. ERPNext doit détenir la facture canonique si sélectionné ; un reçu front-end n'est pas une facture officielle. Tester webhooks/paiements sandbox avant facturation réelle.

## Risques

Double facture sur webhook répété, mauvaise société/tenant, taux TVA erroné, suppression d'un règlement comptabilisé, retour paiement tardif, sync CRM/ERP en boucle, doublon de client. Interdire les écritures directes aux tables ERP sans API et contrôle d'autorisation.

Si le module financier existant fonctionne déjà, **le réutiliser avant toute autre intégration de facturation**.



---

## 12_LMS_DECISION.md — LMS : décision de réemploi fondée sur des preuves

## Candidats documentés

1. **Frappe Learning** (`frappe/lms`) : priorité d'évaluation en raison du socle Frappe déclaré présent ; les docs officielles décrivent cours, quiz, devoirs, groupes/batches et certificats. Ce n'est pas la preuve que les modules de présence/administratif français seront natifs.
2. **LMS Front** (`guillermoscript/lms-front`) : socle Next.js/Supabase dans le cahier initial. Auditer licence, maturité, permissions, compatibilité et dette avant reprise.
3. **Chamilo 3 / autres LMS** : comparateurs si lacunes prouvées. La licence et l'intégration doivent être vérifiées sur la version envisagée.
4. **LearnHouse** : option technique étudiée dans le cahier V1, non retenue d'emblée.

## Matrice de décision obligatoire

Comparer avec poids : fonctions cours / quiz / devoirs / documents (20), classes/groupes/sessions (15), droits formateurs et apprenants (12), preuves/attestations françaises (10), API/SSO et interop CRM/ERP (15), maintenance / CI / tests (10), coûts et licence (8), UX premium et personnalisation (10). La notation doit être argumentée sur une preuve de version. Aucune note arbitraire.

## POC minimal

Un cursus de démonstration avec 2 modules, 1 quiz, 2 apprenants, 1 formateur, progression, export de résultat, refus d'accès croisé, retour au compte Renaissance. Mesurer latence, coût d'exploitation, complexité SSO et effet des mises à jour.

**Décision via ADR** : choisir la solution seulement après POC ; ne pas importer des dépôts AGPL dans un produit fermé sans examen de l'architecture et des obligations applicables.



---

## 13_SESSIONS_PEDAGOGIE.md — Organisation de sessions et suivi de formation

Gestionnaire peut créer des sessions liées à une **version figée du programme** et configurer nombre minimum/maximum d'inscrits (référence 2–10), dates, créneaux, lieux, modalités, formateurs, liste d'attente et prérequis. Les disponibilités affichées proviennent d'un compteur transactionnel, pas d'une valeur hardcodée.

Présence : évènements horodatés, auteur, signature/émargement si cadre applicable, correction motivée, pièce associée si nécessaire, exports limités selon droit. Évaluations : tentatives versionnées, seuil défini par formation, historique conservé. Attestations : génération depuis les données réellement validées, possibilité de révocation, pas de « diplôme » automatiquement affirmé.

Les formateurs ne voient que leurs sessions et les apprenants associés. Le président voit les indicateurs agrégés nécessaires ; dossiers intimes et informations non pertinentes masqués. Au changement de session, préserver historique et notifications, gérer remboursements si conditions contractuelles.



---

## 14_ANNUAIRE_NATIONAL.md — Annuaire national gratuit pour professionnels externes et alumni

**Règle fondatrice :** inscription gratuite à l'annuaire sans obligation de formation. Réservé aux catégories métier autorisées (santé, aide à domicile, accueillants familiaux, accompagnement et connexes) ; les catégories réglementées nécessitent traitement spécifique de vérification.

## Parcours

Créer compte → profil → services/métiers → zone d'intervention → identité professionnelle → validation de visibilité → modération → fiche publique → mise à jour / retrait / signalement. Les profils non vérifiés restent décrits comme déclaratifs. Éviter de collecter des informations de patients ou données de santé de personnes accompagnées.

## Champs minimum

`profile_id`, `owner_id`, `display_name`, `category`, `description`, `city`, `postal_code`, `service_areas`, `contact_visibility`, `verification_state`, `publication_state`, `consent_version`, `updated_at`, `slug`, `moderation_history`. Coordonnées exactes privées si l'option « zone d'intervention » suffit.

## Recherche & SEO

Recherche texte + métier + zone, pagination et filtres accessibles ; distance uniquement si géolocalisation utile et consentie. Canonical individuel, sitemap fiches publiques valides, pages vides non indexées, contenu unique, pagination stable et contrôle abus/spam. Ne pas produire artificiellement des centaines de pages par ville sans professionnel réel.

## Gouvernance

Modération, suspension motivée, suppression sur demande, anti-usurpation, réclamation, recertification des qualifications déclarées lorsque nécessaire. Aucun prix ou statut professionnel « approuvé » inventé. Le statut formation Renaissance ne confère pas automatiquement une validation réglementaire.



---

## 15_COMMUNAUTE.md — Communauté et modération

Fonctions requises : profils, discussions, catégories, questions-réponses, publications, ressources, notifications, signalement, modération, règles de conduite, suspension et export des données nécessaires. Ouverte aux anciens apprenants et aux autres professionnels selon politique validée ; inscription annuaire et accès communauté ne doivent pas être automatiquement indissociables.

**Moteur candidat : Discourse** (API et SSO à évaluer). Comparer le coût de l'hébergement et du support, l'UX, la compatibilité des sessions, le thème et les licences. Ne pas redévelopper un forum entier sans motif vérifié. Les actions de modération doivent être traçables, les mails de notification maîtrisés, la protection contre les spams active.

Isolation : messages privés et contenus communautaires non visibles au CRM commercial ; anonymisation/modération et droit à l'effacement à concilier avec obligations de conservation et mentions sur le site.



---

## 16_POST_FORMATION.md — Compte durable et parcours post-formation

Le statut `alumni` n'est pas un nouveau compte : prolonger les autorisations du compte existant selon contrat, consentement et règles de conservation. L'ancien apprenant retrouve ses justificatifs, ses ressources encore accessibles, ses échanges autorisés, les invitations à la communauté et le formulaire de création de fiche annuaire.

**Ne jamais publier automatiquement** une ancienne fiche candidat dans l'annuaire public. La création de profil professionnel requiert une décision de la personne, des informations supplémentaires pertinentes, validation de visibilité et modération. Le refus de l'annuaire n'empêche pas l'accès légitime à ses attestations.

Le parcours d'accompagnement à la présence numérique se matérialise par un ticket de support Renaissance, qualifié puis transmis vers POLIVIA avec consentement adapté. L'ancien apprenant ne doit pas visualiser les données commerciales de POLIVIA.



---

## 17_POLIVIA_PARTENARIAT.md — Circuit support Renaissance → POLIVIA et partenariats

**Invariant absolu :** pas de lien direct « demande site » qui contourne le support. Les demandes de site internet passent par une demande Renaissance enregistrée, une qualification et une transmission autorisée vers POLIVIA.

1. Le demandeur décrit son besoin dans l'espace Renaissance.
2. Le support examine dossier et informations nécessaires.
3. La personne est informée du transfert et l'autorise lorsque requis.
4. Un événement idempotent minimal part vers le canal POLIVIA prévu ; aucune donnée pédagogique détaillée transmise.
5. Le support conserve un statut limité `received/qualified/transferred/acknowledged/closed`, pas l'historique commercial complet.

**Kit historique à 500 € par stagiaire** dans les anciens supports commerciaux : proposition de partenariat séparée, à valider juridiquement et commercialement ; ne pas publier comme prix automatique ni déclencher commission. La séparation des contrats, données et factures est obligatoire.

Aucun accès direct d'un opérateur POLIVIA aux tableaux d'administration Renaissance sans délégation expresse.



---

## 18_N8N_AUTOMATIONS.md — Automatisations n8n : déclencheurs, consentements, erreurs

Réutiliser l'instance n8n existante seulement après vérification de l'environnement et des droits, via API authentifiée ou workflows exportables testés en staging. Aucune désactivation d'authentification ni exposition publique nouvelle.

**Événements possibles :** formulaire d'information, dossier soumis, documents manquants, décision candidature, convocation session, rappel, émargement, évaluation, fin de formation, attestation prête, invitation annuaire, modération, entrée communauté, ticket support, transfert POLIVIA, anomalie paiement, KPI et incident.

Chaque automatisation spécifie déclencheur, propriétaire, source de vérité, droits, variables, déclenchement transactionnel/outbox, idempotence, retries bornés, DLQ, messages et canal, preuve de réception, monitoring, test de double déclenchement et comportement de sécurité. Les paiements et droits de rôles sont appliqués au backend canonique, pas au simple niveau n8n.

Voir `automations/WORKFLOW_CATALOG.json`. Les définitions sont un **catalogue de conception**, pas des exports n8n activés.



---

## 19_DOCUMENTS_ATTESTATIONS.md — Documents, signatures et traçabilité

Documents envisagés : dossier candidature, programme versionné, convocation, devis/convention/contrat validé, liste présence et émargement, quiz/évaluation, attestation, consentements, réclamation, bilan de session, export de preuve. Modèles validés par le client et ses conseils avant mise en service ; numérotation et datation traçables.

`pdfme` peut être évalué pour PDF ; `Documenso` pour signature via API/instance appropriée ; OPAGA comme référentiel de fonctionnalités de gestion qualité, sans présumer de droit de copie. Vérifier les licences, l'identité du signataire et le caractère probatoire requis.

Stockage privé chiffré et accès signé à durée limitée, versionning, rétention par type, suppression légale contrôlée, provenance `course_version + session + actor + timestamp`. Ne pas utiliser le simple succès de génération PDF comme preuve de validité juridique.



---

## 20_SUPPORT_ET_SUIVI.md — Support, demandes et pilotage des livrables

Les demandes internes et externes possèdent un identifiant, un demandeur, une catégorie, une priorité, un responsable, un historique, un SLA seulement si contractuellement validé, des pièces sous autorisations, un statut et un canal de réponse. Tickets : candidatures, comptes, paiements, formation, annuaire, communauté, demandes de sites, réclamations qualité.

Le dashboard de livraison Renaissance comporte : modules vérifiés, travaux restants, décisions, blocages, preuves, versions, liens de PR, rapports QA, incidents, sauvegardes, changements déployés et prochain gate. Présenter `confirmed / implemented / tested / blocked / unknown` sans transformer « dans le backlog » en « actif ».

Inclure modèles de relance, compte rendu, demande d'arbitrage et rapport d'incident. Le président doit voir les indicateurs de pilotage, pas des secrets techniques.



---

## 21_SECURITE.md — Sécurité, menaces et durcissement

Menaces prioritaires : fuite de dossiers via IDOR/RLS, escalade de rôle, documents pédagogiques publics, faux webhook paiement, usurpation de professionnel, injection via contenus saisis, exfiltration de secrets via logs/n8n, contournement support POLIVIA, compte opérateur partagé, accès direct au VPS, SSRF lors de téléchargement de médias.

**Contrôles :** sessions HTTP-only/CSRF si pertinent, MFA admins, RBAC évalué serveur, deny-by-default, authentification du compte de service, secrets hors dépôt, validation Zod serveur, rate limiting, scanner uploads, CSP adaptée, Webhook signature+idempotence, audits des droits sur chaque API, journaux horodatés immuables ou altération détectable, stockage privé et encryption, sauvegardes testées.

**Tests négatifs :** user A vs B, participant hors session, formateur d'une autre formation, professionnel externe vs dossier, support vs facture, superuser non accordé, doubles webhooks, upload malveillant, secret dans logs, API sans tenant. Une revue indépendante est requise sur les migrations de permissions.

Les modifications de production, secrets, IAM, déploiements publics et migration destructive nécessitent un accord humain distinct.



---

## 22_RGPD.md — RGPD et confidentialité opérationnelle

Définir responsable de traitement Renaissance, prestataires/sous-traitants, finalités séparées (formation, contrat, facturation, annuaire public, communauté, prospection), bases légales, durées de conservation, registre de traitements, notices, sous-traitants, transferts éventuels, droits et DPIA si nécessaire.

**Minimisation :** ne collecter que données nécessaires au parcours ; ne pas stocker de données de santé de patients ; coordonnées personnelles des professionnels rendues publiques seulement si choix explicite et légalement approprié. Les données pédagogiques restent privées. Consentement marketing distinct de service transactionnel. Preuve d'opt-out et rétractation traçables.

**Exigences techniques :** export de données, rectification, demandes d'effacement, règles d'archivage différenciées, preuve de réponse, suppressions chez les destinataires autorisés, gestion des incidents. RGPD ne se certifie pas par un simple plugin ou une case à cocher.

Relecture juridique avant publication des mentions, CGV, contrats et politiques.



---

## 23_QUALITE_FORMATION.md — Qualiopi, traçabilité pédagogique et limites

Le cahier de charges initial évoque le référentiel national qualité et Qualiopi, mais **aucun statut de certification n'est prouvé dans ce pack**. Le produit doit permettre d'enregistrer et exporter les preuves utiles aux indicateurs réellement applicables à Renaissance, sans prétendre qu'une fonctionnalité technique confère une certification.

Référentiel métier possible : information aux bénéficiaires, analyse du besoin, adaptation des modalités, mobilisation des moyens, qualification formateurs, veille pédagogique, recueil des appréciations, suivi des réclamations et amélioration continue. La matrice juridique, les indicateurs exacts et les procédures sont à valider par l'organisme et son auditeur/conseil.

Associer chaque preuve à date, auteur, session, formation/version, type de preuve et durée de conservation. Prévoir historique des corrections, exports et contrôles d'exhaustivité. Ne jamais inventer taux de satisfaction, réussite, certification ou numéro de déclaration d'activité.



---

## 24_SEO_VISIBILITE.md — SEO national/local, contenus et annuaire

**Territoires prioritaires historiquement cités :** Yonne, Joigny, Sens, Auxerre. Ne pas inventer de locaux ni de prestataires ; pages locales uniquement si une information utile réelle justifie leur création. L'annuaire est, lui, de portée nationale.

Architecture : accueil, catalogue, pages formations versionnées, sessions publiques, parcours métier, informations pratiques, blog, annuaire catégories/métiers/zones, profils publics, FAQ, contact et pages légales. Canoniques, robots, sitemap, 301, navigation accessible, liens contextuels, fil d'Ariane, métadonnées uniques, liens retours formations, non-indexation des profils privés et dossiers.

Données structurées : Organization, Course, Event selon dates réelles, BreadcrumbList, FAQ quand contenu et règles d'éligibilité applicables, ProfilePage si adaptée. Pas d'auto-publication de pages « SEO programme » factices.

Indexabilité ≠ exploration ≠ indexation ≠ classement. Mesurer Search Console après publication ; publier un plan de maillage avec preuve de pages orphelines nulles sur routes indexables.



---

## 25_PAIEMENTS.md — Paiement, devis et facturation : règles strictes

Les prix historiques 700/1490/890/800 € ne sont pas une grille validée de vente. Avant intégration paiement, valider prix, TVA, CGV, modalités d'acompte, remboursement, annulation, financements et rôle d'ERPNext comme registre de facturation.

Les paiements passent par un fournisseur contracté à définir ou existant, pas une clé Stripe inventée. Webhooks vérifiés cryptographiquement, événements idempotents, relectures asynchrones, rattachement au montant en vigueur et devise, aucune double inscription/facture. Voir enregistrement `PaymentReference` et mapping ERPNext à construire après inspection.

Scénarios : succès, échec, remboursement, paiement tardif, annulation session, webhooks dans le désordre, double livraison, callback falsifié et montant incohérent. La fermeture d'une session ne doit pas masquer un litige financier.



---

## 26_PERFORMANCE_ACCESSIBILITE.md — Performance, responsive et accessibilité

Cibles Core Web Vitals à mesurer : LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 au p75 en conditions de trafic réel, non promesses basées uniquement sur Lighthouse local. WCAG 2.2 AA comme exigence de conception ; audits automatiques + vérification humaine.

Vérifier 360, 390, 768, 1024, 1440 px ; tests iOS/Android Safari/Chrome. Formulaires de candidature : labels, erreurs vocalisables, accès clavier, sauvegarde de brouillon, confirmation claire et récapitulatif. Vidéos : sous-titres/transcriptions ; lecteurs accessibles. Animations réduites et absence de dépendance à la motion.

Médias optimisés AVIF/WebP, fonts subset, cache contrôlé, lazy loading, skeleton utile, pages publiques rapides ; dashboard n'a pas droit au ralentissement d'une landing marketing sur mobile.



---

## 27_QA_GATE.md — Quality Gates et politique de preuves

Voir `quality/QA_MATRIX.csv` pour la matrice détaillée de contrôles et leurs sévérités, `quality/RECETTE_E2E.md` pour la recette fonctionnelle.

**Gates :** G0 inventaire/provenance → G1 contrats/source de vérité → G2 permissions/RGPD → G3 couverture métier → G4 QA tech/SEO/a11y/design → G5 scénario E2E complet → G6 sauvegarde/restauration → G7 approbation avant publication. Un FAIL bloquant interdit toute publication. `NOT_RUN` n'est jamais `PASS`; une dérogation doit être datée, motivée, révocable et approuvée.

Preuves par contrôle : test et commande, commit, environnement, captures, logs anonymisés, date, opérateur/reviewer indépendant, verdict. Séparer `demo`, `isolated`, `staging`, `production` ; aucune preuve simulée ne valide un gate de production.

Les outils types : tests TS/SQL/Playwright, contrôle de rôles et APIs, stress dernière place, webhooks répétés, Lighthouse, axe, scénarios manuels et restauration en staging. Décrire les résultats réellement exécutés, jamais une validation hypothétique.



---

## 28_COCKPIT.md — Cockpit président / admin et pilotage opérationnel

Le président consulte KPI stratégiques (candidats, inscriptions, remplissage, résultats évalués, progression, recettes disponibles, incidents, satisfaction mesurée) et décisions à prendre. Les lignes chiffrées doivent provenir de véritables requêtes et sources datées ; une maquette affiche `DEMO`.

L'administration voit sessions, candidats, documents, formateurs, relances, présence, états ERP/CRM, modération, support, qualité et exports. Chaque vue dispose de filtres/states `CONFIRMÉ`, `TESTÉ`, `EN_COURS`, `BLOQUÉ`, `À_VÉRIFIER`. Le cockpit de **livraison technique** visualise PR, artefacts, QA, gate, décision, incident et rollback, sans accès aux secrets.

Prévoir journal d'activité append-only, rapports exports, modèles de relances/CR/décisions. Le design doit être premium, compatible mobile, sans nombres simulés déclarés comme réalité.



---

## 29_PLAN_EXECUTION.md — Plan d’exécution : 18 lots, une recette finale intégrale

## Politique

Les lots W00–W17 sont des unités **internes** de développement. La livraison finale requise comprend formations + LMS + CRM/ERP + annuaire national gratuit + communauté + post-formation + support POLIVIA + sécurité/recette. L'ordre dépend de l'existant réel et des dépendances, non d'une chronologie arbitraire.

**Ordre recommandé :** W00/W01 reprise/inventaire → W02 identity & RBAC, W03 data ownership → W04 design & site public et W05 catalogue en parallèle → W06 candidatures/sessions → W07 LMS → W08 administration/docs → W09 CRM/ERP → W10 annuaire → W11 communauté → W12 post-formation → W13 support POLIVIA → W14 n8n → W15 cockpit/observabilité → W16 sécurité/recette → W17 lancement autorisé.

Ce séquencement n'interdit pas des branches indépendantes parallèles après contrôle des accès et isolation fichiers. Limiter les agents actifs pour préserver le quota Ultra et éviter les conflits Git.

**Mesure du progrès :** jalon « terminé » uniquement si implémentation réelle, persistance, permissions, tests, preuves et reviewer. La priorité immédiate consiste à achever le parcours vertical de candidature et formation puis l'annuaire gratuit ; ne pas consacrer tout l'effort à la landing si elle est déjà prête.

Voir `workorders/WORK_PACKAGES.json` pour livrables et dépendances.



---

## 30_EXPLOITATION.md — Exploitation, mise en service et rollback

Environnements dev/staging/production séparés, comptes techniques dédiés, logs sans PII, détection de panne et alertes, surveillance du backlog n8n, incidents, versioning des modèles et contenu. Chaque migration DB comporte dry-run, snapshot et plan de retour arrière praticable. Sauvegarde journalière ne suffit pas sans restauration testée ; fixer RPO/RTO avec exploitant.

Runbooks : incident candidature, paiement, LMS, emails, annuaire usurpation, réclamation, données personnelles, perte d'accès, saturation d'une session, panne ERP/CRM. Dégradations : la candidature doit pouvoir se sauvegarder si CRM indisponible, mais jamais prétendre qu'un paiement a réussi. Déploiement gated par approbation humaine pour production et communication réelle aux apprenants.



---

## 31_FINOPS.md — Économie, coûts et indicateurs

Coûts à suivre séparément : hébergement site/CDN, base/données/backups, ERP/CRM auto-hébergés, LMS, stockage/vidéo, email transactionnel, SMS, paiement, n8n, monitoring, maintenance, intervention humaine, API IA éventuelles. Ne jamais utiliser un tarif ou un plafond de quota inventé.

Indicateurs : coût par candidature, coût par inscription, coût par session, temps administratif économisé, coût annuel par compte actif, tickets support, nombre de fiches annuaire et taux de modération, conversion site→demande. La commission/kit de site POLIVIA historiquement évoquée doit être gérée via convention distincte, pas comme revenu Renaissance par défaut.

Avant chaque nouveau service payant, proposer une alternative réutilisant l'existant, estimation de coûts et validation explicite.



---

## 32_OPEN_SOURCE_LICENCES.md — Registre open source, fournisseurs et licences

| Solution | Usage envisagé | Licence / vérification |
|---|---|---|
| Frappe CRM | CRM existant à raccorder | Vérifier version, licence et modules installés |
| ERPNext | Gestion existante à raccorder | Vérifier licence/version/site et addons |
| Frappe Learning | LMS prioritaire à évaluer | Vérifier licence version retenue, fonctionnalités, SSO |
| LMS Front | Option historique | Licence MIT selon cahier du 08/11 ; vérifier commit précis |
| Discourse | Communauté | GPLv2+ selon site officiel ; architecture séparée, notices |
| pdfme | PDF | MIT selon cahier initial ; version et dépendances à vérifier |
| Documenso | Signature optionnelle | Conditions AGPL/Enterprise selon distribution ; licence/usage à examiner |
| Chamilo | LMS alternatif | Version, licence et maturité à vérifier |
| n8n | Workflow existant | Vérifier les restrictions de licence pour offres commerciales/hébergement partagé |
| Vercel / Supabase | Infrastructure possible existante | Contrats, coûts, isolation et traitements à vérifier |

Conserver `THIRD_PARTY_NOTICES.md`, licence, commit d'origine, provenance des assets, entitlements cloud, provenance de code copié. Ne pas considérer un template commercial comme MIT sans lire son contrat. Les démos ne constituent pas des cessions de droits des illustrations intégrées.



---

## 33_SOURCES_ET_PREUVES.md — Sources historiques, liens externes et limites

## Documents présents dans le pack

1. `references/RENAISSANCE_Cahier_des_charges_technique_v1.md` — historique du 08/11/2026, source des routes initiales, exigences CRM/LMS/SEO/qualité et liste de composants ; remplacé partiellement par décisions postérieures, non supprimé.
2. `references/Villa_Renaissance_Plateforme_Complete_Interactive.html` — présentation interactive historique avec scénarios illustratifs ; ne constitue ni capture du site en production ni preuve de back-end.
3. `CHANGELOG_DECISIONS.md` — explicite les changements conservés dans les échanges de novembre 2026.

## Vérifications web du 20/11/2026

- https://docs.frappe.io/crm/erpnext — intégration CRM/ERPNext documentée ; attention, comportement de synchronisation conditionné par même site/séparation de sites.
- https://docs.frappe.io/learning/introduction — capacités générales Frappe Learning.
- https://docs.frappe.io/learning/setup-guide/your-first-steps-with-frappe-learning — cours, vidéos, quiz, devoirs, SCORM selon version.
- https://docs.frappe.io/erpnext/integrating-erpnext-with-other-applications — API Frappe/ERPNext et utilisateurs d'intégration.
- https://www.discourse.org/open-source — existence version open source et conditions de licence.

**Limites d'observation :** aucun accès vivant au dépôt Renaissance, à Vercel Renaissance, aux bases, aux logs, aux instances Frappe CRM/ERPNext, au LMS ni à n8n dans cet environnement. Le présent pack ne prétend pas les avoir audités. Tout résultat de benchmark et indicateur de conformité doit venir de l'exécution locale du développeur.



---

## 34_DECISIONS_A_FAIRE_VALIDER.md — Réserves du propriétaire et validations métier

- Dénomination officielle « Renaissance » ou « Villa Renaissance », marque, logo, domaine, coordonnées, mentions légales et responsables de traitement.
- Programmes, durées, modalités, dates, capacité exacte par session, identification des formateurs et preuves de qualifications.
- Prix 700 / 1490 / 890 / 800 historiques, TVA, financement, paiement et politique d'annulation.
- Statut Qualiopi/NDA et autres qualifications légalement publiables ; jamais supposer un statut.
- Choix du LMS (après POC), architecture système des inscriptions, SSO et responsabilités entre ERPNext/CRM/backend.
- Catégories professionnelles de l'annuaire et politique de vérification ; coordonnées affichables et procédure anti-usurpation.
- Politique d'ouverture de la communauté aux professionnels externes et code de conduite.
- Accord entre Renaissance et POLIVIA, transfert de leads et kit historiquement annoncé à 500 €.
- Durées de conservation, notices de consentement, textes contractuels et niveau d'accès président/admin.
- Budget des services, domaines, dépenses, autorisation production et procédures de maintenance.

Les décisions manquantes ne bloquent pas les modules sans risque : développer interfaces, états, modèles et tests de manière configurable sans publier de données non validées.



---

## 35_ADR_MODELE.md — Architecture Decision Records à rédiger par Claude

Les choix suivants doivent faire l'objet d'ADR ciblés avec contexte, alternatives, preuves, décision, risques, rollback et statut :

- ADR-001 : reprendre front existant React/Vite/Next.js, options de migration non destructive.
- ADR-002 : source de vérité candidature/session (Supabase existant vs Frappe custom vs autre).
- ADR-003 : Frappe Learning / LMS Front / Chamilo — couverture fonctionnelle et budget.
- ADR-004 : SSO et séparation de l'identité entre Renaissance, CRM, ERP et communauté.
- ADR-005 : annuaire national, moteur de recherche, modération et indexation.
- ADR-006 : comptabilité factures/financement et intégration paiement.
- ADR-007 : n8n/outbox/event bus et logique de reprise.
- ADR-008 : communauté Discourse ou autre et accès alumni/externes.
- ADR-009 : séparation des instances et données Renaissance/POLIVIA.
- ADR-010 : hosting, coûts, sauvegardes et déploiement preview.

**Règle :** ne transformer aucune alternative en choix définitif sans données d'inspection et preuve. Les ADR existants dans le dépôt prévalent s'ils sont approuvés et toujours compatibles avec le mandat.



---

## 36_ARBORESCENCE_ROUTING.md — Arborescence public et espace privé

## Public (routes proposées, adaptées au dépôt réel)

`/`, `/formations`, `/formations/[slug]`, `/sessions`, `/sessions/[id]`, `/financement`, `/notre-approche`, `/a-propos`, `/equipe`, `/qualite-accessibilite`, `/annuaire`, `/annuaire/metiers/[slug]`, `/annuaire/profil/[slug]`, `/communaute`, `/actualites`, `/actualites/[slug]`, `/contact`, `/faq`, `/mentions-legales`, `/confidentialite`, `/cookies`, `/cgv`, `/accessibilite`.

Zones SEO utiles justifiées : `/zones/yonne`, `/zones/joigny`, `/zones/auxerre`, `/zones/sens` si contenu vérifié et présence réelle.

## Auth et espaces

`/connexion`, `/inscription`, `/inscription/[sessionId]`, `/mon-espace`, `/campus`, `/campus/cours/[id]`, `/campus/attestations`, `/formateur`, `/formateur/sessions/[id]`, `/admin`, `/admin/candidatures`, `/admin/sessions`, `/admin/documents`, `/admin/annuaire`, `/admin/qualite`, `/president`, `/mon-annuaire`, `/communaute/compte`, `/support`, `/support/demandes-site`.

Sitemap exclut espaces privés. Fichiers upload jamais accessibles par lien public permanent ; `robots.txt` ne remplace pas auth.



---

## 37_AUTOMATION_TESTS.md — Tests de parcours et programmation des preuves

Les scénarios de `quality/TEST_CASES.json` sont exécutables conceptuellement : chaque cas précise préconditions, acteur, étapes, attendu et sévérité. Les jeux de fixtures sous `contracts/examples` sont entièrement fictifs et ne doivent jamais être synchronisés vers CRM/ERP réels.

Pour chaque module, écrire les tests du véritable stack choisi. Tests d'intégration réels en staging et tests mock isolés doivent être comptés séparément. Un test de webhook simulé ne valide pas le prestataire de paiement ou n8n réel. Environnements dev/staging séparés, aucune donnée personnelle réelle dans fixtures.



---

## 38_CONTACTS_CRM_QUALIF.md — Règles de qualification, contacts et communications

Candidature formation et lead commercial ne sont pas synonymes : le premier relève d'une finalité de gestion pédagogique, le second d'une relation prospect. Le CRM reçoit des attributs minimisés selon l'objectif. Une fiche annuaire gratuite ne devient jamais un prospect marketing par simple publication.

Notifications transactionnelles : candidature soumise, dossier incomplet, décision, convocation, documents disponibles, rappel de session, fin de formation. Messages de prospection et invitations non indispensables : base légale/consentement approprié, liste d'opposition et désabonnement.

Toujours identifier expéditeur autorisé, modèle versionné, dates réelles et journaux de délivrance. Les relances automatiques doivent être plafonnées et annulées lorsque l'état métier change.
