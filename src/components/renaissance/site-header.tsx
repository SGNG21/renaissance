"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { mainNav } from "./navigation";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-[75px] items-center justify-between border-b border-[#e9e6df] bg-paper px-[23px] md:h-[100px] md:px-[4.2%]">
      <Logo />

      <button
        type="button"
        aria-expanded={open}
        aria-controls="nav-principale"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((v) => !v)}
        className="border-0 bg-transparent text-[25px] text-ink md:hidden"
      >
        {open ? "×" : "☰"}
      </button>

      <nav
        id="nav-principale"
        className={`${
          open ? "flex" : "hidden"
        } absolute inset-x-0 top-[75px] flex-col items-stretch gap-5 border-b border-line bg-paper px-[25px] py-[30px] md:static md:flex md:flex-row md:items-center md:gap-[17px] md:border-0 md:p-0 lg:gap-[35px]`}
      >
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="text-[11px] font-bold uppercase tracking-[0.12em] transition-colors hover:text-[#a88d68] md:text-[9px] lg:text-[10px]"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/preinscription"
          onClick={() => setOpen(false)}
          className="inline-flex min-h-[51px] items-center justify-center gap-[25px] border border-forest bg-forest px-[25px] text-[10px] font-bold uppercase tracking-[0.13em] text-white transition-colors duration-250 hover:border-forest-hover hover:bg-forest-hover"
        >
          Construisons votre avenir
          <span aria-hidden>↗</span>
        </Link>
      </nav>
    </header>
  );
}
