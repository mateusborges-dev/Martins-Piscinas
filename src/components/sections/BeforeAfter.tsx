import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { beforeAfterPairs } from "@/data/company";

export function BeforeAfter() {
  const pair = beforeAfterPairs[0];
  if (!pair) return null;

  return (
    <section className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 sm:px-8 lg:grid-cols-[35fr_65fr] lg:items-center lg:gap-16 lg:px-12">
        <RevealOnScroll as="div" className="lg:pr-4">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean">
            Antes e depois
          </span>
          <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.25rem]">
            Do comum ao
            <br />
            <span className="text-[#00BFEF]">Extraordinário</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-navy/70 sm:text-lg">
            Veja como uma piscina pode transformar completamente um ambiente. Cada
            detalhe faz a diferença para criar espaços de beleza, conforto e
            tranquilidade.
          </p>
        </RevealOnScroll>

        <RevealOnScroll as="div" delay={0.1}>
          <BeforeAfterSlider
            pair={pair}
            className="h-[320px] w-full sm:h-[420px] lg:h-[540px] xl:h-[580px]"
          />
          {pair.caption && (
            <p className="mt-4 text-center text-xs text-navy/45 lg:text-left">
              {pair.caption}
            </p>
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}
