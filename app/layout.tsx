import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { AssistantWidget } from "@/components/site/assistant-widget";
import { getSession } from "@/lib/auth";
import { Poppins, Bricolage_Grotesque } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clo Media — Premium Branding & Design",
  description: "Premium branding, design and business support for brands across Nigeria.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  const user = session
    ? { full_name: session.full_name, email: session.email, role: session.role }
    : null;

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${display.variable} min-h-dvh bg-paper text-ink font-sans`}>
        <Navbar user={user} />
        <main className="motion-safe:animate-[fadeUp_450ms_ease-out]">{children}</main>
        <Footer />
        <AssistantWidget />
      </body>
    </html>
  );
}