import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ArrowLinkProps = React.ComponentProps<typeof Link>;

export function ArrowLink({ className, children, ...props }: ArrowLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center gap-6 border-b border-current py-4 text-[10px] font-bold uppercase tracking-[0.15em] transition-[gap] duration-200 hover:gap-[34px]",
        className,
      )}
      {...props}
    >
      {children}
      <span aria-hidden className="text-[23px] font-light leading-[0]">
        ↗
      </span>
    </Link>
  );
}
