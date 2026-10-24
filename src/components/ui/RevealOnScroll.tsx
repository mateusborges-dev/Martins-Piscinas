"use client";

import type { ElementType, ReactNode, Ref } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  stagger?: number;
  delay?: number;
}

export function RevealOnScroll({
  children,
  as: Tag = "div",
  className,
  y,
  stagger,
  delay,
}: RevealOnScrollProps) {
  const ref = useScrollReveal<HTMLElement>({ y, stagger, delay });

  return (
    <Tag ref={ref as Ref<never>} className={cn(className)}>
      {children}
    </Tag>
  );
}
