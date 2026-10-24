"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { company } from "@/data/company";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const PoolCanvas = dynamic(
  () => import("@/components/three/PoolCanvas").then((mod) => mod.PoolCanvas),
  { ssr: false }
);

const heroMessage = `Olá! Vim pelo site da ${company.shortName} e gostaria de solicitar um orçamento para construção/manutenção de piscina.`;

export function Hero() {
  const [sceneReady, setSceneReady] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!sceneReady) return;

    const targets = [titleRef.current, subtitleRef.current, actionsRef.current].filter(
      Boolean
    );

    if (reducedMotion) {
      targets.forEach((el) => el && (el.style.opacity = "1"));
      return;
    }

    gsap.fromTo(
      targets,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.18, ease: "power3.out" }
    );
  }, [sceneReady, reducedMotion]);

  const scrollToServices = () => {
    document.querySelector("#servicos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-[92vh] w-full items-center overflow-hidden bg-navy"
    >
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#bcd9ff] via-[#8fb9e8] to-[#061b46] transition-opacity duration-1000"
        style={{ opacity: sceneReady ? 1 : 0.6 }}
        aria-hidden="true"
      />

      <PoolCanvas onReady={() => setSceneReady(true)} />

      <div
        className="absolute inset-0 -z-[5] bg-gradient-to-t from-navy via-navy/30 to-transparent"
        aria-hidden="true"
      />

      <div
        className={`absolute inset-0 -z-[4] bg-navy transition-opacity duration-700 ${
          sceneReady ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 sm:px-8 lg:px-12">
        <h1
          ref={titleRef}
          className="max-w-3xl font-display text-4xl font-semibold leading-[1.1] text-white opacity-0 sm:text-5xl lg:text-6xl"
        >
          Transformamos sonhos em piscinas extraordinárias.
        </h1>
        <p
          ref={subtitleRef}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/85 opacity-0 sm:text-lg"
        >
          Construção e manutenção de piscinas com cuidado, qualidade e atenção aos
          detalhes em Luís Eduardo Magalhães e região.
        </p>
        <div ref={actionsRef} className="mt-10 flex flex-wrap items-center gap-4 opacity-0">
          <Button href={buildWhatsAppUrl(heroMessage)} target="_blank" rel="noopener noreferrer">
            Solicitar orçamento
          </Button>
          <Button variant="secondary" href="#servicos" onClick={(e) => {
            e.preventDefault();
            scrollToServices();
          }}>
            Conhecer nossos serviços
          </Button>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToServices}
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
      >
        <ChevronDown className="h-7 w-7 animate-bounce" aria-hidden="true" />
      </button>
    </section>
  );
}
