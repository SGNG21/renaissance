# LMS : décision de réemploi fondée sur des preuves

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
