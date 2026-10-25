import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-primary text-navy shadow-[0_8px_30px_rgba(0,191,239,0.35)] hover:bg-primary-hover hover:shadow-[0_12px_40px_rgba(0,191,239,0.45)] hover:-translate-y-0.5",
  secondary:
    "bg-white/10 text-white border border-primary/70 backdrop-blur-sm hover:bg-primary hover:border-primary hover:text-navy hover:-translate-y-0.5",
  outline:
    "bg-transparent text-navy border border-navy/20 hover:border-primary hover:bg-primary hover:text-navy",
  whatsapp:
    "bg-whatsapp text-white shadow-[0_8px_24px_rgba(37,211,102,0.3)] hover:bg-whatsapp-hover hover:shadow-[0_12px_32px_rgba(37,211,102,0.4)] hover:-translate-y-0.5",
};

type Variant = keyof typeof variants;

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const styles = cn(baseStyles, variants[variant], className);

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a href={href} className={styles} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button className={styles} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
