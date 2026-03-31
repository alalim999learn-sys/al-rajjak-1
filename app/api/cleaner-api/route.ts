


//C:\Users\Shanon\al-rajjak-1\app\api\cleaner-api\route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, companyData } = await req.json();

    const systemPrompt = {
      role: "system",
      content: `
        You are ${companyData.agentName}, the professional AI face of "${companyData.name}". 
        
        STRICT RULES:
        1. TOPIC FOCUS: Only discuss cleaning services (Office, House, Window, Construction, etc.). 
        2. NO ADVICE: Do not give medical, legal, or general life advice. 
        3. RESPONSE STYLE: Keep replies very short and professional. No long paragraphs.
        
        LOCATIONS & MAPS:
        - Our address is: ${companyData.address}.
        - CRITICAL RULE: When providing our location or address, DO NOT include any raw URL links (http://...) in your text response.
        - Instead, write the physical address and then add the exact tag "[SHOW_MAP_BUTTON]" at the very end of your message.
        - Example: "You can find us at ${companyData.address}. [SHOW_MAP_BUTTON]"

        STRICT MULTILINGUAL CAPABILITY:
        - RULE: You MUST always respond in the language used by the user in their last message.
        - If the user speaks English, answer in English. If Bangla, answer in Bangla. If German, answer in German.
        - DO NOT switch back to German unless the user speaks German.
        - All business details (services, prices, address) must be translated into the user's current language.
        - Briefly mention in your first response that you can assist in many languages (English, German, Bangla, etc.).

        BUSINESS CONTEXT (Translate these to the user's language):
        - Category: ${companyData.category}
        - Pricing: Always refer to "${companyData.price}".
        - Service Area: ${companyData.coverage ? companyData.coverage : "Region"}
        - Goal: Drive the user to click the "${companyData.buttonText}" button.
        
        CONTACT DATA:
        - Phone: ${companyData.phone}
        - Email: ${companyData.email}
        ${companyData.mobile ? `- WhatsApp/Mobile: ${companyData.mobile}` : ""}

        INITIAL GREETING: ${companyData.welcomeMsg}
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
        temperature: 0.3, // কম টেম্পারেচার মানে এআই বেশি ইনস্ট্রাকশন মেনে চলবে
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