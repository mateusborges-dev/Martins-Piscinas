"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { company } from "@/data/company";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const heroMessage = `Olá! Vim pelo site da ${company.shortName} e gostaria de solicitar um orçamento para construção/manutenção de piscina.`;

export function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
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
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;
    // Some mobile browsers ignore the autoPlay attribute until play() is
    // called from a user-gesture-free effect after mount.
    video.play().catch(() => {
      // Autoplay blocked — the poster image underneath stays visible.
    });
  }, [reducedMotion]);

  const scrollToServices = () => {
    document.querySelector("#servicos")?.scrollIntoView({ behavior: "smooth" });
  };

  const showVideo = !reducedMotion && !videoError;

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[92vh] w-full items-center overflow-hidden bg-navy"
    >
      <Image
        src="/images/pool-sunset-building.jpg"
        alt="Piscina residencial de luxo ao entardecer, imagem ilustrativa"
        fill
        priority
        className="absolute inset-0 -z-10 object-cover"
      />

      {showVideo && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-700",
            videoReady ? "opacity-100" : "opacity-0"
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoError(true)}
          aria-hidden="true"
        >
          <source src="/video/pool-hero.mp4" type="video/mp4" />
        </video>
      )}

      <div
        className="absolute inset-0 -z-[5] bg-gradient-to-t from-navy via-navy/30 to-transparent"
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
