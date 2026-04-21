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

    // --- ধাপ ১: ইন্টেন্ট এক্সট্রাকশন ---
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
              content: `Du bist ein SQL-Experte. Analysiere die Nachricht und gib NUR JSON zurück.
              REGELN:
              - "L-shape" -> search_term: "L-Form"
              - "U-shape" -> search_term: "U-Form"
              - "Robot vacuum" -> robot_friendly: true
              - "Pet" -> pet_friendly: true
              - "Expensive" -> sort: "desc"
              - "Cheap" -> sort: "asc"
              - বাজেট থাকলে price_max বা price_min সেট করো.`
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

    const { data: products, error } = await queryBuilder.limit(10);
    if (error) throw error;

    // --- ধাপ ২: ইনভেন্টরি কন্টেক্সট (বিস্তারিত ফরম্যাট) ---
    let inventoryContext = "";
    if (products && products.length > 0) {
      inventoryContext = products.map((p) => {
        const isPet = p.material_info?.fabric_properties?.toLowerCase().includes('pet') ? "হ্যাঁ" : "না";
        const isRobot = p.dimensions_detailed?.robot_vacuum_clearance ? "হ্যাঁ" : "না";
        const monthly = p.payment_info?.monthly_payment_eur || "N/A";
        
        return `
🆔 ID: ${p.id}
🛋️ প্রোডাক্ট: ${p.title} [SHOW_FRONT:${p.id}]
💰 দাম: ${p.current_price}€ (পুরানো: ${p.original_price || 'N/A'}€)
📏 সাইজ: ${p.dimensions} | প্রস্থ: ${p.dimensions_detailed?.width_cm || 'N/A'}cm
🧵 ফেব্রিক: ${p.fabric_type || 'N/A'} | রঙ: ${p.color_primary || 'N/A'}
🐾 পোষা বান্ধব: ${isPet} | 🤖 রোবট ভ্যাকুয়াম: ${isRobot}
🛡️ ওয়ারেন্টি: ${p.warranty_info?.warranty_years || 0} বছর
🚚 ডেলিভারি: ${p.delivery_info?.delivery_days || 'N/A'} দিন
💳 কিস্তি: ${p.payment_info?.installment_available ? monthly + '€/মাস' : 'না'}
📝 বর্ণনা: ${p.description?.substring(0, 150)}...
--------------------------------------------------`;
      }).join("\n");
    } else {
      inventoryContext = "দুঃখিত, বর্তমানে এই ক্যাটাগরিতে আমাদের স্টকে কোনো সোফা নেই।";
    }

    // --- ধাপ ৩: ফাইনাল রেসপন্স জেনারেট করা ---
    const finalSystemInstruction = `তুমি LemonSKN Furniture-এর একজন প্রফেশনাল সেলস অ্যাসিস্ট্যান্ট।
📦 INVENTAR (শুধুমাত্র এই ডাটা থেকে উত্তর দেবে):
${inventoryContext}
🔴 কঠোর নির্দেশনা:
১. ইনভেন্টরিতে নেই এমন কোনো তথ্য বানাবে না।
২. রোবট ভ্যাকুয়াম বা পোষা প্রাণীর কথা জিজ্ঞেস করলে 'হ্যাঁ' বা 'না' স্পষ্ট বলবে।
৩. প্রতিটি প্রোডাক্টের নামের শেষে [SHOW_FRONT:ID] ট্যাগ দিবে।
৪. ভাষা: সুন্দর ও সাবলীল বাংলা।`;

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

    // 🔥 ধাপ ৪: ডাটা সেভ করা (ইউজার প্রম্পট + এআই সামারি/রেসপন্স)
    if (lastUserMessage !== "INITIAL_LOAD_REQ") {
      try {
        // এআই ফিল্টার থেকে ইনটেন্ট বের করা
        const intentLabel = filters.search_term || 
                           (filters.pet_friendly ? "Pet Friendly" : 
                           (filters.robot_friendly ? "Robot Clearance" : "General"));

        supabase.from("ai_user_interactions").insert([
          {
            user_query: lastUserMessage,
            ai_response: finalContent,
            intent_category: intentLabel,
            session_id: `sess_${Date.now()}`
          }
        ]).then(({ error }) => {
          if (error) console.error("Supabase Log Error:", error);
        });
      } catch (dbErr) {
        console.error("Logging failed:", dbErr);
      }
    }

    return NextResponse.json({ 
      success: true, 
      text: finalContent,
      inventory: products 
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ 
      success: false, 
      text: "দুঃখিত, একটি টেকনিক্যাল সমস্যা হয়েছে।" 
    }, { status: 500 });
  }
}