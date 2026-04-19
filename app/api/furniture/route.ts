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
              Felder: brand, type, color_primary, fabric_type, price_min, price_max, search_term.
              Antworte NUR im JSON-Format.`
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

      // --- ২. ডাইনামিক ফিল্টারিং ---
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
      .order("created_at", { ascending: false });

    if (error) throw error;

    // --- ৩. এআই রেসপন্স (সুপারচার্জড ইনভেন্টরি কনটেক্সট) ---
    // এখানে আমরা JSON কলামগুলো থেকে ডাটা বের করে AI-কে দিচ্ছি
    const inventoryContext = products && products.length > 0
      ? products.map((p: any) => 
          `Product: ${p.title} 
           ID: ${p.id}
           Price: ${p.current_price}€ (Original: ${p.original_price}€)
           Installment: ${p.payment_info?.installment_available ? 'Available, Monthly: ' + p.payment_info.monthly_payment_eur + '€' : 'Not available'}
           Special Features: ${p.material_info?.fabric_properties || 'N/A'}, ${p.certifications?.made_in_germany ? 'MADE IN GERMANY' : 'Imported'}
           Dimensions: ${p.dimensions_text} (Width: ${p.dimension_info?.width_cm}cm)
           Pet-Friendly: ${p.material_info?.fabric_properties?.toLowerCase().includes('pet') ? 'YES' : 'No'}
           Delivery & Service: ${p.service_info?.delivery}, Assembly: ${p.service_info?.assembly_available ? 'Included/Available' : 'No'}`
        ).join("\n\n")
      : "Keine passenden Möbel gefunden.";

    const finalSystemInstruction = `Du bist ein Sales-Experte für 'LemonSKN Furniture'. 
    
    WICHTIGE REGELN:
    1. ANTWORTE IMMER AUF BENGALISCH (সবসময় বন্ধুসুলভ বাংলায় কথা বলো).
    2. Nutze das INVENTAR unten, um Produkte zu empfehlen.
    3. **STRICT RULE:** Du MUSST für jedes erwähnte Produkt den Tag [SHOW_FRONT:ID] am Ende der Beschreibung hinzufügen.
    4. **Smart Search:** - যদি কেউ বিড়াল (Cat/Pet) এর কথা বলে, 'Pet-Friendly: YES' এমন সোফা দেখাও (যেমন ID: SF-CURSAL-MOD-08)।
       - যদি কেউ কিস্তি (Installment) চায়, ডাটা থেকে মাসিক কিস্তির পরিমাণ জানাও।
       - যদি কেউ বিশাল সোফা (৪ মিটার) চায়, 'Width' চেক করো (যেমন Orion U-Form ৪.০৯ মিটার)।
       - যদি কেউ 'Made in Germany' চায়, ডাটা দেখে কনফার্ম করো।
    5. যদি সঠিক কিছু না থাকে, তবে "নাই" না বলে কাছাকাছি অপশন সাজেস্ট করো।

    INVENTAR:
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
        temperature: 0.7,
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