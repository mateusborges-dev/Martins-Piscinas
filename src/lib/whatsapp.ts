import { company } from "@/data/company";

export function buildWhatsAppUrl(message: string) {
  const encoded = encodeURIComponent(message);
  return `${company.whatsappBase}?text=${encoded}`;
}

export const defaultWhatsAppMessage = `Olá! Vim pelo site da ${company.shortName} e gostaria de solicitar um orçamento.`;

export function buildQuoteMessage(data: {
  name: string;
  phone: string;
  serviceLabel: string;
  message?: string;
}) {
  const lines = [
    `Olá! Vim pelo site da ${company.shortName} e gostaria de solicitar um orçamento.`,
    "",
    `Nome: ${data.name}`,
    `Telefone: ${data.phone}`,
    `Serviço de interesse: ${data.serviceLabel}`,
  ];

  if (data.message && data.message.trim().length > 0) {
    lines.push(`Mensagem: ${data.message.trim()}`);
  }

  return lines.join("\n");
}
