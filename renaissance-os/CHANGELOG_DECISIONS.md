# Historique de décision — ne pas effacer les spécifications antérieures

| Date / période | Position initiale | État dans V7 | Qualification |
|---|---|---|---|
| 27/10/2026 | Démonstration commerciale par étapes « acquisition → conversion → plateforme » ; estimation totale indicative 15 260 € HT | Conserve la présentation comme référence ; ne transforme pas les 3 étapes commerciales en exclusions du périmètre technique final | Historique, contrat à vérifier |
| 08/11/2026 | Spécification V1 Next.js/Supabase, P0/P1/P2 ; LMS Front candidat | Référence héritée ; ne décrète pas migration ni adoption du repo | Historique |
| 08/11/2026 | Première déclinaison visuelle premium vert forêt / ivoire / champagne | Conservée comme **direction provisoire à valider sur le dépôt et avec le client**, pas comme charte définitive | Direction antérieure |
| 11/11/2026 | Pilotage du projet, rôles et annuaire national gratuit | **Exigence intégrée au périmètre complet**, y compris externes à la formation | Besoin affirmé |
| 17/11/2026 | Socle Frappe CRM / ERPNext / Frappe Learning à privilégier | Réutilisation d'instances déclarées existantes ; protocole d'inspection avant tout choix de backend ; Frappe Learning option prioritaire à évaluer | Statut technique inconnu |
| 20/11/2026 | Méthode « comme POLIVIA V7 » et livraison fonctionnelle complète Renaissance | 18 lots internes, une recette finale complète ; pas de phase 2 pour des modules essentiels | Mandat courant |
| 20/11/2026 | ECC, Superpowers et Agentic Council disponibles sur Mac pour Claude Code | Sélection sélective si chargés dans **la session Renaissance** ; ne pas présumer de la portée user/project | À vérifier localement |

## Conflits à résoudre et politique d'arbitrage

1. **V1 Supabase vs socle Frappe** : l'existence de migrations et de données impose une comparaison ADT/ADR. On peut maintenir Supabase pour certains objets et utiliser Frappe CRM/ERPNext en tant que systèmes métiers ; jamais créer deux sources de vérité d'inscription ou facturation.
2. **LMS Front vs Frappe Learning** : Frappe Learning mérite priorité d'évaluation car environnement Frappe déclaré présent, mais décision sur critères fonctionnels et sécurité réels.
3. **« Livraison complète » vs P0/P1/P2 historique** : les lots restent internes ; la recette finale inclut tous les modules exigés. Les fonctionnalités purement facultatives non requises restent hors périmètre.
4. **Annuaire initialement territorial vs national gratuit** : le national gratuit prévaut pour le produit ; les pages Yonne sont un axe SEO local, pas une limite géographique de l'annuaire.
5. **« Formation Devenir + site » vs passage support POLIVIA** : même si une offre commerciale validée inclut un site, l'orchestration passe par support Renaissance et POLIVIA, avec comptes et permissions séparés.
6. **Rôle du président** : accès de pilotage selon droits, pas superuser technique par défaut.
7. **Renaissance/Villa Renaissance** : nom commercial juridique final à confirmer avant publication. Ne pas renommer des domaines ou contrats sans validation.
