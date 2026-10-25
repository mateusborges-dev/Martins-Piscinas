"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { projects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

const AUTOPLAY_INTERVAL = 6000;

function ProjectCard({
  project,
  reducedMotion,
  onOpen,
}: {
  project: Project;
  reducedMotion: boolean;
  onOpen: () => void;
}) {
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    setVisible(false);
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id, reducedMotion]);

  return (
    <div
      aria-live="polite"
      className={cn(
        "absolute bottom-5 left-5 right-5 max-w-sm rounded-2xl border border-white/10 bg-navy/70 p-5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-500 ease-out sm:bottom-8 sm:left-8 sm:right-auto sm:p-6",
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      )}
    >
      <h3 className="font-display text-lg font-semibold sm:text-xl">{project.title}</h3>
      {project.location && (
        <p className="mt-1 text-xs text-white/70 sm:text-sm">{project.location}</p>
      )}
      <p className="mt-2 text-xs leading-relaxed text-white/80 sm:text-sm">
        {project.description}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {project.illustrative && (
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white/80">
            Imagem ilustrativa
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="mt-4 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-navy transition-colors hover:bg-primary-hover sm:text-sm"
      >
        Ver projeto
      </button>
    </div>
  );
}

export function Projects() {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const navigate = useCallback((next: number) => {
    setUserInteracted(true);
    setIndex(((next % projects.length) + projects.length) % projects.length);
  }, []);

  const goNext = useCallback(() => navigate(index + 1), [navigate, index]);
  const goPrev = useCallback(() => navigate(index - 1), [navigate, index]);

  useEffect(() => {
    if (reducedMotion || paused || modalOpen || userInteracted) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % projects.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [reducedMotion, paused, modalOpen, userInteracted]);

  const project = projects[index];

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  return (
    <section id="projetos" className="bg-white py-24 sm:py-32">
      <Container>
        <RevealOnScroll
          as="div"
          className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between"
          stagger={0.1}
        >
          <div>
            <span className="inline-block rounded-full bg-mist px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-navy/60">
              Projetos mais recentes
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Feito com paixão.
              <br />
              <span className="text-aqua">Construído para inspirar.</span>
            </h2>
          </div>

          <div className="flex items-end justify-between gap-6 sm:max-w-sm sm:flex-col sm:items-end">
            <p className="text-sm leading-relaxed text-navy/70 sm:text-right sm:text-base">
              Conheça nossa galeria de piscinas e descubra como diferentes estilos e
              ambientes podem transformar espaços de lazer e convivência.
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Projeto anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition-all hover:scale-105 hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Próximo projeto"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition-all hover:scale-105 hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll as="div" delay={0.1} className="mt-10">
          <div
            className="relative h-[380px] w-full touch-pan-y overflow-hidden rounded-2xl sm:h-[460px] lg:h-[600px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {projects.map((item, i) => (
              <div
                key={item.id}
                aria-hidden={i !== index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-out",
                  i === index ? "opacity-100" : "pointer-events-none opacity-0"
                )}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ))}

            <div
              className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/10 to-transparent"
              aria-hidden="true"
            />

            <ProjectCard
              key={project.id}
              project={project}
              reducedMotion={reducedMotion}
              onOpen={() => setModalOpen(true)}
            />

            <div className="absolute right-5 top-5 flex gap-1.5 sm:right-8 sm:top-8">
              {projects.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(i)}
                  aria-label={`Ir para o projeto: ${item.title}`}
                  aria-current={i === index}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                  )}
                />
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </Container>

      {modalOpen && <ProjectModal project={project} onClose={() => setModalOpen(false)} />}
    </section>
  );
}
