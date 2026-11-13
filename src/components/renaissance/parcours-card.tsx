import Image from "next/image";
import Link from "next/link";

type ParcoursCardProps = {
  number: string;
  type: string;
  title: string;
  description: string;
  href: string;
  image: { src: string; alt: string };
};

export function ParcoursCard({ number, type, title, description, href, image }: ParcoursCardProps) {
  return (
    <article className="group min-w-0">
      <div className="relative h-[310px] overflow-hidden bg-[#d9d8d0] sm:h-[410px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 750px) 100vw, 33vw"
          className="object-cover saturate-[.68] transition-transform duration-[750ms] group-hover:scale-105"
        />
        {/* Voile de lisibilité sur photo (repris de la maquette) */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 bg-[linear-gradient(0deg,rgba(0,0,0,.29),transparent_50%)]"
        />
        <span className="absolute left-6 top-[23px] z-20 font-serif text-[30px] text-white">
          {number}
        </span>
        <span className="absolute bottom-[22px] left-[25px] z-20 text-[10px] uppercase tracking-[0.18em] text-white">
          {type}
        </span>
      </div>
      <div className="flex items-start justify-between gap-3 pt-[27px]">
        <div>
          <h3 className="mb-[10px] font-serif text-[34px] font-normal leading-[1.1]">{title}</h3>
          <p className="text-[12px] leading-[1.85] text-[#777e76]">{description}</p>
        </div>
        <Link
          href={href}
          aria-label={`Se renseigner : ${title}`}
          className="grid size-[42px] flex-none place-items-center rounded-full border border-[#b9beb7] text-[20px] transition-colors hover:bg-forest hover:text-white"
        >
          ↗
        </Link>
      </div>
    </article>
  );
}
