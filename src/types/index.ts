export type ServiceId = "construcao" | "manutencao" | "outro";

export interface Service {
  id: ServiceId;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  summary: string;
  source: "google" | "whatsapp" | "instagram";
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  illustrative?: boolean;
}

export interface BusinessHoursEntry {
  days: string;
  hours: string;
  note?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface Differentiator {
  id: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  order: number;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BeforeAfterPair {
  id: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  caption?: string;
}
