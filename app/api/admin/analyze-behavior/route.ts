//C:\Users\Shanon\al-rajjak-1\app\api\admin\analyze-behavior\route.ts



import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// ১. কনফিগারেশন
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET() {
  try {
    // ২. সুপাবেস থেকে কাস্টমার অ্যাক্টিভিটি ডাটা আনা
    const { data: activityData, error } = await supabase
      .from('user_activity')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(300); // এআই-এর জন্য লেটেস্ট ৩০০ ডাটা যথেষ্ট

    if (error) throw error;

    if (!activityData || activityData.length === 0) {
      return NextResponse.json({ 
        success: true, 
        summary: "No hay suficientes datos de clientes todavía para realizar un análisis." 
      });
    }

    // ৩. ডাটাকে এআই-এর জন্য ছোট করে প্রসেস করা
    const rawSummary = activityData.map(item => 
      `Evento: ${item.event_type}, Cat: ${item.category || 'N/A'}, Precio: ${item.price_range || 'N/A'}`
    ).join('\n');

    // ৪. Gemini AI কে কল করা
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      Eres un consultor de negocios experto para una tienda de relojes en España. 
      Analiza los siguientes datos de comportamiento de usuarios y proporciona un resumen ejecutivo en ESPAÑOL:
      
      ${rawSummary}

      Tu respuesta debe incluir:
      - Tendencia principal (¿Qué es lo más buscado?).
      - Comportamiento de precios (¿Qué rango prefieren?).
      - Una acción concreta para el dueño (Ej: "Haz una oferta en relojes deportivos").
      Mantenlo corto y profesional.
    `;

    const result = await model.generateContent(prompt);
    const aiSummary = result.response.text();

    return NextResponse.json({ 
      success: true, 
      summary: aiSummary 
    });

  } catch (error: any) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}