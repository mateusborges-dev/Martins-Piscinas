"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactNode, Ref } from "react";
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

type RevealOnScrollPassthrough = Omit<
  ComponentPropsWithoutRef<"div">,
  keyof RevealOnScrollProps
>;

export function RevealOnScroll({
  children,
  as: Tag = "div",
  className,
  y,
  stagger,
  delay,
  ...rest
}: RevealOnScrollProps & RevealOnScrollPassthrough) {
  const ref = useScrollReveal<HTMLElement>({ y, stagger, delay });

  return (
    <Tag ref={ref as Ref<never>} className={cn(className)} {...rest}>
      {children}
    </Tag>
  );
}
