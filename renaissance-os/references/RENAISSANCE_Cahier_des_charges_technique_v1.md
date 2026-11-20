# RENAISSANCE — Cahier des charges fonctionnel et technique

**Version :** 1.0 — 8 novembre 2026  
**Destinataires :** maîtrise d'ouvrage Renaissance, POLIVIA, équipe Claude Code  
**Statut :** spécification cible ; sélection des dépôts sous réserve de tests locaux, contrôle de licences et validation métier.

## 0. Vision, périmètre, priorités

Créer une plateforme de formation française au positionnement visuel très haut de gamme, articulée autour de trois univers unifiés : site public commercial, campus apprenant/formateur, back-office organisme de formation. Déploiement GitHub + Vercel + Supabase ; architecture maintenable, accessible, SEO, RGPD et traçable. Renaissance n'est **pas** une plateforme multi-organismes à ce stade ; toute fonctionnalité multi-tenant héritée d'un LMS doit être neutralisée ou strictement configurée en mono-organisme.

P0 = indispensable avant première commercialisation ; P1 = deuxième livraison ; P2 = développement différé. **P0 ne signifie pas que la fonctionnalité existe déjà dans le dépôt.** La qualification `base` indique un socle à auditer, pas une promesse de copie immédiate.

**Catalogue initial à valider par le client :** Découverte AF PA/PH (700 €) ; Devenir AF PA/PH (tarif indicatif 1 490 € à confirmer) ; Animatrice PA (890 €) ; Dame de compagnie (800 €). Prévoir sessions de 2 à 10 stagiaires selon formation et modalités. Ne jamais publier des indicateurs de résultats non mesurés ni des garanties de financement non confirmées.

**Objectifs métiers :** acquisition locale Yonne (Joigny, Sens, Auxerre), conversion des prospects, fluidité d'inscription, animation de sessions, traçabilité des preuves, suivi qualité, réduction du traitement administratif.

## 1. Registre des projets sources et licences

| Code | Dépôt / produit | Licence / accès | Usage retenu | Réserve |
|---|---|---|---|---|
| L01 | https://github.com/guillermoscript/lms-front | MIT | Socle candidat Next.js 16 / Supabase, cours, inscriptions, évaluations, certificats, paiement | Petit projet communautaire ; auditer sécurité, maturité, modèle de données, i18n FR, modules non nécessaires |
| T01 | https://tailthemes.com/themes/seminar | Licence TailThemes autorisant projet client, **pas MIT** | Base visuelle Next.js 15–16 | Téléchargement et conformité licence/attributions à vérifier ; adapter identité entière |
| T02 | https://freeframe.dev/templates/academy | HTML gratuit MIT ; variantes payantes sous licence commerciale | Référence de structure catalogue, fiche, lecteur, dashboard | L'édition HTML est statique ; ne contient pas un LMS prêt à exploiter |
| P01 | https://github.com/pdfme/pdfme | MIT | Éditeur de modèles et générateur PDF | Documents à faire valider juridiquement par le client |
| F01 | https://github.com/Dapta-Tech/dapta-forms | MIT | Parcours de qualification et formulaires conditionnels | Architecture séparée Next.js/NestJS ; préférer porter la logique utile au système principal ou l'isoler en service |
| C01 | https://github.com/twentyhq/twenty | Cœur AGPL-3.0 ; exceptions MIT et Enterprise selon fichiers | CRM optionnel via API REST/GraphQL, pas import de l'application | Vérifier licences et permissions ; éviter double référentiel des contacts |
| S01 | https://github.com/documenso/documenso | Community AGPL-3.0 ; Enterprise commerciale | Signature via instance distincte ou offre API appropriée | Avis juridique sur AGPL, fonctionnalités et validité du flux de signature |
| Q01 | https://github.com/formbricks/formbricks | Cœur AGPL ; Enterprise pour certaines fonctions | Enquêtes, instance indépendante si retenue | Le projet indique ne pas offrir la marque blanche ; ne pas extraire l'éditeur pour Renaissance sans autorisation |
| A01 | https://opaga.fr/ | À confirmer selon distribution/version | Modèle fonctionnel pour gestion administrative Qualiopi | Pas de dépôt/licence réutilisable validé ; ne pas programmer de copie avant vérification |
| A02 | https://github.com/learnhouse/learnhouse | AGPL-3.0 | Alternative LMS/benchmark UX | Intégration directe non retenue |
| A03 | https://github.com/frappe/lms | AGPL-3.0-or-later | Alternative LMS/benchmark métier | Stack Frappe différente |
| A04 | https://github.com/farrukh-ali-khan/lms | MIT | Référence API rôles/formateurs | Projet de portfolio avec très peu d'adoption ; interdit d'en déduire une fiabilité production |

**Politique de réutilisation :** créer `THIRD_PARTY_NOTICES.md`, enregistrer commit exact, licence, fichiers modifiés, dépendances et attribution. Aucun composant sans licence claire. Les visuels, photographies, logos et textes tiers requièrent leurs propres droits.

## 2. Design system premium et exigence UX

- Positionnement : confiance, accompagnement humain, transmission, secteur sanitaire/social ; direction artistique éditoriale sobre, lumineuse et haut de gamme ; éviter les dashboards génériques trop chargés.
- Marque : logo Renaissance, palette officielle à confirmer, déclinaisons neutres sophistiquées, typographie de titre expressive et typographie de lecture accessible, iconographie cohérente ; tokens CSS documentés.
- Media : photographies professionnelles authentiques et sous licence, portraits d'intervenants autorisés, photos d'apprentissage et d'accompagnement sans clichés ; responsive AVIF/WebP, `sizes`, alt significatifs ; aucune photo distante instable en production.
- Composants communs : navigation sticky, méga-menu accessible, hero photo pleine largeur, cartes formation, comparatif, témoignages vérifiés, étapes pédagogiques, FAQ, formulaires, CTA sticky mobile, footer juridique, modales accessibles, skeleton, états d'erreur, notifications.
- Accessibilité : navigation clavier, focus visibles, tailles de cible suffisantes, contrastes WCAG AA, balisage sémantique, légendes/sous-titres des vidéos, pas d'information exclusivement colorimétrique.
- Performance : Core Web Vitals comme objectifs ; budgets LCP <= 2,5 s, INP <= 200 ms, CLS <= 0,1 au 75e percentile sur trafic réel ; éviter une vidéo lourde en hero mobile.
- Qualité : maquettes desktop/tablette/mobile ; captures comparatives Playwright ; design review humaine avant publication ; pas de stock photo contrefaite, de chiffres inventés ou de fausses certifications.

## 3. Arborescence page par page — site public

Toutes les URL sont indicatives et les slugs finaux seront stables, avec redirects 301 si besoin.

| Route | Page / contenu minimum | Source | Adaptation Claude Code | Priorité |
|---|---|---|---|---|
| `/` | Accueil : hero, mission, 4 formations, bénéfices, méthode, parcours inscription, preuves réelles, FAQ, CTA | T01, T02 | Rebrand complet, photographie, micro-interactions, SEO, CMS | P0 |
| `/formations` | Catalogue filtrable (public, prix, durée, format, dates) | T02, L01 | Connecter catalogue Supabase, filtres et indexation | P0 |
| `/formations/[slug]` | Programme complet, prérequis, objectifs, durée, modalités, prix, accessibilité, délais, évaluations, prochaine session, CTA, FAQ | L01, T01 | Modèle de contenu réglementaire, schema.org Course, données sessions | P0 |
| `/formations/decouverte-af-pa-ph` | Fiche Découverte | L01 | Programme et ressources client à intégrer | P0 |
| `/formations/devenir-af-pa-ph` | Fiche Devenir AF | L01 | Confirmer prix et périmètre de l'éventuel site inclus | P0 |
| `/formations/animatrice-pa` | Fiche Animatrice | L01 | Contenus et modalités | P0 |
| `/formations/dame-de-compagnie` | Fiche Dame de compagnie | L01 | Contenus et modalités | P0 |
| `/sessions` | Calendrier ouvert, places indicatives et disponibilités cohérentes | L01 | Gestion de capacité et publication | P0 |
| `/sessions/[id]` | Détail d'une session, lieu/mode, horaires, places, inscription | L01 | Liaison `sessions`, règles capacité, liste d'attente | P0 |
| `/inscription/[sessionId]` | Formulaire multistep, analyse du besoin, consentements, pièces pertinentes | F01 | Form wizard natif, validation Zod, stockage, reprise sécurisée | P0 |
| `/inscription/suivi/[id]` | Étape et statut de dossier, actions encore requises | Développement natif | Tokens d'accès et authentification | P1 |
| `/financement` | Modalités générales, options réelles, demande de conseil | T01 | Édition CMS, aucune promesse automatique | P0 |
| `/notre-approche` | Méthodologie, suivi et accompagnement | T01 | Page éditoriale premium | P0 |
| `/equipe` | Présentation formateurs, qualifications vérifiées | T01/T02 | Données CMS, portraits consentis | P0 |
| `/a-propos` | Histoire, équipe, mission, engagements | T01 | Copywriting, photos | P0 |
| `/qualite-accessibilite` | Information handicap, contact référent, engagement qualité, réclamations | Développement natif | Formulaires et procédures | P0 |
| `/resultats` | Indicateurs datés et méthodologie **uniquement si données réelles** | Développement natif | Agrégats validés et règles d'affichage | P1 |
| `/temoignages` | Avis vérifiés avec autorisations et modération | T01 | Validation et conservation preuves | P1 |
| `/actualites` | Blog, catégories, maillage interne | T01 | CMS, SSR/ISR, sitemap | P1 |
| `/actualites/[slug]` | Article riche, auteur, date, sources, CTA | T01 | SEO, structured data et contenus | P1 |
| `/zones/yonne` | Page territoriale Yonne avec proposition utile réelle | T01 | Rédaction locale sans duplication | P0 |
| `/zones/joigny` | Page locale Joigny | T01 | Contenu original et informations justifiées | P0 |
| `/zones/auxerre` | Page locale Auxerre | T01 | Contenu original, pas de fausse implantation | P0 |
| `/zones/sens` | Page locale Sens | T01 | Contenu original, pas de fausse implantation | P0 |
| `/contact` | Contact, rappel, demande devis | F01 | Anti-spam, CRM, accusé de réception | P0 |
| `/faq` | Questions par cible et par formation | T01 | CMS et FAQ opérationnelle | P0 |
| `/mentions-legales`, `/confidentialite`, `/cookies`, `/cgv`, `/accessibilite` | Informations légales et contractuelles | Développement natif | Validation juridique, CMP si nécessaire | P0 |
| `/connexion`, `/mot-de-passe-oublie` | Auth et restauration | L01/Supabase Auth | Francisation, emails personnalisés et protections | P0 |
| `/404`, `/500` | Pages d'erreur haut de gamme | T01 | Accessibilité et retour au parcours | P0 |

**Règles éditoriales :** séparer formation et lieu. Les pages Joigny/Sens/Auxerre doivent répondre à une intention locale réelle et ne doivent pas affirmer l'existence de sessions ou de locaux inexistants. Produire `robots.txt`, `sitemap.xml`, canonicals, Open Graph, JSON-LD `Organization`, `Course`, `CourseInstance` lorsque pertinent. Les coordonnées, numéro de déclaration d'activité, certification et modalités de financement viennent de sources client validées.

## 4. Arborescence — espace stagiaire

| Route | Capacité et règle métier | Source | Travail spécifique | Priorité |
|---|---|---|---|---|
| `/campus` | Tableau de bord personnel, cours/session, progression et actions | L01 | UI Renaissance, filtrage RLS | P0 |
| `/campus/mes-formations` | Formations autorisées et historique | L01 | Liaison inscriptions/session | P0 |
| `/campus/formations/[id]` | Vue programme, modules, ressources, jalons | L01 | Francisation + parcours adaptés présentiel/distanciel | P0 |
| `/campus/lecons/[id]` | Lecteur vidéo, PDF, progression, sous-titres | L01, T02 (référence UI) | Gestion autorisations et médias | P0 |
| `/campus/evaluations/[id]` | Positionnement, exercices, quiz, examens | L01 | Barèmes, versions, dates et traces | P0 |
| `/campus/calendrier` | Séances, horaires, lieux, liens visio | L01 | Calendrier de sessions et rappels | P0 |
| `/campus/documents` | Convocations, contrats, attestations et téléchargement contrôlé | P01 | Génération PDF et accès privé | P0 |
| `/campus/emargement` | Présences, attestations de participation ; signature si retenue | S01 (service) | Modèle preuve horodatée et modalités validées | P1 |
| `/campus/messages` | Messagerie encadrée stagiaire/formateur | L01 ou natif | Notifications, modération, archivage | P1 |
| `/campus/satisfaction` | Évaluations à chaud / à froid | Q01 ou formulaires natifs | Formulaires, consentement et historisation | P0 (simple) / P2 (outil avancé) |
| `/campus/profil` | Informations, préférences, droits RGPD | Supabase Auth | Contrôle d'identité, exports et demandes | P0 |
| `/campus/certificats` | Attestations de formation, preuve de réalisation selon cas | L01, P01 | Vocabulaire exact : ne pas promettre de certification professionnelle sans habilitation | P1 |

## 5. Arborescence — espace formateur

| Route | Fonction | Source | Développement requis | Priorité |
|---|---|---|---|---|
| `/formateur` | Dashboard sessions, tâches, stagiaires | L01 / A04 pour modèle | Interface métier dédiée | P0 |
| `/formateur/sessions` | Planning et feuilles de session | L01 | Lien horaires/salles/formateur | P0 |
| `/formateur/sessions/[id]/participants` | Participants autorisés, adaptations nécessaires suivant confidentialité | Natif | Permissions strictes et minimisation | P0 |
| `/formateur/cours` | Contenus, ressources, versionnage et publication | L01 | Brouillon, contrôle éditorial | P0 |
| `/formateur/evaluations` | Évaluations, notation, feedback | L01 | Grille pédagogique, historique | P0 |
| `/formateur/presences` | Déclaration et validation des présences | Natif/S01 | Contrôles cohérence, audit trail | P0 |
| `/formateur/documents` | Supports, PV et attestations | P01 | Templates et accès | P1 |
| `/formateur/satisfaction` | Retour intervenant et incidents | Formulaires natifs | Circuit qualité | P1 |

## 6. Arborescence — administration / back-office

| Route | Fonction | Source | Adaptation / règles | Priorité |
|---|---|---|---|---|
| `/admin` | KPI utiles : demandes, inscriptions, sessions, CA, tâches | L01/natif | Calculs contrôlés | P0 |
| `/admin/prospects` | Pipeline prospect → qualification → inscription | C01 optionnel / natif | Supabase source de vérité ; CRM synchronisé si utile | P0 |
| `/admin/contacts` | Personnes, entreprises, financeurs | C01 | Recherche, fusion et RGPD | P0 |
| `/admin/formations` | CRUD formations, programmes, prix, contenus, publication | L01 | Editorial FR, versionnage | P0 |
| `/admin/sessions` | Création, capacité 2–10, planning, formateur, lieu | L01 | Invariants capacité / conflits | P0 |
| `/admin/inscriptions` | Dossiers, statut, pièces, consentements, paiements | F01, L01 | Machine à états et workflow | P0 |
| `/admin/financements` | Financeur, devis, preuve de prise en charge | Natif | Workflows spécifiques à valider | P1 |
| `/admin/ventes` | Devis, factures, encaissements, remboursements | L01 + passerelle commerciale à définir | Webhooks et rapprochements ; obligations françaises à valider | P0 pour paiement simple / P1 pour facturation avancée |
| `/admin/documents` | Modèles PDF, documents générés, versions, destinataires | P01 | Bibliothèque et suivi | P0 |
| `/admin/signatures` | Envoi, relance, état, preuve de signature | S01 | API, mandat et identifiants | P1 |
| `/admin/presences` | Traçabilité, absences, justificatifs, émargements | Natif/S01 | Immutabilité logique et audit | P0 |
| `/admin/evaluations` | Positionnement, acquis, résultats et preuves | L01 | Grilles et indicateurs | P0 |
| `/admin/satisfaction` | Enquêtes et synthèses | Q01 / natif | Différencier questionnaire et traitement qualité | P0 simple / P2 avancé |
| `/admin/reclamations` | Ticket, traitement, échéance, résolution | Natif | Chronologie et notification | P0 |
| `/admin/qualiopi` | Dossier de preuves indexé par critères/indicateurs applicables | A01 comme benchmark | Cartographie et exports à construire | P0 minimum / P1 approfondi |
| `/admin/bpf` | Préparation des données BPF, exports contrôlés | A01 comme benchmark | Modèle métier et contrôles ; déclaration réglementaire hors périmètre automatique | P1 |
| `/admin/formateurs` | Profils, qualifications, justificatifs et veille | Natif | Confidentialité, dates d'expiration | P1 |
| `/admin/seo` | Pages, redirections, métadonnées, contenu | T01 + CMS | Recherche, preview, publication | P1 |
| `/admin/automatisations` | Emails, relances, tâches, erreurs | Natif / orchestrateur | Outbox + retries + logs | P1 |
| `/admin/parametres` | Établissement, branding, permissions, mentions | Natif | RBAC + journaux | P0 |
| `/admin/audit` | Journal actions sensibles, exports et corrections | Natif | Événements horodatés non altérables par utilisateurs ordinaires | P0 |

## 7. Fonctions transverses et spécifications métier

### 7.1 Processus d'inscription

1. Prospect découvre une formation et une session ; visite avec UTM/source conservées avec information adéquate.
2. Formulaire d'intérêt ou dossier de candidature ; validation serveur Zod, anti-spam et consentements distincts.
3. Évaluation des besoins et des prérequis ; possibilité d'aménagement et de contact référent handicap sans collecte excessive.
4. Traitement administratif (`draft → submitted → qualified → offered → awaiting_signature → awaiting_payment → confirmed → in_progress → completed`, avec `cancelled`, `refunded`, `waitlisted` séparés).
5. Réservation transactionnelle d'une place, évitant le surbooking sous concurrence.
6. Génération de documents adéquats, signature si requise, paiement / prise en charge, confirmation et convocation.
7. Accès campus uniquement sur droit effectif. Sessions et accès distincts d'une simple commande payée.
8. Présences, évaluations, enquêtes, clôture, attestations et archivage selon politique validée.

### 7.2 Moteur pédagogique

- `Course → CourseVersion → Module → Lesson → Assessment` ; une formation peut se dérouler sur plusieurs sessions ; une inscription pointe une version contractuelle immuable.
- Types leçons : texte enrichi, ressource, vidéo, document, activité, présentiel, classe virtuelle.
- Progression serveur : jalons, dates, activité attestée ; ne pas assimiler un clic à une présence réelle.
- Évaluations : version, nombre de tentatives, seuil, correcteur, commentaires et horodatage.
- Vidéos : URL signées ou fournisseur de streaming ; pas de bucket public pour supports protégés.

### 7.3 Documents et facturation

- `pdfme` pour gabarits PDF ; numérotation, données affichées, version du template et PDF final conservés.
- Modèles : devis, convention/contrat, convocation, programme détaillé, questionnaire préformation, feuille de présence, attestation et bilan individuel, satisfaction, réponses aux réclamations.
- Ne pas créer une facture fiscale « conforme » uniquement en exportant un PDF : les exigences de facturation électronique, d'archivage et de transmission doivent être définies avec l'outil/plateforme approprié et la situation de l'organisme.
- Paiement : Stripe Checkout (ou autre choix confirmé) ; jamais d'informations de carte dans Supabase ; webhooks signés et idempotents ; TVA et exonérations selon situation réelle, sans présumer de l'éligibilité.

### 7.4 Qualiopi

- Conserver les objectifs de formation, prérequis, publics, modalités, délais, indicateurs de résultats réellement disponibles, accompagnement, adaptations, compétences des intervenants, veille, retours et réclamations.
- Modèle `QualityCriterion/QualityIndicator/QualityEvidence/QualityAction` versionné pour suivre les évolutions du référentiel et l'applicabilité selon catégorie d'action.
- Pour chaque preuve : créateur, source, période, session, indicateur associé, pièce jointe, version, date et statut de validation.
- Export d'un dossier de preuves structuré pour revue humaine. **Le logiciel ne certifie pas la conformité Qualiopi et ne remplace ni procédures réelles ni audit.**
- Point réglementaire : vérifier auprès de la page officielle du ministère la version du guide applicable à la date de chaque audit ; les résultats web relatifs à novembre 2026 présentent des incohérences de chronologie qu'il ne faut pas reprendre sans contrôle.

### 7.5 RGPD / sécurité

- Auth Supabase, MFA obligatoire pour comptes administrateurs et fortement recommandé pour formateurs ; contrôles RBAC sur toutes les actions serveur et RLS sur tables exposées.
- Jamais de `service_role` dans navigateur ; stockage privé, URL signées à durée courte, séparation données publiques/internes, journalisation expurgée.
- Données sensibles liées à des aménagements : collecter uniquement le nécessaire, définir base légale et droits d'accès spécifiques ; éviter toute information médicale détaillée inutile.
- Définir registre de traitements, contrats sous-traitants, durées de conservation par typologie, purge/archivage, procédure demandes de droits, gestion incident, sauvegardes testées.
- Surveillance erreurs, quotas/rate-limit, CSP et en-têtes de sécurité, validation MIME/taille uploads, antivirus si nécessaire, scans dépendances/secrets, rotation des clés et revue RLS automatisée.

### 7.6 SEO et analytics

- Pages locales `/zones/yonne`, `/zones/joigny`, `/zones/sens`, `/zones/auxerre` avec contenu unique réellement utile et informations géographiques vérifiables ; pas de doorway pages.
- SEO technique : canonical, redirects, sitemap par type, robots, structured data, maillage formation/territoire/articles, recherche Google Search Console.
- Analytics : événements `view_course`, `start_application`, `submit_application`, `confirm_enrollment`, `payment_succeeded` avec respect des consentements applicables ; suivi conversion par source, sans données personnelles dans URLs analytics.

## 8. Architecture technique de référence

### 8.1 Monorepo

```text
renaissance/
  apps/
    web/                       # Next.js 16 App Router (site, campus, admin)
  packages/
    ui/                        # Design system Renaissance, tokens, composants
    domain/                    # Types métiers, Zod, états, policies
    database/                  # Types Supabase, requêtes, repositories
    documents/                 # pdfme templates et génération
    integrations/              # CRM, emails, paiement, signature
    config/                    # ESLint, TSConfig, Prettier
  supabase/
    migrations/                # SQL versionné, RLS, storage policies
    seed.sql                   # Données factices locales UNIQUEMENT
  docs/
    adr/                       # Architecture decision records
    specifications/
    legal/THIRD_PARTY_NOTICES.md
    runbooks/
  tests/
    e2e/
    security/
  .github/workflows/
  CLAUDE.md
  README.md
```

**Services distincts seulement si nécessaire :** Twenty (CRM), Documenso (signature), Formbricks (enquêtes). Éviter de déployer séparément toutes les applications en P0. Les adaptateurs communiquent par API et utilisent des identifiants de correspondance ; Supabase reste l'unique source de vérité des inscriptions, sessions et évaluations.

### 8.2 Structure de routes Next.js

```text
app/
  (marketing)/                 # '/', '/formations', '/zones', etc.
  (auth)/                      # /connexion, recuperation
  (student)/campus/
  (trainer)/formateur/
  (admin)/admin/
  api/
    payments/webhook/route.ts
    signatures/webhook/route.ts
    integrations/route.ts
```

### 8.3 PostgreSQL — entités de base

- `profiles` (id = auth.users.id, identité, statut), `roles`, `role_assignments` ; une même personne peut avoir plusieurs rôles.
- `organizations` (Renaissance comme organisme unique), `staff_profiles`, `trainer_qualifications`.
- `courses`, `course_versions`, `course_modules`, `lessons`, `assessments`, `assessment_questions`.
- `locations`, `sessions`, `session_schedules`, `session_trainers`, `session_capacity`.
- `contacts`, `leads`, `lead_activities`, `applications`, `application_status_events`, `enrollments`, `waitlist_entries`.
- `payments`, `payment_events`, `invoices`, `funding_requests`, `refunds`.
- `lesson_progress`, `assessment_attempts`, `attendance_events`, `learning_evidence`.
- `document_templates`, `generated_documents`, `document_signing_requests`, `document_versions`.
- `surveys`, `survey_responses`, `complaints`, `quality_indicators`, `quality_evidence`, `quality_actions`.
- `notifications`, `notification_outbox`, `integration_events`, `audit_events`, `privacy_requests`, `consent_events`.
- `cms_pages`, `cms_posts`, `seo_redirects`, `media_assets`.

**Invariants :** unicité inscription active `(session_id, learner_id)` ; pas de place confirmée au-delà de capacité ; autorisations en fonction de l'état et du rôle ; paiement traité exactement une fois logiquement via idempotence ; aucune suppression physique de preuve sans politique explicite ; suppression/rectification RGPD documentée.

### 8.4 APIs et contrats

- Server actions / route handlers validés Zod ; domaines fonctionnels isolés ; ne pas exposer de tables internes directement à des utilisateurs non autorisés.
- Stripe : `checkout.session.completed`, `payment_intent.succeeded`, `charge.refunded` selon flux réellement implémenté ; signature et idempotency key.
- Signature : `signing.created`, `signing.completed`, `signing.declined` traités en outbox ; stocker preuve et ID fournisseur.
- CRM : synchronisation asynchrone et traçable (`lead_created`, `enrollment_confirmed`) ; résilience si CRM indisponible.
- Email : notifications transactionnelles via fournisseur à définir ; anti-doublon, retry, journal ; marketing seulement selon base légale pertinente.

### 8.5 Hébergement

- GitHub privé : PR obligatoires, `main` protégée, branches `feat/*`, `fix/*`, versions taggées.
- Vercel : `production`, `preview`, domaines validés, variables d'environnement distinctes ; pas de secrets dans Git.
- Supabase : projets `staging` et `production` séparés ; migrations SQL revues et sauvegardées ; exports de test anonymisés uniquement.
- Médias : Supabase Storage privé pour les contenus pédagogiques ; CDN images publiques optimisées ; streaming vidéo externe si nécessaire.
- Jobs périodiques / background : choisir un mécanisme fiable, avec retries, alertes et contraintes d'exécution documentées ; ne pas présumer que le runtime serverless convient à toutes les charges longues.
- Backups : définir fréquence, objectif RPO/RTO, test de restauration et responsable.

## 9. Exigences d'acceptation et tests

### Qualité produit

- Chaque route de P0 dispose d'un état chargé/vide/erreur, skeleton si pertinent et responsive 360/768/1440 px.
- Les contenus et tarifs proviennent de données validées ; aucune fausse date de session, aucun résultat inventé.
- 100 % du parcours critique fonctionne au clavier ; audit automatisé accessibilité sans violations critiques connues, vérification manuelle.
- Builds `lint`, `typecheck`, unit, integration et e2e verts avant fusion.

### Parcours de recette P0

1. Trouver une formation depuis Google → fiche complète → session → candidature → confirmation et notification.
2. Reprise d'un formulaire interrompu et impossibilité de voir le dossier d'une autre personne.
3. Deux candidats tentent de réserver la dernière place : une seule confirmation.
4. Paiement validé / webhook répété : un seul effet métier, pas de double facture ni place.
5. Formateur ne voit que ses sessions ; apprenant seulement ses données ; admin selon périmètre d'autorisation.
6. Quiz échoué puis réussi : historique cohérent, progression correctement calculée.
7. Présence et évaluation liées à session réelle, preuves exportables et datées.
8. Document généré d'après bonne version du programme et modèles approuvés.
9. Réclamation créée et traitée : journal complet, visibilité limitée, dates et décision.
10. Suppression de consentement marketing n'efface pas illégalement la preuve contractuelle ; droits et conservation différenciés.
11. Déploiement preview fonctionnel ; migration et restauration testées sur staging.

### Non-fonctionnel

- Objectifs Core Web Vitals : LCP <=2,5s, INP <=200ms, CLS <=0,1 à p75 mesuré ; instrumentation et suivi.
- Seuils de fiabilité, disponibilité et reprise à contractualiser ; aucune garantie 99,9 % sans infrastructure et monitoring adéquats.
- Tests RLS automatisés : user A ne lit/modifie pas user B ; élévation de privilège refusée ; URLs signées expirées rejetées.
- Dépendances surveillées ; audit licences et provenance ; scans secrets et SAST CI.

## 10. Backlog Claude Code — séquencement

**Sprint 0 — Audit et consolidation (P0)**
- Inventaire existant Renaissance, sauvegarde Git et DB, analyse `package.json`, migrations, assets, routes, domaine, données et CI.
- Cloner L01 dans un répertoire de recherche séparé ; ne pas écraser le projet existant.
- Installer et exécuter build/tests, tester auth, RLS, paiements, contenu, scripts et compatibilité Vercel.
- Comparer intégration progressive des modules à migration d'application ; rédiger ADR-001 avec go/no-go et temps relatif.
- Contrôler `LICENSE`, versions et notices des bases T01, T02, P01, F01, C01, S01, Q01.

**Sprint 1 — Design system et site public (P0)**
- Valider tokens et 3 écrans maîtres : accueil, fiche formation, catalogue.
- Créer shell marketing, header/footer, CMS simple, 4 fiches, pages essentielles, zones SEO, contact et formulaires.
- Intégrer vraies photographies/licences ; build responsive et accessibilité.

**Sprint 2 — Données, auth et inscriptions (P0)**
- Init migrations, RLS, rôles, programmes/sessions, formulaires, workflow, notifications, capacité et liens CRM.
- Tests concurrence de réservation et permissions.

**Sprint 3 — Campus et formateurs (P0)**
- Dashboard élève, cours, ressources, quiz, progression, planning ; dashboard formateur, session, présences et évaluations.
- Tests end-to-end étudiants/formateurs.

**Sprint 4 — Administration et preuves (P0)**
- Pipeline prospects, sessions, documents PDF, qualité minimum, réclamations, audit, exports.
- Paiement si les conditions contractuelles et fiscales sont confirmées.

**Sprint 5 — Extensions (P1–P2)**
- Signatures Documenso et/ou autre prestataire, Twenty, formulaires complexes, satisfaction avancée, BPF assisté, CMS avancé, automatisations et reporting.
- Aucune extension ne doit bloquer une vente simple ou une formation correctement tracée.

### Gate de validation à chaque sprint

1. PR documentée et audit de code.
2. `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, Playwright ciblé (adapter aux scripts réels du dépôt).
3. Preview Vercel, contrôles mobile, audit a11y, revue contenu et photos.
4. Migrations dry-run sur staging ; rollback documenté.
5. Validation métier humaine ; commit final et push GitHub.

## 11. Responsabilités / éléments à fournir par Renaissance

- Logo et charte officielle ; photos autorisées ; localisation, siège, contacts et coordonnées réelles.
- Programmes détaillés, objectifs, prérequis, publics, durées, modalités, prix, accessibilité et dates réelles de sessions.
- Modalités d'admission et documents-types juridiquement validés ; CGV/contrats, mentions, politique de confidentialité.
- Statut et périmètre exacts Qualiopi, NDA, éventuels labels/habilitations et statistiques publiables.
- Règles de facturation, TVA et financements ; opérateur de paiement et outil de facturation.
- Liste des rôles, procédures d'émargement, évaluations, conservation des preuves et procédures de réclamation.

## 12. Estimation relative et risques

Cette version n'est **pas** un devis en jours ni une promesse de calendrier. À périmètre constant, les travaux les plus importants sont le workflow administratif français, la traçabilité qualité, la sécurité des rôles/RLS, la reprise de données et la personnalisation graphique. Les éléments réutilisables peuvent réduire l'effort, mais pas éliminer les phases d'intégration et de recette.

| Risque | Traitement |
|---|---|
| Petit socle LMS communautaire / dette cachée | Audit local et preuve de concept avant adoption définitive |
| Multi-tenant complexe pour un seul organisme | Mono-tenant contrôlé, surface d'attaque minimale |
| Composants AGPL/Enterprise mal incorporés | Séparation API, avis licence, notices et validation d'usage |
| Fausse conformité Qualiopi | Procédures réelles, validation humaine, preuve par indicateur applicable |
| Paiements/factures incohérents | Source de vérité, webhooks idempotents, validation fiscale |
| Visuels premium sans droits | Bibliothèque d'assets approuvés, releases traçables |
| SEO local dupliqué | Contenu original et présence effective vérifiée |
| Données de stagiaires exposées | RLS, RBAC, test d'isolation, stockage privé, audits |

## 13. Prompt prêt à donner à Claude Code

> Tu es lead engineer Next.js/TypeScript/Supabase de Renaissance. Lis ce cahier des charges et inspecte l'existant avant toute modification. Ne réalise aucun reset destructif, migration de production, suppression de fichiers, réécriture du dépôt ou publication sans sauvegarde, tests et validation. Crée une branche de travail. Audite le dépôt `guillermoscript/lms-front` (MIT) en copie isolée et documente les composants réellement récupérables, la sécurité de l'authentification/RLS, les migrations, le paiement, les tests, la dette et les fonctionnalités manquantes. Audite le template Seminar et les notices de licence, puis produis ADR-001 proposant soit un fork contrôlé soit une intégration progressive à notre code existant. Implémente d'abord le design system Renaissance et les pages marketing P0 ; puis le modèle de données, les parcours d'inscription, les rôles, le campus, l'administration et les preuves qualité. Utilise TypeScript strict, Zod, Supabase Auth/Postgres/RLS/Storage, migrations versionnées, tests unitaires/intégration/Playwright et CI GitHub. Ne recopie pas des projets AGPL directement dans le code propriétaire ; examine uniquement leurs APIs et termes. Ne crée jamais de faux contenus, témoignages, statistiques, certifications, dates, tarifs ou pages SEO trompeuses. À chaque étape : inventaire des fichiers modifiés, commandes et résultats de tests, limites connues, captures desktop/mobile, commit atomique, push sur branche et PR. Ne déploie en production qu'après validation humaine explicite. Priorise qualité, sécurité, SEO et parcours métier plutôt que multiplication des composants.

## 14. Sources de validation

- LMS Front : https://github.com/guillermoscript/lms-front
- Seminar + licence : https://tailthemes.com/themes/seminar ; https://tailthemes.com/licenses
- Academy + licence : https://freeframe.dev/templates/academy ; https://freeframe.dev/docs
- pdfme : https://github.com/pdfme/pdfme
- dForms : https://github.com/Dapta-Tech/dapta-forms
- Twenty licence : https://github.com/twentyhq/twenty/blob/main/LICENSE
- Documenso licence : https://docs.documenso.com/docs/policies/licenses
- Formbricks : https://github.com/formbricks/formbricks
- LearnHouse : https://github.com/learnhouse/learnhouse
- Frappe LMS : https://github.com/frappe/lms
- Autre LMS de référence : https://github.com/farrukh-ali-khan/lms
- OPAGA : https://opaga.fr/
- Ministère du Travail, référentiel RNQ/Qualiopi : https://travail-emploi.gouv.fr/

**Fin du document — version de cadrage.** La validation du contenu pédagogique, juridique et commercial demeure du ressort du client Renaissance, assisté de ses conseils compétents.
