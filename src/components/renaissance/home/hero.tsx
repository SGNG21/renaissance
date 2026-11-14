import Image from "next/image";
import { ArrowLink } from "@/ui/arrow-link";

export function Hero() {
  return (
    <section className="relative h-[670px] overflow-hidden bg-dark text-white sm:h-[730px] md:h-[min(790px,calc(100svh-134px))] md:min-h-[730px]">
      <div className="absolute inset-0 bg-[#3c4937] md:left-[26%] lg:left-[35%]">
        <Image
          src="/images/placeholders/maquette-1.webp"
          alt="Intérieur chaleureux aux matériaux naturels et à la lumière douce"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_48%] brightness-[.76] saturate-75"
        />
        {/* Voiles de lisibilité du texte sur la photo (repris de la maquette). */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,40,32,.88),rgba(20,40,32,.45)),linear-gradient(0deg,rgba(20,40,32,.48),transparent)] md:bg-[linear-gradient(90deg,var(--color-dark)_0%,rgba(20,40,32,.9)_5%,rgba(20,40,32,.14)_49%,rgba(20,40,32,.08)_100%)]"
        />
      </div>

      <div className="container-site relative z-10 flex h-full items-end md:items-center">
        <div className="w-full pb-28 pt-10 md:w-[74%] md:max-w-[750px] md:pb-[70px]">
          <div className="flex items-center gap-[19px] text-[10px] uppercase tracking-[0.22em] text-[#d0c4b3] before:block before:h-px before:w-[37px] before:bg-gold before:content-['']">
            Renaissance · Maison de formation
          </div>
          <h1 className="my-[25px] font-serif text-[58px] font-normal leading-[0.96] tracking-[-0.045em] sm:text-[length:clamp(58px,12vw,89px)] md:mb-[30px] md:mt-[37px] md:text-[length:clamp(65px,7.3vw,126px)]">
            Le sens
            <br />
            de <em className="not-italic text-gold-light">prendre soin.</em>
          </h1>
          <p className="max-w-[430px] text-[13px] leading-[2.1] text-[#e6e6df] md:text-[14px]">
            Il est des métiers que l&apos;on n&apos;exerce pas simplement. On les incarne. Donnez
            une nouvelle dimension à votre vocation, dans une maison pensée pour l&apos;humain.
          </p>
          <ArrowLink href="/formations" className="mt-[23px] text-[#f0e6d5]">
            Découvrir nos formations
          </ArrowLink>
        </div>
      </div>

      <div className="absolute bottom-[47px] left-[4%] z-10 flex items-center gap-4 text-[10px] tracking-[0.12em]">
        01
        <i className="block h-px w-[70px] bg-[#d2c4a8]" />
        03
      </div>
      <div className="absolute bottom-[45px] right-[4%] z-10 hidden text-[9px] tracking-[0.3em] text-white [writing-mode:vertical-rl] md:block md:rotate-180">
        L&apos;EXIGENCE AU SERVICE DE L&apos;HUMAIN
      </div>
    </section>
  );
}
