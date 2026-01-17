import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { seedChatTestimonials } from "@/lib/testimonial-chats.seed";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await getSession();
  if (!session) return null;
  if (session.role !== "admin") return null;
  return session;
}

export async function POST() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let inserted = 0;

  for (const t of seedChatTestimonials) {
    const res = await sql.query(
      `insert into testimonial_chats (customer_name, service, customer_message, our_reply)
       values ($1,$2,$3,$4)
       on conflict do nothing`,
      [t.customerName, t.service, t.customerText, t.ourReply]
    );
    if ((res as any)?.rowCount) inserted += (res as any).rowCount;
  }

  return NextResponse.json({ ok: true, inserted });
}