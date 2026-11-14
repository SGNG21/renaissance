import { Contact } from "@/components/renaissance/home/contact";
import { Editorial } from "@/components/renaissance/home/editorial";
import { Formations } from "@/components/renaissance/home/formations";
import { Hero } from "@/components/renaissance/home/hero";
import { Intro } from "@/components/renaissance/home/intro";
import { Process } from "@/components/renaissance/home/process";
import { Quotation } from "@/components/renaissance/home/quotation";
import { Statement } from "@/components/renaissance/home/statement";
import { Territoires } from "@/components/renaissance/home/territoires";

/** Accueil : les 8 sections de la maquette validée. */
export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <Statement />
      <Formations />
      <Process />
      <Editorial />
      <Quotation />
      <Territoires />
      <Contact />
    </main>
  );
}
