import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/site/container";
import { getSession, isAdmin } from "@/lib/auth";

function Card({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-3xl border border-brand-700/15 bg-white shadow-[0_24px_60px_rgba(242,92,5,0.10)] transition hover:-translate-y-[2px] hover:shadow-[0_32px_90px_rgba(242,92,5,0.16)]"
    >
      <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700 clo-band" />
      <div className="p-6">
        <div className="text-lg font-extrabold text-ink">{title}</div>
        <div className="mt-2 text-sm text-ink/70">{desc}</div>
        <div className="mt-4 text-sm font-extrabold text-brand-700 underline underline-offset-4">
          Open
        </div>
      </div>
    </Link>
  );
}

export default async function AdminHomePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!isAdmin(session)) redirect("/");

  return (
    <Container className="py-10">
      <p className="text-xs font-extrabold tracking-[0.28em] text-brand-700">ADMIN</p>
      <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-ink">Dashboard</h1>
      <p className="mt-2 text-sm text-ink/70 max-w-2xl">
        Manage your website content from here (works on phone).
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card
          title="Portfolio Uploads"
          desc="Upload images from your phone and they show on the Portfolio page."
          href="/admin/portfolio"
        />
        <Card
          title="Testimonials"
          desc="Add/edit chat-style testimonials shown on the Home page."
          href="/admin/testimonials"
        />
      </div>
    </Container>
  );
}