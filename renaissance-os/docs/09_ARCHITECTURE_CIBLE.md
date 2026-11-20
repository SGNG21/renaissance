# Architecture intégrée, coexistence et ADR obligatoire

## Ligne directrice

**Monoproduit Renaissance / mono-organisme**, avec interfaces cohérentes, SSO ou fédération lorsque sécurisés, permissions RBAC/ABAC et systèmes de gestion métier spécialisés. Ne pas rajouter un énième CRM/ERP sous prétexte de personnalisation. Les utilisateurs n'ont pas à se connecter successivement à plusieurs panneaux sans justification.

**Architecture logique cible :** front Renaissance (réutiliser React/Vite/Next.js existant après vérification) → backend/app gateway Renaissance (identités, droits, sessions, annuaire, support) → adaptateurs Frappe CRM / ERPNext / LMS / forum / n8n → outbox+logs → suivi qualité. Les outils métiers restent sous leurs responsabilités respectives, avec identifiants corrélés.

**Choix non figés :** backend Supabase existant vs Frappe custom ; site unique ou sites Frappe isolés ; Frappe Learning vs LMS Front vs Chamilo. Ces choix exigent POC, inventaire et ADR, non un reset préalable.

**Recommandation conditionnelle** : en présence de Frappe CRM et ERPNext déjà installés, explorer Frappe Learning d'abord pour minimiser les protocoles et doubles identités. Vérifier les limites fonctionnelles et licences. Le front Renaissance peut conserver son stack existant et consommer des APIs sécurisées : ne pas exiger une migration globale du front.

**Production :** GitHub PR et CI, preview protégée, staging isolé, domaines/TLS, secrets gérés en dehors du repo, journaux et alertes, sauvegarde vérifiée, rollback et RPO/RTO fixés par exploitation.

**Garantie non supposée :** une compatibilité API affichée ou une possibilité de SSO ne prouve ni raccordement effectif ni synchronisation correcte. Les contrats JSON sont des interfaces à valider. N'expose aucun service Frappe/n8n publiquement pour contourner une protection.
