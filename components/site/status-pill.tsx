import { cn } from "@/lib/utils";

export function StatusPill({ status }: { status: string }) {
  const s = (status || "").toLowerCase();

  const cls =
    s === "confirmed"
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
      : s === "completed"
      ? "border-sky-400/30 bg-sky-400/10 text-sky-100"
      : "border-brand-400/35 bg-brand-500/10 text-brand-100"; // pending_review default

  const label =
    s === "pending_review"
      ? "Pending Review"
      : s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold", cls)}>
      {label}
    </span>
  );
}