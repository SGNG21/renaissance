# Contrats JSON Schema — propositions de référence

Décrivent les **types de messages et objets possibles**, pas les tables réelles. Validation : `python3 scripts/validate_pack.py` si le module jsonschema est disponible (sinon validation syntaxique seulement). UUID fictifs et timestamps de tests. Le champ `simulation=true` des événements interdit implicitement l'envoi en production, à renforcer côté serveur.

Invariants transverses non exprimables entièrement en JSON Schema : capacité >= confirmés, unicité d'inscription active, paiement idempotent, RBAC serveur, transfert POLIVIA soumis à consentement et décision du support. Les tests doivent compléter les schémas.
