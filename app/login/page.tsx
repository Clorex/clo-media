"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";

type Mode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/";
  const [mode, setMode] = React.useState<Mode>("login");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(mode === "login" ? "/api/auth/login" : "/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "login"
            ? { email, password }
            : { email, password, fullName, phone }
        ),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed");

      router.replace(`/welcome?next=${encodeURIComponent(redirectTo)}`);
    } catch (err: any) {
      setError(err?.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">Login</h1>
          <p className="mt-2 text-ink/70 max-w-2xl">
            Continue with email and password.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            className={
              "rounded-xl border px-3 py-2 text-sm font-extrabold " +
              (mode === "login"
                ? "border-brand-700/20 bg-white text-ink"
                : "border-brand-700/15 bg-white text-ink/70")
            }
            onClick={() => setMode("login")}
            type="button"
          >
            Login
          </button>
          <button
            className={
              "rounded-xl border px-3 py-2 text-sm font-extrabold " +
              (mode === "signup"
                ? "border-brand-700/20 bg-white text-ink"
                : "border-brand-700/15 bg-white text-ink/70")
            }
            onClick={() => setMode("signup")}
            type="button"
          >
            Sign up
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-brand-700/15 bg-white shadow-[0_40px_110px_rgba(242,92,5,0.14)]">
        <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700" />
        <div className="p-6 md:p-8">
          <form onSubmit={submit} className="grid gap-4 max-w-lg">
            {mode === "signup" ? (
              <>
                <div>
                  <label className="text-sm font-extrabold text-ink/80">Full name</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-extrabold text-ink/80">Phone / WhatsApp</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </>
            ) : null}

            <div>
              <label className="text-sm font-extrabold text-ink/80">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-extrabold text-ink/80">Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error ? <p className="text-sm text-red-700">{error}</p> : null}

            <Button disabled={loading}>
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}