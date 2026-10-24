"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Lightbox } from "@/components/ui/Lightbox";
import { galleryImages } from "@/data/company";

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="projetos" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Portfólio"
          title="Projetos que inspiram."
          description="Galeria preparada para receber as fotografias reais dos projetos da Martins Piscinas. As imagens abaixo são ilustrativas."
        />

        <RevealOnScroll
          as="div"
          className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
          stagger={0.08}
        >
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative aspect-square overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aqua"
              aria-label={`Ampliar imagem: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 23vw, 45vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-navy/0 transition-colors duration-300 group-hover:bg-navy/30">
                <Expand className="h-6 w-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              {image.illustrative && (
                <span className="absolute bottom-2 left-2 rounded-full bg-navy/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white/90">
                  Ilustrativa
                </span>
              )}
            </button>
          ))}
        </RevealOnScroll>
      </Container>

      {activeIndex !== null && (
        <Lightbox
          images={galleryImages}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </section>
  );
}
