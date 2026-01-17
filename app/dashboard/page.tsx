import Link from "next/link";
import { Container } from "@/components/site/container";
import { getSession } from "@/lib/auth";
import { sql } from "@/lib/db";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    return (
      <Container className="py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold">Dashboard</h1>
        <p className="mt-2 text-ink/70">
          <Link className="underline underline-offset-4" href="/login">
            Login
          </Link>
        </p>
      </Container>
    );
  }

  const bookings = await sql.query(
    `select id, service, status, payment_submitted, created_at
     from bookings
     where user_id=$1
     order by created_at desc`,
    [session.id]
  );

  return (
    <Container className="py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Hi {session.full_name}
          </h1>
          <p className="mt-2 text-ink/70">Your bookings appear here.</p>
        </div>

        <Link
          href="/booking"
          className="rounded-xl border border-brand-700/20 bg-white px-4 py-2 text-sm font-extrabold text-ink"
        >
          New booking
        </Link>
      </div>

      <div className="mt-8 grid gap-4">
        {bookings.length === 0 ? (
          <div className="overflow-hidden rounded-3xl border border-brand-700/15 bg-white p-6 shadow-[0_24px_60px_rgba(242,92,5,0.08)]">
            <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700" />
            <p className="mt-4 text-sm text-ink/70">No bookings yet.</p>
          </div>
        ) : (
          bookings.map((b: any, idx: number) => (
            <div
              key={b.id}
              className="overflow-hidden rounded-3xl border border-brand-700/15 bg-white shadow-[0_24px_60px_rgba(242,92,5,0.08)]"
            >
              <div
                className={`h-1 w-full bg-gradient-to-r ${
                  idx % 2 === 0
                    ? "from-brand-700 via-brand-500 to-brand-700"
                    : "from-brand-500 via-brand-700 to-brand-500"
                }`}
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-extrabold text-brand-700">
                      {b.service}
                    </div>
                    <div className="mt-1 text-xs text-ink/60">ID: {b.id}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-extrabold text-ink">
                      Status: {b.status}
                    </div>
                    <div className="mt-1 text-xs font-extrabold text-ink">
                      {b.payment_submitted
                        ? "Payment submitted"
                        : "Payment not submitted"}
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-xs text-ink/60">
                  {new Date(b.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Container>
  );
}