//C:\Users\Shanon\al-rajjak-1\app\api\admin\summarize\route.ts



import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
 

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: Request) {
  try {
    // এখানে আমরা শুধু 'prompt' কলাম থেকে ডাটা নিচ্ছি
    const { data: interactions, error } = await supabase
      .from("customer_interactions")
      .select("prompt") 
      .eq("shop_id", "stuttgart_01")
      .limit(50); // শেষ ৫০টি প্রম্পট নিলাম

    if (error) throw error;

    if (!interactions || interactions.length === 0) {
      return NextResponse.json({ 
        success: false, 
        text: "ডাটাবেজে এখনো কোনো কাস্টমার প্রম্পট সেভ হয়নি।" 
      });
    }

    // সব প্রম্পটকে একসাথে করা
    const combinedPrompts = interactions.map((item, i) => `${i+1}. ${item.prompt}`).join("\n");

    const analysisPrompt = `
      নিচে কিছু কাস্টমারের প্রশ্ন দেওয়া আছে। এগুলো পড়ে ১ মিনিটে একটি বিজনেস সামারি দাও। 
      জানাও কাস্টমাররা কী ধরণের ফার্নিচার খুঁজছে এবং শপ ওনারের কী করা উচিত।
      ভাষা: বাংলা।
      
      কাস্টমারদের প্রশ্নসমূহ:
      ${combinedPrompts}
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [
          { role: "system", content: "তুমি একজন দক্ষ বিজনেস এনালিস্ট।" },
          { role: "user", content: analysisPrompt }
        ],
        temperature: 0.5,
      }),
    });

    const aiResult = await response.json();
    
    return NextResponse.json({
      success: true,
      report: aiResult.choices?.[0]?.message?.content,
      count: interactions.length
    });

  } catch (error: any) {
    console.error("Summarize Error:", error);
    return NextResponse.json({ success: false, text: "রিপোর্ট তৈরি করতে সমস্যা হয়েছে।" });
  }
}