import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-[51px] items-center justify-center gap-6 border px-6 text-[10px] font-bold uppercase tracking-[0.13em] transition-colors duration-250 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
  {
    variants: {
      variant: {
        solid: "border-forest bg-forest text-white hover:bg-forest-hover hover:border-forest-hover",
        outline: "border-current bg-transparent text-forest hover:bg-forest hover:text-white hover:border-forest",
      },
    },
    defaultVariants: { variant: "solid" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
}

export { buttonVariants };
