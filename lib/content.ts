export const brand = {
  name: "Clo Media",
  instagram: "https://instagram.com/clomedi.a",
  whatsapp: "https://wa.me/2348059086041",
  email: "itabitamiracle090@gmail.com",
  country: "Nigeria",
};

export const payment = {
  bankName: "OPay",
  accountNumber: "8059086041",
  accountName: "ITABITA MIRACLE OKIEMUTE",
};

export type Service = {
  title: string;
  description: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    title: "Logo Design",
    description: "Premium logo design that looks clean, modern, and brand-ready.",
    bullets: ["Concept direction", "High-resolution delivery", "Social-ready exports"],
  },
  {
    title: "Flyer Design",
    description: "High-converting flyers designed to sell your offer clearly and beautifully.",
    bullets: ["Promo/price layout", "Product/service showcase", "WhatsApp-ready output"],
  },
  {
    title: "Business Cards",
    description: "Sharp, professional business card designs that feel premium.",
    bullets: ["Front & back design", "Print-ready file", "Modern layout options"],
  },
  {
    title: "Instagram Remodeling",
    description: "Make your IG page look premium and consistent at first glance.",
    bullets: ["Profile optimization guidance", "Visual direction", "Brand consistency"],
  },
  {
    title: "Ads Setup (IG / Facebook / TikTok)",
    description: "Proper ad account + campaign setup so you can run with clarity.",
    bullets: ["Setup & structure", "Targeting foundation", "Tracking basics (where applicable)"],
  },
  {
    title: "Video Adverts",
    description: "Short, clean video adverts designed for attention and conversion.",
    bullets: ["Promo edits", "Captions/subtitles", "Social formats"],
  },
  {
    title: "Business Registration",
    description: "Business name registration & limited liability support.",
    bullets: ["Clear requirements checklist", "Guided submission flow", "Status updates"],
  },
  {
    title: "Printing & Customization",
    description: "Branded printing and custom items—handled professionally.",
    bullets: ["Quality-focused finishing", "Brand consistency", "Quote based on specs"],
  },
  {
    title: "Brand Website",
    description: "A premium website that matches your brand and communicates trust.",
    bullets: ["Clean UI", "Mobile-first", "Conversion-focused structure"],
  },
];

export type PriceItem = {
  name: string;
  priceLabel: string;
  note?: string;
  cta?: { label: string; href: string };
};

export const pricing: PriceItem[] = [
  // DEALS / PACKS (sum of items - ₦1,000)
  {
    name: "Business Pack (Logo + Flyer + Free Sticker)",
    priceLabel: "₦12,500",
    note: "Business Logo (₦8,000) + Business Flyer (₦5,500) = ₦13,500 → ₦12,500. Sticker is free.",
    cta: { label: "Book this deal", href: "/booking?service=Business%20Pack%20(Logo%20%2B%20Flyer%20%2B%20Free%20Sticker)" },
  },
  {
    name: "Brand Launch Pack (Logo + Flyer + Business Card)",
    priceLabel: "₦20,500",
    note: "Logo (₦8,000) + Flyer (₦5,500) + Cards (₦8,000) = ₦21,500 → ₦20,500.",
    cta: { label: "Book this deal", href: "/booking?service=Brand%20Launch%20Pack%20(Logo%20%2B%20Flyer%20%2B%20Business%20Card)" },
  },
  {
    name: "Social Boost Pack (IG Remodel + 2 Flyers)",
    priceLabel: "₦27,000",
    note: "IG Remodeling (₦17,000) + 2 Flyers (₦11,000) = ₦28,000 → ₦27,000.",
    cta: { label: "Book this deal", href: "/booking?service=Social%20Boost%20Pack%20(IG%20Remodel%20%2B%202%20Flyers)" },
  },
  {
    name: "Ads Kickstart Pack (IG + Facebook Ads Setup)",
    priceLabel: "₦19,000",
    note: "IG Ads Setup (₦10,000) + Facebook Ads Setup (₦10,000) = ₦20,000 → ₦19,000.",
    cta: { label: "Book this deal", href: "/booking?service=Ads%20Kickstart%20Pack%20(IG%20%2B%20Facebook%20Ads%20Setup)" },
  },

  // REGULAR PRICING
  { name: "Business Logo", priceLabel: "₦8,000" },
  { name: "Business Flyer", priceLabel: "₦5,500" },
  { name: "Business Cards", priceLabel: "₦8,000" },
  { name: "Video Adverts", priceLabel: "₦22,000" },
  { name: "Instagram Remodeling", priceLabel: "₦17,000" },
  { name: "Instagram Ads Setup", priceLabel: "₦10,000" },
  { name: "Facebook Ads Setup", priceLabel: "₦10,000" },
  { name: "TikTok Ads Setup", priceLabel: "₦10,000" },
  { name: "Business Name Registration", priceLabel: "₦42,000" },
  { name: "Limited Liability", priceLabel: "₦90,000" },

  {
    name: "Brand Website",
    priceLabel: "Chat with Clo Media",
    note: "Website pricing depends on what you want to build.",
    cta: { label: "Chat now", href: "/contact" },
  },
  {
    name: "Printing & Customization",
    priceLabel: "Chat with Clo Media",
    note: "Printing prices depend on quantity, size, finishing, and delivery.",
    cta: { label: "Chat now", href: "/contact" },
  },
];

export const pricingPolicyLong = `
PRICING POLICY (PLEASE READ)

This Pricing Policy explains how Clo Media pricing works, what is included in each service, what is not included, and how requirements, timelines, revisions, and deliverables are handled. The purpose is to keep our process structured and to protect both the client and Clo Media from misunderstandings.

1) GENERAL PRICING PRINCIPLES
1.1 Listed prices are the service fee for design/setup work as stated on the Pricing page (where applicable).
1.2 Where a service is labeled “Chat with Clo Media”, pricing depends on specifications such as scope, pages, quantity, finishing, file formats, turnaround, and other requirements. In such cases, a final price is confirmed after we review the requirements.
1.3 Clo Media reserves the right to decline requests that contain illegal, hateful, or deceptive content, or requests that violate platform policies (for example, ad policy violations).

2) WHAT YOU ARE PAYING FOR
2.1 You are paying for a structured creative process: research, layout decisions, typographic hierarchy, visual balance, conversion-focused composition, export preparation, and professional delivery formats.
2.2 Clo Media focuses on premium presentation that builds trust quickly and communicates clearly to your audience.
2.3 The price reflects time, skill, and delivery quality—not just “making something look fine”.

(unchanged)
`.trim();