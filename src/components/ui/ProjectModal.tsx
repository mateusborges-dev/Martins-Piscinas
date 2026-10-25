"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const photos = [project.image, ...(project.gallery ?? [])];
  const [photoIndex, setPhotoIndex] = useState(0);
  const hasMultiplePhotos = photos.length > 1;

  const goNext = useCallback(() => {
    setPhotoIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (!hasMultiplePhotos) return;
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeydown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev, hasMultiplePhotos]);

  const photo = photos[photoIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes do projeto: ${project.title}`}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/95 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-navy shadow-[0_40px_90px_rgba(0,0,0,0.4)] lg:max-h-[90vh] lg:grid-cols-[60fr_40fr]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-[260px] shrink-0 sm:h-[360px] lg:h-[min(90vh,560px)]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />

          {hasMultiplePhotos && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Próxima foto"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {photos.map((item, i) => (
                  <span
                    key={item.src}
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors",
                      i === photoIndex ? "bg-white" : "bg-white/40"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="overflow-y-auto p-6 text-white sm:p-8">
          <h3 className="font-display text-2xl font-semibold sm:text-3xl">{project.title}</h3>
          {project.location && (
            <p className="mt-2 text-sm text-white/70">{project.location}</p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
            {project.description}
          </p>
          {project.illustrative && (
            <p className="mt-6 text-xs text-white/50">
              Imagem ilustrativa — não representa uma obra real executada pela Martins
              Piscinas.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
