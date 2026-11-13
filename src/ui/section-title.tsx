import * as React from "react";
import { cn } from "@/lib/utils";

type SectionTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3";
};

export function SectionTitle({ as: Tag = "h2", className, ...props }: SectionTitleProps) {
  return (
    <Tag
      className={cn(
        "my-6 font-serif text-[clamp(42px,5.2vw,86px)] font-normal leading-[0.99] tracking-[-0.025em]",
        className,
      )}
      {...props}
    />
  );
}
