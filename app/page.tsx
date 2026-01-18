"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";

type Mode = "login" | "signup";

function EyeIcon({ off }: { off?: boolean }) {
  return off ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-ink/70">
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.6 10.6a3 3 0 0 0 4.2 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M6.7 6.7C4.3 8.4 2.7 10.7 2 12c1.4 2.6 5.3 7 10 7 1.5 0 2.9-.4 4.2-1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9.9 4.3C10.6 4.1 11.3 4 12 4c4.7 0 8.6 4.4 10 8-0.5 1-1.6 2.6-3.2 4.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-ink/70">
      <path
        d="M2 12c1.4-3.6 5.3-8 10-8s8.6 4.4 10 8c-1.4 3.6-5.3 8-10 8S3.4 15.6 2 12z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function LoginPage() {
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/";

  const [mode, setMode] = React.useState<Mode>("login");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload =
        mode === "login"
          ? { email, password }
          : { email, password, full_name: fullName, phone };

      const res = await fetch(mode === "login" ? "/api/auth/login" : "/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed");

      // IMPORTANT: hard refresh so Navbar/layout reads the new cookie
      window.location.href = `/welcome?next=${encodeURIComponent(redirectTo)}`;
    } catch (err: any) {
      setError(err?.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center">
      <Container className="w-full py-10 flex justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-center text-3xl md:text-4xl font-extrabold">Login</h1>

          <div className="mt-6 overflow-hidden rounded-[2rem] border border-brand-700/15 bg-white shadow-[0_40px_110px_rgba(242,92,5,0.14)]">
            <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700 clo-band" />

            <div className="p-6 md:p-8">
              <div className="mx-auto grid grid-cols-2 gap-2 max-w-sm">
                <button
                  className={
                    "rounded-xl border px-3 py-2 text-sm font-extrabold text-center transition " +
                    (mode === "login"
                      ? "border-brand-700/25 bg-brand-50 text-ink"
                      : "border-brand-700/15 bg-white text-ink/70 hover:text-ink")
                  }
                  onClick={() => setMode("login")}
                  type="button"
                >
                  Login
                </button>

                <button
                  className={
                    "rounded-xl border px-3 py-2 text-sm font-extrabold text-center transition " +
                    (mode === "signup"
                      ? "border-brand-700/25 bg-brand-50 text-ink"
                      : "border-brand-700/15 bg-white text-ink/70 hover:text-ink")
                  }
                  onClick={() => setMode("signup")}
                  type="button"
                >
                  Sign up
                </button>
              </div>

              <form onSubmit={submit} className="mt-6 grid gap-4">
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
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 pr-11 text-sm text-ink outline-none focus:border-brand-700"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border border-brand-700/15 bg-white px-2 py-1"
                    >
                      <EyeIcon off={!showPassword} />
                    </button>
                  </div>
                </div>

                {error ? <p className="text-sm text-red-700 text-center">{error}</p> : null}

                <Button disabled={loading} type="submit" className="w-full justify-center text-center">
                  {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}