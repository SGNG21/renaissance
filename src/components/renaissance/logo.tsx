import Link from "next/link";
import { cn } from "@/lib/utils";

/** Wordmark provisoire en Italiana, à remplacer par le logo définitif. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Renaissance, accueil"
      className={cn("flex items-center gap-[11px] whitespace-nowrap", className)}
    >
      <span className="pr-[5px] font-serif text-[47px] leading-[0.8] tracking-[-0.11em]">R.</span>
      <span className="font-serif text-[25px] leading-[0.9] tracking-[0.055em]">
        RENAISSANCE
        <small className="mt-[7px] block font-sans text-[8px] font-semibold leading-normal tracking-[0.39em]">
          LA MAISON DES VOCATIONS
        </small>
      </span>
    </Link>
  );
}
