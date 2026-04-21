//C:\Users\Shanon\al-rajjak-1\app\api\furniture\route.ts


 
// @ts-nocheck
import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({
        success: false,
        text: "No messages provided."
      });
    }

    const lastUserMessage = messages[messages.length - 1].content;

    let queryBuilder = supabase.from("bismillah_table").select("*");
    let filters: any = {};

    // ============================================================
    // 🧠 STEP 1: Intent Extraction
    // ============================================================
    if (lastUserMessage !== "INITIAL_LOAD_REQ") {
      const intentResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.LLM_MODEL || "google/gemini-2.0-flash-001",
          temperature: 0,
          messages: [
            {
              role: "system",
              content: `Return ONLY JSON.

category: "sofa", "bed", "chair", "table"
sub_type: "design-ecksofa","modulsofa","schlafsofa","design-sofa","outdoor lounge","eckcouch","u-form","l-form"
price_min, price_max: number
sort: "asc","desc","discount_desc"
search_term: string
color: string
is_pet_friendly,is_robot_friendly,is_relax,is_outdoor,is_sleeper,is_german,installment_available: boolean

Rules:
- cheapest → asc
- most expensive → desc
- most discount → discount_desc
- L-shape → l-form
- U-shape → u-form

ONLY JSON.`
            },
            { role: "user", content: lastUserMessage }
          ]
        }),
      });

      const intentData = await intentResponse.json();

      try {
        const raw = intentData.choices?.[0]?.message?.content || "{}";
        filters = JSON.parse(raw.replace(/```json|```/g, "").trim());
      } catch {
        filters = {};
      }

      // ============================================================
      // 🏗️ STEP 2: Query Building (SAFE VERSION)
      // ============================================================

      if (filters.category) {
        queryBuilder = queryBuilder.eq("category", filters.category.toLowerCase());
      }

      if (filters.sub_type) {
        // ✅ FIX: exact match instead of ilike
        queryBuilder = queryBuilder.eq("sub_type", filters.sub_type.toLowerCase());
      }

      if (filters.price_min !== undefined) {
        queryBuilder = queryBuilder.gte("current_price", filters.price_min);
      }

      if (filters.price_max !== undefined) {
        queryBuilder = queryBuilder.lte("current_price", filters.price_max);
      }

      // Boolean filters
      const boolFields = [
        "is_pet_friendly",
        "is_robot_friendly",
        "is_relax",
        "is_outdoor",
        "is_sleeper",
        "is_german",
        "installment_available"
      ];

      boolFields.forEach((field) => {
        if (filters[field] === true) {
          queryBuilder = queryBuilder.eq(field, true);
        }
      });

      // ============================================================
      // 🔍 SEARCH (SAFE)
      // ============================================================

      if (filters.search_term) {
        queryBuilder = queryBuilder.or(
          `title.ilike.%${filters.search_term}%,description.ilike.%${filters.search_term}%`
        );
      }

      if (filters.color) {
        // ✅ FIX: safe array filter
        queryBuilder = queryBuilder.contains("colors_available", [filters.color]);
      }

      // ============================================================
      // 🔃 SORTING
      // ============================================================

      if (filters.sort === "asc") {
        queryBuilder = queryBuilder.order("current_price", { ascending: true });
      } else if (filters.sort === "desc") {
        queryBuilder = queryBuilder.order("current_price", { ascending: false });
      } else {
        queryBuilder = queryBuilder.order("created_at", { ascending: false });
      }

    } else {
      queryBuilder = queryBuilder.order("created_at", { ascending: false });
    }

    // ============================================================
    // 📦 STEP 3: Fetch Data
    // ============================================================

    let { data: products, error } = await queryBuilder.limit(50);

    if (error) throw error;

    // ============================================================
    // 🔥 Discount Sorting (FIXED INTENT BASED)
    // ============================================================

    if (filters.sort === "discount_desc" && products?.length) {
      products = [...products].sort((a, b) => {
        const dA = a.original_price
          ? ((a.original_price - a.current_price) / a.original_price)
          : 0;

        const dB = b.original_price
          ? ((b.original_price - b.current_price) / b.original_price)
          : 0;

        return dB - dA;
      });
    }

    // ============================================================
    // 🧾 STEP 4: Inventory Context
    // ============================================================

    const inventoryContext = products?.length
      ? products.map((p) => {
          const discount = p.original_price
            ? Math.round(((p.original_price - p.current_price) / p.original_price) * 100)
            : 0;

          const installment = p.installment_available
            ? `মাসে ${p.monthly_payment}${p.currency}`
            : "কিস্তি নেই";

          const size = p.width_cm
            ? `${p.width_cm} x ${p.depth_cm} x ${p.height_cm} cm`
            : p.dimensions_text;

          return `
🆔 ${p.id}
🛋️ ${p.title} [SHOW_FRONT:${p.id}]
💰 ${p.current_price}${p.currency} (ছিল ${p.original_price}) | ছাড় ${discount}%
📏 ${size}
🎨 ${p.color_primary}
🧵 ${p.fabric_type}
🐾 ${p.is_pet_friendly ? "হ্যাঁ" : "না"}
🤖 ${p.is_robot_friendly ? "হ্যাঁ" : "না"}
⚡ ${p.is_relax ? "হ্যাঁ" : "না"}
🛏️ ${p.is_sleeper ? "হ্যাঁ" : "না"}
🏕️ ${p.is_outdoor ? "হ্যাঁ" : "না"}
🛡️ ${p.warranty_years} বছর
🚚 ${p.delivery_days} দিন
💳 ${installment}
`;
        }).join("\n")
      : "কোনো প্রোডাক্ট পাওয়া যায়নি।";

    // ============================================================
    // 🤖 STEP 5: Final AI Response
    // ============================================================

    const finalResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.LLM_MODEL || "google/gemini-2.0-flash-001",
        temperature: 0.3,
        max_tokens: 800,
        messages: [
          {
            role: "system",
            content: `তুমি একজন ফার্নিচার সেলস এক্সপার্ট। সব উত্তর বাংলায় দেবে।

ডাটা:
${inventoryContext}

নিয়ম:
- বানানো তথ্য না
- সবসময় [SHOW_FRONT:ID]
- দরকারি তথ্য: দাম, ছাড়, সাইজ, কিস্তি, ডেলিভারি`
          },
          ...messages.slice(-3)
        ]
      }),
    });

    const aiData = await finalResponse.json();
    const finalText =
      aiData.choices?.[0]?.message?.content ||
      "দুঃখিত, এই মুহূর্তে উত্তর দিতে পারছি না।";

    return NextResponse.json({
      success: true,
      text: finalText,
      inventory: products
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        text: "সার্ভার সমস্যা হয়েছে 😔"
      },
      { status: 500 }
    );
  }
}




















































/*
git add . 
git commit -m "HU"
git push origin main 

*/