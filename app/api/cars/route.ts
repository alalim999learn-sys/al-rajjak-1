


//cars/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// API Key লোড হচ্ছে কি না তা চেক করার জন্য এই লাইনটি খুব জরুরি
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is missing in .env.local!");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: Request) {
  try {
    const { messages, clientData } = await req.json();
    
    // ১. মডেল কল করা
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // ২. সিস্টেম ইনস্ট্রাকশন সেট করা
    const systemPrompt = `
      Du bist ein KI-Verkaufsberater für "${clientData.shopName}". Besitzer: ${clientData.ownerName}.
      Deine Aufgabe: Hilf Kunden, Autos aus unserem Inventar zu finden.
      
      INVENTAR (19 Autos):
      ${JSON.stringify(clientData.properties)}

      STRIKTE REGELN:
      1. Antworte immer auf DEUTSCH (German).
      2. Wenn du ein Auto empfiehlst, schreibe IMMER am Ende: [SHOW_FRONT:ID].
      3. Sei professionell und einladend.
    `;

    // ৩. চ্যাট হিস্ট্রি প্রসেস করা
    const lastMsg = messages[messages.length - 1].content;
    const history = messages.map((m: any) => `${m.role === 'user' ? 'Kunde' : 'Berater'}: ${m.content}`).join("\n");

    const fullPrompt = `${systemPrompt}\n\nChat-Verlauf:\n${history}\n\nAntwort:`;

    // ৪. কন্টেন্ট জেনারেট করা
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ success: true, text });

  } catch (error: any) {
    console.error("🔴 AI Route Error:", error.message);
    
    // যদি কী ভুল থাকে তবে পরিষ্কার মেসেজ দেবে
    if (error.message.includes("API key not valid")) {
      return NextResponse.json({ 
        success: false, 
        text: "KI-Konfigurationsfehler: API-Key ist ungültig." 
      });
    }

    return NextResponse.json({ success: false, text: "Entschuldigung, es gab einen Fehler." });
  }
}