"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { serviceCategories, company } from "@/data/company";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import type { ServiceCategory } from "@/types";

function FadeImage({ src, alt }: { src: string; alt: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [src]);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 55vw, 90vw"
      className={cn(
        "object-cover transition-opacity duration-500 ease-out motion-safe:group-hover:scale-105 motion-safe:transition-transform motion-safe:duration-700",
        visible ? "opacity-100" : "opacity-0"
      )}
    />
  );
}

export function Services() {
  const [activeId, setActiveId] = useState(serviceCategories[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = serviceCategories.findIndex((c) => c.id === activeId);
  const active: ServiceCategory = serviceCategories[activeIndex] ?? serviceCategories[0];

  const whatsappMessage = active.confirmed
    ? `Olá! Vim pelo site da ${company.shortName} e gostaria de solicitar um orçamento para: ${active.title}.`
    : `Olá! Vim pelo site da ${company.shortName}. Gostaria de saber se vocês oferecem o serviço de: ${active.title}.`;

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + serviceCategories.length) % serviceCategories.length;
    setActiveId(serviceCategories[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="servicos" className="relative overflow-hidden bg-navy py-24 sm:py-32">
      <Image
        src="/images/pool-modern-house.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-navy/85" aria-hidden="true" />

      <Container className="relative">
        <RevealOnScroll as="div" className="mx-auto max-w-2xl text-center" stagger={0.12}>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Soluções completas para
            <br />
            <span className="text-aqua">Todas as necessidades</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
            Da construção à manutenção, conheça as soluções para cuidar da sua piscina.
          </p>
        </RevealOnScroll>

        <RevealOnScroll
          as="div"
          role="tablist"
          aria-label="Categorias de serviços"
          className="mt-14 flex gap-5 overflow-x-auto px-1 pb-2 sm:gap-6 lg:flex-wrap lg:justify-center lg:overflow-visible"
          stagger={0.06}
        >
          {serviceCategories.map((category, index) => {
            const isActive = category.id === activeId;
            return (
              <button
                key={category.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${category.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${category.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(category.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className="group flex w-20 shrink-0 flex-col items-center gap-3 rounded-2xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua sm:w-24"
              >
                <span
                  className={cn(
                    "relative h-20 w-20 overflow-hidden rounded-2xl ring-2 transition-all duration-300 sm:h-24 sm:w-24",
                    isActive
                      ? "scale-105 ring-aqua"
                      : "ring-white/15 group-hover:scale-[1.03] group-hover:ring-white/40"
                  )}
                >
                  <Image
                    src={category.image.src}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                  <span
                    className={cn(
                      "absolute inset-0 bg-aqua/15 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "text-center text-xs font-medium leading-tight tracking-wide transition-colors sm:text-sm",
                    isActive ? "text-aqua" : "text-white/70 group-hover:text-white"
                  )}
                >
                  {category.tabLabel}
                </span>
              </button>
            );
          })}
        </RevealOnScroll>

        <RevealOnScroll
          as="div"
          id={`panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          className="mt-10 rounded-[20px] border border-white/10 bg-navy p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10 lg:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-[40fr_60fr] lg:items-center lg:gap-14">
            <div>
              <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {active.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
                {active.description}
              </p>
              <ul className="mt-6 space-y-3">
                {active.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5 text-sm text-white/80 sm:text-base">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>

              {!active.confirmed && (
                <p className="mt-6 text-xs text-white/50">
                  Serviço ainda não confirmado pela empresa — consulte a disponibilidade.
                </p>
              )}

              <a
                href={buildWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-primary-hover sm:text-base"
              >
                {active.confirmed ? "Solicitar orçamento" : "Consultar disponibilidade"}
              </a>
            </div>

            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[20px] lg:aspect-[16/11]">
              <FadeImage key={active.id} src={active.image.src} alt={active.image.alt} />
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
