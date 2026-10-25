"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { buildQuoteMessage } from "@/lib/whatsapp";
import { company } from "@/data/company";

const serviceOptions = [
  { value: "Construção de piscina", label: "Construção de piscina" },
  { value: "Manutenção de piscina", label: "Manutenção de piscina" },
  { value: "Outro / consultar disponibilidade", label: "Outro / consultar disponibilidade" },
];

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo."),
  phone: z
    .string()
    .trim()
    .min(10, "Informe um telefone válido com DDD.")
    .regex(/^[\d\s()+-]+$/, "Use apenas números, espaços e símbolos de telefone."),
  service: z.string().min(1, "Selecione um tipo de serviço."),
  message: z.string().trim().max(500, "Mensagem muito longa.").optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export function QuoteForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { service: serviceOptions[0].value },
  });

  const onSubmit = (data: QuoteFormValues) => {
    const message = buildQuoteMessage({
      name: data.name,
      phone: data.phone,
      serviceLabel: data.service,
      message: data.message,
    });
    const url = `${company.whatsappBase}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    reset({ ...data, name: "", phone: "", message: "" });
  };

  return (
    <section id="orcamento" className="bg-navy py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <RevealOnScroll as="div">
          <SectionHeading
            eyebrow="Orçamento"
            title="Sua piscina dos sonhos começa com uma conversa."
            description="Preencha os dados abaixo e envie diretamente pelo WhatsApp — sem burocracia, sem espera."
            light
          />
        </RevealOnScroll>

        <RevealOnScroll as="div">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-3xl bg-white p-8 shadow-[0_30px_70px_rgba(0,0,0,0.3)] sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="w-full rounded-xl border border-navy/15 px-4 py-3 text-navy outline-none transition-colors focus:border-aqua"
                  {...register("name")}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy">
                  Telefone
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(77) 9 9999-9999"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className="w-full rounded-xl border border-navy/15 px-4 py-3 text-navy outline-none transition-colors focus:border-aqua"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1.5 text-xs text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-navy">
                  Tipo de serviço
                </label>
                <select
                  id="service"
                  aria-invalid={Boolean(errors.service)}
                  className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-navy outline-none transition-colors focus:border-aqua"
                  {...register("service")}
                >
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
                  Mensagem (opcional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="w-full resize-none rounded-xl border border-navy/15 px-4 py-3 text-navy outline-none transition-colors focus:border-aqua"
                  {...register("message")}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" variant="whatsapp" className="mt-7 w-full">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Enviar pelo WhatsApp
            </Button>

            <p role="status" aria-live="polite" className="mt-3 text-center text-xs text-navy/50">
              {isSubmitSuccessful
                ? "WhatsApp aberto em uma nova aba com sua mensagem preenchida."
                : "O envio é feito diretamente pelo WhatsApp — não armazenamos seus dados."}
            </p>
          </form>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
