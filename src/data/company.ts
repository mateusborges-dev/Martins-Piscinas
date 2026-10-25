import type {
  BeforeAfterPair,
  BusinessHoursEntry,
  Differentiator,
  FaqItem,
  NavLink,
  ProcessStep,
  Service,
  ServiceCategory,
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

// As seis categorias abaixo compõem a vitrine interativa de serviços.
// Apenas "construcao" e "manutencao" têm confirmed: true — são os únicos
// serviços que a Martins Piscinas efetivamente oferece hoje. As demais
// aparecem como interface demonstrativa, com CTA de "consultar
// disponibilidade" em vez de "solicitar orçamento", e nenhuma garantia,
// certificação ou técnica específica é atribuída à empresa.
export const serviceCategories: ServiceCategory[] = [
  {
    id: "construcao",
    tabLabel: "Construção",
    title: "Construção de piscinas",
    description:
      "Transforme seu espaço com uma piscina planejada para proporcionar lazer, conforto e momentos especiais.",
    highlights: [
      "Planejamento alinhado ao espaço disponível",
      "Acompanhamento próximo em cada etapa da obra",
      "Atenção aos detalhes estruturais e de acabamento",
    ],
    image: {
      src: "/images/servicos/construcao.webp",
      alt: "Piscina residencial moderna em fase de construção",
    },
    confirmed: true,
  },
  {
    id: "renovacao",
    tabLabel: "Renovação",
    title: "Renovação de piscinas",
    description:
      "Conheça possibilidades para renovar a aparência e a experiência de utilização de uma piscina.",
    highlights: [
      "Atualização de revestimentos e acabamentos",
      "Modernização da aparência geral da piscina",
      "Avaliação da estrutura existente",
    ],
    image: {
      src: "/images/servicos/renovacao.webp",
      alt: "Piscina revitalizada com revestimento moderno",
    },
    confirmed: false,
  },
  {
    id: "manutencao",
    tabLabel: "Manutenção",
    title: "Manutenção de piscinas",
    description:
      "Cuidados para manter sua piscina em boas condições de utilização e conservação.",
    highlights: [
      "Cuidado contínuo com a qualidade da água",
      "Acompanhamento regular dos equipamentos",
      "Suporte para manter a piscina sempre pronta para uso",
    ],
    image: {
      src: "/images/servicos/manutencao.webp",
      alt: "Profissional realizando manutenção em piscina residencial",
    },
    confirmed: true,
  },
  {
    id: "cuidados-agua",
    tabLabel: "Cuidados com a água",
    title: "Cuidados com a água",
    description:
      "Conheça a importância do acompanhamento da qualidade da água e dos cuidados adequados.",
    highlights: [
      "Acompanhamento do equilíbrio químico da água",
      "Prevenção de problemas como turbidez e algas",
      "Orientações para manter a água própria para uso",
    ],
    image: {
      src: "/images/servicos/cuidados-agua.webp",
      alt: "Água de piscina cristalina com equipamento de análise",
    },
    confirmed: false,
  },
  {
    id: "reforma",
    tabLabel: "Reforma",
    title: "Reforma de piscinas",
    description:
      "Explore possibilidades de modernização de revestimentos, acabamentos e estrutura.",
    highlights: [
      "Modernização de revestimentos e estrutura",
      "Atualização de acabamentos e equipamentos",
      "Avaliação das condições atuais da piscina",
    ],
    image: {
      src: "/images/servicos/reforma.webp",
      alt: "Piscina passando por reforma arquitetônica",
    },
    confirmed: false,
  },
  {
    id: "inspecao",
    tabLabel: "Inspeção",
    title: "Inspeção de piscinas",
    description:
      "Conheça a importância da avaliação das condições da piscina e de seus equipamentos.",
    highlights: [
      "Avaliação das condições gerais da piscina",
      "Verificação de equipamentos e instalações",
      "Identificação de pontos de atenção",
    ],
    image: {
      src: "/images/servicos/inspecao.webp",
      alt: "Técnico verificando equipamentos de piscina",
    },
    confirmed: false,
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

// PENDENTE DE CONFIRMAÇÃO — os números e a certificação abaixo foram
// fornecidos como referência visual para a faixa de estatísticas, mas ainda
// NÃO foram validados pela Martins Piscinas. Confirmar com o cliente antes
// de publicar em produção; não apresentar como dados verificados até lá.
export const stats: Stat[] = [
  {
    id: "anos-experiencia",
    icon: "trophy",
    value: "10+",
    label: "Anos de experiência",
  },
  {
    id: "servicos-manutencao",
    icon: "pool",
    value: "Mais de 1.500",
    label: "Serviços de manutenção de piscinas",
  },
  {
    id: "satisfacao-cliente",
    icon: "smile",
    value: "98%",
    label: "Satisfação do Cliente",
  },
  {
    id: "tecnicos-certificados",
    icon: "certified",
    value: "Certificado",
    label: "Técnicos Especializados",
  },
];

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

// Par ilustrativo gerado por IA (não é uma obra real executada pela
// empresa) — por isso a seção exibe a legenda "Imagens ilustrativas
// geradas por IA." de forma visível, nunca apresentando o resultado como
// um projeto real concluído.
export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "transformacao-ilustrativa",
    before: {
      src: "/images/piscina-antes.png",
      alt: "Área externa simples antes de uma transformação ilustrativa de piscina",
    },
    after: {
      src: "/images/piscina-depois.png",
      alt: "Piscina extraordinária após uma transformação ilustrativa do mesmo espaço",
    },
    caption: "Imagens ilustrativas geradas por IA.",
  },
];

export const siteUrl = "https://martinspiscinasaguazul.com.br";
