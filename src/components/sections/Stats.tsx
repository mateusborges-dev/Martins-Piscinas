import type { LucideIcon } from "lucide-react";
import { Trophy, Waves, Smile, UserCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { stats } from "@/data/company";
import type { StatIcon } from "@/types";

const icons: Record<StatIcon, LucideIcon> = {
  trophy: Trophy,
  pool: Waves,
  smile: Smile,
  certified: UserCheck,
};

export function Stats() {
  if (stats.length === 0) return null;

  return (
    <section className="w-full bg-[#E8F9FC] py-12 sm:py-14">
      <Container>
        <RevealOnScroll
          as="div"
          className="grid grid-cols-2 items-center gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-0"
          stagger={0.1}
        >
          {stats.map((stat) => {
            const Icon = icons[stat.icon];
            return (
              <div key={stat.id} className="flex items-center gap-3 sm:gap-4">
                <Icon
                  className="h-9 w-9 shrink-0 text-aqua sm:h-11 sm:w-11"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-display text-lg font-bold leading-tight text-navy sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-navy/60 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
