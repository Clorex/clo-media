import { redirect } from "next/navigation";
import { Container } from "@/components/site/container";
import { getSession, isAdmin } from "@/lib/auth";
import { WelcomeSplash } from "@/components/site/welcome-splash";

export default async function WelcomePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const firstName = session.full_name?.trim().split(" ")[0] || "there";

  // SAFE NEXT: admins go to /admin, everyone else goes home
  const nextUrl = isAdmin(session) ? "/admin" : "/";

  return (
    <Container className="py-10">
      <WelcomeSplash firstName={firstName} nextUrl={nextUrl} />
    </Container>
  );
}