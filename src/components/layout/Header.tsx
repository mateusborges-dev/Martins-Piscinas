"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navLinks, company } from "@/data/company";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => setMobileOpen(false)}
        className={cn(
          "fixed inset-x-0 top-20 bottom-0 z-40 bg-navy/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || mobileOpen
            ? "bg-white/95 shadow-[0_4px_30px_rgba(6,27,70,0.08)] backdrop-blur-md"
            : "bg-gradient-to-b from-black/35 to-transparent"
        )}
      >
        <Container className="relative z-10 flex h-20 items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt={company.name}
            width={48}
            height={48}
            className="h-11 w-11 rounded-full object-cover sm:h-12 sm:w-12"
            priority
          />
          <span
            className={cn(
              "font-display text-sm font-semibold leading-tight sm:text-base",
              scrolled || mobileOpen ? "text-navy" : "text-white"
            )}
          >
            Martins Piscinas
            <span className="block text-xs font-normal opacity-80">Aguazul LEM</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors",
                scrolled ? "text-navy/80 hover:text-ocean" : "text-white/90 hover:text-white"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            href={buildWhatsAppUrl(defaultWhatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-xs"
          >
            Solicitar orçamento
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
            scrolled || mobileOpen ? "text-navy" : "text-white"
          )}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "relative z-10 overflow-hidden bg-white shadow-[0_20px_40px_rgba(6,27,70,0.12)] transition-[max-height,opacity] duration-400 ease-in-out lg:hidden",
          mobileOpen ? "max-h-[34rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <Container className="flex flex-col gap-1 pb-12 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-navy/90 transition-colors hover:bg-mist"
            >
              {link.label}
            </a>
          ))}
          <Button
            href={buildWhatsAppUrl(defaultWhatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full"
          >
            Solicitar orçamento
          </Button>
        </Container>
      </div>
      </header>
    </>
  );
}
