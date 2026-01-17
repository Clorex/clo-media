import { Container } from "@/components/site/container";

export default function PrivacyPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold">Privacy Policy</h1>
      <p className="mt-4 text-sm text-ink/70 max-w-3xl">
        This website may collect information you provide (name, email, phone/WhatsApp, booking details,
        and payment proof uploads) to deliver services, manage bookings, and communicate updates.
        We do not sell your personal information.
      </p>
    </Container>
  );
}