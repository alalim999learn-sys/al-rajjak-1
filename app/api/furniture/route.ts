//C:\Users\Shanon\al-rajjak-1\app\api\furniture\route.ts


 
// @ts-nocheck
import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!messages || messages.length === 0) {
      return NextResponse.json({ success: false, text: "No messages provided." });
    }

    const lastUserMessage = messages[messages.length - 1].content;
    let queryBuilder = supabase.from("bismillah_table").select("*");
    let filters = {};

    // ============================================================
    // ধাপ ১: ইন্টেন্ট এক্সট্রাকশন
    // ============================================================
    if (lastUserMessage !== "INITIAL_LOAD_REQ") {
      const intentResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-001",
          messages: [
            {
              role: "system",
              content: `Du bist ein SQL-Experte für Möbel. Analysiere die Nachricht und gib NUR JSON zurück.

🔴 ম্যাপ করার নিয়ম:
- category: "sofa", "bed", "chair", "table", "other"
- sub_type: "design-ecksofa", "modulsofa", "schlafsofa", "design-sofa", "outdoor lounge", "eckcouch", "u-form", "l-form"
- price_min, price_max: number
- sort: "asc" (সস্তা) oder "desc" (দামি)
- search_term: string
- color: string
- is_pet_friendly, is_robot_friendly, is_relax, is_outdoor, is_sleeper, is_german, installment_available: boolean

🔴 বিশেষ নিয়ম:
- "সবচেয়ে দামি" → sort: "desc"
- "সবচেয়ে সস্তা" → sort: "asc"
- "এল-শেপ", "L-shape" → sub_type: "l-form"
- "ইউ-শেপ", "U-shape" → sub_type: "u-form"

Antworte NUR mit JSON.`
            },
            { role: "user", content: lastUserMessage }
          ],
          temperature: 0,
        }),
      });

      const intentData = await intentResponse.json();
      try {
        const rawContent = intentData.choices?.[0]?.message?.content || "{}";
        filters = JSON.parse(rawContent.replace(/```json|```/g, "").trim());
      } catch (e) { filters = {}; }

      console.log("🔍 Filters:", filters);

      // ============================================================
      // ধাপ ২: কোয়েরি বিল্ডিং
      // ============================================================
      
      if (filters.category) {
        queryBuilder = queryBuilder.eq("category", filters.category.toLowerCase());
      }
      
      if (filters.sub_type) {
        queryBuilder = queryBuilder.ilike("sub_type", `%${filters.sub_type.toLowerCase()}%`);
      }
      
      if (filters.price_min) queryBuilder = queryBuilder.gte("current_price", filters.price_min);
      if (filters.price_max) queryBuilder = queryBuilder.lte("current_price", filters.price_max);
      
      // Boolean Flags
      if (filters.is_pet_friendly === true) queryBuilder = queryBuilder.eq("is_pet_friendly", true);
      if (filters.is_robot_friendly === true) queryBuilder = queryBuilder.eq("is_robot_friendly", true);
      if (filters.is_german === true) queryBuilder = queryBuilder.eq("is_german", true);
      if (filters.is_relax === true) queryBuilder = queryBuilder.eq("is_relax", true);
      if (filters.is_sleeper === true) queryBuilder = queryBuilder.eq("is_sleeper", true);
      if (filters.is_outdoor === true) queryBuilder = queryBuilder.eq("is_outdoor", true);
      if (filters.installment_available === true) queryBuilder = queryBuilder.eq("installment_available", true);

      // OR Conditions (Search + Color)
      let orConditions = [];
      
      if (filters.search_term) {
        orConditions.push(
          `title.ilike.%${filters.search_term}%`,
          `description.ilike.%${filters.search_term}%`
        );
      }
      
      if (filters.color) {
        orConditions.push(
          `color_primary.ilike.%${filters.color}%`,
          `colors_available @> ARRAY['${filters.color}']::text[]`
        );
      }

      if (orConditions.length > 0) {
        queryBuilder = queryBuilder.or(orConditions.join(","));
      }

      // ============================================================
      // 🔥 ফিক্স ১: Sorting Logic (তোমার সাজেশন)
      // ============================================================
      if (filters.sort === "desc") {
        queryBuilder = queryBuilder.order("current_price", { ascending: false });
      } else if (filters.sort === "asc") {
        queryBuilder = queryBuilder.order("current_price", { ascending: true });
      } else {
        // ডিফল্ট: নতুন প্রোডাক্ট আগে দেখাবে
        queryBuilder = queryBuilder.order("created_at", { ascending: false });
      }
      
    } else {
      queryBuilder = queryBuilder.order("created_at", { ascending: false });
    }

    // ============================================================
    // ধাপ ৩: ডাটা ফেচ
    // ============================================================
    let { data: products, error } = await queryBuilder.limit(50);
    if (error) throw error;

    // ============================================================
    // 🔥 ফিক্স ২: Discount Sorting (ডাটাবেস লেভেলে)
    // ============================================================
    const isDiscountQuery = lastUserMessage.includes("সবথেকে বেশি ছাড়") || 
                            lastUserMessage.includes("most discount") ||
                            lastUserMessage.includes("সবচেয়ে বেশি ছাড়");
    
    if (isDiscountQuery && products && products.length > 0) {
      // ডাটাবেস লেভেলে discount ক্যালকুলেট করা যায় না, তাই এখানে sort করছি
      products = [...products].sort((a, b) => {
        const discountA = a.original_price 
          ? ((a.original_price - a.current_price) / a.original_price) * 100 
          : 0;
        const discountB = b.original_price 
          ? ((b.original_price - b.current_price) / b.original_price) * 100 
          : 0;
        return discountB - discountA;
      });
    }

    // ============================================================
    // ধাপ ৪: ইনভেন্টরি কন্টেক্সট
    // ============================================================
    let inventoryContext = products && products.length > 0 
      ? products.map((p) => {
          const discountPercent = p.original_price 
            ? Math.round(((p.original_price - p.current_price) / p.original_price) * 100)
            : 0;
          
          const installmentText = p.installment_available && p.monthly_payment
            ? `মাসে ${p.monthly_payment}${p.currency}`
            : "কিস্তি সুবিধা নেই";

          const dimensionText = p.width_cm 
            ? `${p.width_cm}W x ${p.depth_cm}D x ${p.height_cm}H cm`
            : (p.dimensions_text || 'N/A');

          return `
🆔 ID: ${p.id}
🛋️ নাম: ${p.title} [SHOW_FRONT:${p.id}]
💰 দাম: ${p.current_price}${p.currency} (ছিল: ${p.original_price || 'N/A'}${p.currency}) | ছাড়: ${discountPercent}%
📏 সাইজ: ${dimensionText}
🏷️ ব্র্যান্ড: ${p.brand || 'N/A'} | টাইপ: ${p.category} (${p.sub_type || 'N/A'})
🎨 রঙ: ${p.color_primary || 'N/A'} | 🧵 ফেব্রিক: ${p.fabric_type || 'N/A'}
🐾 পোষা বান্ধব: ${p.is_pet_friendly ? '✅ হ্যাঁ' : '❌ না'}
🤖 রোবট ফ্রেন্ডলি: ${p.is_robot_friendly ? '✅ হ্যাঁ' : '❌ না'}
🇩🇪 জার্মানিতে তৈরি: ${p.is_german ? '✅ হ্যাঁ' : '❌ না'}
⚡ রিলাক্স ফাংশন: ${p.is_relax ? '✅ হ্যাঁ' : '❌ না'}
🏕️ আউটডোর: ${p.is_outdoor ? '✅ হ্যাঁ' : '❌ না'}
🛏️ স্লিপার: ${p.is_sleeper ? '✅ হ্যাঁ' : '❌ না'}
🛡️ ওয়ারেন্টি: ${p.warranty_years} বছর
🚚 ডেলিভারি: ${p.delivery_days} দিনে
💳 কিস্তি: ${installmentText}
📝 বিবরণ: ${p.description?.substring(0, 150) || 'N/A'}...
--------------------------------------------------`;
        }).join("\n")
      : "😔 দুঃখিত, আপনার চাহিদা অনুযায়ী কোনো প্রোডাক্ট আমাদের স্টকে নেই।";

    // ============================================================
    // ধাপ ৫: ফাইনাল AI রেসপন্স
    // ============================================================
    const finalSystemInstruction = `তুমি LemonSKN Furniture-এর একজন প্রফেশনাল সেলস অ্যাসিস্ট্যান্ট।

📦 ইনভেন্টরি ডাটা (শুধু এখান থেকে উত্তর দেবে):
${inventoryContext}

🔴 কঠোর নির্দেশনা:
১. কাস্টমার যে ভাষাতেই প্রশ্ন করুক, তুমি সবসময় **বাংলা (Bengali)** উত্তর দেবে।
২. প্রতিটি প্রোডাক্টের নামের শেষে [SHOW_FRONT:ID] ট্যাগ দিতেই হবে।
৩. দাম, ছাড়ের পরিমাণ, সাইজ, ওয়ারেন্টি, ডেলিভারি টাইম গুরুত্বপূর্ণ তথ্য দেবে।
৪. কিস্তির সুবিধা থাকলে মাসিক কিস্তির পরিমাণ জানাবে।
５. "সবচেয়ে দামি" বললে সবচেয়ে বেশি দামেরটা দেখাবে।
৬. "সবথেকে বেশি ছাড়" বললে সবচেয়ে বেশি ডিসকাউন্টেরটা দেখাবে।
৭. ইনভেন্টরিতে নেই এমন তথ্য বানাবে না।`;

    const finalResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [
          { role: "system", content: finalSystemInstruction },
          ...messages.slice(-3)
        ],
        temperature: 0.3,
        max_tokens: 900,
      }),
    });

    const aiFinalData = await finalResponse.json();
    const finalContent = aiFinalData.choices?.[0]?.message?.content || "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।";

    return NextResponse.json({ 
      success: true, 
      text: finalContent, 
      inventory: products 
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ 
      success: false, 
      text: "সার্ভারে সমস্যা হয়েছে। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন। 🙏" 
    }, { status: 500 });
  }
}
/*
git add . 
git commit -m "HU"
git push origin main 

*/