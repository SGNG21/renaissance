import { Reveal } from "../reveal";

export function Quotation() {
  return (
    <section className="bg-[#deddd1] py-[100px] text-center">
      <Reveal className="container-site">
        <small className="text-[10px] uppercase tracking-[0.2em]">Notre conviction</small>
        <p className="mx-auto my-6 max-w-[950px] font-serif text-[length:clamp(31px,4.2vw,67px)] leading-[1.24]">
          « Prendre soin des autres commence par{" "}
          <em className="not-italic text-[#877c67]">croire en ce que l&apos;on peut devenir.</em> »
        </p>
        <small className="text-[10px] uppercase tracking-[0.2em]">Renaissance</small>
      </Reveal>
    </section>
  );
}
