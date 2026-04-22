//C:\Users\Shanon\al-rajjak-1\app\api\furniture\route.ts


 
// @ts-nocheck
import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!messages || messages.length === 0) {
      return NextResponse.json({ success: false, text: "Keine Nachrichten bereitgestellt." });
    }

    const lastUserMessage = messages[messages.length - 1].content;
    let queryBuilder = supabase.from("bismillah_table").select("*");

    // ============================================================
    // SCHRITT 1: Intent-Extraktion mit Gemini 2.5 Pro
    // ============================================================
    if (lastUserMessage !== "INITIAL_LOAD_REQ") {
      const intentResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://lemonskn-furniture.de", // ঐচ্ছিক কিন্তু ভালো
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro", // মডেল আপডেট করা হয়েছে
          messages: [
            {
              role: "system",
              content: `Du bist ein KI-Analyst für Möbel-Anfragen. Extrahiere Parameter als JSON.
              
              Mapping:
              - search_term: Name des Produkts (z.B. "Chantal", "Opera")
              - category: "sofa", "bed", "chair", "table", "other"
              - price_max: zahl
              - is_pet_friendly, is_robot_friendly, is_german: boolean
              
              WICHTIG: Wenn der Nutzer nach Details zu einem Produkt fragt, setze den Namen in search_term.`
            },
            { role: "user", content: lastUserMessage }
          ],
          temperature: 0,
        }),
      });

      const intentData = await intentResponse.json();
      let filters = {};
      try {
        const raw = intentData.choices?.[0]?.message?.content || "{}";
        filters = JSON.parse(raw.replace(/```json|```/g, "").trim());
      } catch (e) { filters = {}; }

      // ============================================================
      // SCHRITT 2: Query-Building (Fix für Galeriesuche)
      // ============================================================
      
      // ID সার্চকে অগ্রাধিকার দিন (গ্যালারি ক্লিকের জন্য)
      const idMatch = lastUserMessage.match(/ID:\s*(\d+)/i);
      if (idMatch) {
        queryBuilder = queryBuilder.eq("id", idMatch[1]);
      } else {
        if (filters.search_term) {
          queryBuilder = queryBuilder.or(`title.ilike.%${filters.search_term}%,description.ilike.%${filters.search_term}%`);
        }
        if (filters.category) queryBuilder = queryBuilder.eq("category", filters.category);
        if (filters.price_max) queryBuilder = queryBuilder.lte("current_price", filters.price_max);
        // ... অন্যান্য ফিল্টার
      }
    }

    // ============================================================
    // SCHRITT 3 & 4: ডাটা ফেচ এবং কন্টেক্সট
    // ============================================================
    let { data: products } = await queryBuilder.limit(10).order("created_at", { ascending: false });

    let inventoryContext = products && products.length > 0 
      ? products.map(p => `ID: ${p.id} | Name: ${p.title} [SHOW_FRONT:${p.id}] | Preis: ${p.current_price}€ | Info: ${p.description}`).join("\n")
      : "Kein Produkt gefunden.";

    // ============================================================
    // SCHRITT 5: Finaler Response mit Gemini 2.5 Pro
    // ============================================================
    const finalResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { 
            role: "system", 
            content: `Du bist LemonSKN Sales Assistant. Antworte auf DEUTSCH. 
            Nutze diese Daten: ${inventoryContext}. 
            Erwähne immer [SHOW_FRONT:ID] hinter dem Produktnamen.` 
          },
          ...messages.slice(-3)
        ],
        temperature: 0.3,
      }),
    });

    const aiFinalData = await finalResponse.json();
    return NextResponse.json({ 
      success: true, 
      text: aiFinalData.choices?.[0]?.message?.content || "Fehler.",
      inventory: products 
    });

  } catch (error) {
    return NextResponse.json({ success: false, text: "Server Error" }, { status: 500 });
  }
}

/*
git add . 
git commit -m "HU"
git push origin main 


*/