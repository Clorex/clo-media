import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toRows(result: any) {
  if (!result) return [];
  if (Array.isArray(result)) return result;
  if (Array.isArray(result.rows)) return result.rows;
  return [];
}

async function requireAdmin() {
  const session = await getSession();
  if (!session) return null;
  if (session.role !== "admin") return null;
  return session;
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const res = await sql.query(
    `select
      id,
      customer_name as "customerName",
      service,
      customer_message as "customerText",
      our_reply as "ourReply",
      active,
      created_at
    from testimonial_chats
    order by created_at desc
    limit 500`
  );

  return NextResponse.json({ items: toRows(res) });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const customerName = String(body?.customerName || "").trim();
  const service = String(body?.service || "").trim();
  const customerText = String(body?.customerText || "").trim();
  const ourReply = String(body?.ourReply || "").trim();

  if (!customerName || !service || !customerText || !ourReply) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const res = await sql.query(
    `insert into testimonial_chats (customer_name, service, customer_message, our_reply)
     values ($1,$2,$3,$4)
     returning
       id,
       customer_name as "customerName",
       service,
       customer_message as "customerText",
       our_reply as "ourReply",
       active,
       created_at`,
    [customerName, service, customerText, ourReply]
  );

  return NextResponse.json({ ok: true, item: toRows(res)[0] });
}