import { Reveal } from "../reveal";
import { Button } from "@/ui/button";
import { Eyebrow } from "@/ui/eyebrow";
import { SectionTitle } from "@/ui/section-title";
import Link from "next/link";

/**
 * Section de bascule vers la préinscription.
 * Le formulaire lui-même vit sur /preinscription (cahier technique, section 4) :
 * il sera relié à la route serveur, à n8n et à Brevo au point 7.
 */
export function Contact() {
  return (
    <section id="contact" className="bg-ivory py-[85px] lg:py-[140px]">
      <div className="container-site grid grid-cols-1 items-start gap-[55px] lg:grid-cols-2 lg:gap-[12%]">
        <Reveal>
          <Eyebrow>05   /   Votre nouvelle étape</Eyebrow>
          <SectionTitle className="mb-9">
            Et si tout
            <br />
            commençait
            <br />
            <i>aujourd&apos;hui ?</i>
          </SectionTitle>
          <p className="max-w-[520px] text-[14px] leading-[2] text-sage">
            Racontez-nous votre projet. Nous pourrons vous orienter vers le parcours qui
            correspond à vos envies et à votre situation.
          </p>
          <div className="mt-8 text-[11px] leading-[1.8] tracking-[0.03em]">
            <strong>Renaissance</strong>
            <br />
            Formations aux métiers de l&apos;accompagnement
            <br />
            <span>Informations et préinscriptions sur demande</span>
          </div>
        </Reveal>

        <Reveal className="bg-paper p-[25px] sm:p-[30px] lg:p-[47px]">
          <h2 className="mb-8 font-serif text-[36px] font-normal">Parlons de votre avenir.</h2>
          <p className="mb-8 text-[13px] leading-[1.9] text-sage">
            Remplissez le formulaire de préinscription : identité, formation visée, commune et
            disponibilités. Nous revenons vers vous pour en discuter.
          </p>
          <Button asChild>
            <Link href="/preinscription">
              Demander des informations
              <span aria-hidden>↗</span>
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
