import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React, { useEffect } from "react";
import { cn } from "@/libs/utils";

const modalVariants = cva(
  "relative rounded-xl shadow-2xl border",
  {
    variants: {
      variant: {
        light: "bg-white text-gray-900 border-gray-200",
        dark: "bg-slate-900 text-white border-slate-700",
        outline: "bg-white/95 text-gray-900 border-gray-400 backdrop-blur-md dark:bg-slate-900/95 dark:text-white dark:border-gray-600",
      },
      size: {
        sm: "w-[90%] max-w-sm p-5",
        md: "w-[90%] max-w-md p-6",
        lg: "w-[90%] max-w-lg p-8",
      },
    },
    defaultVariants: {
      variant: "light",
      size: "md",
    },
  }
);

interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  asChild?: boolean;
  isOpen?: boolean;
  title?: string;
  description?: string;
  onClose?: () => void;
  onDone?: () => void;
  doneText?: string;
  closeText?: string;
  children?: React.ReactNode;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      asChild = false,
      title,
      description,
      children,
      className,
      isOpen = false,
      onClose,
      onDone,
      doneText = "Done",
      closeText = "Close",
      variant,
      size,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (!isOpen) return;
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") onClose?.();
      };
      document.addEventListener("keydown", onKeyDown);
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKeyDown);
        document.body.style.overflow = previousOverflow;
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const Comp = asChild ? Slot : "div";

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="presentation">
        <button
          type="button"
          className="absolute inset-0 cursor-default border-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          aria-label="Close modal"
        />
        <Comp
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cn(modalVariants({ variant, size }), className)}
          {...props}
        >
          {title && <h3 className="mb-2 text-xl font-semibold">{title}</h3>}
          {description && <p className="mb-4 opacity-75">{description}</p>}
          <div className="mb-4">{children}</div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 font-medium transition hover:bg-gray-100 dark:border-slate-600 dark:hover:bg-slate-700"
            >
              {closeText}
            </button>
            {onDone && (
              <button
                type="button"
                onClick={onDone}
                className="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700"
              >
                {doneText}
              </button>
            )}
          </div>
        </Comp>
      </div>
    );
  }
);

Modal.displayName = "Modal";
export { Modal, modalVariants };
