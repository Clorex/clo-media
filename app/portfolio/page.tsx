import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/content";

export default function PortfolioPage() {
  return (
    <Container className="py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink">Portfolio</h1>
          <p className="mt-2 text-sm md:text-base text-ink/70 max-w-2xl">
            A curated selection of branding and design work.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button href={brand.instagram} target="_blank">
            Instagram
          </Button>
          <Button href={brand.whatsapp} target="_blank" variant="outline">
            WhatsApp
          </Button>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-brand-500/15 bg-white p-5 shadow-[0_10px_30px_rgba(90,0,6,0.05)]"
          >
            <div className="h-44 rounded-xl bg-[rgba(243,113,0,0.08)]" />
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-extrabold text-ink">Project</p>
                <p className="mt-1 text-xs text-ink/70">Branding • Design</p>
              </div>
              <span className="rounded-full border border-brand-500/15 bg-white px-3 py-1 text-[11px] font-semibold text-brand-800">
                Premium
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {["Clean layout", "Strong hierarchy", "Luxury feel"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-brand-500/15 bg-white px-3 py-1 text-[11px] font-semibold text-brand-800"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl border border-brand-500/18 bg-white p-8 shadow-[0_20px_60px_rgba(243,113,0,0.14)]">
        <h2 className="text-2xl font-extrabold text-ink">Want this look for your brand?</h2>
        <p className="mt-2 text-sm text-ink/70 max-w-2xl">
          Book a service or chat with Clo Media to choose the best option for your business.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="/booking">Book a Service</Button>
          <Button href="/pricing" variant="outline">Pricing</Button>
          <Button href={brand.whatsapp} target="_blank" variant="ghost">Chat</Button>
        </div>
      </div>
    </Container>
  );
}