import { Clock, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { InstagramIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { businessHours, company } from "@/data/company";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

export function ContactLocation() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    company.address.full
  )}&output=embed`;

  return (
    <section id="contato" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Contato" title="Fale com a gente." />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll as="div" className="space-y-8" stagger={0.15}>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-ocean">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-navy">Endereço</h3>
                <p className="mt-1 text-sm leading-relaxed text-navy/70 sm:text-base">
                  {company.address.full}
                </p>
                <a
                  href={company.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-ocean hover:text-blue"
                >
                  Abrir no Google Maps
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-ocean">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-navy">WhatsApp</h3>
                <a
                  href={buildWhatsAppUrl(defaultWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-navy/70 hover:text-ocean sm:text-base"
                >
                  {company.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-ocean">
                <InstagramIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-navy">Instagram</h3>
                <a
                  href={company.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-navy/70 hover:text-ocean sm:text-base"
                >
                  {company.instagram.handle}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-ocean">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-navy">
                  Horário de atendimento
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-navy/70 sm:text-base">
                  {businessHours.map((entry) => (
                    <li key={entry.days} className="flex justify-between gap-6">
                      <span>{entry.days}</span>
                      <span className="text-right text-navy/60">
                        {entry.hours}
                        {entry.note ? ` (${entry.note})` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button
              variant="whatsapp"
              href={buildWhatsAppUrl(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chamar no WhatsApp
            </Button>
          </RevealOnScroll>

          <RevealOnScroll as="div">
            <div className="h-full min-h-[360px] overflow-hidden rounded-3xl border border-navy/10 shadow-[0_20px_50px_rgba(6,27,70,0.08)]">
              <iframe
                title={`Mapa de localização — ${company.name}`}
                src={mapSrc}
                className="h-full w-full"
                style={{ border: 0, minHeight: 360 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
