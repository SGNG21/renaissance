import type { Metadata } from "next";
import { ACompleter } from "@/components/renaissance/a-completer";
import { PageHeader } from "@/components/renaissance/page-header";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Renaissance.",
};

/**
 * Seule page où la raison sociale « Villa Renaissance » apparaît
 * (cahier technique, section 1).
 */
export default function MentionsLegalesPage() {
  return (
    <main>
      <PageHeader eyebrow="Informations légales" titre="Mentions légales" />

      <section className="container-site py-[60px] lg:py-[100px]">
        <div className="max-w-[760px] text-[14px] leading-[2] text-ink">
          <h2 className="mb-4 font-serif text-[32px] font-normal">Éditeur du site</h2>
          <p className="text-sage">
            Villa Renaissance, SAS
            <br />
            SIREN 130 903 099
            <br />
            84 avenue des Chaumes, 89330 Piffonds
          </p>

          <h2 className="mb-4 mt-12 font-serif text-[32px] font-normal">Conception</h2>
          <p className="text-sage">POLIVIA</p>

          <h2 className="mb-4 mt-12 font-serif text-[32px] font-normal">Hébergement</h2>
          <p className="text-sage">
            Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
          </p>

          <h2 className="mb-4 mt-12 font-serif text-[32px] font-normal">Crédits visuels</h2>
          <p className="text-sage">
            Les visuels actuellement en ligne sont des illustrations générées par intelligence
            artificielle. Ils ne représentent ni les locaux, ni les bénéficiaires, ni les équipes
            de Renaissance, et seront remplacés par des photographies réelles.
          </p>

          <ACompleter titre="Informations à compléter" className="mt-12">
            Directeur de la publication, numéro de TVA intracommunautaire, numéro de déclaration
            d&apos;activité de formation, capital social, coordonnées de contact et, le cas
            échéant, certification Qualiopi : à fournir et faire valider juridiquement avant la
            mise en ligne.
          </ACompleter>
        </div>
      </section>
    </main>
  );
}
