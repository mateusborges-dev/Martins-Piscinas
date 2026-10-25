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

export interface ServiceCategory {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  highlights: string[];
  image: {
    src: string;
    alt: string;
  };
  /** True only for services the company has actually confirmed it offers today. */
  confirmed: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  summary: string;
  source: "google" | "whatsapp" | "instagram";
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

export type StatIcon = "trophy" | "pool" | "smile" | "certified";

export interface Stat {
  id: string;
  icon: StatIcon;
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

export interface Project {
  id: string;
  title: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
  /** Only set once the client confirms the real location of the project. */
  location?: string;
  /** Extra photos of the same project, shown in the detail view. */
  gallery?: { src: string; alt: string }[];
  /** True for stock/illustrative photography — never a real executed job. */
  illustrative: boolean;
}
