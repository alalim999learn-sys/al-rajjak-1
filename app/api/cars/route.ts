


//cars/route.ts
import { NextResponse } from "next/server";

// --- সরাসরি এই ফাইলেই আপনার ৯টি গাড়ির ডেটা (Inventory) ---
const carInventory = [
  {
    id: "p1",
    name: "BMW M4 Competition",
    price: "€85.000",
    image: "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg",
    specs: { engine: "3.0L Bi-Turbo", hp: "510", year: "2023" }
  },
  {
    id: "p2",
    name: "Audi RS6 Avant",
    price: "€115.000",
    image: "https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg",
    specs: { engine: "4.0L V8 TFSI", hp: "600", year: "2024" }
  },
  {
    id: "p3",
    name: "Mercedes-Benz G63 AMG",
    price: "€180.000",
    image: "https://images.pexels.com/photos/7144186/pexels-photo-7144186.jpeg",
    specs: { engine: "4.0L V8 Biturbo", hp: "585", year: "2024" }
  },
  {
    id: "p4",
    name: "Porsche 911 GT3",
    price: "€195.000",
    image: "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg",
    specs: { engine: "4.0L Flat-6", hp: "502", year: "2023" }
  },
  {
    id: "p5",
    name: "Lamborghini Huracán",
    price: "€250.000",
    image: "/blu1.jpeg",
    specs: { engine: "5.2L V10", hp: "640", year: "2023" }
  },
  {
    id: "p6",
    name: "Ferrari F8 Tributo",
    price: "€280.000",
    image: "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg",
    specs: { engine: "3.9L V8 Turbo", hp: "710", year: "2022" }
  },
  {
    id: "p7",
    name: "Range Rover Sport",
    price: "€95.000",
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
    specs: { engine: "3.0L Diesel/PHEV", hp: "400", year: "2024" }
  },
  {
    id: "p8",
    name: "Tesla Model S Plaid",
    price: "€110.000",
    image: "https://images.pexels.com/photos/11139552/pexels-photo-11139552.jpeg",
    specs: { engine: "Electric (Tri-Motor)", hp: "1020", year: "2023" }
  },
  {
    id: "p9",
    name: "Bentley Continental GT",
    price: "€220.000",
    image: "https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg",
    specs: { engine: "6.0L W12", hp: "650", year: "2023" }
  }
];

export async function POST(req: Request) {
  try {
    const { messages, clientData } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ success: false, text: "Systemfehler: API Key fehlt." });
    }

    const systemPrompt = `
      Du bist ein exklusiver Verkaufsberater für "${clientData.shopName || "SD-AUTOHANDEL"}".
      Inhaber: ${clientData.ownerName || "Al Rajjak"}.
      
      DEIN INVENTAR (9 LUXUSAUTOS):
      ${JSON.stringify(carInventory)}

      STRIKTE REGELN:
      1. Antworte IMMER auf DEUTSCH.
      2. Wenn der Kunde nach Autos sucht, schlage passende Modelle aus dem Inventar vor.
      3. Füge am Ende der Nachricht ZWINGEND den Code [SHOW_FRONT:ID] hinzu (z.B. [SHOW_FRONT:p1]).
      4. Bei mehreren Autos schreibe die Codes direkt hintereinander (z.B. [SHOW_FRONT:p1][SHOW_FRONT:p2]).
      5. Erwähne kurz PS oder Motorleistung. Sei professionell und charmant.
      6. Halte die Antwort kurz (max. 2-3 Sätze).
    `;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
     // --- আপনার কোডের এই অংশটি পরিবর্তন করুন ---
body: JSON.stringify({
model: "llama-3.1-8b-instant",// এখানে 'llama-3.3-70b-versatile' এর বদলে এটি দিন
  messages: [{ role: "system", content: systemPrompt }, ...messages],
  temperature: 0.7,
  max_tokens: 400
})
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Groq Error");
    }

    return NextResponse.json({ 
      success: true, 
      text: data.choices[0].message.content 
    });

  } catch (error: any) {
    console.error("🔴 API Error:", error.message);
    return NextResponse.json({ 
      success: false, 
      text: "Entschuldigung, ein Fehler ist aufgetreten." 
    });
  }
}