import * as React from "react";
import { cn } from "@/lib/utils";

const control =
  "block w-full rounded-none border-0 border-b border-[#c8cbc4] bg-transparent py-3 text-[13px] text-ink outline-none transition-colors focus:border-gold";

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

/** Conteneur : libellé + contrôle + message d'erreur. */
export function Field({ label, htmlFor, error, className, children }: FieldProps) {
  return (
    <div className={cn("mb-6", className)}>
      <label
        htmlFor={htmlFor}
        className="mb-[10px] block text-[9px] font-bold uppercase tracking-[0.15em]"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-2 text-[11px] text-[#8a3b2e]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FieldInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />;
}

export function FieldSelect({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(control, className)} {...props} />;
}

export function FieldTextarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(control, "resize-y", className)} {...props} />;
}
