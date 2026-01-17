import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "clo_session";

function secretKey() {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("Missing AUTH_SECRET");
  return new TextEncoder().encode(s);
}

async function getSession(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload as any;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const needsLogin =
    path.startsWith("/welcome") ||
    path.startsWith("/booking") ||
    path.startsWith("/dashboard") ||
    path.startsWith("/admin");

  const session = await getSession(req);

  if (needsLogin && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  if (path.startsWith("/admin")) {
    const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase();
    const ok =
      session &&
      ((session.role && String(session.role) === "admin") ||
        (session.email && String(session.email).toLowerCase() === adminEmail));

    if (!ok) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/welcome", "/booking/:path*", "/dashboard/:path*", "/admin/:path*"],
};