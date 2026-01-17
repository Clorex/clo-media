import { redirect } from "next/navigation";
import { Container } from "@/components/site/container";
import { getSession } from "@/lib/auth";
import { WelcomeSplash } from "@/components/site/welcome-splash";

export default async function WelcomePage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const sp = await searchParams;
  const nextUrl = typeof sp?.next === "string" && sp.next.startsWith("/") ? sp.next : "/";

  const firstName = session.full_name?.trim().split(" ")[0] || "there";

  return (
    <Container className="py-10">
      <WelcomeSplash firstName={firstName} nextUrl={nextUrl} />
    </Container>
  );
}