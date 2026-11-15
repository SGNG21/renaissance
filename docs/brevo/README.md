# Brevo — gabarits et configuration

L'étape 1 appelle Brevo **directement depuis la route serveur** `/api/preinscription`,
hébergée sur Vercel. Il n'y a ni automatisation externe, ni serveur tiers à maintenir.

## Trois actions à chaque préinscription

1. **Confirmation au prospect** — gabarit `confirmation-prospect.html`.
2. **Notification à Renaissance** — gabarit `notification-renaissance.html`.
3. **Ajout du contact à une liste** — *facultatif*, seulement si `BREVO_LIST_ID` est défini.

Le lead est enregistré dans Supabase **avant** ces appels. Une panne Brevo ne perd donc
jamais une demande : le visiteur voit sa page de remerciement, et l'échec est tracé dans
la table `events` pour être rejoué.

## Variables (Vercel, côté serveur — aucun `NEXT_PUBLIC_`)

| Variable | Obligatoire | Rôle |
|---|---|---|
| `BREVO_API_KEY` | oui | Clé API v3. À marquer **Sensitive**. |
| `BREVO_SENDER` | oui | Expéditeur **vérifié** dans Brevo. Accepte `Renaissance <contact@exemple.fr>` ou `contact@exemple.fr`. |
| `NOTIFICATION_EMAIL` | oui | Adresse qui reçoit les notifications. |
| `BREVO_TEMPLATE_CONFIRMATION` | non | Identifiant du gabarit. Sans lui, un e-mail de repli est envoyé. |
| `BREVO_TEMPLATE_NOTIFICATION` | non | Idem pour la notification. |
| `BREVO_LIST_ID` | non | Liste des préinscrits. Sans valeur, l'ajout est **sauté sans erreur**. |

## Mise en place

1. Créer les deux modèles dans Brevo → Transactionnel → Modèles, à partir des fichiers
   HTML de ce dossier.
2. Noter leurs identifiants et les reporter dans Vercel.
3. Vérifier l'expéditeur (SPF / DKIM sur le domaine), sinon les e-mails partent en spam.

## Variables attendues par les gabarits

- **confirmation-prospect.html** : `prenom`, `formation`.
- **notification-renaissance.html** : `prenom`, `nom`, `email`, `telephone`, `formation`,
  `zone`, `disponibilites`, `source`, `message`, `leadId`.

## Comportement sans gabarit

Si `BREVO_TEMPLATE_*` n'est pas défini, la route envoie un e-mail de repli en HTML
simple plutôt que de ne rien envoyer : un prospect qui ne reçoit aucune confirmation
croit que sa demande s'est perdue. Les gabarits restent préférables, mais leur absence
ne crée pas de silence.

## Journal des envois

Chaque préinscription écrit dans `events` :
`brevo.confirmation.sent|failed`, `brevo.notification.sent|failed`,
`brevo.contact.added|skipped|failed`, avec la raison en cas d'échec.
