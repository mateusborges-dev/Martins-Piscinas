"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Cinematic() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[70vh] min-h-[480px] items-center justify-center overflow-hidden bg-navy"
    >
      <div ref={imageRef} className="absolute inset-0 -z-10 scale-110">
        <Image
          src="/images/pool-aerial-trees.jpg"
          alt="Vista aérea de piscina cercada por paisagismo, imagem ilustrativa"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-[5] bg-navy/55" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="font-display text-2xl font-semibold leading-snug text-white sm:text-3xl lg:text-4xl">
          Mais que uma piscina. Um novo jeito de viver seus melhores momentos.
        </p>
      </div>
    </section>
  );
}
