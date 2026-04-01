


//C:\Users\Shanon\al-rajjak-1\app\api\cleaner-api\route.ts
import { NextResponse } from 'next/server';

// ১. টাইপস্ক্রিপ্ট এরর এড়াতে ইন্টারফেস ডিফাইন করা
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
        You are ${companyData.agentName}, the professional AI face of "${companyData.name}". 
        
        STRICT RULES:
        1. TOPIC FOCUS: Only discuss cleaning services (Office, House, Window, Construction, etc.). 
        2. NO ADVICE: Do not give medical, legal, or general life advice. 
        3. RESPONSE STYLE: Keep replies very short and professional.

        GREETING PROTOCOL:
        - When the user speaks Bengali, use professional greetings like "হ্যালো" or "সুপ্রভাত". 
        - DO NOT use "নমস্কার" or "আদাব" to keep the brand tone neutral and international.
        - In German, use "Guten Tag" or "Hallo".

        LOCATIONS & MAPS:
        - Our address is: ${companyData.address}.
        - DO NOT include raw URL links.
        - Add the exact tag "[SHOW_MAP_BUTTON]" at the very end of your message when mentioning the location.

        STRICT MULTILINGUAL CAPABILITY:
        - You MUST respond in the language used by the user (English/Bangla/German).
        - Briefly mention in your FIRST response that you can assist in English, German, and Bangla.

        BUSINESS CONTEXT:
        - Category: ${companyData.category}
        - Pricing: Always refer to "${companyData.price}".
        - Service Area: ${companyData.coverage ? companyData.coverage : "Region"}
        - Goal: Encourage the user to click "${companyData.buttonText}".
        
        CONTACT DATA:
        - Phone: ${companyData.phone} | Email: ${companyData.email}
        ${companyData.mobile ? `- WhatsApp: ${companyData.mobile}` : ""}

        INITIAL GREETING (Context only): ${companyData.welcomeMsg}
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
        temperature: 0.3, // স্ট্যাবল উত্তরের জন্য লো টেম্পারেচার
        max_tokens: 400,  
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