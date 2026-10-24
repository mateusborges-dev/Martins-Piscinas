import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { InstagramIcon } from "@/components/ui/icons";
import { company, navLinks, services } from "@/data/company";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt={company.name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="font-display text-base font-semibold">
              Martins Piscinas
              <span className="block text-xs font-normal text-white/60">Aguazul LEM</span>
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-white/70">
            Construção e manutenção de piscinas em Luís Eduardo Magalhães, com cuidado,
            qualidade e atenção aos detalhes.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-aqua">
            Navegação
          </h3>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/75 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-aqua">
            Serviços
          </h3>
          <ul className="mt-5 space-y-3">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href="#servicos"
                  className="text-sm text-white/75 transition-colors hover:text-white"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-aqua">
            Contato
          </h3>
          <ul className="mt-5 space-y-4">
            <li>
              <a
                href={buildWhatsAppUrl(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-white/75 transition-colors hover:text-white"
              >
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden="true" />
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={company.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-white/75 transition-colors hover:text-white"
              >
                <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden="true" />
                {company.instagram.handle}
              </a>
            </li>
            <li>
              <a
                href={company.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-white/75 transition-colors hover:text-white"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden="true" />
                {company.address.full}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {company.name}. Todos os direitos reservados.
          </p>
          <p>Luís Eduardo Magalhães – BA</p>
        </Container>
      </div>
    </footer>
  );
}
