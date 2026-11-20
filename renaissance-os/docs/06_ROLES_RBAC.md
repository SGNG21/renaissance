# Rôles, permissions, séparation et approbations

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
