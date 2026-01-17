import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/content";
import { getPublicPortfolioItems } from "@/lib/portfolio.store";

export default async function PortfolioPage() {
  const items = await getPublicPortfolioItems(60);

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
          <Button href="/booking" variant="outline">
            Book
          </Button>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.id}
            className="rounded-2xl border border-brand-500/15 bg-white p-5 shadow-[0_10px_30px_rgba(90,0,6,0.05)] transition hover:-translate-y-[2px] hover:shadow-[0_18px_45px_rgba(90,0,6,0.08)]"
          >
            <div className="overflow-hidden rounded-xl border border-brand-700/10 bg-white">
              <img src={it.image_url} alt={it.title} className="h-44 w-full object-cover" />
            </div>

            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-extrabold text-ink">{it.title}</p>
                <p className="mt-1 text-xs text-ink/70">{it.category}</p>
              </div>
              <span className="rounded-full border border-brand-500/15 bg-white px-3 py-1 text-[11px] font-semibold text-brand-800">
                Premium
              </span>
            </div>

            {it.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {it.tags.slice(0, 6).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-brand-500/15 bg-white px-3 py-1 text-[11px] font-semibold text-brand-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {!items.length ? (
        <div className="mt-10 rounded-3xl border border-brand-500/18 bg-white p-8 shadow-[0_20px_60px_rgba(243,113,0,0.14)]">
          <h2 className="text-2xl font-extrabold text-ink">Portfolio is being updated</h2>
          <p className="mt-2 text-sm text-ink/70 max-w-2xl">
            New uploads will appear here.
          </p>
        </div>
      ) : null}
    </Container>
  );
}