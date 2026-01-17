import { Container } from "@/components/site/container";
import { services } from "@/lib/content";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold">Services</h1>
      <p className="mt-2 text-ink/70 max-w-2xl">
        Premium services designed to help your brand look professional and stand out.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((s, idx) => (
          <div
            key={s.title}
            className="overflow-hidden rounded-3xl border border-brand-700/15 bg-white shadow-[0_24px_60px_rgba(242,92,5,0.08)]"
          >
            <div
              className={`h-1 w-full bg-gradient-to-r ${
                idx % 3 === 0
                  ? "from-brand-700 via-brand-500 to-brand-700"
                  : idx % 3 === 1
                  ? "from-brand-500 via-brand-700 to-brand-500"
                  : "from-brand-700 via-brand-700 to-brand-500"
              }`}
            />
            <div className="p-6">
              <h2 className="text-lg font-extrabold">{s.title}</h2>
              <p className="mt-2 text-sm text-ink/70">{s.description}</p>

              <ul className="mt-4 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-ink/75">
                    <span className="mt-[7px] h-2 w-2 rounded-full bg-brand-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button href="/booking" variant="outline">Book</Button>
                <Button href="/pricing" variant="ghost">Pricing</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}