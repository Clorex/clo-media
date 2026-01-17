import { Container } from "@/components/site/container";
import { brand } from "@/lib/content";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold">Contact</h1>
      <p className="mt-2 text-ink/70 max-w-2xl">
        Reach Clo Media via Instagram or WhatsApp.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-brand-700/15 bg-white shadow-[0_24px_60px_rgba(242,92,5,0.10)]">
          <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700" />
          <div className="p-6">
            <h2 className="text-xl font-extrabold">Instagram</h2>
            <p className="mt-2 text-sm text-ink/70">Send a DM on Instagram.</p>
            <div className="mt-5">
              <Button href={brand.instagram} target="_blank">
                Open Instagram
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-brand-700/15 bg-white shadow-[0_24px_60px_rgba(211,58,3,0.10)]">
          <div className="h-1 w-full bg-gradient-to-r from-brand-500 via-brand-700 to-brand-500" />
          <div className="p-6">
            <h2 className="text-xl font-extrabold">WhatsApp</h2>
            <p className="mt-2 text-sm text-ink/70">Chat and send details directly.</p>
            <div className="mt-5">
              <Button href={brand.whatsapp} target="_blank" variant="outline">
                Open WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}