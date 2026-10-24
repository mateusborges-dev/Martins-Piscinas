import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { testimonials } from "@/data/company";

export function Testimonials() {
  return (
    <section id="avaliacoes" className="bg-mist py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Depoimentos"
          title="A confiança de quem já conhece nosso trabalho."
          align="center"
          className="mx-auto"
        />

        <RevealOnScroll
          as="div"
          className="mt-14 grid gap-6 sm:grid-cols-2 sm:gap-8"
          stagger={0.15}
        >
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="relative rounded-3xl bg-white p-8 shadow-[0_20px_50px_rgba(6,27,70,0.08)] sm:p-10"
            >
              <Quote className="h-8 w-8 text-aqua" aria-hidden="true" />
              <blockquote className="mt-5 text-base leading-relaxed text-navy/80 sm:text-lg">
                {testimonial.summary}
              </blockquote>
              <figcaption className="mt-6 font-display text-sm font-semibold text-navy">
                {testimonial.name}
              </figcaption>
            </figure>
          ))}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
