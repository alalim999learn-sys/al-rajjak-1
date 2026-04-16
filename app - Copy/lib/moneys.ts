


// app/lib/moneys.ts
// app/lib/moneys.ts

export interface FAQ {
  question: string;
  answer: string;
}

export interface ClientData {
  id: string;
  slug: string; // ইউআরএল এর জন্য (যেমন: gartenbau-schmidt)
  shopName: string;
  logoUrl: string;
  mapUrl: string;
  message: string;
  status: "demo" | "pro";
  faqs: FAQ[];
  infoPoints: string[];
}

export const clients: ClientData[] = [
  {
    id: "1",
    slug: "gartenbau-schmidt",
    shopName: "Gartenbau Schmidt",
    logoUrl: "https://images.pexels.com/photos/logo-placeholder.png", // শপের আসল লোগো এখানে দিবেন
    mapUrl: "https://maps.app.goo.gl/example1",
    message: "Please help me to grow you with real info.",
    status: "demo",
    faqs: [
      { question: "What services do you offer?", answer: "We offer professional landscaping, garden maintenance, and tree care. (Demo Info)" },
      { question: "Do you provide free estimates?", answer: "Yes! We can visit your location and provide a free quote. (Demo Info)" },
      { question: "Are you available on weekends?", answer: "We primarily work Mon-Fri, but emergency services are available. (Demo Info)" },
      { question: "How long does a typical project take?", answer: "It depends on the size, but most garden refreshes take 2-5 days. (Demo Info)" },
      { question: "Can I see previous project photos?", answer: "Absolutely, I can send you our portfolio via email. (Demo Info)" }
    ],
    infoPoints: [
      "25+ Years of Experience in Germany",
      "Certified Landscaping Experts",
      "Modern Equipment & Eco-friendly methods",
      "100% Satisfaction Guaranteed"
    ]
  },
  {
    id: "2",
    slug: "hotel-heidelberg",
    shopName: "Hotel Heidelberg City",
    logoUrl: "https://images.pexels.com/photos/hotel-logo.png",
    mapUrl: "https://maps.app.goo.gl/example2",
    message: "Please help me to grow you with real info.",
    status: "demo",
    faqs: [
      { question: "What is the check-in time?", answer: "Check-in starts at 2:00 PM. Early check-in is subject to availability. (Demo Info)" },
      { question: "Is there a parking space available?", answer: "Yes, we have a secure underground parking for our guests. (Demo Info)" },
      { question: "Do you allow pets?", answer: "Small pets are welcome with an additional cleaning fee. (Demo Info)" },
      { question: "Is breakfast included in the price?", answer: "We offer both room-only and breakfast-included packages. (Demo Info)" }
    ],
    infoPoints: [
      "Located in the Historic Altstadt",
      "Free High-Speed Fiber Wi-Fi",
      "24/7 Multi-lingual Concierge",
      "Premium Coffee in every room"
    ]
  }
  // এভাবেই আপনি প্রতিদিন ৩০টি করে নতুন শপ অ্যাড করতে পারবেন
];