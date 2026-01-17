"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

type TItem = {
  id: number;
  customerName: string;
  service: string;
  customerText: string;
  ourReply: string;
  active: boolean;
  created_at: string;
};

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

export function AdminTestimonialsClient({ initial }: { initial: TItem[] }) {
  const [items, setItems] = React.useState<TItem[]>(initial || []);
  const [customerName, setCustomerName] = React.useState("");
  const [service, setService] = React.useState<(typeof SERVICES)[number]>("Business Logo");
  const [customerText, setCustomerText] = React.useState("");
  const [ourReply, setOurReply] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function refresh() {
    const res = await fetch("/api/admin/testimonials", { cache: "no-store" });
    const data = await res.json();
    setItems(data.items || []);
  }

  async function add() {
    const n = customerName.trim();
    const ct = customerText.trim();
    const or = ourReply.trim();
    if (!n || !ct || !or) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ customerName: n, service, customerText: ct, ourReply: or }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      setCustomerName("");
      setCustomerText("");
      setOurReply("");
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  async function toggleActive(id: number, active: boolean) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ active: !active }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("Delete this testimonial chat?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  async function seedDefaults() {
    if (!confirm("Seed the default 110+ chat testimonials into DB?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials/seed", { method: "POST", cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      await refresh();
      alert(`Seeded: ${data.inserted || 0} new testimonials`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8">
      <div className="overflow-hidden rounded-3xl border border-brand-700/15 bg-white">
        <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700" />
        <div className="p-6 grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-extrabold text-ink">Add chat testimonial</div>
              <div className="text-xs text-ink/60">
                This shows on the Home page when ACTIVE.
              </div>
            </div>
            <Button onClick={seedDefaults} variant="outline" disabled={loading}>
              Seed defaults (110+)
            </Button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs font-extrabold text-ink/70">Customer name</label>
              <input
                className="mt-1 w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Amaka O."
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-ink/70">Service</label>
              <select
                className="mt-1 w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                value={service}
                onChange={(e) => setService(e.target.value as any)}
              >
                {SERVICES.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs font-extrabold text-ink/70">Customer message</label>
              <textarea
                className="mt-1 w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                value={customerText}
                onChange={(e) => setCustomerText(e.target.value)}
                rows={4}
                placeholder="What the customer said..."
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-ink/70">Your reply</label>
              <textarea
                className="mt-1 w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                value={ourReply}
                onChange={(e) => setOurReply(e.target.value)}
                rows={4}
                placeholder="Your reply..."
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={add} disabled={loading}>
              {loading ? "..." : "Add testimonial"}
            </Button>
            <Button onClick={refresh} variant="outline" disabled={loading}>
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-brand-700/15 bg-white">
        <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700" />
        <div className="p-6">
          <div className="text-sm font-extrabold text-ink">All chat testimonials</div>

          <div className="mt-4 grid gap-3">
            {items.map((t) => (
              <div key={t.id} className="rounded-2xl border border-brand-700/15 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-extrabold text-brand-700">{t.customerName}</div>
                    <div className="text-xs text-ink/60">
                      {t.service} • {new Date(t.created_at).toLocaleString()} •{" "}
                      <span
                        className={
                          t.active
                            ? "text-green-700 font-extrabold"
                            : "text-red-700 font-extrabold"
                        }
                      >
                        {t.active ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="rounded-xl border border-brand-700/20 bg-white px-3 py-1 text-xs font-extrabold text-ink disabled:opacity-50"
                      onClick={() => toggleActive(t.id, t.active)}
                      disabled={loading}
                    >
                      {t.active ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      className="rounded-xl border border-brand-700/20 bg-white px-3 py-1 text-xs font-extrabold text-ink disabled:opacity-50"
                      onClick={() => remove(t.id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-3 grid gap-2">
                  <div className="rounded-2xl bg-[#e5e5ea] px-3 py-2 text-sm font-semibold text-black/85">
                    {t.customerText}
                  </div>
                  <div className="ml-auto rounded-2xl bg-[#007aff] px-3 py-2 text-sm font-semibold text-white">
                    {t.ourReply}
                  </div>
                </div>
              </div>
            ))}

            {!items.length ? <div className="text-sm text-ink/60">No testimonials yet.</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}