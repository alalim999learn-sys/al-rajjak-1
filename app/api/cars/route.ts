//C:\Users\Shanon\al-rajjak-1\app\api\cars\route.ts


import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, clientData } = body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return NextResponse.json({ success: false, text: "API Key missing." });

    const allCars = clientData?.properties || [];
    const shopName = clientData?.shopName || "Autohaus";

    // ১. সিস্টেম প্রম্পট (একদম ক্লিন জার্মান)
    const systemPrompt = `Du bist ein erfahrener Autoverkäufer bei ${shopName}. 
    Nutze diesen Bestand: ${JSON.stringify(allCars.slice(0, 10))}.
    REGELN: Antworte ohne Sternchen (*). Sei höflich und nutze Sie. Füge am Ende jeder Empfehlung [SHOW_FRONT:ID] hinzu.`;

    // ২. জেমিনি মেসেজ স্ট্রাকচার
    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }]
      },
      {
        role: "model",
        parts: [{ text: "Verstanden. Ich bin bereit, Ihre Kunden professionell zu beraten." }]
      },
      ...messages.slice(-3).map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }))
    ];

    // ৩. সরাসরি v1beta এন্ডপয়েন্টে হিট
   // v1beta এর বদলে শুধু v1 এবং মডেলের নাম সরাসরি gemini-1.5-flash-001 দিয়ে ট্রাই করুন
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-001:generateContent?key=${apiKey}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents }),
  }
);
    const data = await response.json();

    if (!response.ok) {
      console.error("DEBUG - API ERROR:", data);
      return NextResponse.json({ success: false, text: "API Error: " + data.error?.message });
    }

    // ৪. রেসপন্স ক্লিনআপ
    let aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    aiText = aiText.replace(/\*/g, ""); // সব স্টার রিমুভ

    return NextResponse.json({ success: true, text: aiText.trim() });

  } catch (error) {
    console.error("Route Crash:", error);
    return NextResponse.json({ success: false, text: "Technischer Fehler." });
  }
}