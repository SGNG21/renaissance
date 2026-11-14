# À faire par Geo — manipulations manuelles

Tout ce qui ne peut pas être fait depuis la session de code. Rien ici n'est bloquant
pour la suite du développement, mais **tout doit être fait avant la mise en ligne**.

## 1. Vérifications en attente

- [ ] **Téléverser une image de test** dans `/admin` → Médias, puis me le dire.
      Je contrôlerai : présence dans le bucket `medias`, URL publique Supabase
      (et non une fonction Vercel), colonne `_objectkey` renseignée.
      C'est le seul maillon du stockage jamais testé de bout en bout.

## 2. n8n (VPS OVH)

- [ ] Importer `docs/n8n/workflow-preinscription.json`.
- [ ] Définir les variables côté n8n (détail dans `docs/n8n/README.md`) :
      `RENAISSANCE_WEBHOOK_SECRET`, `BREVO_API_KEY`, `BREVO_TEMPLATE_CONFIRMATION`,
      `BREVO_TEMPLATE_NOTIFICATION`, `BREVO_LIST_ID`, `RENAISSANCE_NOTIFICATION_EMAIL`.
- [ ] Activer le workflow et copier l'URL de production du webhook.

## 3. Brevo

- [ ] Créer les 2 modèles transactionnels depuis `docs/brevo/` :
      `confirmation-prospect.html` et `notification-renaissance.html`.
- [ ] Noter leurs identifiants et les reporter dans n8n.
- [ ] Créer la liste des préinscrits, noter son identifiant.
- [ ] Valider l'expéditeur (SPF / DKIM sur le domaine), sinon les e-mails partent en spam.

## 4. Cloudflare Turnstile

- [ ] Créer un widget pour le domaine.
- [ ] Reporter la clé **secrète** dans `TURNSTILE_SECRET_KEY` (Vercel, Sensitive).
- [ ] Reporter la clé **publique** dans `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.

Sans ces clés, le formulaire fonctionne mais n'est protégé que par le champ piège :
l'absence de clé est journalisée à chaque envoi.

## 5. Variables Vercel à ajouter

| Variable | Valeur | Portée |
|---|---|---|
| `N8N_WEBHOOK_URL` | URL de production du webhook n8n | Prod + Preview |
| `N8N_WEBHOOK_SECRET` | même valeur que `RENAISSANCE_WEBHOOK_SECRET` | Prod + Preview, **Sensitive** |
| `TURNSTILE_SECRET_KEY` | clé secrète Turnstile | Prod + Preview, **Sensitive** |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | clé publique Turnstile | Prod + Preview |
| `SITE_URL` | *(optionnel)* seulement pour une recette sur un autre domaine | — |

Les canoniques, le sitemap et Open Graph utilisent `renaissance-formation.fr` par
défaut : rien à régler pour le lancement. `SITE_URL` ne sert qu'à forcer un autre
domaine en recette.

Rappel : une variable ajoutée ne prend effet qu'au **build suivant**. Un redéploiement
est nécessaire après chaque modification.

## 6. Réglages Vercel

- [ ] Vérifier Framework = **Next.js** et Production Branch = **main**
      (je n'ai pas les droits : mes appels sont refusés en 403).
- [ ] Transférer le projet au compte du client avant le lancement (art. 4.1).

## 7. Domaine

- [ ] Rattacher **renaissance-formation.fr** au projet Vercel et configurer le DNS.
      Action non réversible sans coupure : **je ne la fais pas sans ton feu vert**.

## 8. Le jour de la mise en ligne

- [ ] Ajouter `SITE_INDEXABLE=true` dans Vercel (Production uniquement), puis redéployer.
      Tant que cette variable est absente, `robots.txt` interdit tout, les pages portent
      `noindex` et le sitemap est vide. **C'est volontaire** : rien ne peut être indexé
      par accident.
- [ ] Fusionner la branche de travail vers `main` — **j'attends ton feu vert**.

## 9. Contenus à fournir

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

## 10. Deux décisions à prendre

**Contraste de la charte.** Lighthouse relève 5 combinaisons sous le seuil WCAG AA,
toutes issues de la maquette validée :

| Texte | Fond | Ratio | Minimum requis |
|---|---|---|---|
| `#bba27c` (gold) | `#eae9e1` | 2.01 | 4.5 |
| `#7d8279` | `#edeae1` | 3.26 | 4.5 |
| `#758078` | `#eae9e1` | 3.37 | 4.5 |
| `#8c7960` | `#faf8f1` | 3.93 | 4.5 |
| `#6d766d` | `#faf8f1` | 4.42 | 4.5 |

Je **n'ai rien changé** : ce sont les tokens que tu as validés. L'accessibilité reste à
95-96, donc au-dessus de l'objectif. Mais pour un organisme de formation, un contraste
insuffisant sur les éyebrows et mentions peut poser un vrai problème d'usage, voire de
conformité. Je peux assombrir ces teintes de quelques points sans toucher à l'identité :
dis-moi si tu veux que je le fasse.

**Premier article de blog.** Les pages `/blog` et `/blog/[slug]` sont construites et
branchées sur la collection Articles : catégories, image de couverture, brouillons,
données structurées, canonique et entrée au sitemap. Tant qu'aucun article n'est publié,
`/blog` affiche un encadré « à compléter ».

Il reste à écrire **le premier article (1 000 à 1 500 mots)**. Je ne l'ai pas rédigé :
publié sous la signature de Renaissance, il engage l'organisme sur le fond et demande
un sujet et une validation éditoriale. Donne-moi le sujet et je le propose en brouillon.
