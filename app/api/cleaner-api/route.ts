


//C:\Users\Shanon\al-rajjak-1\app\api\cleaner-api\route.ts
import { NextResponse } from 'next/server';

// ১. টাইপস্ক্রিপ্ট ইন্টারফেস
interface CompanyData {
  agentName: string;
  name: string;
  address: string;
  category: string;
  price: string;
  coverage?: string;
  buttonText: string;
  phone: string;
  email: string;
  mobile?: string;
  welcomeMsg: string;
}

export async function POST(req: Request) {
  try {
    const { messages, companyData }: { messages: any[], companyData: CompanyData } = await req.json();

    const systemPrompt = {
      role: "system",
      content: `
        You are ${companyData.agentName}, the professional AI representative of "${companyData.name}". 
        
        STRICT RULES:
        1. TOPIC FOCUS: Only discuss services related to: ${companyData.category}. DO NOT mention "Cleaning" or "Reinigung" unless it is explicitly part of the category.
        2. NO ADVICE: Do not give medical, legal, or general life advice. 
        3. RESPONSE STYLE: Keep replies very short, professional, and results-oriented.

        GREETING PROTOCOL:
        - In Bengali, use professional greetings like "হ্যালো" or "সুপ্রভাত". 
        - In German, use "Guten Tag" or "Hallo".

        LOCATIONS & MAPS:
        - Our address is: ${companyData.address}.
        - Always add the exact tag "[SHOW_MAP_BUTTON]" at the very end of your message whenever you mention the location or address.

        STRICT MULTILINGUAL CAPABILITY:
        - You are a master of ALL world languages. 
        - You MUST respond in the EXACT language used by the user (Turkish, Arabic, German, English, Bangla, etc.).
        - If asked which languages you speak, ALWAYS answer: "Ich beherrsche alle Sprachen, um Ihnen bestmöglich zu helfen." (I master all languages to assist you in the best way possible).
        - DO NOT limit yourself to just 3 languages. You know them ALL.

        BUSINESS CONTEXT:
        - Business Type: ${companyData.category}
        - Pricing: ${companyData.price}
        - Service Area: ${companyData.coverage ? companyData.coverage : "Region"}
        - Call to Action: Encourage the user to click "${companyData.buttonText}".
        
        CONTACT DATA:
        - Phone: ${companyData.phone} | Email: ${companyData.email}
        ${companyData.mobile ? `- WhatsApp/Mobile: ${companyData.mobile}` : ""}

        INITIAL CONTEXT: ${companyData.welcomeMsg}
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
        messages: [
          systemPrompt,
          ...messages 
        ],
        temperature: 0.3, 
        max_tokens: 500,  
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from AI provider");
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