# Prompt de lancement — Claude Code (Étape 1 Renaissance)

Tu construis l'Étape 1 de la plateforme Renaissance pour POLIVIA.

Documents fournis (dans ce dépôt) :
- `docs/cahier-technique-etape-1.md` (référence unique, suis-le à la lettre)
- `design/renaissance-vitrine.html` (maquette validée : reproduis le design à l'identique)

Règles absolues :
- Marque affichée : « Renaissance ». « Villa Renaissance » uniquement sur /mentions-legales.
- Déploiement uniquement via GitHub → Vercel. Jamais de déploiement local.
- Aucune clé secrète côté client : pas de NEXT_PUBLIC_ sur les clés API, jamais de service_role dans le navigateur (exception : clé publique Turnstile).
- Chaque table métier porte organization_id, RLS activée partout.
- Dépôt SGNG21/renaissance privé : garde les composants réellement génériques factorisés à part, le dépôt ne porte que le spécifique Renaissance.
- Domaine : renaissance-formation.fr.
- Ne fais rien hors du périmètre du cahier. Si un besoin dépasse, signale-le au lieu de le coder.

Méthode :
1. Présente ton plan pour les points 1 à 3 de « Ordre de construction » et attends ma validation.
2. Avance ensuite point par point. À la fin de chaque point : commit, push, vérifie le déploiement Vercel, résumé court de ce qui marche et de ce qui reste.
3. Avant toute action irréversible (migration destructive, suppression, changement de domaine), demande-moi d'abord.
4. Écris les tests Playwright du parcours de préinscription avant la recette.

Livrable final : site en ligne sur renaissance-formation.fr, 8 pages, 5 pages SEO, blog Payload avec un article, formulaire relié à n8n → Supabase → Brevo, Lighthouse > 90.
