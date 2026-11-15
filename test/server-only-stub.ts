// `server-only` lève une erreur hors contexte serveur React.
// Les tests unitaires importent des modules serveur directement : ce stub les
// laisse passer. La protection reste entière dans l'application, où le vrai
// paquet est utilisé.
export {};
