# Sécurité, menaces et durcissement

Menaces prioritaires : fuite de dossiers via IDOR/RLS, escalade de rôle, documents pédagogiques publics, faux webhook paiement, usurpation de professionnel, injection via contenus saisis, exfiltration de secrets via logs/n8n, contournement support POLIVIA, compte opérateur partagé, accès direct au VPS, SSRF lors de téléchargement de médias.

**Contrôles :** sessions HTTP-only/CSRF si pertinent, MFA admins, RBAC évalué serveur, deny-by-default, authentification du compte de service, secrets hors dépôt, validation Zod serveur, rate limiting, scanner uploads, CSP adaptée, Webhook signature+idempotence, audits des droits sur chaque API, journaux horodatés immuables ou altération détectable, stockage privé et encryption, sauvegardes testées.

**Tests négatifs :** user A vs B, participant hors session, formateur d'une autre formation, professionnel externe vs dossier, support vs facture, superuser non accordé, doubles webhooks, upload malveillant, secret dans logs, API sans tenant. Une revue indépendante est requise sur les migrations de permissions.

Les modifications de production, secrets, IAM, déploiements publics et migration destructive nécessitent un accord humain distinct.
