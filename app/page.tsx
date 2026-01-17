import Link from "next/link";
import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";
import { brand, pricing, services } from "@/lib/content";
import { TestimonialChatsIOS } from "@/components/site/testimonial-chats-ios";
import { getPublicChatTestimonials } from "@/lib/testimonial-chats.store";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-brand-700/20 bg-white px-3 py-1 text-xs font-extrabold text-ink shadow-[0_10px_22px_rgba(211,58,3,0.06)]">
      {children}
    </span>
  );
}

function Band({ variant = "a" }: { variant?: "a" | "b" | "c" }) {
  const cls =
    variant === "a"
      ? "from-brand-700 via-brand-500 to-brand-700"
      : variant === "b"
      ? "from-brand-500 via-brand-700 to-brand-500"
      : "from-brand-700 via-brand-700 to-brand-500";
  return <div className={`h-1 w-full bg-gradient-to-r ${cls}`} />;
}

function Card({
  title,
  text,
  band = "a",
  children,
}: {
  title: string;
  text?: string;
  band?: "a" | "b" | "c";
  children?: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-brand-700/15 bg-white shadow-[0_24px_60px_rgba(242,92,5,0.10)]">
      <Band variant={band} />
      <div className="p-6">
        <h3 className="text-lg md:text-xl font-extrabold">{title}</h3>
        {text ? <p className="mt-2 text-sm text-ink/70">{text}</p> : null}
        {children ? <div className="mt-5">{children}</div> : null}
      </div>
    </div>
  );
}

function Section({
  kicker,
  title,
  subtitle,
  children,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-14 md:py-20">
      <Container>
        <p className="text-xs font-extrabold tracking-[0.28em] text-brand-700">{kicker}</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">{title}</h2>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-sm md:text-base text-ink/70">{subtitle}</p>
        ) : null}
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}

export default async function HomePage() {
  const featuredPricing = pricing.filter((p) =>
    [
      "Business Logo",
      "Business Flyer",
      "Business Cards",
      "Instagram Remodeling",
      "Instagram Ads Setup",
      "Facebook Ads Setup",
      "TikTok Ads Setup",
      "Video Adverts",
      "Business Name Registration",
      "Limited Liability",
    ].includes(p.name)
  );

  const featuredServices = services.slice(0, 8);
  const chats = await getPublicChatTestimonials(110);

  return (
    <div>
      <section className="pt-10 pb-12 md:pt-16 md:pb-16">
        <Container className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-extrabold tracking-[0.28em] text-brand-700">CLO MEDIA</p>

            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-[1.02]">
              Premium branding and design that looks expensive.
            </h1>

            <p className="mt-5 text-sm md:text-base text-ink/75 max-w-xl">
              Logos, flyers, business cards, Instagram remodeling, ads setup, video adverts, and business
              registration support — created with strong hierarchy and premium presentation.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <Chip>Clean hierarchy</Chip>
              <Chip>Premium layout</Chip>
              <Chip>Strong contrast</Chip>
              <Chip>WhatsApp-ready</Chip>
              <Chip>Instagram-first</Chip>
              <Chip>Fast delivery flow</Chip>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/booking">Book a Service</Button>
              <Button href="/pricing" variant="outline">
                View Pricing
              </Button>
              <Button href={brand.whatsapp} target="_blank" variant="ghost">
                WhatsApp
              </Button>
            </div>

            <p className="mt-7 text-xs text-ink/65">
              <a href={brand.instagram} target="_blank" className="underline underline-offset-4">
                Instagram
              </a>{" "}
              •{" "}
              <Link href="/portfolio" className="underline underline-offset-4">
                Portfolio
              </Link>
            </p>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -left-12 h-44 w-44 rounded-full bg-brand-500/20 blur-2xl" />
            <div className="absolute -bottom-12 -right-12 h-56 w-56 rounded-full bg-brand-700/18 blur-2xl" />

            <div className="rounded-[2rem] border border-brand-700/15 bg-white p-6 shadow-[0_40px_110px_rgba(242,92,5,0.14)]">
              <div className="overflow-hidden rounded-3xl border border-brand-700/15 bg-white">
                <Band variant="a" />
                <div className="p-6">
                  <p className="text-xs font-extrabold tracking-[0.28em] text-brand-700">
                    QUICK BOOKING
                  </p>

                  <h3 className="mt-2 text-2xl md:text-3xl font-extrabold">
                    Book → Pay → Upload proof
                  </h3>

                  <p className="mt-2 text-sm text-ink/70">
                    Submit your service details, upload payment proof, and your request goes into review.
                  </p>

                  <div className="mt-5 grid gap-3">
                    {[
                      { name: "Business Logo", price: "₦8,000", band: "a" as const },
                      { name: "Business Flyer", price: "₦5,500", band: "b" as const },
                      { name: "Business Cards", price: "₦8,000", band: "c" as const },
                      { name: "Instagram Remodeling", price: "₦17,000", band: "a" as const },
                    ].map((x) => (
                      <div
                        key={x.name}
                        className="overflow-hidden rounded-2xl border border-brand-700/15 bg-white"
                      >
                        <Band variant={x.band} />
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-extrabold text-brand-700">{x.name}</p>
                              <p className="mt-1 text-xs text-ink/70">
                                Premium export quality and clean layout.
                              </p>
                            </div>
                            <p className="text-sm font-extrabold text-brand-700">{x.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button href="/booking">Start booking</Button>
                    <Button href="/contact" variant="outline">
                      Contact
                    </Button>
                  </div>

                  <p className="mt-5 text-xs text-ink/65">
                    <Link href="/pricing" className="underline underline-offset-4">
                      View full pricing
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials (no extra title/subtitle text) */}
      <Section kicker="TESTIMONIALS" title="" subtitle={undefined}>
        <TestimonialChatsIOS items={chats as any} />
      </Section>

      <Section
        kicker="SERVICES"
        title="Services built for premium presentation."
        subtitle="Pick what you need. For custom requests, chat with Clo Media."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {featuredServices.map((s, i) => (
            <Card
              key={s.title}
              band={i % 3 === 0 ? "a" : i % 3 === 1 ? "b" : "c"}
              title={s.title}
              text={s.description}
            >
              <ul className="space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-ink/75">
                    <span className="mt-[7px] h-2 w-2 rounded-full bg-brand-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button href="/booking" variant="outline">
                  Book
                </Button>
                <Button href="/pricing" variant="ghost">
                  Pricing
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        kicker="PRICING"
        title="Clear pricing."
        subtitle="Fixed prices for listed services. For spec-based requests, chat with Clo Media."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {featuredPricing.map((item, idx) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-3xl border border-brand-700/15 bg-white shadow-[0_24px_60px_rgba(242,92,5,0.08)]"
            >
              <Band variant={idx % 2 === 0 ? "a" : "b"} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-extrabold text-brand-700">{item.name}</p>
                    {item.note ? <p className="mt-1 text-xs text-ink/70">{item.note}</p> : null}
                  </div>
                  <p className="text-sm font-extrabold text-brand-700">{item.priceLabel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/pricing">Full pricing</Button>
          <Button href="/booking" variant="outline">
            Book now
          </Button>
        </div>
      </Section>
    </div>
  );
}