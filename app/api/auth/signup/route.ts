import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { createSessionToken, hashPassword, setSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const email = String(body?.email || "").toLowerCase().trim();
    const password = String(body?.password || "");
    const fullName = String(body?.fullName || "").trim();
    const phone = String(body?.phone || "").trim();

    if (!email || !password || !fullName || !phone) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password too short" }, { status: 400 });
    }

    const role =
      email === (process.env.ADMIN_EMAIL || "").toLowerCase() ? "admin" : "customer";

    const passwordHash = await hashPassword(password);

    const rows = await sql.query(
      `insert into users (email, password_hash, full_name, phone, role)
       values ($1,$2,$3,$4,$5)
       returning id, email, role, full_name`,
      [email, passwordHash, fullName, phone, role]
    );

    const user = rows[0];
    const token = await createSessionToken(user);
    await setSessionCookie(token);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    const msg = String(e?.message || "");
    if (msg.toLowerCase().includes("duplicate") || msg.toLowerCase().includes("unique")) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: msg || "Signup failed" }, { status: 500 });
  }
}