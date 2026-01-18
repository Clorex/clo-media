import Link from "next/link";

export function WelcomeSplash({
  firstName,
  nextUrl,
}: {
  firstName: string;
  nextUrl: string;
}) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-brand-700/15 bg-white shadow-[0_40px_110px_rgba(242,92,5,0.14)]">
      <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700 clo-band" />

      <div className="p-6 md:p-10">
        <p className="text-xs font-extrabold tracking-[0.22em] text-brand-700">WELCOME</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-ink">Hi {firstName}.</h1>
        <p className="mt-3 text-sm md:text-base text-ink/70">You’re signed in.</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={nextUrl}
            className="rounded-xl border border-brand-700/20 bg-gradient-to-r from-brand-200 via-brand-500/30 to-brand-200 px-4 py-2 text-sm font-extrabold text-ink text-center"
          >
            Continue
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-brand-700/20 bg-white px-4 py-2 text-sm font-extrabold text-ink text-center"
          >
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}