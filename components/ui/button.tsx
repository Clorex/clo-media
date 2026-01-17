import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps =
  | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined });

export function Button(
  props: ButtonProps & { variant?: "solid" | "outline" | "ghost" }
) {
  const { variant = "solid", className, ...rest } = props as any;

  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-extrabold transition " +
    "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white";

  const solid =
    "bg-gradient-to-r from-brand-500 via-brand-200 to-brand-500 text-ink " +
    "hover:from-brand-200 hover:via-brand-500 hover:to-brand-200 " +
    "border border-brand-700/20 shadow-[0_14px_35px_rgba(211,58,3,0.14)]";

  const outline =
    "bg-white text-ink border border-brand-700/25 hover:bg-brand-50";

  const ghost =
    "bg-transparent text-ink hover:bg-brand-50";

  const styles = cn(
    base,
    variant === "solid" ? solid : variant === "outline" ? outline : ghost,
    className
  );

  if ("href" in props) return <Link className={styles} {...(rest as any)} />;
  return <button className={styles} {...(rest as any)} />;
}