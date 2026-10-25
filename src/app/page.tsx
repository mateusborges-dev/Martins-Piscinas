import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Services } from "@/components/sections/Services";
import { Differentiators } from "@/components/sections/Differentiators";
import { Cinematic } from "@/components/sections/Cinematic";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { ContactLocation } from "@/components/sections/ContactLocation";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <BeforeAfter />
        <Services />
        <Differentiators />
        <Cinematic />
        <Projects />
        <Process />
        <Testimonials />
        <FAQ />
        <QuoteForm />
        <ContactLocation />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
