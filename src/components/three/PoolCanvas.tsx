"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { PoolScene } from "./PoolScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

interface PoolCanvasProps {
  onReady?: () => void;
}

export function PoolCanvas({ onReady }: PoolCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglOk, setWebglOk] = useState(true);
  const [isTouch, setIsTouch] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  const [active, setActive] = useState(true);
  const reducedMotion = usePrefersReducedMotion();
  const readyFired = useRef(false);

  useEffect(() => {
    setWebglOk(supportsWebGL());
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    const cores = navigator.hardwareConcurrency ?? 8;
    setLowPower(cores <= 4 || window.innerWidth < 640);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleCanvasCreated = () => {
    if (readyFired.current) return;
    readyFired.current = true;
    onReady?.();
  };

  useEffect(() => {
    if (!webglOk) onReady?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webglOk]);

  if (!webglOk) {
    return (
      <div ref={containerRef} className="absolute inset-0 -z-10">
        <Image
          src="/images/pool-sunset-building.jpg"
          alt="Piscina residencial de luxo ao entardecer, imagem ilustrativa"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/10" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10">
      <Canvas
        shadows={!lowPower}
        dpr={lowPower ? [1, 1.25] : [1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ fov: 42, near: 0.1, far: 60 }}
        frameloop={active ? "always" : "never"}
        onCreated={handleCanvasCreated}
      >
        <Suspense fallback={null}>
          <PoolScene
            reducedMotion={reducedMotion}
            isTouch={isTouch}
            lowPower={lowPower}
            active={active}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
