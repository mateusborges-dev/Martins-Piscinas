"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";
import { faqs } from "@/data/company";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="bg-mist py-24 sm:py-32">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Perguntas frequentes"
          title="Tire suas dúvidas antes de solicitar o orçamento."
        />

        <RevealOnScroll as="div" className="mt-10 space-y-3">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(6,27,70,0.06)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-sm font-semibold text-navy sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-ocean transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <p className="min-h-0 px-6 pb-5 text-sm leading-relaxed text-navy/70 sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
