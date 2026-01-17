import { Container } from "@/components/site/container";

export default function AdminPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold">Admin</h1>
      <p className="mt-2 text-ink/70 max-w-2xl">
        Admin is being switched from Supabase to Vercel Postgres.
      </p>
    </Container>
  );
}