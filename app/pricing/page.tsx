import Link from "next/link";
import { Container } from "@/components/site/container";
import { pricing, pricingPolicyLong } from "@/lib/content";

export default function PricingPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold">Pricing</h1>

      <details className="mt-6 overflow-hidden rounded-3xl border border-brand-700/15 bg-white shadow-[0_24px_60px_rgba(242,92,5,0.08)]">
        <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700" />
        <div className="p-5">
          <summary className="cursor-pointer select-none text-sm font-extrabold text-brand-700 underline underline-offset-4">
            Read pricing policy
          </summary>

          <div className="mt-5">
            <h3 className="text-2xl font-extrabold">Pricing Policy</h3>
            <p className="mt-3 whitespace-pre-line text-sm text-ink/70">{pricingPolicyLong}</p>
          </div>
        </div>
      </details>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {pricing.map((item, idx) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-3xl border border-brand-700/15 bg-white shadow-[0_24px_60px_rgba(242,92,5,0.08)]"
          >
            <div
              className={`h-1 w-full bg-gradient-to-r ${
                idx % 2 === 0
                  ? "from-brand-700 via-brand-500 to-brand-700"
                  : "from-brand-500 via-brand-700 to-brand-500"
              }`}
            />
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-extrabold text-brand-700">{item.name}</h2>
                  {item.note ? <p className="mt-1 text-xs text-ink/70">{item.note}</p> : null}
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-brand-700">{item.priceLabel}</div>

                  {item.cta ? (
                    <Link
                      className="mt-1 inline-block text-xs font-extrabold text-brand-700 underline underline-offset-4"
                      href={item.cta.href}
                    >
                      {item.cta.label}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}