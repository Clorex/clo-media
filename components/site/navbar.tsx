"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "./container";
import { brand } from "@/lib/content";
import { Button } from "@/components/ui/button";

type User = { full_name: string; email: string; role: string } | null;

const nav = [
  { href: "/", label: "Home" },
  { href: "/deals", label: "Deals" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ user }: { user: User }) {
  const [open, setOpen] = React.useState(false);

  const firstName = user?.full_name?.trim().split(" ")[0] || null;

  async function logout() {
    try {
      await fetch("/api/auth/logout", { method: "POST", cache: "no-store" });
    } finally {
      setOpen(false);
      window.location.href = "/";
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-brand-700/15">
      <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700" />

      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-sm font-extrabold tracking-wide text-ink">
          <span className="text-brand-700">Clo</span> Media
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-extrabold text-ink/80 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}

          {user?.role === "admin" ? (
            <Link href="/admin" className="text-sm font-extrabold text-ink/80 hover:text-ink">
              Admin
            </Link>
          ) : null}
        </nav>

        <div className="flex items-center gap-2">
          {firstName ? (
            <span className="hidden sm:inline text-sm font-extrabold text-brand-700">
              Hi {firstName}
            </span>
          ) : null}

          <a
            href={brand.instagram}
            target="_blank"
            className="hidden text-sm font-extrabold text-ink/75 hover:text-ink sm:block"
          >
            IG: clomedi.a
          </a>

          <Button href="/booking" className="hidden sm:inline-flex">
            Book
          </Button>

          {!user ? (
            <Button href="/login" variant="outline">
              Login
            </Button>
          ) : (
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-xl border border-brand-700/20 bg-white px-3 py-2 text-sm font-extrabold text-ink"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="md:hidden border-t border-brand-700/15 bg-white">
          <Container className="py-3">
            <div className="grid gap-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-brand-700/20 bg-white px-3 py-2 text-sm font-extrabold text-ink text-center"
                >
                  {item.label}
                </Link>
              ))}

              {user?.role === "admin" ? (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-brand-700/20 bg-white px-3 py-2 text-sm font-extrabold text-ink text-center"
                >
                  Admin
                </Link>
              ) : null}

              {!user ? (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-brand-700/20 bg-white px-3 py-2 text-sm font-extrabold text-ink text-center"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={logout}
                  className="rounded-xl border border-brand-700/20 bg-white px-3 py-2 text-sm font-extrabold text-ink text-center"
                >
                  Logout
                </button>
              )}
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}