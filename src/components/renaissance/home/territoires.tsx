import Link from "next/link";
import { Reveal } from "../reveal";
import { zones } from "../zones";
import { Eyebrow } from "@/ui/eyebrow";
import { SectionTitle } from "@/ui/section-title";

export function Territoires() {
  return (
    <section id="territoires" className="bg-[#eae9e1] py-[70px] lg:py-[105px]">
      <div className="container-site">
        <Eyebrow>06 / Formation dans l&apos;Yonne</Eyebrow>
        <Reveal className="block justify-between gap-[60px] md:flex md:items-end">
          <SectionTitle className="my-[18px] md:mb-[45px]">
            Votre vocation.
            <br />
            <em className="font-normal text-[#a78b68]">Près de chez vous.</em>
          </SectionTitle>
          <p className="max-w-[520px] pb-[30px] text-[14px] leading-[2] text-sage md:pb-[45px]">
            Vous recherchez une formation dans les métiers de l&apos;accompagnement à Joigny, Sens,
            Auxerre ou dans l&apos;Yonne ? Découvrez les parcours proposés par Renaissance, les
            étapes pour candidater et les points à vérifier avant votre inscription.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-[2px] sm:grid-cols-2">
          {zones.map((z) => (
            <Link
              key={z.slug}
              href={`/formation-${z.slug}`}
              className="flex min-h-[195px] flex-col justify-between bg-[#faf8f1] p-[27px] transition-[background,transform] duration-300 hover:-translate-y-[3px] hover:bg-[#dfdbce] md:min-h-[230px] md:px-[42px] md:py-9"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#776651]">
                {z.num} — {z.label}
              </span>
              <strong className="font-serif text-[length:clamp(28px,3vw,46px)] font-normal leading-[1.12] text-forest">
                {z.titre}
              </strong>
              <small className="text-[12px] text-[#636b63]">
                {z.accroche}
                <b className="float-right text-[24px] font-normal" aria-hidden>
                  ↗
                </b>
              </small>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-[11px] text-[#626b65]">
          Les lieux, modalités et dates des prochaines sessions sont communiqués lors de la prise
          de contact. Aucune implantation locale supplémentaire n&apos;est présumée.
        </p>
      </div>
    </section>
  );
}
