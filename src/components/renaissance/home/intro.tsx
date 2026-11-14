import Image from "next/image";
import { Reveal } from "../reveal";
import { ArrowLink } from "@/ui/arrow-link";
import { Eyebrow } from "@/ui/eyebrow";
import { SectionTitle } from "@/ui/section-title";

export function Intro() {
  return (
    <section
      id="philosophie"
      className="container-site grid grid-cols-1 items-center gap-[55px] py-[85px] lg:grid-cols-[1fr_1.1fr] lg:gap-[11%] lg:pb-[150px] lg:pt-[140px]"
    >
      <Reveal className="lg:pl-[7%]">
        <Eyebrow>01   /   L&apos;esprit Renaissance</Eyebrow>
        <SectionTitle className="text-[length:clamp(49px,10vw,76px)] lg:text-[length:clamp(52px,5.7vw,92px)]">
          Un nouveau
          <br />
          chapitre
          <br />
          commence <i>ici.</i>
        </SectionTitle>
        <p className="my-[30px] max-w-[520px] text-[14px] leading-[2] text-sage">
          Nous croyons aux secondes chances, aux parcours singuliers et aux vocations qui
          attendent le bon moment pour éclore. Notre ambition : vous transmettre les savoirs, la
          confiance et la posture nécessaires pour accompagner les autres avec justesse.
        </p>
        <ArrowLink href="/public-vise">Découvrir notre philosophie</ArrowLink>
        <p className="mt-[46px] font-serif text-[34px] text-[#a88d68]">
          Grandir, transmettre, accompagner.
        </p>
      </Reveal>

      <Reveal className="relative mx-3 h-[420px] bg-[#d3cdc0] sm:h-[520px] lg:mx-0 lg:h-[590px]">
        <Image
          src="/images/placeholders/maquette-2.webp"
          alt="Moment de convivialité et de partage"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover saturate-[.65]"
        />
        <div className="absolute -bottom-6 -right-[19px] flex size-[144px] w-[165px] items-center justify-center bg-forest p-5 text-center font-serif text-[26px] leading-[1.2] text-[#eee7db]">
          L&apos;humain
          <br />
          avant tout.
        </div>
        <div className="absolute -left-5 bottom-[35px] text-[10px] uppercase tracking-[0.2em] [writing-mode:vertical-rl] md:-left-[46px] md:rotate-180">
          01 / Notre philosophie
        </div>
      </Reveal>
    </section>
  );
}
