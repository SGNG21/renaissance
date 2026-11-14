import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Wordmark provisoire en Italiana, à remplacer par le logo définitif.
 *
 * Pas d'aria-label : il ne reprenait pas le texte visible, ce que WCAG 2.5.3
 * interdit. Le monogramme « R. » est décoratif, donc masqué aux lecteurs
 * d'écran ; le nom accessible du lien devient son texte visible.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-[11px] whitespace-nowrap", className)}
    >
      <span aria-hidden className="logo-mark pr-[5px] font-serif text-[39px] leading-[0.8] tracking-[-0.11em] md:text-[47px]">
        R.
      </span>
      <span className="logo-word font-serif text-[21px] leading-[0.9] tracking-[0.055em] md:text-[25px]">
        RENAISSANCE
        <small className="mt-[7px] block font-sans text-[8px] font-semibold leading-normal tracking-[0.39em]">
          LA MAISON DES VOCATIONS
        </small>
      </span>
    </Link>
  );
}
