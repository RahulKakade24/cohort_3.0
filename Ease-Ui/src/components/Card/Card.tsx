import React, { useEffect, useRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { hoverAnimations } from "@/libs/animations/hoverAnimation";
import gsap from "gsap";

const cardVariants = cva(
  "rounded-lg transition-all duration-300 overflow-hidden",
  {
    variants: {
      variant: {
        light: "bg-white text-gray-800 shadow-lg hover:shadow-xl",
        dark: "bg-slate-800 text-white shadow-md hover:shadow-lg",
        outline: "border border-gray-300 bg-transparent text-gray-800 dark:border-gray-700",
      },
      size: {
        sm: "p-3 text-sm",
        md: "p-6 text-base",
        lg: "p-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "light",
      size: "md",
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
  title?: string;
  description?: string;
  image?: string;
  ratio?: "square" | "16:9" | "4:3";
  footer?: React.ReactNode;
  animate?: boolean;
  hoverAnimation?: keyof typeof hoverAnimations;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      asChild = false,
      title,
      description,
      children,
      className,
      variant,
      image,
      ratio = "16:9",
      size,
      footer,
      animate = false,
      hoverAnimation = "none",
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";
    const cardRef = useRef<HTMLDivElement | null>(null);
    const hoverCleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {
      if (!animate || !cardRef.current) return;
      gsap.fromTo(cardRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
    }, [animate]);

    const setRef = (node: HTMLElement | null) => {
      cardRef.current = node as HTMLDivElement | null;
      if (typeof ref === "function") ref(node as HTMLDivElement | null);
      else if (ref) ref.current = node as HTMLDivElement | null;
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
      if (hoverAnimation !== "none" && cardRef.current) {
        hoverCleanupRef.current?.();
        const cleanup = hoverAnimations[hoverAnimation]?.(cardRef.current);
        hoverCleanupRef.current = typeof cleanup === "function" ? cleanup : null;
      }
      onMouseEnter?.(event);
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      hoverCleanupRef.current?.();
      hoverCleanupRef.current = null;
      if (cardRef.current) hoverAnimations.reset(cardRef.current);
      onMouseLeave?.(event);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
      if (cardRef.current) gsap.to(cardRef.current, { scale: 0.98, duration: 0.1 });
      onMouseDown?.(event);
    };

    const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
      if (cardRef.current) gsap.to(cardRef.current, { scale: 1, duration: 0.16 });
      onMouseUp?.(event);
    };

    const imageRatio =
      ratio === "16:9" ? "aspect-video" :
      ratio === "4:3" ? "aspect-[4/3]" :
      "aspect-square";

    return (
      <Comp
        ref={setRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className={cn(cardVariants({ variant, size }), className)}
        role="article"
        {...props}
      >
        {image && (
          <div className={`${imageRatio} mb-4`}>
            <img src={image} alt={title || "Card image"} className="h-full w-full rounded-md object-cover" />
          </div>
        )}
        {title && <h3 className="mb-2 text-lg font-semibold text-inherit">{title}</h3>}
        {description && <p className="mb-4 text-inherit opacity-75">{description}</p>}
        {children}
        {footer && <div className="mt-4">{footer}</div>}
      </Comp>
    );
  }
);

Card.displayName = "Card";
export { Card, cardVariants };
