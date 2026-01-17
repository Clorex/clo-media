import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession, isAdmin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!isAdmin(session)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => null);

  const active = typeof body?.active === "boolean" ? body.active : null;
  if (active === null) return NextResponse.json({ error: "Missing active" }, { status: 400 });

  await sql.query(`update portfolio_items set active=$1 where id=$2`, [active, Number(id)]);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!isAdmin(session)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await sql.query(`delete from portfolio_items where id=$1`, [Number(id)]);
  return NextResponse.json({ ok: true });
}