import { redirect } from "next/navigation";
import { Container } from "@/components/site/container";
import { getSession } from "@/lib/auth";
import { getAdminChatTestimonials } from "@/lib/testimonial-chat.store";
import { AdminTestimonialsClient } from "./testimonials-client";

export default async function AdminTestimonialsPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/dashboard");

  const initial = await getAdminChatTestimonials(400);

  return (
    <Container className="py-10">
      <div className="mb-6">
        <p className="text-xs font-extrabold tracking-[0.28em] text-brand-700">ADMIN</p>
        <h1 className="mt-2 text-3xl font-extrabold">Testimonials (Chat Style)</h1>
        <p className="mt-2 text-sm text-ink/70">
          Add new chat testimonials, activate/deactivate, delete, or seed the default 110+.
        </p>
      </div>

      <AdminTestimonialsClient initial={initial as any} />
    </Container>
  );
}