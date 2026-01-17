import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import {
  createSessionToken,
  hashPassword,
  setSessionCookie,
  type SessionUser,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toRows(result: any) {
  // supports db clients returning rows[] or { rows: [] }
  if (!result) return [];
  if (Array.isArray(result)) return result;
  if (Array.isArray(result.rows)) return result.rows;
  return [];
}

function normalizeRole(role: any): SessionUser["role"] {
  return role === "admin" ? "admin" : "customer";
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const full_name = String(body?.full_name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");

    if (!full_name || !email || !password) {
      return NextResponse.json(
        { error: "Missing full_name, email, or password" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // optional: prevent duplicate emails
    const existingRes = await sql.query(`select id from users where email=$1 limit 1`, [email]);
    const existing = toRows(existingRes);
    if (existing.length) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    const password_hash = await hashPassword(password);

    // Create user
    // IMPORTANT: role must be 'customer' or 'admin' to match SessionUser type
    const createdRes = await sql.query(
      `insert into users (full_name, email, password_hash, role)
       values ($1,$2,$3,'customer')
       returning id, email, role, full_name`,
      [full_name, email, password_hash]
    );

    const rows = toRows(createdRes);
    const user = rows?.[0];
    if (!user) {
      return NextResponse.json({ error: "Signup failed" }, { status: 500 });
    }

    // Convert DB row -> SessionUser (fixes Vercel type error)
    const sessionUser: SessionUser = {
      id: String(user.id),
      email: String(user.email),
      role: normalizeRole(user.role),
      full_name: String(user.full_name ?? ""),
    };

    const token = await createSessionToken(sessionUser);
    await setSessionCookie(token);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ? String(e.message) : "Signup failed" },
      { status: 500 }
    );
  }
}