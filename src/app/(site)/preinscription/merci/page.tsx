import type { Metadata } from "next";
import { PageHeader } from "@/components/renaissance/page-header";
import { ArrowLink } from "@/ui/arrow-link";

export const metadata: Metadata = {
  title: "Demande envoyée",
  description: "Votre demande de préinscription a bien été enregistrée.",
  robots: { index: false, follow: false },
};

/** Page de remerciement, cible de la conversion (cahier technique, section 6). */
export default function MerciPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Demande envoyée"
        titre={
          <>
            Merci.
            <br />
            Nous vous <i>recontactons.</i>
          </>
        }
        chapo="Votre demande est bien enregistrée. Nous revenons vers vous pour échanger sur votre projet."
      />

      <section className="container-site py-[85px] lg:py-[120px]">
        <div className="max-w-[640px] text-[14px] leading-[2] text-sage">
          <p>
            Vous allez recevoir un e-mail de confirmation. S&apos;il n&apos;arrive pas, pensez à
            vérifier vos courriers indésirables.
          </p>
          <p className="mt-6">
            Vous pouvez à tout moment demander la suppression de vos données : les modalités
            figurent dans notre politique de confidentialité.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
          <ArrowLink href="/formations">Revoir les parcours</ArrowLink>
          <ArrowLink href="/informations-pratiques">Informations pratiques</ArrowLink>
          <ArrowLink href="/">Retour à l&apos;accueil</ArrowLink>
        </div>
      </section>
    </main>
  );
}
