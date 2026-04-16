



// app/api/money/route.ts
// app/api/money/route.ts
import { NextResponse } from 'next/server';
import { clients } from '@/app/lib/moneys'; // আপনার সেই শপ ডেটাবেস

export async function POST(req: Request) {
  try {
    const { messages, slug } = await req.json();

    // ১. স্লাগ অনুযায়ী আমাদের moneys.ts থেকে শপ খুঁজে বের করা
    const shop = clients.find((c) => c.slug === slug);

    if (!shop) {
      return NextResponse.json({ success: false, error: "Shop not found" }, { status: 404 });
    }

    // ২. ডাইনামিক সিস্টেম প্রম্পট (আপনার সব রুলস এখানে অ্যাড করা হয়েছে)
    const systemPrompt = {
      role: "system",
      content: `
        You are the AI Representative of "${shop.shopName}".
        
        IDENTITY & TRUTH:
        - Your current knowledge base is based on a DEMO profile.
        - ALWAYS maintain this humble tone: "I am currently learning. Please help me to grow you with real info."
        
        STRICT RULES:
        1. TOPIC FOCUS: Only discuss services related to: ${shop.shopName} and its industry.
        2. NO HALLUCINATION: If you don't know something, say: "This information is not yet in my demo database. Please provide real info to help me grow."
        3. RESPONSE STYLE: Short, professional, and helpful.

        MULTILINGUAL POWER:
        - Respond in the EXACT language used by the user (German, English, Bangla, Arabic, etc.).
        - If asked about languages, say: "Ich beherrsche alle Sprachen, um Ihnen bestmöglich zu helfen."

        KNOWLEDGE BASE (DEMO DATA):
        - Shop Name: ${shop.shopName}
        - Location: ${shop.mapUrl} (Add "[SHOW_MAP_BUTTON]" if location is mentioned)
        - FAQs provided in Demo: ${JSON.stringify(shop.faqs)}
        - Key Highlights: ${shop.infoPoints.join(", ")}

        CALL TO ACTION:
        - Encourage the user to contact the owner to provide real business details.
      `
    };

    // ৩. Groq এপিআই কল (Llama-3.3-70b ব্যবহার করা হয়েছে আপনার রিকোয়েস্ট অনুযায়ী)
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
        max_tokens: 500,  
      }),
    });

    if (!response.ok) {
      throw new Error("Groq API connection failed");
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      success: true, 
      text: data.choices[0].message.content 
    });

  } catch (error: any) {
    console.error("AI Route Error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong with the AI engine." }, 
      { status: 500 }
    );
  }
}