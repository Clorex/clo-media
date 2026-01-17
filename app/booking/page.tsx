import { Container } from "@/components/site/container";
import { BookingForm } from "@/components/site/booking-form";

export default function BookingPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold">Booking</h1>
      <p className="mt-2 text-ink/70 max-w-2xl">
        Fill your details and submit. If payment applies, upload proof and your request will be reviewed.
      </p>

      <div className="mt-8">
        <BookingForm />
      </div>
    </Container>
  );
}