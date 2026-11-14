import Image from "next/image";
import { Reveal } from "../reveal";
import { ArrowLink } from "@/ui/arrow-link";
import { Eyebrow } from "@/ui/eyebrow";
import { SectionTitle } from "@/ui/section-title";

export function Editorial() {
  return (
    <section
      id="approche"
      className="container-site grid grid-cols-1 items-center gap-[55px] py-[85px] lg:grid-cols-2 lg:gap-[10%] lg:py-[150px]"
    >
      <Reveal className="relative h-[420px] bg-[#ddd7c8] sm:h-[510px] lg:h-[630px]">
        <Image
          src="/images/placeholders/maquette-6.webp"
          alt="Espace lumineux et élégant propice à l'apprentissage"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover saturate-[.6]"
        />
        <span className="absolute right-[29px] top-[27px] text-[9px] uppercase tracking-[0.23em] text-white [writing-mode:vertical-rl]">
          Un cadre pour se révéler
        </span>
      </Reveal>

      <Reveal className="max-w-[545px]">
        <Eyebrow>04   /   Notre signature</Eyebrow>
        <SectionTitle>
          L&apos;exigence
          <br />
          dans le fond.
          <br />
          <i>La douceur</i>
          <br />
          dans la forme.
        </SectionTitle>
        <p className="my-[35px] max-w-[520px] text-[14px] leading-[2] text-sage">
          Une formation utile ne se résume pas à un programme. Elle doit aussi être une
          expérience : attentive, incarnée et tournée vers la réalité des métiers de
          l&apos;accompagnement.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-[35px] border-t border-line pt-[35px] sm:grid-cols-2">
          <div>
            <b className="font-serif text-[26px] font-normal">Transmission</b>
            <p className="text-[12px] leading-[1.8] text-[#777e76]">
              Des compétences directement mobilisables sur le terrain.
            </p>
          </div>
          <div>
            <b className="font-serif text-[26px] font-normal">Proximité</b>
            <p className="text-[12px] leading-[1.8] text-[#777e76]">
              Une attention portée aux parcours et aux projets individuels.
            </p>
          </div>
        </div>
        <ArrowLink href="/preinscription">Parlons de votre projet</ArrowLink>
      </Reveal>
    </section>
  );
}
