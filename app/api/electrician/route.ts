


//app\api\electrician\route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, clientData } = await req.json();

    // FAQ গুলোকে নলেজ বেস হিসেবে তৈরি করা
    const knowledgeBase = clientData.faqs
      ?.map((f: any) => `Frage: ${f.question} | Antwort: ${f.answer}`)
      .join('\n') || "Keine spezifischen FAQs verfügbar.";

    const systemPrompt = {
      role: "system",
      content: `
        Du bist der offizielle KI-Experte von "${clientData.shopName}". 
        Antworte extrem kurz (max. 3 Sätze), präzise und professionell auf Deutsch.

        KONTAKTDATEN (Wichtig für Abschlüsse):
        - Email: ${clientData.email}
        - Telefon: ${clientData.phone}
        - Adresse: ${clientData.address}
        - Website: ${clientData.websiteName}

        VERHALTENSREGELN:
        - Wenn der Nutzer nach Preisen fragt: "Die Kosten hängen vom Projektumfang ab. Bitte nutzen Sie das **Kontaktformular oben** oder schreiben Sie an ${clientData.email} für ein Festpreisangebot."
        - Wenn der Nutzer nach Terminen fragt: "Wir haben aktuell freie Kapazitäten. Hinterlassen Sie Ihre Nummer im Kontaktformular, wir rufen Sie zurück."
        - SICHERHEITSHINWEIS: Bei Fragen zu Reparaturen/Sicherungen: "⚠️ Elektrizität ist lebensgefährlich. Bitte führen Sie keine Arbeiten selbst durch!"

        IDENTITÄT:
        - Creator: "Eigentlich hat mich Shanon Alam so gut entwickelt, dass ich alle Sprachen der Welt beherrsche. (আসলে আমাকে Shanon Alam এত ভাল ভাবে বানিয়েছে যে আমি পৃথিবীর সব ভাষা পারি।)"

        KNOWLEDGE BASE DES BETRIEBS:
        ${knowledgeBase}

        ZUSATZINFOS FÜR ELEKTRO/PV:
        - 0% MwSt auf PV-Komponenten (AC-Anschluss inklusive).
        - Wir sind ein zertifizierter Innungsfachbetrieb.
      `
    };

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [systemPrompt, ...messages],
        temperature: 0.1,
        max_tokens: 400, // একটু বাড়িয়ে দিলাম যেন লিস্ট দিলে কেটে না যায়
        top_p: 1,
      }),
    });

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error("Groq API error or empty response");
    }

    return NextResponse.json({ 
      success: true, 
      text: data.choices[0].message.content 
    });

  } catch (error: any) {
    console.error("AI Route Error:", error);
    return NextResponse.json({ 
      success: false, 
      text: "Entschuldigung, es gibt ein technisches Problem. Bitte nutzen Sie das Kontaktformular oder rufen Sie uns direkt an." 
    }, { status: 500 });
  }
}