import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="sobre" className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <RevealOnScroll as="div" className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_30px_60px_rgba(6,27,70,0.15)]">
            <Image
              src="/images/pool-modern-house.jpg"
              alt="Piscina integrada a residência de arquitetura contemporânea, imagem ilustrativa"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-full border border-aqua/40 sm:block" aria-hidden="true" />
        </RevealOnScroll>

        <RevealOnScroll as="div" className="order-1 lg:order-2" stagger={0.15}>
          <SectionHeading
            eyebrow="Sobre a Martins Piscinas"
            title="Cada piscina conta uma história. A nossa missão é cuidar da sua."
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-navy/70 sm:text-lg">
            <p>
              A Martins Piscinas Aguazul LEM atua em Luís Eduardo Magalhães e região,
              oferecendo construção e manutenção de piscinas com atenção próxima a cada
              cliente, do primeiro contato à entrega do projeto.
            </p>
            <p>
              Nosso trabalho é conduzido com organização, pontualidade e cuidado com os
              detalhes — valores que orientam cada etapa, da execução ao pós-obra.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
