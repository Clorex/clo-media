import { redirect } from "next/navigation";
import { Container } from "@/components/site/container";
import { getSession, isAdmin } from "@/lib/auth";
import { getAdminPortfolioItems } from "@/lib/portfolio.store";
import { AdminPortfolioClient } from "./portfolio-client";

export default async function AdminPortfolioPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!isAdmin(session)) redirect("/");

  const initial = await getAdminPortfolioItems(300);

  return (
    <Container className="py-10">
      <p className="text-xs font-extrabold tracking-[0.28em] text-brand-700">ADMIN</p>
      <h1 className="mt-2 text-3xl font-extrabold">Portfolio Uploads</h1>

      <div className="mt-8">
        <AdminPortfolioClient initial={initial} />
      </div>
    </Container>
  );
}