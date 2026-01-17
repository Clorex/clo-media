import { Container } from "@/components/site/container";
import { BookingForm } from "@/components/site/booking-form";
import { payment } from "@/lib/content";

export default function BookingPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold">Booking</h1>

      <div className="mt-5 overflow-hidden rounded-3xl border border-brand-700/15 bg-white shadow-[0_24px_60px_rgba(242,92,5,0.10)]">
        <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700" />
        <div className="p-6">
          <p className="text-xs font-extrabold tracking-[0.22em] text-brand-700">PAYMENT</p>
          <p className="mt-2 text-sm text-ink/80">
            <span className="font-extrabold">Account name:</span> {payment.accountName}
          </p>
          <p className="text-sm text-ink/80">
            <span className="font-extrabold">Bank:</span> {payment.bankName}
          </p>
          <p className="text-sm text-ink/80">
            <span className="font-extrabold">Account number:</span> {payment.accountNumber}
          </p>

          <p className="mt-4 text-sm text-ink/80">
            After payment, take a <span className="font-extrabold">screenshot/photo of your receipt</span>{" "}
            and send it on WhatsApp as proof of payment.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <BookingForm />
      </div>
    </Container>
  );
}