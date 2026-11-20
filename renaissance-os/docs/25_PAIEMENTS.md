# Paiement, devis et facturation : règles strictes

Les prix historiques 700/1490/890/800 € ne sont pas une grille validée de vente. Avant intégration paiement, valider prix, TVA, CGV, modalités d'acompte, remboursement, annulation, financements et rôle d'ERPNext comme registre de facturation.

Les paiements passent par un fournisseur contracté à définir ou existant, pas une clé Stripe inventée. Webhooks vérifiés cryptographiquement, événements idempotents, relectures asynchrones, rattachement au montant en vigueur et devise, aucune double inscription/facture. Voir enregistrement `PaymentReference` et mapping ERPNext à construire après inspection.

Scénarios : succès, échec, remboursement, paiement tardif, annulation session, webhooks dans le désordre, double livraison, callback falsifié et montant incohérent. La fermeture d'une session ne doit pas masquer un litige financier.
