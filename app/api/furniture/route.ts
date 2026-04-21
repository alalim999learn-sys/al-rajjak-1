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
    let filters: any = {};

    // 🔥 ডিটেক্ট: Simple Search vs Complex Multi-Condition
    const isComplexQuery = (msg: string) => {
      const conditions = [
        msg.match(/\d+/g), // price
        msg.match(/লাল|নীল|সবুজ|কালো|সাদা|বেইজ|গ্রে/i), // color
        msg.match(/বিড়াল|কুকুর|পোষা|pet/i), // pet friendly
        msg.match(/৫০০|৬০০|৭০০|৮০০|৯০০|১০০০/), // budget
        msg.match(/জার্মান|german/i), // made in germany
        msg.match(/সোফা|বেড|চেয়ার/i) // category
      ];
      const matchedCount = conditions.filter(c => c !== null).length;
      return matchedCount >= 3; // 3+ conditions = complex
    };

    const isComplex = isComplexQuery(lastUserMessage);

    // ============================================================
    // 🧠 STEP 1: Schema-Aware Intent Extraction (LLM-1)
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
              content: `Return ONLY JSON. Extract filters STRICTLY from user message.

🔴 CRITICAL RULES (NO APPROXIMATION):
- price_max: EXACT budget. If user says "500 euro", use 500. NEVER use 600 or 800.
- price_min: Minimum price if mentioned.
- color: EXACT color match.
- category: "sofa", "bed", "chair", "table"
- sub_type: "l-form", "u-form", "schlafsofa", "modulsofa", "eckcouch"
- is_pet_friendly: true/false
- is_robot_friendly: true/false  
- is_relax: true/false
- is_outdoor: true/false
- is_sleeper: true/false
- is_german: true/false
- installment_available: true/false
- search_term: string
- sort: "asc", "desc", "discount_desc"

⚠️ STRICT BUDGET ENFORCEMENT:
If user says "unter 500 Euro" → price_max = 500. NEVER include products above 500.
If user says "max 300 Euro" → price_max = 300. NEVER include 350 or higher.

ONLY JSON. NO EXPLANATIONS.`
            },
            { role: "user", content: lastUserMessage }
          ]
        }),
      });

      const intentData = await intentResponse.json();
      try {
        const raw = intentData.choices?.[0]?.message?.content || "{}";
        filters = JSON.parse(raw.replace(/```json|```/g, "").trim());
      } catch { filters = {}; }

      console.log("🔍 Filters:", filters);

      // ============================================================
      // 🏗️ STEP 2: Query Building (STRICT Pre-filtering)
      // ============================================================
      
      if (filters.category) {
        queryBuilder = queryBuilder.eq("category", filters.category.toLowerCase());
      }
      
      if (filters.sub_type) {
        queryBuilder = queryBuilder.eq("sub_type", filters.sub_type.toLowerCase());
      }
      
      // 🔥 STRICT price filter - NO approximation
      if (filters.price_min !== undefined) {
        queryBuilder = queryBuilder.gte("current_price", filters.price_min);
      }
      if (filters.price_max !== undefined) {
        queryBuilder = queryBuilder.lte("current_price", filters.price_max);
      }
      
      if (filters.color) {
        queryBuilder = queryBuilder.contains("colors_available", [filters.color]);
      }
      
      // Boolean filters
      const boolFields = ["is_pet_friendly", "is_robot_friendly", "is_relax", "is_outdoor", "is_sleeper", "is_german", "installment_available"];
      boolFields.forEach(field => { if (filters[field] === true) queryBuilder = queryBuilder.eq(field, true); });

      if (filters.search_term) {
        queryBuilder = queryBuilder.or(`title.ilike.%${filters.search_term}%,description.ilike.%${filters.search_term}%`);
      }

      // Sorting
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
    // 📦 STEP 3: Fetch Data (Limit based on complexity)
    // ============================================================
    const limit = isComplex ? 10 : 20; // কমপ্লেক্স হলে কম প্রোডাক্ট
    let { data: products, error } = await queryBuilder.limit(limit);
    if (error) throw error;

    // 🔥 Discount sorting (if requested)
    if (filters.sort === "discount_desc" && products?.length) {
      products = [...products].sort((a, b) => {
        const dA = a.original_price ? ((a.original_price - a.current_price) / a.original_price) : 0;
        const dB = b.original_price ? ((b.original_price - b.current_price) / b.original_price) : 0;
        return dB - dA;
      });
    }

    // ============================================================
    // 📊 STEP 4: Structured Context (The Buffer)
    // ============================================================
    
    // 🔥 Pre-filter Status (কি পাওয়া গেছে তার সারাংশ)
    const stats = {
      total: products?.length || 0,
      price_range: products?.length ? {
        min: Math.min(...products.map(p => p.current_price)),
        max: Math.max(...products.map(p => p.current_price))
      } : null,
      colors: [...new Set(products?.map(p => p.color_primary))].filter(Boolean),
      has_pet_friendly: products?.some(p => p.is_pet_friendly),
      has_sleeper: products?.some(p => p.is_sleeper),
      has_german: products?.some(p => p.is_german),
      has_installment: products?.some(p => p.installment_available)
    };

    const prefilterStatus = `
[STOCK CHECK REPORT - DO NOT INVENT DATA]
User Request: "${lastUserMessage}"
Filters Applied: ${JSON.stringify(filters, null, 2)}

✅ Found: ${stats.total} products
💰 Price range: ${stats.price_range?.min || 'N/A'} - ${stats.price_range?.max || 'N/A'} EUR
🎨 Colors available: ${stats.colors.join(', ') || 'N/A'}
🐾 Pet-friendly available: ${stats.has_pet_friendly ? 'YES' : 'NO'}
🛏️ Sleeper sofa available: ${stats.has_sleeper ? 'YES' : 'NO'}
🇩🇪 German made available: ${stats.has_german ? 'YES' : 'NO'}
💳 Installment available: ${stats.has_installment ? 'YES' : 'NO'}

⚠️ IMPORTANT: If NO products found, say "Sorry, no products match your criteria". DO NOT suggest higher priced items.`;

    // 🔥 Inventory Context (বিস্তারিত তথ্য)
    const inventoryContext = products?.length 
      ? products.map(p => {
          const discount = p.original_price 
            ? Math.round(((p.original_price - p.current_price) / p.original_price) * 100)
            : 0;
          const installment = p.installment_available ? `💳 মাসে ${p.monthly_payment}${p.currency}` : '';
          
          return `
🆔 ID: ${p.id}
🛋️ ${p.title} [SHOW_FRONT:${p.id}]
💰 ${p.current_price}${p.currency} ${p.original_price ? `(was ${p.original_price}${p.currency}, -${discount}%)` : ''}
📏 ${p.width_cm}x${p.depth_cm}x${p.height_cm} cm | 🎨 ${p.color_primary || 'N/A'} | 🧵 ${p.fabric_type || 'N/A'}
🐾 Pet: ${p.is_pet_friendly ? '✅' : '❌'} | 🤖 Robot: ${p.is_robot_friendly ? '✅' : '❌'} | ⚡ Relax: ${p.is_relax ? '✅' : '❌'}
🛏️ Sleeper: ${p.is_sleeper ? '✅' : '❌'} | 🏕️ Outdoor: ${p.is_outdoor ? '✅' : '❌'} | 🇩🇪 German: ${p.is_german ? '✅' : '❌'}
🛡️ Warranty: ${p.warranty_years} years | 🚚 Delivery: ${p.delivery_days} days
${installment}
---`;
        }).join("\n")
      : "❌ NO products found matching your criteria.";

    // ============================================================
    // 🤖 STEP 5: Final Response with Self-Correction (LLM-2)
    // ============================================================
    
    const finalResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.LLM_MODEL || "google/gemini-2.0-flash-001",
        temperature: isComplex ? 0.1 : 0.3, // কমপ্লেক্স হলে কম temperature
        messages: [
          {
            role: "system",
            content: `তুমি LemonSKN Furniture-এর একজন প্রফেশনাল সেলস অ্যাসিস্ট্যান্ট।

📋 STOCK CHECK REPORT (REAL DATA):
${prefilterStatus}

📦 INVENTORY DETAILS:
${inventoryContext}

🔴 CRITICAL RULES (MUST FOLLOW):
1. ONLY use data from the INVENTORY DETAILS above.
2. NEVER suggest products with price higher than user's budget.
3. If user said "unter 500 Euro", ONLY show products with price < 500.
4. If NO products match, say: "দুঃখিত, আপনার চাহিদা অনুযায়ী কোনো প্রোডাক্ট আমাদের স্টকে নেই।"
5. EVERY product mention MUST include [SHOW_FRONT:ID] tag.
6. Response language: বাংলা (Bengali).
7. Be friendly, professional, and concise (2-4 lines).

🔴 SELF-CORRECTION CHECK (Before responding):
- Did I check that all suggested products match the user's budget?
- Did I include [SHOW_FRONT:ID] for each product?
- If no products found, did I say "দুঃখিত, নেই" instead of suggesting alternatives?
- Is my response in Bengali?

If any answer is NO, CORRECT your response before sending.`
          },
          ...messages.slice(-5)
        ]
      }),
    });

    const aiData = await finalResponse.json();
    let finalText = aiData.choices?.[0]?.message?.content || "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।";

    // 🔥 Self-Correction Validation (পোস্ট-প্রসেসিং)
    // Check if budget is violated
    if (filters.price_max && products?.length) {
      const hasPriceViolation = products.some(p => p.current_price > filters.price_max);
      if (hasPriceViolation && finalText.includes("দাম")) {
        finalText += "\n\n⚠️ [Self-Correction: Budget filter applied - only showing products under budget]";
      }
    }

    return NextResponse.json({
      success: true,
      text: finalText,
      inventory: products,
      debug: { filters, stats, isComplex } // ডিবাগের জন্য (প্রোডাকশনে রিমুভ করো)
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, text: "সার্ভার সমস্যা হয়েছে 😔" }, { status: 500 });
  }
}

















































/*
git add . 
git commit -m "HU"
git push origin main 

*/