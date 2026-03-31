


import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Groq SDK কনফিগারেশন
const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY 
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // সিস্টেম প্রম্পট: এখানে এআই-এর চরিত্র সেট করা হয়েছে
    const systemPrompt = `
      DU BIST: Der KI-Assistent von "Perfekt gereinigt" (Fensterreinigung).
      CHEF: Felix Schillinger.
      PREIS: 6,50€ pro m² (Quadratmeter).
      AUFGABE: 
      1. Sei immer höflich und professionell. 
      2. Wenn der Nutzer m² angibt, berechne den Preis (m² * 6,50€) sofort. 
      3. Sage immer am Ende: "Das ist ein unverbindliches Angebot".
      4. Antworte immer in der Sprache, in der der Nutzer schreibt (Deutsch/Englisch/Bengali).
    `;
C:\Users\Shanon\al-rajjak-1\api\chat\cleaner\router.ts
    // ল্লামা ৩.৩ মডেল ব্যবহার করে চ্যাট কমপ্লিশন
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.6,
      max_tokens: 1024,
    });

    return NextResponse.json({ 
      content: chatCompletion.choices[0]?.message?.content || "Entschuldigung, ich konnte keine Antwort generieren." 
    });

  } catch (error: any) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: "API Error", details: error.message }, 
      { status: 500 }
    );
  }
}