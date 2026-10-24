import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { stats } from "@/data/company";

export function Stats() {
  if (stats.length === 0) return null;

  return (
    <section className="bg-navy py-14 sm:py-16">
      <Container>
        <RevealOnScroll
          as="div"
          className="grid grid-cols-2 gap-8 sm:grid-cols-4"
          stagger={0.1}
        >
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <p className="font-display text-3xl font-semibold text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
