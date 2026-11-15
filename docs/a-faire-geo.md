# À faire par Geo — manipulations manuelles

Tout ce qui ne peut pas être fait depuis la session de code. Rien ici n'est bloquant
pour la suite du développement, mais **tout doit être fait avant la mise en ligne**.

## 0. Écart assumé par rapport au cahier technique

Le cahier prévoit « n8n sur le VPS OVH » pour l'automatisation. **Il n'y a pas de VPS**,
donc n8n ne tournera pas. Sur ta décision du 15/11, les envois Brevo partent désormais
**directement de la route serveur Vercel**.

Conséquences :

- Une brique de moins à héberger, à sécuriser et à maintenir.
- Plus de secret partagé ni de webhook exposé.
- En contrepartie, pas d'interface de rejeu visuelle : les échecs se lisent dans la
  table `events` de Supabase.

`docs/cahier-technique-etape-1.md` et `docs/prompt-claude-code.md` sont **laissés
intacts** : ce sont les documents de référence contractuels, ils gardent trace de ce qui
était prévu. Cette note documente l'écart.

## 1. Vérifications en attente

- [ ] **Téléverser une image de test** dans `/admin` → Médias, puis me le dire.
      Je contrôlerai : présence dans le bucket `medias`, URL publique Supabase
      (et non une fonction Vercel), colonne `_objectkey` renseignée.
      C'est le seul maillon du stockage jamais testé de bout en bout.

## 2. Brevo — le seul service à configurer

Pas de n8n, pas de VPS : la route serveur sur Vercel appelle Brevo directement.

- [ ] Récupérer la **clé API v3** (Brevo → SMTP & API → Clés API).
- [ ] **Vérifier un expéditeur** (SPF / DKIM sur le domaine), sinon les e-mails
      partent en spam. C'est le point le plus souvent oublié.
- [ ] Créer les 2 modèles transactionnels à partir de `docs/brevo/` :
      `confirmation-prospect.html` et `notification-renaissance.html`, puis noter
      leurs identifiants.
- [ ] *(Facultatif, plus tard)* Créer la liste des préinscrits et renseigner
      `BREVO_LIST_ID`. Sans cette variable, l'ajout est **sauté sans erreur** ;
      les deux e-mails partent quand même.

Détail complet dans `docs/brevo/README.md`.

## 3. Cloudflare Turnstile

- [ ] Créer un widget pour le domaine.
- [ ] Reporter la clé **secrète** dans `TURNSTILE_SECRET_KEY` (Vercel, Sensitive).
- [ ] Reporter la clé **publique** dans `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.

Sans ces clés, le formulaire fonctionne mais n'est protégé que par le champ piège :
l'absence de clé est journalisée à chaque envoi.

## 4. Variables Vercel à ajouter

| Variable | Valeur | Portée |
|---|---|---|
| `BREVO_API_KEY` | clé API Brevo v3 | Prod + Preview, **Sensitive** |
| `BREVO_SENDER` | expéditeur vérifié, ex. `Renaissance <contact@…>` | Prod + Preview |
| `NOTIFICATION_EMAIL` | adresse qui reçoit les préinscriptions | Prod + Preview |
| `BREVO_TEMPLATE_CONFIRMATION` | identifiant du modèle *(facultatif)* | Prod + Preview |
| `BREVO_TEMPLATE_NOTIFICATION` | identifiant du modèle *(facultatif)* | Prod + Preview |
| `BREVO_LIST_ID` | identifiant de liste *(facultatif)* | Prod + Preview |
| `TURNSTILE_SECRET_KEY` | clé secrète Turnstile | Prod + Preview, **Sensitive** |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | clé publique Turnstile | Prod + Preview |
| `SITE_URL` | *(optionnel)* seulement pour une recette sur un autre domaine | — |

Les canoniques, le sitemap et Open Graph utilisent `renaissance-formation.fr` par
défaut : rien à régler pour le lancement. `SITE_URL` ne sert qu'à forcer un autre
domaine en recette.

Rappel : une variable ajoutée ne prend effet qu'au **build suivant**. Un redéploiement
est nécessaire après chaque modification.

## 5. Réglages Vercel

- [ ] Vérifier Framework = **Next.js** et Production Branch = **main**
      (je n'ai pas les droits : mes appels sont refusés en 403).
- [ ] Transférer le projet au compte du client avant le lancement (art. 4.1).

## 6. Domaine

- [ ] Rattacher **renaissance-formation.fr** au projet Vercel et configurer le DNS.
      Action non réversible sans coupure : **je ne la fais pas sans ton feu vert**.

## 7. Le jour de la mise en ligne

- [ ] Ajouter `SITE_INDEXABLE=true` dans Vercel (Production uniquement), puis redéployer.
      Tant que cette variable est absente, `robots.txt` interdit tout, les pages portent
      `noindex` et le sitemap est vide. **C'est volontaire** : rien ne peut être indexé
      par accident.
- [ ] Fusionner la branche de travail vers `main` — **j'attends ton feu vert**.

## 8. Contenus à fournir

Ils apparaissent sur le site dans des encadrés « à compléter », volontairement visibles.
Aucune valeur n'a été inventée.

- [ ] Programme détaillé des 35 h (modules, volumes horaires, évaluation).
- [ ] Tarifs, dates, lieux, financements mobilisables.
- [ ] Profils visés et prérequis.
- [ ] Modalités de la journée d'immersion et du stage.
- [ ] Mentions légales : directeur de la publication, TVA, numéro de déclaration
      d'activité, capital social, contact, et Qualiopi le cas échéant.
- [ ] Confidentialité : contact RGPD, durées de conservation, sous-traitants, base légale.
- [ ] **5e zone SEO** à confirmer (le slot est libre, à créer dans Zones SEO).
- [ ] Sujet du premier article de blog (1 000 à 1 500 mots).
- [ ] **Photos réelles** : les 6 visuels actuels sont générés par IA et signalés comme tels
      dans les mentions légales.
- [ ] Trancher le label du logo (« LA MAISON DES VOCATIONS » est provisoire).

## 9. Deux décisions à prendre

**Contraste** — *traité le 14/11.* Les 5 teintes sous le seuil WCAG AA ont été
assombries, teinte et saturation conservées. L'accessibilité passe de 95 à **100** et
l'audit de contraste est au vert.

| Rôle | Avant | Après | Ratio avant → après |
|---|---|---|---|
| Doré **texte** (eyebrows, libellés) | `#bba27c` | `#7d6541` | 2.01 → 4.53 |
| Libellé de zone | `#8c7960` | `#776651` | 3.44 → 4.53 |
| Mention du bandeau | `#7d8279` | `#666a63` | 3.23 → 4.53 |
| Note des territoires | `#758078` | `#626b65` | 3.37 → 4.52 |
| Accroche de territoire | `#6d766d` | `#636b63` | 3.86 → 4.52 |

Le **doré décoratif reste inchangé** (`--color-gold` : filets, bordures, contour de
focus) ainsi que les grands textes dorés, qui passent déjà le seuil applicable aux
grandes tailles. Un token distinct `--color-gold-text` a été créé pour ne pas mélanger
les deux usages.

**Premier article de blog** — *brouillon livré le 14/11.*
`docs/blog/brouillon-accueillant-familial-yonne.md` — « Devenir accueillant familial
dans l'Yonne : métier, formation, démarches », 1 234 mots, 9 sections.

Il est **volontairement non publié** et contient **6 encadrés `[À VALIDER]`** : aucun
montant, aucune durée, aucun nombre et aucune certification n'a été inventé.

Trois points demandent une vérification avant publication :

1. Le cadre de l'agrément est **départemental** dans sa mise en œuvre : chaque élément
   doit être confirmé auprès du Conseil départemental de l'Yonne.
2. La composition de la rémunération et les montants : encadrés et révisés, donc jamais
   publiés sans vérification.
3. **Le point le plus sensible** : l'articulation entre la formation obligatoire
   organisée par le département et le parcours Renaissance. Une ambiguïté ici pourrait
   faire croire à un candidat que notre formation le dispense d'une démarche officielle.

Une fois relu et complété, l'article se saisit dans `/admin` → Articles (il peut rester
en brouillon tant qu'il n'est pas validé).
