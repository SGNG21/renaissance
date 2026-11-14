import type { Metadata } from "next";
import { ACompleter } from "@/components/renaissance/a-completer";
import { PageHeader } from "@/components/renaissance/page-header";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment Renaissance traite les données personnelles recueillies sur ce site.",
};

export default function ConfidentialitePage() {
  return (
    <main>
      <PageHeader
        eyebrow="Données personnelles"
        titre="Politique de confidentialité"
        chapo="Comment vos données sont recueillies, utilisées et conservées."
      />

      <section className="container-site py-[60px] lg:py-[100px]">
        <div className="max-w-[760px] text-[14px] leading-[2] text-ink">
          <h2 className="mb-4 font-serif text-[32px] font-normal">Données recueillies</h2>
          <p className="text-sage">
            Le formulaire de préinscription recueille vos prénom, nom, adresse e-mail, téléphone,
            formation visée, commune ou département, disponibilités et votre message. Ces données
            servent uniquement à vous recontacter au sujet de votre demande.
          </p>

          <h2 className="mb-4 mt-12 font-serif text-[32px] font-normal">Consentement</h2>
          <p className="text-sage">
            Aucune donnée n&apos;est enregistrée sans votre consentement explicite, recueilli par
            une case à cocher. La date et la version du texte accepté sont conservées.
          </p>

          <h2 className="mb-4 mt-12 font-serif text-[32px] font-normal">Vos droits</h2>
          <p className="text-sage">
            Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
            d&apos;opposition et de portabilité sur vos données.
          </p>

          <ACompleter titre="Éléments à compléter" className="mt-12">
            Adresse de contact pour l&apos;exercice des droits, durée de conservation des données,
            liste des sous-traitants (hébergement, envoi d&apos;e-mails, automatisation), base
            légale retenue et modalités de réclamation auprès de la CNIL : à fournir et faire
            valider juridiquement avant la mise en ligne.
          </ACompleter>
        </div>
      </section>
    </main>
  );
}
