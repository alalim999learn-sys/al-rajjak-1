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
    // ধাপ ১: ইন্টেন্ট এক্সট্রাকশন (AI জেনারেটেড ফিল্টার)
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
              
🔴 Mögliche Felder:
- price_min: number (Mindestpreis, wenn "ab X Euro")
- price_max: number (Höchstpreis, wenn "unter X Euro" oder "bis X Euro")
- search_term: string (für Titel/Beschreibung/Typ, z.B. "L-Form", "U-Form")
- robot_friendly: boolean (wenn "Robot vacuum" erwähnt wird)
- pet_friendly: boolean (wenn "Pet", "Katze", "Hund" erwähnt wird)
- sort: "asc" oder "desc" (wenn "cheap" oder "expensive")

Antworte NUR mit JSON. Beispiel: {"price_max": 500, "pet_friendly": true}`
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
      } catch (e) { 
        console.error("Intent parse error:", e);
        filters = {}; 
      }

      console.log("🔍 Filters:", filters);

      // --- ডায়নামিক কোয়েরি বিল্ডিং ---
      if (filters.price_min) queryBuilder = queryBuilder.gte("current_price", filters.price_min);
      if (filters.price_max) queryBuilder = queryBuilder.lte("current_price", filters.price_max);
      
      if (filters.robot_friendly) {
        queryBuilder = queryBuilder.eq("dimensions_detailed->>robot_vacuum_clearance", "true");
      }
      
      const sortOrder = filters.sort === "desc" ? false : true;
      queryBuilder = queryBuilder.order("current_price", { ascending: sortOrder });

      let orConditions = [];
      if (filters.search_term) {
        orConditions.push(`title.ilike.%${filters.search_term}%`, `description.ilike.%${filters.search_term}%`, `type.ilike.%${filters.search_term}%`);
      }
      if (filters.pet_friendly) {
        orConditions.push(`material_info->>fabric_properties.ilike.%pet%`, `description.ilike.%pet%`);
      }

      if (orConditions.length > 0) {
        queryBuilder = queryBuilder.or(orConditions.join(","));
      }
    } else {
      queryBuilder = queryBuilder.order("current_price", { ascending: true });
    }

    // ============================================================
    // ধাপ ২: ডাটাবেস থেকে ডাটা আনা
    // ============================================================
    const { data: products, error } = await queryBuilder.limit(10);
    if (error) throw error;

    console.log("📦 Products found:", products?.length || 0);

    // ============================================================
    // ধাপ ৩: ইনভেন্টরি কন্টেক্সট তৈরি (সম্পূর্ণ তথ্য সহ)
    // ============================================================
    let inventoryContext = "";
    
    if (products && products.length > 0) {
      inventoryContext = products.map((p) => {
        // JSONB ফিল্ড সেফ এক্সেস
        const materialInfo = p.material_info || {};
        const dimensionInfo = p.dimensions_detailed || {};
        const paymentInfo = p.payment_info || {};
        const warrantyInfo = p.warranty_info || {};
        const deliveryInfo = p.delivery_info || {};
        const certificationInfo = p.certifications || {};
        
        // ফিচার ডিটেকশন
        const isPetFriendly = materialInfo.fabric_properties?.toLowerCase().includes('pet') ? "হ্যাঁ" : "না";
        const isRobotFriendly = dimensionInfo.robot_vacuum_clearance === true || dimensionInfo.robot_vacuum_clearance === "true" ? "হ্যাঁ" : "না";
        const isVegan = materialInfo.is_vegan === true ? "হ্যাঁ" : "না";
        const isGermanMade = certificationInfo.made_in_germany === true ? "হ্যাঁ" : "না";
        const hasInstallment = paymentInfo.installment_available === true ? "হ্যাঁ" : "না";
        const monthlyPayment = paymentInfo.monthly_payment_eur || "N/A";
        const warrantyYears = warrantyInfo.warranty_years || "N/A";
        const deliveryDays = deliveryInfo.delivery_days || "N/A";
        
        return `
🆔 ID: ${p.id}
🛋️ নাম: ${p.title} [SHOW_FRONT:${p.id}]
💰 দাম: ${p.current_price}€ (মূল্য: ${p.original_price || 'N/A'}€)
📏 সাইজ: ${p.dimensions || 'N/A'} | প্রস্থ: ${dimensionInfo.width_cm || 'N/A'}cm
🏷️ ব্র্যান্ড: ${p.brand || 'N/A'} | টাইপ: ${p.type || 'N/A'}
🎨 রঙ: ${p.color_primary || 'N/A'} | 🧵 ফেব্রিক: ${p.fabric_type || 'N/A'}
🐾 পোষা বান্ধব: ${isPetFriendly}
🤖 রোবট ভ্যাকুয়াম: ${isRobotFriendly}
🌿 ভেগান: ${isVegan}
🇩🇪 জার্মানিতে তৈরি: ${isGermanMade}
🛡️ ওয়ারেন্টি: ${warrantyYears} বছর
🚚 ডেলিভারি: ${deliveryDays} দিনে
💳 কিস্তি: ${hasInstallment === "হ্যাঁ" ? `${monthlyPayment}€/মাস` : 'না'}
📝 বিবরণ: ${p.description?.substring(0, 150) || 'N/A'}...
--------------------------------------------------`;
      }).join("\n");
    } else {
      inventoryContext = "দুঃখিত, আপনার চাহিদা অনুযায়ী কোনো প্রোডাক্ট আমাদের স্টকে নেই।";
    }

    // ============================================================
    // ধাপ ৪: ফাইনাল AI রেসপন্স
    // ============================================================
    const finalSystemInstruction = `তুমি LemonSKN Furniture-এর একজন প্রফেশনাল এবং বন্ধুসুলভ সেলস অ্যাসিস্ট্যান্ট।

🔴 সবচেয়ে গুরুত্বপূর্ণ নিয়ম:
১. কাস্টমার যে ভাষাতেই প্রশ্ন করুক না কেন, তুমি সবসময় **বাংলা (Bengali)** ভাষায় উত্তর দেবে।
২. তোমার ভাষা হবে সাবলীল, মার্জিত এবং পেশাদার।

📦 ইনভেন্টরি ডাটা (শুধুমাত্র এখান থেকে তথ্য দেবে):
${inventoryContext}

🔴 উত্তর দেওয়ার নির্দেশনা:
১. যদি কোনো প্রোডাক্ট কাস্টমারের চাহিদার সাথে মিলে যায়, তাহলে সেটির নাম বলবে এবং অবশ্যই শেষে [SHOW_FRONT:ID] ট্যাগটি দেবে।
২. দাম, সাইজ, ওয়ারেন্টি, ডেলিভারি টাইম গুরুত্বপূর্ণ তথ্য দেবে।
৩. কিস্তির সুবিধা থাকলে মাসিক কিস্তির পরিমাণ জানাবে।
৪. রোবট ভ্যাকুয়াম বা পোষা প্রাণীর কথা জিজ্ঞেস করলে 'হ্যাঁ' বা 'না' স্পষ্টভাবে বলবে।
৫. ইনভেন্টরিতে নেই এমন কোনো মিথ্যা তথ্য দেবে না।
৬. উত্তর হবে ৩-৫ লাইনের মধ্যে, সংক্ষিপ্ত কিন্তু তথ্যবহুল।`;

    // 🔥 টাইমআউট সহ ফেচ (নেট স্পিড কম থাকলে)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

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
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const aiFinalData = await finalResponse.json();
    const finalContent = aiFinalData.choices?.[0]?.message?.content || "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।";

    // ============================================================
    // ধাপ ৫: ব্যাকগ্রাউন্ড লগিং (ঐচ্ছিক)
    // ============================================================
    if (lastUserMessage !== "INITIAL_LOAD_REQ" && products?.length > 0) {
      supabase.from("ai_user_interactions").insert([
        {
          user_query: lastUserMessage.substring(0, 500),
          ai_response: finalContent.substring(0, 1000),
          intent_category: filters.search_term || (filters.pet_friendly ? "Pet Friendly" : "General"),
          session_id: `sess_${Date.now()}`
        }
      ]).then(({ error }) => { if (error) console.error("Log Error:", error); });
    }

    return NextResponse.json({ 
      success: true, 
      text: finalContent,
      inventory: products 
    });

  } catch (error: any) {
    console.error("API Error:", error);
    
    // এরর টাইপ অনুযায়ী ফ্রেন্ডলি মেসেজ
    let errorMessage = "দুঃখিত, একটি কারিগরি সমস্যা হয়েছে।";
    if (error.name === 'AbortError') {
      errorMessage = "সার্ভার খুব ব্যস্ত, একটু পরে আবার চেষ্টা করুন। 🙏";
    } else if (error.message?.includes('fetch')) {
      errorMessage = "নেটওয়ার্ক সমস্যা, আপনার ইন্টারনেট কানেকশন চেক করুন।";
    }
    
    return NextResponse.json({ success: false, text: errorMessage }, { status: 500 });
  }
}