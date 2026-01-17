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
  accountName: "Itabita Miracle",
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

3) REQUIREMENTS TO START WORK
3.1 Work starts when the client provides the required information and confirms payment (where payment applies).
3.2 If required information is missing, timelines automatically shift until the required information is received.
3.3 Required information may include (depending on the service):
- Correct business name spelling
- Contact information (WhatsApp/phone/Instagram)
- Offer details (pricing, promo, address if you want it, etc.)
- Product/service list
- Preferred colors (or request a color recommendation)
- Images to be used (if any)
- Deadline and usage platform (WhatsApp, Instagram, printing, etc.)

4) REVISIONS POLICY
4.1 Revisions are handled reasonably and professionally.
4.2 A “revision” means adjusting the existing concept (for example: text edits, minor layout changes, color tweaks).
4.3 A “new concept” means a full change in direction (for example: changing the entire design style after approval, switching to a different concept, or changing the core idea). New concepts may require a new fee.
4.4 Clo Media may limit excessive back-and-forth revisions that significantly exceed the original scope. Where this happens, we will communicate clearly and agree next steps.

5) TURNAROUND TIME
5.1 Turnaround depends on the service, the completeness of requirements, and current workload.
5.2 Rush delivery may be available (where possible) and may require an additional fee.
5.3 If a client delays in responding to questions, approvals, or missing requirements, delivery timelines shift accordingly.

6) PAYMENT POLICY
6.1 For fixed-price services, payment is required before final delivery.
6.2 When clients upload payment proof, the booking status is marked as “Pending Review” until Clo Media confirms the payment in admin.
6.3 Uploading a payment screenshot is not automatic confirmation. Confirmation happens after admin review.
6.4 Where bank transfers or payment systems have delays, Clo Media may require additional verification before confirmation.

7) REFUNDS AND CANCELLATIONS
7.1 Because design work is time-based and custom, refunds are not guaranteed once work has started.
7.2 If a client cancels before work begins, Clo Media may at its discretion refund in full or partially depending on processing time and admin costs.
7.3 If a client becomes unresponsive after work begins, the project may be paused. When the client returns, scheduling may change based on current workload.

8) FILE DELIVERY FORMATS
8.1 Deliverables are provided in formats appropriate to the service:
- Social formats (JPG/PNG)
- High resolution exports
- Print-ready exports (where applicable)
8.2 Editable/source files are not included unless explicitly agreed.
8.3 If you require specific dimensions or platform formats, mention it at the start.

9) PRINTING & CUSTOMIZATION (IF APPLICABLE)
9.1 Printing and customization depend on quantity, size, finishing, material type, and delivery location.
9.2 Clo Media will confirm a quote after specifications are provided.
9.3 Production timelines and delivery logistics will be communicated before processing.

10) WEBSITE BUILDS (IF APPLICABLE)
10.1 Website pricing depends on number of pages, features, integrations, content readiness, and timeline.
10.2 Clo Media will confirm requirements and scope before starting.
10.3 Hosting/domain costs (if any) are typically paid separately by the client unless explicitly stated otherwise.

11) CLIENT RESPONSIBILITIES
11.1 The client is responsible for providing accurate information.
11.2 Clo Media is not responsible for losses due to incorrect phone numbers, incorrect spelling supplied by the client, incorrect prices supplied by the client, or late information submission.
11.3 The client is responsible for ensuring they have rights to use any images, logos, or brand assets provided to Clo Media.

12) PORTFOLIO AND PROMOTION
12.1 Clo Media may display completed work in a portfolio unless the client requests confidentiality in writing before work begins.
12.2 For confidentiality requests, Clo Media will respect the agreement.

13) CONTACT AND SUPPORT
13.1 For questions about requirements, scope, or which service fits your goal, please use “Chat with Clo Media”.
13.2 Clo Media aims to respond as fast as possible, but response time depends on working hours and workload.

If anything in this Pricing Policy is unclear, do not guess—chat with Clo Media so we can guide you correctly.
`.trim();