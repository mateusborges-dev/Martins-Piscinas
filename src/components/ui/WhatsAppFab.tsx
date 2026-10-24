"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

export function WhatsAppFab() {
  return (
    <a
      href={buildWhatsAppUrl(defaultWhatsAppMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp com a Martins Piscinas"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua sm:h-16 sm:w-16"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
    </a>
  );
}
