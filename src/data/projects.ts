import type { Project } from "@/types";

// A Martins Piscinas ainda não enviou fotografias reais de projetos
// concluídos. Enquanto isso, o carrossel usa fotografia ilustrativa (todas
// com illustrative: true e sem local informado, já que nenhuma cidade ou
// endereço de obra foi confirmado). Quando o cliente enviar fotos reais,
// coloque os arquivos em `public/images/projetos/` e atualize os campos
// abaixo — troque `illustrative` para `false` apenas para projetos
// comprovadamente executados pela empresa, com local confirmado.
export const projects: Project[] = [
  {
    id: "piscina-lazer-familiar",
    title: "Piscina de lazer familiar",
    description:
      "Um projeto pensado para o dia a dia da família, com espaço de convívio ao redor da água e acabamento acolhedor.",
    image: {
      src: "/images/pool-sunset-building.jpg",
      alt: "Piscina residencial com iluminação de fim de tarde, imagem ilustrativa",
      width: 2000,
      height: 1333,
    },
    illustrative: true,
  },
  {
    id: "piscina-paisagismo-integrado",
    title: "Piscina integrada ao paisagismo",
    description:
      "A piscina dialoga com o paisagismo do entorno, criando um ambiente natural e relaxante para os momentos de lazer.",
    image: {
      src: "/images/pool-aerial-trees.jpg",
      alt: "Vista aérea de piscina cercada por paisagismo, imagem ilustrativa",
      width: 2000,
      height: 1333,
    },
    illustrative: true,
  },
  {
    id: "piscina-residencial-contemporanea",
    title: "Piscina residencial contemporânea",
    description:
      "Linhas contemporâneas pensadas para complementar a arquitetura da casa e valorizar a área externa.",
    image: {
      src: "/images/pool-modern-house.jpg",
      alt: "Piscina integrada a residência de arquitetura contemporânea, imagem ilustrativa",
      width: 2000,
      height: 1333,
    },
    illustrative: true,
  },
  {
    id: "piscina-acabamento-premium",
    title: "Piscina com acabamento premium",
    description:
      "Atenção aos detalhes em cada etapa, do revestimento ao tratamento da água, para um resultado sempre cristalino.",
    image: {
      src: "/images/pool-topdown.jpg",
      alt: "Piscina vista de cima com bordas bem definidas, imagem ilustrativa",
      width: 2000,
      height: 1333,
    },
    illustrative: true,
  },
];
