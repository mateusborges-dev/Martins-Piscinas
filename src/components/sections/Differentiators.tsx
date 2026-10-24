import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { differentiators } from "@/data/company";

export function Differentiators() {
  return (
    <section id="diferenciais" className="bg-mist py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Por que a Martins Piscinas"
          title="Diferenciais que fazem a diferença no resultado final."
        />

        <RevealOnScroll
          as="div"
          className="mt-14 grid gap-8 sm:grid-cols-2"
          stagger={0.12}
        >
          {differentiators.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-3xl bg-white p-7 shadow-[0_20px_50px_rgba(6,27,70,0.08)] sm:p-8"
            >
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-ocean" aria-hidden="true" />
              <div>
                <h3 className="font-display text-lg font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70 sm:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
