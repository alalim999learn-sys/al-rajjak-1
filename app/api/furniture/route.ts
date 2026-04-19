//C:\Users\Shanon\al-rajjak-1\app\api\furniture\route.ts


 
import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!messages || messages.length === 0) {
      return NextResponse.json({ success: false, text: "No messages provided." });
    }

    const lastUserMessage = messages[messages.length - 1].content;
    let queryBuilder: any = supabase.from("bismillah_table").select("*");

    // --- ১. স্মার্ট এআই ফিল্টার জেনারেশন ---
    if (lastUserMessage !== "INITIAL_LOAD_REQ") {
      const queryGenResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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
              content: `Du bist ein PostgreSQL-Experte. Extrahiere Filter aus der Nachricht als JSON.
              
              🔴 Mögliche Felder (genau diese Namen verwenden - passend zu deiner Tabelle):
              - brand: string (Marke)
              - type: string (Typ)
              - color_primary: string (Farbe)
              - fabric_type: string (Stoff)
              - price_min: number (Mindestpreis)
              - price_max: number (Höchstpreis)
              - search_term: string (für title oder description)
              
              Antworte NUR im JSON-Format. Beispiel: {"brand": "OTTO HOME", "price_max": 1000}`
            },
            { role: "user", content: lastUserMessage }
          ],
          temperature: 0,
        }),
      });

      const queryData = await queryGenResponse.json();
      const rawContent = queryData.choices?.[0]?.message?.content || "{}";
      
      let filters: any = {};
      try {
        filters = JSON.parse(rawContent.replace(/```json|```/g, "").trim());
      } catch (e) {
        console.error("JSON Parse Error:", rawContent);
      }

      // --- ২. ডাইনামিক ফিল্টারিং (তোমার column names অনুযায়ী) ---
      if (filters.brand) queryBuilder = queryBuilder.ilike("brand", `%${filters.brand}%`);
      if (filters.type) queryBuilder = queryBuilder.ilike("type", `%${filters.type}%`);
      if (filters.color_primary) queryBuilder = queryBuilder.ilike("color_primary", `%${filters.color_primary}%`);
      if (filters.fabric_type) queryBuilder = queryBuilder.ilike("fabric_type", `%${filters.fabric_type}%`);
      if (filters.price_min) queryBuilder = queryBuilder.gte("current_price", filters.price_min);
      if (filters.price_max) queryBuilder = queryBuilder.lte("current_price", filters.price_max);
      if (filters.search_term) {
        queryBuilder = queryBuilder.or(`title.ilike.%${filters.search_term}%,description.ilike.%${filters.search_term}%`);
      }
    }

    const { data: products, error } = await queryBuilder
      .limit(10)
      .order("current_price", { ascending: true });

    if (error) throw error;

    // --- ৩. ফিক্সড ইনভেন্টরি কনটেক্সট (তোমার exact column names অনুযায়ী) ---
    const inventoryContext = products && products.length > 0
      ? products.map((p: any) => {
          // JSONB fields parsing
          const materialInfo = p.material_info || {};
          const dimensionInfo = p.dimensions_detailed || {};  // ← dimensions_detailed
          const serviceInfo = p.service_info || {};
          const warrantyInfo = p.warranty_info || {};
          const deliveryInfo = p.delivery_info || {};
          const certificationInfo = p.certifications || {};
          const paymentInfo = p.payment_info || {};
          
          // পোষা বান্ধব চেক (material_info.fabric_properties থেকে)
          const isPetFriendly = materialInfo.fabric_properties?.toLowerCase().includes('pet') || false;
          
          return `
🛋️ Produkt: ${p.title} [SHOW_FRONT:${p.id}]
💰 Preis: ${p.current_price}€ (Ursprünglich: ${p.original_price}€)
📦 Ratenzahlung: ${paymentInfo.installment_available ? `Ja, ${paymentInfo.monthly_payment_eur}€/Monat` : 'Nein'}
🎨 Farbe: ${p.color_primary || 'N/A'} | 📏 Größe: ${p.dimensions || 'N/A'}
🪵 Material: ${p.fabric_type || 'N/A'} | 🏷️ Marke: ${p.brand}
🐾 Pet-Friendly: ${isPetFriendly ? 'Ja ✅' : 'Nein ❌'}
🇩🇪 Made in Germany: ${certificationInfo.made_in_germany ? 'Ja ✅' : 'Nein ❌'}
📏 Breite: ${dimensionInfo.width_cm || 'N/A'}cm
🚚 Lieferung: ${deliveryInfo.delivery_days || 'N/A'} Tage | 🛡️ Garantie: ${warrantyInfo.warranty_years || 0} Jahre
🏠 Assembly: ${serviceInfo.assembly || 'Nicht verfügbar'}
---`;
        }).join("\n")
      : "Keine passenden Möbel gefunden.";

    const finalSystemInstruction = `Du bist ein Sales-Experte für 'LemonSKN Furniture'. 

🔴 WICHTIGE REGELN:
1. ANTWORTE IMMER AUF BENGALISCH (সবসময় বন্ধুসুলভ বাংলায় কথা বলো).
2. Nutze das INVENTAR unten, um Produkte zu empfehlen.
3. **STRICT RULE:** Du MUSST für jedes erwähnte Produkt den Tag [SHOW_FRONT:ID] am Ende der Beschreibung hinzufügen.
4. **Smart Search:** 
   - যদি কেউ বিড়াল (Pet/Cat) এর কথা বলে, 'Pet-Friendly: Ja ✅' এমন সোফা দেখাও
   - যদি কেউ কিস্তি (Ratenzahlung) চায়, ডাটা থেকে মাসিক কিস্তির পরিমাণ জানাও
   - যদি কেউ বিশাল সোফা (৪ মিটার) চায়, 'Breite' চেক করো
   - যদি কেউ 'Made in Germany' চায়, ডাটা দেখে কনফার্ম করো
5. যদি সঠিক কিছু না থাকে, তবে "নাই" না বলে কাছাকাছি অপশন সাজেস্ট করো।

📦 INVENTAR:
${inventoryContext}`;

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
          ...messages.slice(-5)
        ],
        temperature: 0.3,
        max_tokens: 600,
      }),
    });

    const aiFinalData = await finalResponse.json();
    
    return NextResponse.json({ 
      success: true, 
      text: aiFinalData.choices?.[0]?.message?.content || "দুঃখিত, আমি এই মুহূর্তে সাহায্য করতে পারছি না।",
      inventory: products 
    });

  } catch (error: any) {
    console.error("Critical API Error:", error);
    return NextResponse.json({ success: false, text: "একটি টেকনিক্যাল সমস্যা হয়েছে।" }, { status: 500 });
  }
}