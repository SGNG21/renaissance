import * as React from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-[10px] font-bold uppercase tracking-[0.24em] text-gold", className)}
      {...props}
    />
  );
}
