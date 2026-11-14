import Link from "next/link";
import { Logo } from "./logo";
import { footerNav } from "./navigation";

export function SiteFooter() {
  return (
    <footer className="bg-[#10231d] pb-7 pt-[85px] text-[#f3f0e9]">
      <div className="container-site">
        <div className="block justify-between gap-[50px] pb-[45px] md:flex md:items-start md:pb-20">
          <div>
            <Logo className="[&_.logo-mark]:text-[60px] [&_.logo-word]:text-[34px]" />
            <p className="mt-[25px] max-w-[300px] text-[12px] leading-[2] text-[#b7c1b5]">
              Former avec exigence. Accompagner avec humanité. Donner aux vocations le cadre
              qu&apos;elles méritent.
            </p>
          </div>

          <div className="mt-[45px] flex gap-[25px] md:mt-0 md:gap-[55px] lg:gap-[75px]">
            <div>
              <h2 className="mb-5 text-[10px] uppercase tracking-[0.18em] text-[#c4ae8c]">
                Explorer
              </h2>
              {footerNav.explorer.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mb-[15px] block text-[12px] text-[#d0d8cf] hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div>
              <h2 className="mb-5 text-[10px] uppercase tracking-[0.18em] text-[#c4ae8c]">
                Vous accompagner
              </h2>
              {footerNav.accompagner.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mb-[15px] block text-[12px] text-[#d0d8cf] hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="block items-center justify-between gap-[18px] border-t border-[#355045] pt-[26px] text-[10px] text-[#96a69b] md:flex">
          <span className="my-[10px] block md:my-0">
            © {new Date().getFullYear()} Renaissance
          </span>
          <span className="my-[10px] block md:my-0">
            Conception digitale <strong>POLIVIA</strong>
          </span>
          <Link href="/mentions-legales" className="underline">
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
