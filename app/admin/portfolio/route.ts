import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { sql } from "@/lib/db";
import { getSession, isAdmin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toRows(result: any) {
  if (!result) return [];
  if (Array.isArray(result)) return result;
  if (Array.isArray(result.rows)) return result.rows;
  return [];
}

function safeName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  const session = await getSession();
  if (!isAdmin(session)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const res = await sql.query(
    `select id, title, category, tags, image_url, active, created_at
     from portfolio_items
     order by created_at desc
     limit 400`
  );

  return NextResponse.json({ items: toRows(res) });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!isAdmin(session)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();

  const title = String(form.get("title") || "").trim();
  const category = String(form.get("category") || "").trim();
  const tagsRaw = String(form.get("tags") || "").trim();
  const file = form.get("file");

  if (!title || !category) {
    return NextResponse.json({ error: "Missing title/category" }, { status: 400 });
  }
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Missing image file" }, { status: 400 });
  }

  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 12)
    : [];

  // Upload to Vercel Blob
  const f = file as File;
  const ext = (f.name.split(".").pop() || "jpg").toLowerCase();
  const key = `portfolio/${Date.now()}-${safeName(title)}.${ext}`;

  const uploaded = await put(key, f, {
    access: "public",
    contentType: f.type || "image/jpeg",
  });

  const insertedRes = await sql.query(
    `insert into portfolio_items (title, category, tags, image_url)
     values ($1,$2,$3,$4)
     returning id, title, category, tags, image_url, active, created_at`,
    [title, category, tags, uploaded.url]
  );

  const item = toRows(insertedRes)[0];
  return NextResponse.json({ ok: true, item });
}