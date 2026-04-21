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

🔴 ম্যাপ করার নিয়ম (Strict Column Mapping):
- category: "sofa", "bed", "chair", "table", "other"
- sub_type: lowercase string (z.B. "l_shape", "u_shape", "corner_sofa", "boxspring")
- price_min/max: number
- is_pet_friendly, is_robot_friendly, is_relax, is_outdoor, is_sleeper, is_german: boolean
- sort: "asc" (günstig) oder "desc" (teuer)
- search_term: string (NUR wenn category/sub_type nicht passt)
- color: string (Farbe, z.B. "beige", "grau", "blau")

Antworte NUR mit JSON. Beispiel: {"category": "sofa", "sub_type": "l_shape", "is_german": true, "color": "beige"}`
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

      console.log("🔍 Optimized Filters:", filters);

      // ============================================================
      // ধাপ ২: ডায়নামিক কোয়েরি বিল্ডিং (ফিক্সড অর্ডার + কালার সার্চ)
      // ============================================================
      
      // --- সোজা ফিল্টার (AND conditions) ---
      if (filters.category) queryBuilder = queryBuilder.eq("category", filters.category);
      
      // 🔥 ফিক্স ১: sub_type এর জন্য ilike (সেইফ)
      if (filters.sub_type) queryBuilder = queryBuilder.ilike("sub_type", `%${filters.sub_type.toLowerCase()}%`);
      
      if (filters.price_min) queryBuilder = queryBuilder.gte("current_price", filters.price_min);
      if (filters.price_max) queryBuilder = queryBuilder.lte("current_price", filters.price_max);
      
      // Boolean Flags (Partial Indexes ব্যবহার করবে 🔥)
      if (filters.is_pet_friendly) queryBuilder = queryBuilder.eq("is_pet_friendly", true);
      if (filters.is_robot_friendly) queryBuilder = queryBuilder.eq("is_robot_friendly", true);
      if (filters.is_german) queryBuilder = queryBuilder.eq("is_german", true);
      if (filters.is_relax) queryBuilder = queryBuilder.eq("is_relax", true);
      if (filters.is_sleeper) queryBuilder = queryBuilder.eq("is_sleeper", true);
      if (filters.is_outdoor) queryBuilder = queryBuilder.eq("is_outdoor", true);

      // ============================================================
      // 🔥 OR কন্ডিশন (সার্চ টার্ম + কালার) - GIN Index ব্যবহার করবে
      // ============================================================
      let orConditions = [];

      // ১. জেনারেল সার্চ টার্ম (Trigram Index)
      if (filters.search_term) {
        orConditions.push(
          `title.ilike.%${filters.search_term}%`,
          `description.ilike.%${filters.search_term}%`
        );
      }

      // 🔥 ফিক্স ২: কালার সার্চ - GIN Index ব্যবহার করবে
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
      // 🔥 ফিক্স ৩: Sorting - সব ফিল্টারের পর (সঠিক অর্ডার)
      // ============================================================
      const sortOrder = filters.sort === "desc" ? false : true;
      queryBuilder = queryBuilder.order("current_price", { ascending: sortOrder });
      
    } else {
      queryBuilder = queryBuilder.order("current_price", { ascending: true });
    }

    // ============================================================
    // ধাপ ৩: ডাটাবেস থেকে ডাটা আনা
    // ============================================================
    const { data: products, error } = await queryBuilder.limit(10);
    if (error) throw error;

    // ============================================================
    // ধাপ ৪: ইনভেন্টরি কন্টেক্সট (প্রফেশনাল ফরম্যাট)
    // ============================================================
    let inventoryContext = products && products.length > 0 
      ? products.map((p) => {
          // 🔥 ফিক্স: কিস্তির টেক্সট প্রফেশনাল
          const installmentText = p.installment_available && p.monthly_payment
            ? `প্রতি মাসে মাত্র ${p.monthly_payment}${p.currency}`
            : "বর্তমানে কিস্তি সুবিধা নেই";

          // 🔥 ফিক্স: সাইজ দেখানোর ফরম্যাট
          const dimensionText = p.width_cm 
            ? `${p.width_cm}W x ${p.depth_cm}D x ${p.height_cm}H cm`
            : (p.dimensions_text || 'N/A');

          return `
🆔 ID: ${p.id}
🛋️ নাম: ${p.title} [SHOW_FRONT:${p.id}]
💰 দাম: ${p.current_price}${p.currency} (মূল: ${p.original_price || 'N/A'}${p.currency})
📏 সাইজ: ${dimensionText}
🏷️ ব্র্যান্ড: ${p.brand || 'N/A'} | টাইপ: ${p.category} (${p.sub_type || 'N/A'})
🎨 রঙ: ${p.color_primary || 'N/A'} | 🧵 ফেব্রিক: ${p.fabric_type || 'N/A'}
🐾 পোষা বান্ধব: ${p.is_pet_friendly ? 'হ্যাঁ' : 'না'}
🤖 রোবট ফ্রেন্ডলি: ${p.is_robot_friendly ? 'হ্যাঁ' : 'না'}
🇩🇪 জার্মানিতে তৈরি: ${p.is_german ? 'হ্যাঁ' : 'না'}
⚡ রিলাক্স ফাংশন: ${p.is_relax ? 'হ্যাঁ' : 'না'}
🏕️ আউটডোর: ${p.is_outdoor ? 'হ্যাঁ' : 'না'}
🛏️ স্লিপার: ${p.is_sleeper ? 'হ্যাঁ' : 'না'}
🛡️ ওয়ারেন্টি: ${p.warranty_years} বছর
🚚 ডেলিভারি: ${p.delivery_days} দিনে
💳 কিস্তি: ${installmentText}
📝 বিবরণ: ${p.description?.substring(0, 150) || 'N/A'}...
--------------------------------------------------`;
        }).join("\n")
      : "দুঃখিত, কোনো ম্যাচিং প্রোডাক্ট পাওয়া যায়নি।";

    // ============================================================
    // ধাপ ৫: ফাইনাল AI রেসপন্স
    // ============================================================
    const finalSystemInstruction = `Du bist ein professioneller Verkaufsassistent für LemonSKN Furniture.
Antworte IMMER auf BENGALISCH.

ইনভেন্টরি ডাটা:
${inventoryContext}

নির্দেশনা:
- যদি কোনো প্রোডাক্ট মিলে যায়, সেটির নাম এবং [SHOW_FRONT:ID] ট্যাগ দাও।
- কিস্তি, ওয়ারেন্টি এবং বিশেষ ফিচার (যেমন: রিলাক্স বা জার্মান মেক) হাইলাইট করো।
- সংক্ষিপ্ত এবং তথ্যবহুল উত্তর দাও (৩-৫ লাইন)।`;

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
        max_tokens: 800,
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
      text: "সার্ভারে সমস্যা হয়েছে। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।" 
    }, { status: 500 });
  }
}


/*
git add . 
git commit -m "HU"
git push origin main 

*/