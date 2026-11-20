# Direction artistique et expérience premium

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
