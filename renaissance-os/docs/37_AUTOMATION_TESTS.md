# Tests de parcours et programmation des preuves

Les scénarios de `quality/TEST_CASES.json` sont exécutables conceptuellement : chaque cas précise préconditions, acteur, étapes, attendu et sévérité. Les jeux de fixtures sous `contracts/examples` sont entièrement fictifs et ne doivent jamais être synchronisés vers CRM/ERP réels.

Pour chaque module, écrire les tests du véritable stack choisi. Tests d'intégration réels en staging et tests mock isolés doivent être comptés séparément. Un test de webhook simulé ne valide pas le prestataire de paiement ou n8n réel. Environnements dev/staging séparés, aucune donnée personnelle réelle dans fixtures.
