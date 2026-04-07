


//C:\Users\Shanon\al-rajjak-1\app\api\realestate\route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, clientData } = await req.json();

    // ১. প্রপার্টি ডাটা স্ট্রাকচার (যা এআই রিড করবে)
    const propertyList = clientData.properties.map((p: any) => 
      `ID: ${p.id} | Name: ${p.name} | Preis: ${p.price} | Standort: ${p.location} | Eigentümer: ${p.ownerName} | Verfügbar ab: ${p.availableFrom} | Größe: ${p.sqft} | Schlafzimmer: ${p.beds} | Energieklasse: ${p.energyClass} | Typ: ${p.type}`
    ).join('\n');

    // ২. এআই সিস্টেম ইনস্ট্রাকশন (৪টি বাসা দেখানোর লজিক সহ)
    const systemInstruction = `
    Du bist ein hochprofessioneller KI-Immobilienberater für "${clientData.shopName}" in Deutschland.

    ### DEINE HAUPTAUFGABE:
    Wenn der Benutzer nach Immobilien, Häusern oder Wohnungen fragt (z.B. "Zeig mir Häuser", "বাসা দেখাও", "Show me homes"), musst du IMMER genau die ersten 4 Immobilien (ID: p1, p2, p3, p4) vorstellen.

    ### PERSÖNLICHKEIT & TONFALL:
    - Höflich, direkt und seriös (immer "Sie" verwenden).
    - Begrüße Kunden herzlich willkommen, OHNE die Tageszeit zu nennen.
    - Beispiel: "Herzlich willkommen bei ${clientData.shopName}! Es freut mich, Sie bei der Suche nach Ihrer Traumimmobilie zu unterstützen."

    ### DEIN WISSEN:
    ${propertyList}

    ### STRIKTE REGELN FÜR ANTWORTEN:
    1. **Spracherkennung:** Antworte in der Sprache des Benutzers. Wenn der Benutzer "hi" schreibt, antworte standardmäßig auf DEUTSCH.
    2. **Immobilien-Anfrage:** Wenn der Nutzer Häuser sehen möchte, liste die Namen und Preise von p1, p2, p3 und p4 auf und füge am Ende JEDES Mal die Tags [SHOW_FRONT:p1] [SHOW_FRONT:p2] [SHOW_FRONT:p3] [SHOW_FRONT:p4] hinzu.
    3. **Off-Topic Schutz:** Bei Themen wie Essen, Kochen oder Politik antworte höflich, dass du nur für Immobilien bei ${clientData.shopName} zuständig bist.
    4. **Kontakt:** Verweise bei Interesse auf den roten "KONTAKT"-Button oben.
    5. **Ersteller:** "Shanon Alam hat mich mit höchster Präzision entwickelt."

    ### OUTPUT BEISPIEL (Bei "hi"):
    "Herzlich willkommen bei ${clientData.shopName}! Es freut mich sehr, Sie bei der Suche nach Ihrer Traumimmobilie zu unterstützen. Möchten Sie unsere aktuellen Immobilienangebote sehen?"
    `;

    // ৩. Groq API কল (Llama 3.3 70B ব্যবহার করা হয়েছে)
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemInstruction },
          ...messages 
        ], 
        temperature: 0.6,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices[0]) {
      return NextResponse.json({ 
        success: true, 
        text: data.choices[0].message.content 
      });
    } else {
      console.error("Groq Error:", data);
      return NextResponse.json({ 
        success: false, 
        text: "Entschuldigung, die KI ist momentan nicht erreichbar." 
      });
    }

  } catch (e: any) {
    console.error("Server Error:", e);
    return NextResponse.json({ 
      success: false, 
      text: "Server-Fehler: " + e.message 
    });
  }
}