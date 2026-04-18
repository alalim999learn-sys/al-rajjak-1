//C:\Users\Shanon\al-rajjak-1\app\api\furniture\route.ts


 
import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1].content;

    let mongoQuery = {};

    // --- ১. পেজ লোড হ্যান্ডেলিং (INITIAL_LOAD_REQ) ---
    if (lastUserMessage === "INITIAL_LOAD_REQ") {
      mongoQuery = {}; // সরাসরি সব প্রোডাক্ট আনবে, এআই-এর কাছে যাওয়ার দরকার নেই
    } else {
      // ইউজার কিছু লিখে সার্চ করলে তখন এআই কোয়েরি বানাবে
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
              content: `Du bist ein MongoDB Expert. Erstelle ein JSON für die Kollektion 'furniture'.
              
              WICHTIG: 
              - Wenn der User nach "Beds" sucht, nutze { "category": "beds" }.
              - Wenn der User nach "Sofas" sucht, nutze { "category": "sofas" }.
              - Wenn der User nach einem Budget fragt (z.B. 20€/Monat), berechne: Budget * 12 und nutze { "pricing.current_price": { "$lte": Wert } }.
              - Antworte NUR mit reinem JSON.`
            },
            { role: "user", content: lastUserMessage }
          ],
          temperature: 0,
        }),
      });

      const queryData = await queryGenResponse.json();
      let rawQueryText = queryData.choices[0]?.message?.content?.trim() || "{}";
      rawQueryText = rawQueryText.replace(/```json/g, "").replace(/```/g, "");

      try {
        mongoQuery = JSON.parse(rawQueryText);
      } catch (e) {
        mongoQuery = {};
      }
    }

   
    const client = await clientPromise;
    const db = client.db("furniture_db");
    const products = await db.collection("furniture")
      .find(mongoQuery)
      .limit(10) // গ্যালারির জন্য লিমিট একটু বাড়িয়ে দিলাম
      .sort({ "pricing.current_price": 1 })
      .toArray();

    const formattedProducts = products.map(p => ({ ...p, _id: p._id.toString() }));

    // --- ৩. এআই রেসপন্স তৈরি করা ---
    let inventoryContext = formattedProducts.map(p => {
      const price = p.pricing?.current_price || 0;
      const estimatedMonthly = (price / 12 * 1.1).toFixed(2);
      return `Produkt: ${p.title} [SHOW_FRONT:${p._id}] | Preis: ${price}€ | Rate: ${estimatedMonthly}€/Monat`;
    }).join("\n");

    const finalSystemInstruction = `Du bist ein Sales-Experte für 'LemonSKN Furniture'. 
    
    DEINE RULES:
    1. Wenn Produkte im INVENTAR stehen, schlage sie dem Kunden vor.
    2. Wenn das INVENTAR leer ist, sag nicht einfach "Nichts da", sondern frag nach Farbe oder Budget.
    3. Sprache: Deutsch (জার্মান ভাষায় উত্তর দাও).
    
    INVENTAR:
    ${inventoryContext || "Keine passenden Produkte gefunden."}`;

    // INITIAL_LOAD_REQ এর ক্ষেত্রে আমরা এআই কল করব না, শুধু ডাটা পাঠাবো
    if (lastUserMessage === "INITIAL_LOAD_REQ") {
      return NextResponse.json({ 
        success: true, 
        text: "Willkommen! Wie kann ich Ihnen heute helfen?", 
        inventory: formattedProducts 
      });
    }

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
        temperature: 0.4,
      }),
    });

    const aiFinalData = await finalResponse.json();
    return NextResponse.json({ 
      success: true, 
      text: aiFinalData.choices?.[0]?.message?.content,
      inventory: formattedProducts 
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, text: "Server Error." });
  }
}