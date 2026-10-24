import type {
  BeforeAfterPair,
  BusinessHoursEntry,
  Differentiator,
  FaqItem,
  GalleryImage,
  NavLink,
  ProcessStep,
  Service,
  Stat,
  Testimonial,
} from "@/types";

/**
 * Fonte única de verdade para dados da empresa.
 * Atualize somente aqui — nenhum outro componente deve conter
 * telefone, endereço, horários ou textos institucionais fixos.
 */
export const company = {
  name: "Martins Piscinas Aguazul LEM",
  shortName: "Martins Piscinas",
  tagline: "Manutenções e construções de piscinas",
  city: "Luís Eduardo Magalhães",
  state: "BA",
  address: {
    street: "Av. Salvador, 1676",
    complement: "Loteamento Mimoso D'Oeste I",
    city: "Luís Eduardo Magalhães",
    state: "BA",
    zip: "47850-037",
    full: "Av. Salvador, 1676 – Loteamento Mimoso D'Oeste I, Luís Eduardo Magalhães – BA, CEP 47850-037",
  },
  phoneDisplay: "(77) 98120-4919",
  phoneE164: "5577981204919",
  whatsappBase: "https://wa.me/5577981204919",
  instagram: {
    handle: "@martinscinas.lem",
    url: "https://www.instagram.com/martinscinas.lem",
  },
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Av. Salvador, 1676, Loteamento Mimoso D'Oeste I, Luís Eduardo Magalhães - BA, 47850-037"
    ),
} as const;

export const businessHours: BusinessHoursEntry[] = [
  { days: "Segunda-feira", hours: "08h às 18h" },
  { days: "Terça-feira", hours: "08h às 18h" },
  { days: "Quarta-feira", hours: "08h às 18h" },
  { days: "Quinta-feira", hours: "Horário a confirmar", note: "confirme pelo WhatsApp" },
  { days: "Sexta-feira", hours: "08h às 18h" },
  { days: "Sábado", hours: "Fechado" },
  { days: "Domingo", hours: "Fechado" },
];

export const navLinks: NavLink[] = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Contato", href: "#contato" },
];

export const services: Service[] = [
  {
    id: "construcao",
    title: "Construção de piscinas",
    description:
      "Projeto e execução completa da sua piscina, do planejamento ao acabamento, com atenção a cada detalhe estrutural e estético.",
    image: {
      src: "/images/pool-sunset-building.jpg",
      alt: "Piscina residencial de luxo ao entardecer, imagem ilustrativa",
    },
  },
  {
    id: "manutencao",
    title: "Manutenção de piscinas",
    description:
      "Cuidado contínuo para manter sua piscina sempre limpa, equilibrada e pronta para uso durante todo o ano.",
    image: {
      src: "/images/pool-topdown.jpg",
      alt: "Piscina com água cristalina vista de cima, imagem ilustrativa",
    },
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "jaqueline-lima",
    name: "Jaqueline Lima",
    summary:
      "Excelente atendimento, organização e pontualidade. Destacou o profissionalismo da equipe e a satisfação com o resultado final.",
    source: "google",
  },
  {
    id: "vitor-gomez",
    name: "Vitor Gomez",
    summary:
      "Boa experiência de ponta a ponta, com atenção aos detalhes, equipe capacitada e qualidade dos materiais utilizados.",
    source: "google",
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    src: "/images/pool-sunset-building.jpg",
    alt: "Piscina residencial com iluminação de fim de tarde",
    width: 2000,
    height: 1333,
    illustrative: true,
  },
  {
    id: "g2",
    src: "/images/pool-aerial-trees.jpg",
    alt: "Vista aérea de piscina cercada por paisagismo",
    width: 2000,
    height: 1333,
    illustrative: true,
  },
  {
    id: "g3",
    src: "/images/pool-modern-house.jpg",
    alt: "Piscina integrada a residência de arquitetura contemporânea",
    width: 2000,
    height: 1333,
    illustrative: true,
  },
  {
    id: "g4",
    src: "/images/pool-topdown.jpg",
    alt: "Piscina vista de cima com bordas bem definidas",
    width: 2000,
    height: 1333,
    illustrative: true,
  },
];

// Sem números reais confirmados pela empresa ainda — a seção de estatísticas
// só deve ser exibida quando este array for preenchido com dados verdadeiros.
export const stats: Stat[] = [];

export const differentiators: Differentiator[] = [
  {
    id: "atendimento-proximo",
    title: "Atendimento próximo",
    description:
      "Acompanhamos cada etapa do projeto de perto, com comunicação direta e clara com o cliente.",
  },
  {
    id: "atencao-aos-detalhes",
    title: "Atenção aos detalhes",
    description:
      "Do planejamento ao acabamento, cuidamos de cada detalhe estrutural e estético da sua piscina.",
  },
  {
    id: "cuidado-continuo",
    title: "Cuidado contínuo",
    description:
      "Manutenção regular para manter a água sempre limpa, equilibrada e pronta para uso.",
  },
  {
    id: "compromisso-com-prazos",
    title: "Compromisso com prazos",
    description:
      "Organização e pontualidade em cada fase da obra, do primeiro contato à entrega.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "contato",
    order: 1,
    title: "Contato",
    description:
      "Você nos chama pelo WhatsApp ou formulário e conta o que precisa para sua piscina.",
  },
  {
    id: "visita-avaliacao",
    order: 2,
    title: "Visita e avaliação",
    description:
      "Avaliamos o local e as necessidades do projeto para propor a melhor solução.",
  },
  {
    id: "execucao",
    order: 3,
    title: "Execução",
    description:
      "Construção ou manutenção realizada com atenção aos detalhes, do início ao acabamento.",
  },
  {
    id: "entrega-manutencao",
    order: 4,
    title: "Entrega e cuidado contínuo",
    description:
      "Piscina entregue pronta para uso, com suporte contínuo para mantê-la sempre em dia.",
  },
];

export const faqs: FaqItem[] = [
  {
    id: "como-solicitar-orcamento",
    question: "Como solicito um orçamento?",
    answer:
      "Basta chamar no WhatsApp ou preencher o formulário do site contando o que você precisa. Combinamos uma visita para avaliar o local e entender melhor o projeto.",
  },
  {
    id: "atende-regiao",
    question: "A Martins Piscinas atende em quais cidades?",
    answer:
      `Atendemos ${company.city} e região.`,
  },
  {
    id: "construcao-ou-manutencao",
    question: "Vocês fazem só construção ou também manutenção?",
    answer:
      "Fazemos os dois: construção de piscinas do planejamento ao acabamento, e manutenção contínua para manter a água sempre limpa e equilibrada.",
  },
  {
    id: "visita-antes-orcamento",
    question: "É preciso agendar uma visita antes de fechar o serviço?",
    answer:
      "Sim. Para construção e para boa parte dos serviços de manutenção, avaliamos o local pessoalmente antes de confirmar os detalhes do orçamento.",
  },
  {
    id: "horario-atendimento",
    question: "Qual o horário de atendimento?",
    answer:
      "Atendemos de segunda a sexta, das 08h às 18h (quinta-feira com horário a confirmar pelo WhatsApp). Sábados e domingos ficamos fechados.",
  },
];

// Nenhuma foto real de antes/depois foi fornecida ainda — o componente de
// slider existe e está pronto para uso, mas a seção só deve ser publicada na
// página quando este array receber fotos reais de projetos da empresa.
export const beforeAfterPairs: BeforeAfterPair[] = [];

export const siteUrl = "https://martinspiscinasaguazul.com.br";
