import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { services } from "@/data/company";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { company } from "@/data/company";

export function Services() {
  return (
    <section id="servicos" className="bg-mist py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="O que fazemos"
          title="Soluções completas para sua piscina."
          description="Dois serviços confirmados hoje — a estrutura está pronta para crescer conforme novos serviços forem adicionados."
        />

        <RevealOnScroll
          as="div"
          className="mt-14 grid gap-8 md:grid-cols-2"
          stagger={0.15}
        >
          {services.map((service) => {
            const message = `Olá! Vim pelo site da ${company.shortName} e tenho interesse em: ${service.title}.`;
            return (
              <article
                key={service.id}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(6,27,70,0.08)] transition-shadow duration-500 hover:shadow-[0_30px_70px_rgba(6,27,70,0.15)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-xl font-semibold text-navy sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy/70 sm:text-base">
                    {service.description}
                  </p>
                  <a
                    href={buildWhatsAppUrl(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean transition-colors hover:text-blue"
                  >
                    Solicitar orçamento
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
