export type SeedChatTestimonial = {
  customerName: string;
  service: string;
  customerText: string;
  ourReply: string;
};

const NAMES = [
  "Amaka O.", "Tunde A.", "Chioma N.", "Seyi K.", "Zainab M.", "Ifeanyi C.", "Blessing U.",
  "Kemi S.", "Hassan B.", "Peace I.", "Damilola T.", "Uche E.", "Rukayat F.", "Kelvin J.",
  "Adaeze P.", "Olamide R.", "Maryam H.", "Chinedu O.", "Fatima Y.", "Bola A.", "Esther N.",
  "Godwin I.", "Hauwa M.", "Samuel K.", "Nneka C.", "Ayo L.", "Bisi O.", "Salisu D.",
  "Onyinye J.", "Jude A.", "Sade B.", "Halima K.", "Emeka O.", "Temilade P.", "Nurudeen S.",
  "Rita C.", "Prince E.", "Gloria I.", "Mariam A.", "Chisom U.", "Victor T.", "Amina S.",
  "Ikenna N.", "Lilian O.", "Femi A.", "Deborah P.", "Yakubu M.", "Khadijah R.", "Nonso U.",
  "Evelyn B.", "Mohammed S.", "Iyabo A.", "Daniel N.", "Ruth O.", "Aisha K.", "Tosin M.",
];

const SERVICES = [
  "Business Logo",
  "Business Flyer",
  "Business Cards",
  "Video Adverts",
  "Instagram Remodeling",
  "Instagram Ads Setup",
  "Facebook Ads Setup",
  "TikTok Ads Setup",
  "Business Name Registration",
  "Limited Liability",
  "Brand Website",
  "Printing & Customization",
];

// Customer messages (short + clean)
const CUSTOMER_BASE = [
  "This looks clean and premium.",
  "I love how readable this is on my phone.",
  "The layout feels expensive—nice spacing.",
  "This is exactly the style I wanted.",
  "Everything looks more professional now.",
  "I like this direction a lot.",
  "The contrast is perfect.",
  "The typography looks very neat.",
  "This feels modern and balanced.",
  "The design is simple but classy.",
  "The hierarchy is strong and clear.",
  "This will sell well on WhatsApp.",
  "Nice composition—nothing is crowded.",
  "This looks better than my previous design.",
  "I’m happy with this.",
];

// Extra variations to keep them different (no numbering)
const CUSTOMER_ADDON = [
  "Please keep it minimal.",
  "Can we make the headline a bit stronger?",
  "The colors feel on-brand.",
  "The spacing is really good.",
  "I like the clean background.",
  "This is easy to scan quickly.",
  "The details are well arranged.",
  "This looks premium on mobile.",
  "It feels like a real brand now.",
  "This is exactly what I needed.",
  "The balance is perfect.",
  "The CTA stands out nicely.",
  "This looks expensive without being busy.",
  "The layout is very professional.",
  "Everything is clear at a glance.",
];

const OUR_REPLIES = [
  "Thank you. I’ll send the final pack in PNG + SVG + PDF.",
  "Great. I’ll export WhatsApp-ready and print-ready versions.",
  "Perfect. I’ll refine spacing and alignment for a cleaner finish.",
  "Nice. I’ll provide 2–3 variations so you can pick the best.",
  "Understood. I’ll keep it minimal and make the offer clearer.",
  "Great. I’ll strengthen the headline and keep the layout premium.",
  "Thanks. I’ll prepare mockups so you can see it in real use.",
  "Good. I’ll finalize and also keep the source file for future edits.",
  "Perfect. I’ll optimize readability for mobile screens.",
  "Nice. I’ll tighten typography and improve hierarchy slightly.",
];

// Small service-aware endings to make replies feel less repeated
const REPLY_ENDINGS = [
  "I’ll deliver shortly.",
  "Sending in a few minutes.",
  "I’ll update you once exported.",
  "I’ll send the next draft now.",
  "I’ll share the final files today.",
];

export const seedChatTestimonials: SeedChatTestimonial[] = Array.from({ length: 120 }).map(
  (_, i) => {
    const customerName = NAMES[i % NAMES.length];
    const service = SERVICES[i % SERVICES.length];

    const base = CUSTOMER_BASE[i % CUSTOMER_BASE.length];
    const addon = CUSTOMER_ADDON[(i * 3) % CUSTOMER_ADDON.length];
    const customerText = `${base} ${addon}`.trim();

    const reply = OUR_REPLIES[(i * 2) % OUR_REPLIES.length];
    const end = REPLY_ENDINGS[(i * 5) % REPLY_ENDINGS.length];
    const ourReply = `${reply} ${end}`.trim();

    return { customerName, service, customerText, ourReply };
  }
);