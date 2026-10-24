"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      node.style.opacity = "1";
      node.style.transform = "none";
      return;
    }

    const targets = node.children.length > 0 ? Array.from(node.children) : [node];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: options.y ?? 32 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.9,
          delay: options.delay ?? 0,
          stagger: options.stagger ?? 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: options.start ?? "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    }, node);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
