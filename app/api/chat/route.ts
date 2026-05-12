//C:\Users\Shanon\al-rajjak-1\app\api\chat\route.ts



import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import OpenAI from "openai";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
    "X-Title": "Watch Vault Barcelona",
  }
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // ১. সুপাবেস থেকে ডাটা নিয়ে আসা
    const { data: knowledge, error: dbError } = await supabase
      .from('shop_knowledge')
      .select('title, info_text');

    if (dbError) throw dbError;

    const shopContext = knowledge?.map(k => `${k.title}: ${k.info_text}`).join("\n") || "No specific info available.";

    // ২. OpenRouter কল
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: `You are the Virtual Assistant for "Watch Vault Barcelona". 
          
          CONTEXT:
          ${shopContext}

          STRICT RULES:
          1. Answer ONLY in English.
          2. For stock/model/price queries, say: "I suggest checking our Collection Gallery above. Use the filters to see live stock and pricing!"
          3. For Shipping, Barcelona Location, Warranty, and Returns, use the CONTEXT.
          4. Professional, friendly, and concise (max 3 sentences).`
        },
        { role: "user", content: message }
      ],
    });

    const responseText = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";

    return NextResponse.json({ success: true, text: responseText });

  } catch (error: any) {
    console.error("Chat Error:", error);
    return NextResponse.json({ 
      success: false, 
      text: "I'm having a connection issue. Please use the gallery filters or WhatsApp us!" 
    }, { status: 500 });

    
  }
}