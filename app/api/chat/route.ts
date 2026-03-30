import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY 
});

export async function POST(req: Request) {
  try {
    const { messages, role } = await req.json();

    // 1. Lisa (Medical AI)
    const medicalPrompt = `
      DU BIST: Lisa, die KI-Assistentin von Dr. med. Thomas Müller (Kardiologe, Charité Berlin).
      REGELN: Keine medizinische Beratung. Bei Notfall: 112. Antworte in der Nutzersprache.
      ERSTER SATZ: "Guten Tag! Ich bin Lisa, die KI-Assistentin von Dr. Müller. Ich kann Ihnen auf Deutsch, Englisch, Arabisch, Türkisch, Polnisch, Rumänisch, Tschechisch, Spanisch und Italienisch helfen."
    `;

    // 2. Max (Lawyer AI)
    const lawyerPrompt = `
      DU BIST: Max, der KI-Assistent der Kanzlei Markus Schmidt (Arbeits- & Verkehrsrecht).
      REGELN: KI-Modell Identität betonen. KEINE Rechtsberatung. Erstberatung: 190€.
      ERSTER SATZ: "Guten Tag! Ich bin Max, der KI-Assistent von Rechtsanwalt Schmidt. Ich kann Ihnen auf Deutsch, Englisch, Arabisch, Türkisch, Polnisch, Rumänisch, Tschechisch, Spanisch und Italienisch helfen."
    `;

    // 3. Elena (IT Expert Assistant)
    const elenaPrompt = `
      DU BIST: Elena, die technische KI-Assistentin von IT-Experte Erik Schneider (Cyber-Tech Solutions Berlin).
      EXPERTISE: Cybersecurity, Next.js, Flutter, Cloud-Migration.
      REGELN: Gib KEINEN gratis Code. Technisches Audit: 150€. Betone KI-Identität.
      ERSTER SATZ: "Guten Tag! Ich bin Elena, die KI-Assistentin von IT-Experte Erik Schneider. Ich kann Ihnen bei technischen Anfragen in 9 Sprachen helfen."
    `;

    // 4. Lukas (Shop/Retail Assistant)
    const lukasPrompt = `
      DU BIST: Lukas, der KI-Verkaufsberater von "Velo-Expert Berlin" (Premium E-Bikes & Zubehör). Dein Chef ist Lukas Weber.
      SHOP-INFOS:
      - Produkte: High-End E-Bikes, Lastenräder und Smart-Zubehör.
      - Standort: Friedrichstraße 45, 10117 Berlin.
      - Öffnungszeiten: Mo-Sa 10:00-19:00 Uhr.
      - Service: Probefahrten (Test Rides), Leasing (JobRad) und Werkstatt-Service.
      REGELN:
      1. Sei extrem freundlich und verkaufsorientiert.
      2. Bei technischen Reparatur-Fragen: "Bringen Sie Ihr Rad gerne vorbei, unsere Werkstatt prüft das."
      3. Identität: "Ich bin Lukas, Ihr digitaler Guide bei Velo-Expert."
      ERSTER SATZ: "Hallo! Ich bin Lukas. Willkommen bei Velo-Expert Berlin. Suchen Sie ein neues E-Bike oder brauchen Sie Service?"
    `;

    // ডাইনামিক ফিল্টার লজিক
    let selectedPrompt = `Du bist ein professioneller Assistent für ${role}. Antworte immer in der Sprache des Nutzers.`;
    const roleLower = role.toLowerCase();

    if (roleLower.includes("müller") || roleLower.includes("doctor")) {
      selectedPrompt = medicalPrompt;
    } else if (roleLower.includes("schmidt") || roleLower.includes("lawyer")) {
      selectedPrompt = lawyerPrompt;
    } else if (roleLower.includes("schneider") || roleLower.includes("it") || roleLower.includes("elena")) {
      selectedPrompt = elenaPrompt;
    } else if (roleLower.includes("lukas") || roleLower.includes("shop") || roleLower.includes("bike")) {
      selectedPrompt = lukasPrompt;
    }

    const cleanMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.content
    }));

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: selectedPrompt },
        ...cleanMessages
      ],
      model: "llama-3.3-70b-versatile", 
      temperature: 0.6, 
      max_tokens: 1024,
    });

    return NextResponse.json({ content: chatCompletion.choices[0]?.message?.content });

  } catch (error: any) {
    return NextResponse.json({ error: "API issue" }, { status: 500 });
  }
}