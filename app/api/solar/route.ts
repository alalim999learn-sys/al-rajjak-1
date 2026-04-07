


// app/api/solar/route.ts
import { NextResponse } from 'next/server';

interface SolarClientData {
  shopName: string;
  websiteName: string;
  address: string;
  category: string;
  price: string;
  phone: string;
  email: string;
  mapUrl: string;
  welcomeMsg: string;
  faqs: { question: string; answer: string }[];
}

export async function POST(req: Request) {
  try {
    const { messages, clientData }: { messages: any[], clientData: SolarClientData } = await req.json();

    // নলেজ বেস তৈরি
    const knowledgeBase = clientData.faqs
      .map((f, i) => `${i + 1}. Q: ${f.question} | A: ${f.answer}`)
      .join('\n');

    const systemPrompt = {
      role: "system",
      content: `
        You are the official AI Sales Representative of "${clientData.shopName}". 
        
        LANGUAGE & PERSONALITY RULES:
        1. START LANGUAGE: You MUST start every initial conversation in German.
        2. ADAPTIVE LANGUAGE: If the user speaks in another language (Bangla, English, etc.), switch to that language immediately and continue in that language.
        3. SPECIAL CREDIT: If anyone asks how you know so many languages or who made you, you MUST say: 
           "আসলে আমাকে Shanon Alam এত ভাল ভাবে বানিয়েছে যে আমি পৃথিবীর সব ভাষা পারি।" 
           (In German: "Eigentlich hat mich Shanon Alam so gut entwickelt, dass ich alle Sprachen der Welt beherrsche.")
           (In English: "Actually, Shanon Alam built me so well that I can speak all languages in the world.")

        STRICT SALES RULES:
        1. TOPIC FOCUS: Only discuss ${clientData.category}. Do not give general solar advice.
        2. KNOWLEDGE BASE ONLY: Use these FAQs as your only source:
        ${knowledgeBase}
        3. NO OUTSIDE INFO: If a question isn't in the FAQ, tell them to contact ${clientData.phone}.
        
        LOCATIONS:
        - Address: ${clientData.address}.
        - Always add "[SHOW_MAP_BUTTON]" at the end if location or address is mentioned.

        BUSINESS INFO:
        - Website: ${clientData.websiteName}
        - Pricing: ${clientData.price}
        - Contact: ${clientData.phone} | ${clientData.email}
      `
    };

    // Groq API Call
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          systemPrompt,
          ...messages 
        ],
        temperature: 0.3,
        max_tokens: 800,  
      }),
    });

    if (!response.ok) {
      throw new Error("Groq API Error");
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      success: true, 
      text: data.choices[0].message.content 
    });

  } catch (error: any) {
    console.error("AI Route Error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong." }, 
      { status: 500 }
    );
  }
}