"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import type { BeforeAfterPair } from "@/types";

interface BeforeAfterSliderProps {
  pair: BeforeAfterPair;
}

export function BeforeAfterSlider({ pair }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, ratio)));
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(event.clientX);
  };

  const stopDragging = () => {
    draggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label={`Comparação antes e depois${pair.caption ? `: ${pair.caption}` : ""}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerLeave={stopDragging}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
        if (event.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
      }}
      className="relative aspect-[4/3] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-[2rem] shadow-[0_30px_60px_rgba(6,27,70,0.15)] sm:aspect-[16/10]"
    >
      <Image
        src={pair.after.src}
        alt={pair.after.alt}
        fill
        sizes="(min-width: 1024px) 60vw, 90vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={pair.before.src}
          alt={pair.before.alt}
          fill
          sizes="(min-width: 1024px) 60vw, 90vw"
          className="object-cover"
        />
      </div>

      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white"
        style={{ left: `${position}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lg">
          <MoveHorizontal className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <span className="absolute left-4 top-4 rounded-full bg-navy/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">
        Antes
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-navy/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">
        Depois
      </span>
    </div>
  );
}
