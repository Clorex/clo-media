"use client";

import * as React from "react";
import { payment, brand, pricing } from "@/lib/content";
import { Button } from "@/components/ui/button";

const SERVICES = [
  "Business Logo",
  "Business Flyer",
  "Business Cards",
  "Video Adverts",
  "Instagram Remodeling",
  "Instagram Ads Setup",
  "Facebook Ads Setup",
  "TikTok Ads Setup",
  "Business Name Registration",
  "Limited Liability",
  "Brand Website",
  "Printing & Customization",
] as const;

function getPriceLabel(service: string) {
  return pricing.find((p) => p.name === service)?.priceLabel ?? "Chat with Clo Media";
}

function Band({ variant = "a" }: { variant?: "a" | "b" | "c" }) {
  const cls =
    variant === "a"
      ? "from-brand-700 via-brand-500 to-brand-700"
      : variant === "b"
      ? "from-brand-500 via-brand-700 to-brand-500"
      : "from-brand-700 via-brand-700 to-brand-500";
  return <div className={`h-1 w-full bg-gradient-to-r ${cls}`} />;
}

export function BookingForm() {
  const [service, setService] = React.useState<(typeof SERVICES)[number]>("Business Logo");
  const [businessName, setBusinessName] = React.useState("");
  const [contactInfo, setContactInfo] = React.useState("");
  const [details, setDetails] = React.useState("");

  const priceLabel = getPriceLabel(service);

  const whatsappText = encodeURIComponent(
    `Hello Clo Media,%0A%0AService: ${service} (${priceLabel})%0ABusiness name: ${businessName}%0AContact info: ${contactInfo}%0ADetails: ${details}%0A%0APayment: ${payment.bankName} ${payment.accountNumber} (${payment.accountName})`
  );

  const waLink = `${brand.whatsapp}?text=${whatsappText}`;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-brand-700/15 bg-white shadow-[0_40px_110px_rgba(242,92,5,0.14)]">
      <Band variant="a" />
      <div className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-extrabold">Booking</h2>
        <p className="mt-2 text-sm text-ink/70">
          Booking is being migrated to Vercel Postgres. For now, submit via WhatsApp.
        </p>

        <div className="mt-6 grid gap-4">
          <div>
            <label className="text-sm font-extrabold text-ink/80">Service</label>
            <select
              className="mt-1 w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
              value={service}
              onChange={(e) => setService(e.target.value as any)}
            >
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs font-extrabold text-brand-700">{priceLabel}</p>
          </div>

          <div>
            <label className="text-sm font-extrabold text-ink/80">Business name</label>
            <input
              className="mt-1 w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-extrabold text-ink/80">Contact info</label>
            <textarea
              className="mt-1 w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div>
            <label className="text-sm font-extrabold text-ink/80">Details</label>
            <textarea
              className="mt-1 w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="overflow-hidden rounded-3xl border border-brand-700/15 bg-white">
            <Band variant="b" />
            <div className="p-5">
              <p className="text-xs font-extrabold tracking-[0.22em] text-brand-700">PAYMENT</p>
              <p className="mt-2 text-sm text-ink">
                <span className="font-extrabold">Bank:</span> {payment.bankName}
              </p>
              <p className="text-sm text-ink">
                <span className="font-extrabold">Account number:</span> {payment.accountNumber}
              </p>
              <p className="text-sm text-ink">
                <span className="font-extrabold">Account name:</span> {payment.accountName}
              </p>
            </div>
          </div>

          <Button href={waLink} target="_blank">
            Send on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}