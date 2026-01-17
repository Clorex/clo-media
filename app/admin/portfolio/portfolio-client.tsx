"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

type Item = {
  id: number;
  title: string;
  category: string;
  tags: string[];
  image_url: string;
  active: boolean;
  created_at: string;
};

const CATEGORIES = [
  "Business Logo",
  "Sales Flyer",
  "Training Flyer",
  "Business Card",
  "Instagram Design",
  "Video Advert",
  "Website",
  "Printing",
] as const;

export function AdminPortfolioClient({ initial }: { initial: Item[] }) {
  const [items, setItems] = React.useState<Item[]>(initial || []);
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState<(typeof CATEGORIES)[number]>("Business Logo");
  const [tags, setTags] = React.useState("Clean, Premium");
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function refresh() {
    const res = await fetch("/api/admin/portfolio", { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    setItems(data.items || []);
  }

  async function add() {
    if (!title.trim() || !category.trim() || !file) return;

    setLoading(true);
    try {
      const fd = new FormData();
      fd.set("title", title.trim());
      fd.set("category", category);
      fd.set("tags", tags.trim());
      fd.set("file", file);

      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        cache: "no-store",
        body: fd,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Upload failed");

      setTitle("");
      setTags("Clean, Premium");
      setFile(null);
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  async function toggle(id: number, active: boolean) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ active: !active }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed");
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("Delete this portfolio item?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, {
        method: "DELETE",
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed");
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8">
      <div className="overflow-hidden rounded-3xl border border-brand-700/15 bg-white">
        <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700" />
        <div className="p-6 grid gap-4">
          <div className="text-sm font-extrabold text-ink">Upload new portfolio item</div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs font-extrabold text-ink/70">Title</label>
              <input
                className="mt-1 w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Business Logo — Luxe Beauty Studio"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-ink/70">Category</label>
              <select
                className="mt-1 w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-extrabold text-ink/70">Tags (comma-separated)</label>
            <input
              className="mt-1 w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Clean, Premium, Modern"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-ink/70">Image</label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            {file ? <div className="mt-1 text-xs text-ink/60">{file.name}</div> : null}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={add} disabled={loading || !file || !title.trim()}>
              {loading ? "Uploading..." : "Upload"}
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
          <div className="text-sm font-extrabold text-ink">All portfolio items</div>

          <div className="mt-4 grid gap-3">
            {items.map((it) => (
              <div key={it.id} className="rounded-2xl border border-brand-700/15 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-extrabold text-brand-700">{it.title}</div>
                    <div className="text-xs text-ink/60">
                      {it.category} • {it.active ? "ACTIVE" : "INACTIVE"}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="rounded-xl border border-brand-700/20 bg-white px-3 py-1 text-xs font-extrabold text-ink"
                      onClick={() => toggle(it.id, it.active)}
                      disabled={loading}
                    >
                      {it.active ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      className="rounded-xl border border-brand-700/20 bg-white px-3 py-1 text-xs font-extrabold text-ink"
                      onClick={() => remove(it.id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-3 overflow-hidden rounded-xl border border-brand-700/10 bg-white">
                  <img src={it.image_url} alt={it.title} className="h-44 w-full object-cover" />
                </div>

                {it.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {it.tags.slice(0, 10).map((t) => (
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

            {!items.length ? <div className="text-sm text-ink/60">No portfolio items yet.</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}