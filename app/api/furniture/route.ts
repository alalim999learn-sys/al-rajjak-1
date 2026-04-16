//C:\Users\Shanon\al-rajjak-1\app\api\furniture\route.ts


 
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // ১. সুপাবেস থেকে সব প্রোডাক্ট নিয়ে আসা
    const { data: products, error } = await supabase
      .from("furniture")
      .select("*")
      .order('price', { ascending: true });

    if (error || !products) {
      return NextResponse.json({ success: false, text: "ডাটাবেস কানেকশন এরর।" });
    }

    // ২. এআই-এর জন্য লজিক্যাল ইনভেন্টরি লিস্ট তৈরি (Token Optimized)
    let productList = "";
    products.forEach((p) => {
      productList += `- ${p.title} [SHOW_FRONT:${p.id}]
      দাম: ${p.price}€ | কিস্তি: ${p.monthly_payment}€ | ক্যাটাগরি: ${p.category}
      প্রস্থ: ${p.width_cm}cm | লেগ: ${p.leg_height_cm}cm | রোবট ভ্যাকুয়াম: ${p.robot_vacuum_clearance ? "হ্যাঁ" : "না"}
      USB: ${p.has_usb ? "হ্যাঁ" : "না"} | ফিচার: ${Array.isArray(p.features) ? p.features.join(", ") : p.features}\n`;
    });

    // ৩. ডাইনামিক সিস্টেম প্রম্পট
    const systemInstruction = `তুমি 'LemonSKN Furniture' এর সেলস এক্সপার্ট। 
    ইউজারকে সাহায্য করো সঠিক ফার্নিচার খুঁজে পেতে।

    🔴 নিয়মাবলী:
    - যদি ইউজার বাজেট দেয় (যেমন: ৫০০€ এর নিচে), তবে গাণিতিক তুলনা করে সঠিক প্রোডাক্ট দেখাও।
    - কিস্তি (Monthly Payment) নিয়ে প্রশ্ন করলে ডাটা থেকে নিখুঁত হিসাব দাও।
    - কোনো প্রোডাক্ট সাজেস্ট করলে অবশ্যই [SHOW_FRONT:id] ট্যাগটি ব্যবহার করবে।
    - কথা বলবে খুব বন্ধুত্বপূর্ণ কিন্তু পেশাদার ভাবে।

    ইনভেন্টরি ডাটা:
    ${productList}`;

    // ৪. ওপেন-রাউটার (Gemini 2.0 Flash) কল
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [
          { role: "system", content: systemInstruction },
          ...messages.slice(-6) // লাস্ট ৬টি মেসেজ মেমোরি হিসেবে পাঠাচ্ছি
        ],
        temperature: 0.2, 
      }),
    });

    const aiData = await response.json();
    const aiText = aiData.choices?.[0]?.message?.content || "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।";

    // ৫. কাস্টমার ইন্টারেকশন সেভ করা (সুপাবেসে)
    const lastUserMessage = messages[messages.length - 1].content;
    await supabase.from("customer_interactions").insert([
      { prompt: lastUserMessage, ai_response: aiText }
    ]);

    // ৬. ফ্রন্টএন্ডে AI এর টেক্সট এবং ইনভেন্টরি ডাটা একসাথে পাঠানো
    return NextResponse.json({ 
      success: true, 
      text: aiText,
      inventory: products 
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, text: "সার্ভার এরর।" });
  }
}