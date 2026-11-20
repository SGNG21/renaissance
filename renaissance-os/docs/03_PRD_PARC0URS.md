# PRD détaillé et parcours utilisateur

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
