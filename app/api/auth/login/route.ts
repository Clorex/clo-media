import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { createSessionToken, setSessionCookie, verifyPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const email = String(body?.email || "").toLowerCase().trim();
    const password = String(body?.password || "");

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const rows = await sql.query(
      `select id, email, role, full_name, password_hash
       from users
       where email=$1
       limit 1`,
      [email]
    );

    const user = rows[0];
    if (!user) return NextResponse.json({ error: "Invalid login" }, { status: 401 });

    const ok = await verifyPassword(password, user.password_hash);
    if (!ok) return NextResponse.json({ error: "Invalid login" }, { status: 401 });

    const token = await createSessionToken({
      id: user.id,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
    });

    await setSessionCookie(token);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ? String(e.message) : "Login failed" },
      { status: 500 }
    );
  }
}