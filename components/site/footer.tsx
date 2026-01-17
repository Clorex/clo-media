import Link from "next/link";
import { Container } from "./container";
import { brand } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-brand-500/10 bg-white">
      <Container className="py-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-ink/70">
          © {new Date().getFullYear()}{" "}
          <span className="text-brand-600 font-semibold">{brand.name}</span>. {brand.country}.
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm">
          <Link className="text-ink/70 hover:text-ink" href="/privacy">Privacy</Link>
          <Link className="text-ink/70 hover:text-ink" href="/terms">Terms</Link>
          <a className="text-ink/70 hover:text-ink" href={brand.instagram} target="_blank">Instagram</a>
          <a className="text-ink/70 hover:text-ink" href={brand.whatsapp} target="_blank">WhatsApp</a>
        </div>
      </Container>
    </footer>
  );
}