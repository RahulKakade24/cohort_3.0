import { Slot } from "@radix-ui/react-slot";
import React, { useEffect, useRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import gsap from "gsap";
import { cn } from "@/libs/utils";
import { entranceAnimations } from "@/libs/animations/entranceAnimation";
import { hoverAnimations } from "@/libs/animations/hoverAnimation";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        dark: "bg-slate-900 text-white hover:bg-slate-800",
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
        secondary: "bg-indigo-500 hover:bg-indigo-600 text-white",
        destructive: "bg-red-700 text-white hover:bg-red-800",
        ok: "bg-green-500 text-white hover:bg-green-600",
        ghost: "bg-gray-50 hover:bg-gray-100 text-gray-700",
        link: "bg-transparent text-indigo-600 hover:underline",
        outline: "bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300",
      },
      size: {
        default: "px-9 py-3",
        sm: "px-4 py-2",
        lg: "px-14 py-4",
        xl: "px-16 py-4",
        icon: "w-12 h-12",
        full: "w-full h-12",
        auto: "w-auto h-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  animation?: keyof typeof entranceAnimations;
  hoverAnimation?: keyof typeof hoverAnimations;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      animation = "none",
      hoverAnimation = "none",
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
      const el = buttonRef.current;
      if (!el || animation === "none") return;
      entranceAnimations[animation]?.(el);
    }, [animation]);

    const setRef = (node: HTMLElement | null) => {
      buttonRef.current = node as HTMLButtonElement | null;
      if (typeof ref === "function") ref(node as HTMLButtonElement | null);
      else if (ref) ref.current = node as HTMLButtonElement | null;
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
      hoverAnimations[hoverAnimation]?.(buttonRef.current!);
      onMouseEnter?.(event);
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) hoverAnimations.reset(buttonRef.current);
      onMouseLeave?.(event);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) gsap.to(buttonRef.current, { scale: 0.96, duration: 0.1 });
      onMouseDown?.(event);
    };

    const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) gsap.to(buttonRef.current, { scale: 1, duration: 0.16 });
      onMouseUp?.(event);
    };

    return (
      <Comp
        ref={setRef}
        className={cn(buttonVariants({ variant, size, className }))}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button, buttonVariants };
