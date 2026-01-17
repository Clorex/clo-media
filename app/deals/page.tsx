import Link from "next/link";
import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";
import { payment } from "@/lib/content";

function Band() {
  return (
    <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700" />
  );
}

const DEALS = [
  {
    title: "Business Pack",
    subtitle: "Logo + Flyer + Free Sticker",
    oldTotal: "₦13,500",
    newTotal: "₦12,500",
    items: ["Business Logo (₦8,000)", "Business Flyer (₦5,500)", "Sticker (FREE)"],
    serviceParam: "Business Pack (Logo + Flyer + Free Sticker)",
  },
  {
    title: "Brand Launch Pack",
    subtitle: "Logo + Flyer + Business Card",
    oldTotal: "₦21,500",
    newTotal: "₦20,500",
    items: ["Business Logo (₦8,000)", "Business Flyer (₦5,500)", "Business Cards (₦8,000)"],
    serviceParam: "Brand Launch Pack (Logo + Flyer + Business Card)",
  },
  {
    title: "Social Boost Pack",
    subtitle: "IG Remodel + 2 Flyers",
    oldTotal: "₦28,000",
    newTotal: "₦27,000",
    items: ["Instagram Remodeling (₦17,000)", "2 Flyers (₦11,000)"],
    serviceParam: "Social Boost Pack (IG Remodel + 2 Flyers)",
  },
  {
    title: "Ads Kickstart Pack",
    subtitle: "IG + Facebook Ads Setup",
    oldTotal: "₦20,000",
    newTotal: "₦19,000",
    items: ["Instagram Ads Setup (₦10,000)", "Facebook Ads Setup (₦10,000)"],
    serviceParam: "Ads Kickstart Pack (IG + Facebook Ads Setup)",
  },
];

export default function DealsPage() {
  return (
    <Container className="py-12">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink">Deals</h1>
          <p className="mt-2 text-sm md:text-base text-ink/70 max-w-2xl">
            Sweet deals: we sum the normal prices and remove ₦1,000.
          </p>
        </div>

        <Button href="/booking" variant="outline">
          Book now
        </Button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {DEALS.map((d) => (
          <div
            key={d.title}
            className="overflow-hidden rounded-3xl border border-brand-700/15 bg-white shadow-[0_24px_60px_rgba(242,92,5,0.10)] transition hover:-translate-y-[2px] hover:shadow-[0_30px_80px_rgba(242,92,5,0.14)]"
          >
            <Band />
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-extrabold text-ink">{d.title}</div>
                  <div className="mt-1 text-sm font-semibold text-ink/70">{d.subtitle}</div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-extrabold text-ink/50 line-through">{d.oldTotal}</div>
                  <div className="text-lg font-extrabold text-brand-700">{d.newTotal}</div>
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                {d.items.map((x) => (
                  <li key={x} className="text-sm text-ink/75 flex gap-2">
                    <span className="mt-[7px] h-2 w-2 rounded-full bg-brand-500" />
                    <span>{x}</span>
                  </li>
                ))}
                <li className="text-sm font-extrabold text-brand-700">Discount: -₦1,000</li>
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href={`/booking?service=${encodeURIComponent(d.serviceParam)}`}>
                  Book this deal
                </Button>
                <Button href="/pricing" variant="outline">
                  View pricing
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-brand-700/15 bg-white shadow-[0_24px_60px_rgba(242,92,5,0.10)]">
        <Band />
        <div className="p-6">
          <p className="text-xs font-extrabold tracking-[0.22em] text-brand-700">PAYMENT</p>
          <p className="mt-2 text-sm text-ink">
            <span className="font-extrabold">Account name:</span> {payment.accountName}
          </p>
          <p className="text-sm text-ink">
            <span className="font-extrabold">Bank:</span> {payment.bankName}
          </p>
          <p className="text-sm text-ink">
            <span className="font-extrabold">Account number:</span> {payment.accountNumber}
          </p>

          <p className="mt-4 text-xs text-ink/65">
            After payment, go to{" "}
            <Link className="underline underline-offset-4" href="/booking">
              booking
            </Link>{" "}
            and upload your proof.
          </p>
        </div>
      </div>
    </Container>
  );
}