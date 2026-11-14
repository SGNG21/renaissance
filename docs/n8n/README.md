# Workflow n8n — préinscription

Chaîne : site → route serveur `/api/preinscription` → Supabase (`leads`) → **n8n** → Brevo.

Le lead est enregistré en base **avant** l'appel à n8n. Si n8n est indisponible, le
visiteur voit quand même sa confirmation et la demande n'est pas perdue : l'échec est
tracé dans la table `events` (`n8n.failed`) et peut être rejoué.

## Import

1. n8n → Workflows → Import from File → `workflow-preinscription.json`.
2. Renseigner les variables d'environnement n8n ci-dessous.
3. Activer le workflow, puis copier l'URL de production du webhook.
4. Coller cette URL dans Vercel : `N8N_WEBHOOK_URL`.

## Variables d'environnement côté n8n

| Variable | Rôle |
|---|---|
| `RENAISSANCE_WEBHOOK_SECRET` | Doit être **identique** à `N8N_WEBHOOK_SECRET` dans Vercel. |
| `BREVO_API_KEY` | Clé API Brevo (v3). Reste sur le VPS, jamais dans le site. |
| `BREVO_TEMPLATE_CONFIRMATION` | Identifiant du modèle « confirmation au prospect ». |
| `BREVO_TEMPLATE_NOTIFICATION` | Identifiant du modèle « notification à Renaissance ». |
| `BREVO_LIST_ID` | Identifiant de la liste Brevo des préinscrits. |
| `RENAISSANCE_NOTIFICATION_EMAIL` | Adresse qui reçoit les notifications. |

## Sécurité

Le site envoie l'en-tête `X-Renaissance-Signature`. Le premier nœud compare cette valeur
à `RENAISSANCE_WEBHOOK_SECRET` et répond 401 si elle ne correspond pas. Sans ce contrôle,
n'importe qui pourrait déclencher des envois d'e-mails en appelant l'URL du webhook.

## Modèles Brevo

Les gabarits HTML sont dans `docs/brevo/`. À créer dans Brevo → Transactionnel → Modèles,
puis reporter leurs identifiants dans les variables ci-dessus.

Variables attendues par les modèles :

- **confirmation-prospect.html** : `prenom`, `formation`.
- **notification-renaissance.html** : `prenom`, `nom`, `email`, `telephone`, `formation`,
  `zone`, `disponibilites`, `source`, `message`, `leadId`.

## Données transmises par le site

```json
{
  "leadId": "uuid",
  "prenom": "…", "nom": "…", "email": "…", "telephone": "…",
  "formationVisee": "accueil-familial",
  "formationLibelle": "Accueil familial",
  "zone": "…", "disponibilites": "…", "message": "…",
  "source": "/preinscription",
  "utm": { "source": "…", "medium": "…", "campaign": "…", "term": "…", "content": "…" },
  "creeLe": "2026-11-14T12:00:00.000Z"
}
```
