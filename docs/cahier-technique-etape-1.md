# Renaissance — Cahier technique Étape 1

Brief pour Claude Code : construire l'Étape 1 du contrat du 9 novembre 2026 (site, SEO local, blog, préinscription), sur un socle Next.js + Supabase prêt pour les Étapes 2 et 3.

## 1. Règles non négociables

- Marque affichée : **Renaissance**. « Villa Renaissance » uniquement dans la page mentions légales (Villa Renaissance, SAS, SIREN 130 903 099, 84 avenue des Chaumes, 89330 Piffonds).
- Déploiement uniquement GitHub → Vercel, jamais en local.
- Aucune clé secrète côté client : pas de préfixe `NEXT_PUBLIC_` sur les clés API, jamais de `service_role` dans le navigateur. (Exception : clé publique Turnstile, publique par conception.)
- Comptes Vercel, Supabase, Brevo et domaine **renaissance-formation.fr** ouverts au nom du client (art. 4.1 du contrat).
- Dépôt `SGNG21/renaissance` privé pour le build. Les composants réellement génériques (boilerplate réutilisable) restent factorisés à part : le dépôt ne porte que le spécifique Renaissance (art. 5.4 — couche réutilisable non cédée).
- Charte : reprise exacte de la maquette premium validée (`design/renaissance-vitrine.html`).

## 2. Stack

| Couche | Choix |
|---|---|
| Framework | Next.js (App Router) + React + TypeScript |
| Style | Tailwind CSS v4 + shadcn/ui, thème Renaissance |
| CMS | Payload CMS intégré à Next.js, base Postgres Supabase (schéma `payload` isolé, RLS activée, aucune policy) |
| Base, auth, stockage | Supabase (PostgreSQL, Auth, Storage, RLS) |
| Automatisation | n8n sur le VPS OVH |
| Emails | Brevo |
| Hébergement | Vercel, domaine renaissance-formation.fr |
| Tests | Vitest + Playwright |

## 3. Design system

| Token | Valeur | Usage |
|---|---|---|
| `ink` | #20342e | Texte courant |
| `dark` | #142820 | Hero, footer |
| `forest` | #253e32 | Boutons pleins |
| `forest-hover` | #435e4d | Survol bouton |
| `gold` | #bba27c | Accent, eyebrows, filets |
| `gold-light` | #cbb89b | Mots en valeur sur fond sombre |
| `ivory` | #f5f2ea | Panneaux |
| `paper` | #fbf9f4 | Fond de page |
| `line` | #d9d7ce | Bordures |
| `sage` | #637169 | Texte secondaire |

- Polices : Italiana (titres, logo) et Manrope 400 à 700 (texte), via `next/font/google`.
- Angles vifs (radius 0), filets 1 px, pas d'ombre ni de dégradé décoratif. Les voiles de lisibilité sur photo (hero) sont conservés. Container 1380 px.
- Composants à créer : Button (plein, contour), Eyebrow, ArrowLink, SectionTitle, Field (trait inférieur, focus or), ParcoursCard.
- Logo : wordmark provisoire en Italiana, remplacé plus tard.

## 4. Arborescence

| Route | Contenu |
|---|---|
| `/` | Accueil, 8 sections de la maquette |
| `/formations` | Les trois parcours |
| `/programme` | Programme 35 h |
| `/immersion` | Journée d'immersion et stage |
| `/public-vise` | Profils, prérequis |
| `/informations-pratiques` | Lieux, dates, tarifs, financements |
| `/preinscription` | Formulaire principal |
| `/mentions-legales`, `/confidentialite` | Pages légales |
| `/formation-yonne`, `/formation-joigny`, `/formation-sens`, `/formation-auxerre`, + 1 zone à valider | 5 pages SEO locales |
| `/blog`, `/blog/[slug]` | Blog géré dans Payload |
| `/admin` | Back-office Payload |

## 5. Base Supabase (socle prêt pour la suite)

Chaque table métier porte `organization_id` dès maintenant, avec RLS activée. Renaissance est la première organisation. Policies via fonctions SECURITY DEFINER (`current_org_id()`, `current_role()`) pour éviter la récursion. Aucune policy d'écriture publique.

| Table | Rôle | Étape |
|---|---|---|
| `organizations` | Organismes (Renaissance = 1re ligne) | 1 |
| `profiles` | Lié à `auth.users`, rôle, organisation | 1 |
| `leads` | Préinscriptions : identité, formation visée, zone, source, UTM, consentement RGPD (booléen + horodatage + version du texte), statut | 1 |
| `events` | Journal d'événements (lead créé, email envoyé…) | 1 |
| `pipeline_stages`, `appointments`, `payments` | CRM, rendez-vous, acompte Stripe | 2, tables vides |
| `sessions`, `attendances`, `messages` | Sessions, présences, messagerie | réservées (structure minimale + organization_id) |

- Rôles (enum `app_role`) : `admin`, `president`, `formateur`, `candidat`, `apprenant`, `professionnel`.
- Le formulaire public écrit dans `leads` uniquement via une route serveur, jamais en direct depuis le navigateur.
- Migrations versionnées dans `supabase/migrations/`, commitées. Lancer les advisors de sécurité Supabase après migration.

## 6. Formulaire de préinscription

1. Champs : prénom, nom, email, téléphone, formation visée (3 parcours : Accueil familial, Animation & vie sociale, Dame de compagnie — + option « Autre / je ne sais pas encore »), commune ou département, disponibilités, message, case de consentement RGPD.
2. Validation Zod côté serveur, anti-spam (Cloudflare Turnstile ou champ piège).
3. La route serveur enregistre le lead avec sa source et ses UTM, puis appelle le webhook n8n.
4. Workflow n8n : email de confirmation Brevo au prospect, notification au client, ajout du contact dans une liste Brevo.
5. Page de remerciement et événement de conversion.

## 7. SEO

- Une page par zone avec titre, description, contenu différencié, FAQ et maillage interne. Slugs : `/formation-yonne`, etc. (pas de slug à rallonge).
- Schema.org : `EducationalOrganization` nommée « Renaissance », `Course` par formation, `FAQPage`.
- `sitemap.xml`, `robots.txt`, balises canoniques et Open Graph générés par Next.js.
- Blog : catégories, modèle d'article, un premier article de 1 000 à 1 500 mots.

## 8. Ordre de construction pour Claude Code

1. Créer le dépôt GitHub, projet Next.js, Tailwind, shadcn, polices, tokens.
2. Brancher Vercel et Supabase, variables d'environnement côté serveur.
3. Migrations SQL de la section 5 avec RLS.
4. Intégrer Payload CMS : collections Pages, Articles, Zones SEO, Médias (schéma `payload` isolé).
5. Convertir la maquette en composants et monter les 8 pages.
6. Générer les 5 pages SEO depuis la collection Zones.
7. Formulaire, route serveur, webhook n8n, emails Brevo.
8. SEO technique, mentions légales, bannière cookies.
9. Tests Playwright du parcours de préinscription, Lighthouse supérieur à 90.
10. Domaine renaissance-formation.fr, recette, prise en main d'une heure.

## 9. À obtenir du client avant lancement

- [ ] Première échéance encaissée
- [ ] Fiche de cadrage validée par email
- [ ] Accès Vercel, Supabase, Brevo et domaine renaissance-formation.fr
- [ ] Tarifs, dates, lieux, programme, financements
- [ ] Cinquième zone SEO et sujet du premier article
- [ ] Photos réelles (sinon placeholders signalés)

## Notes de reprise de la maquette

- La maquette (`design/renaissance-vitrine.html`) est nettoyée : 0 occurrence de « Villa Renaissance » (marque = Renaissance partout, y compris schema.org).
- ~360 Ko d'images base64 = visuels générés par IA → à extraire en WebP (next/image) et à signaler comme placeholders.
- Supprimer les mentions « démonstration graphique » / « aucun renseignement n'est envoyé » en production.
- DM Sans chargée mais inutilisée → ne pas l'inclure.
- Ombre quasi-invisible du formulaire → supprimée (respect « pas d'ombre »).
