

//api/chat/cleaner.ts
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY 
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `
      DU BIST: Der KI-Assistent von "Perfekt gereinigt" (Fensterreinigung).
      CHEFF: Felix Schillinger.
      PREIS: 6,50€ pro m².
      REGELN: 
      1. Sei höflich. 
      2. Berechne Preise (m² * 6,50€) sofort. 
      3. Sage immer: "Das ist ein unverbindliches Angebot".
      SPRACHE: Antworte in der Sprache des Nutzers.
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.6,
    });

    return NextResponse.json({ content: chatCompletion.choices[0]?.message?.content });
  } catch (error) {
    return NextResponse.json({ error: "API Error" }, { status: 500 });
  }
}