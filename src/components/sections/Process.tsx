import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { processSteps } from "@/data/company";

export function Process() {
  return (
    <section id="como-funciona" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Como funciona"
          title="Do primeiro contato à piscina pronta."
          align="center"
          className="mx-auto"
        />

        <RevealOnScroll
          as="div"
          className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.12}
        >
          {processSteps.map((step) => (
            <div key={step.id} className="relative text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy font-display text-lg font-semibold text-white">
                {step.order}
              </span>
              <h3 className="mt-5 font-display text-base font-semibold text-navy">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/70">
                {step.description}
              </p>
            </div>
          ))}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
