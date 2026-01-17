"use client";

import * as React from "react";
import Link from "next/link";

type Variant = "default" | "outline" | "ghost";

function cx(...s: Array<string | undefined | false | null>) {
  return s.filter(Boolean).join(" ");
}

export function Button({
  children,
  href,
  target,
  onClick,
  className,
  variant = "default",
  disabled,
  type,
}: {
  children: React.ReactNode;
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: Variant;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  const base =
    "inline-flex items-center justify-center text-center " +
    "rounded-xl px-4 py-2 text-sm font-extrabold " +
    "transition active:translate-y-[1px] " +
    "focus:outline-none focus:ring-4 focus:ring-brand-500/20 disabled:opacity-60";

  const styles =
    variant === "outline"
      ? "border border-brand-700/20 bg-white text-ink hover:bg-brand-50"
      : variant === "ghost"
      ? "border border-transparent bg-transparent text-ink/80 hover:text-ink hover:bg-brand-50"
      : "border border-brand-700/20 bg-gradient-to-r from-brand-200 via-brand-500/30 to-brand-200 text-ink hover:from-brand-200 hover:to-brand-200";

  const cls = cx(base, styles, className);

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} target={target} className={cls} aria-disabled={disabled}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} target={target} className={cls} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type || "button"} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}