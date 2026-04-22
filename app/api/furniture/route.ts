//C:\Users\Shanon\al-rajjak-1\app\api\furniture\route.ts


 




// @ts-nocheck
import { NextResponse } from "next/server";

// ১. তোর ৯টা প্রোডাক্টের হার্ডকোডেড ডাটা (Markdown Table ফরম্যাটে)
// এআই এই টেবিলটা চোখের সামনে দেখলে ১৬০ সেমি বা বিড়াল-বান্ধব ফিল্টারে কোনো ভুল করবে না।
const FURNITURE_INVENTORY_MARKDOWN = `
| ID | Model Name | Price (€) | Width (cm) | Category | Key Features |
|---|---|---|---|---|---|
| [SHOW_FRONT:451c1d3e] | Schlafsofa Arelis | 292.59 | 160 | Schlafsofa | 🛌 Sleeper, ❌ No Pet, 🏠 Small Room |
| [SHOW_FRONT:1bd09e37] | Schlafsofa Funtastic | 479.99 | 212 | Schlafsofa | 🛌 Sleeper, ❌ No Pet, Guest Room |
| [SHOW_FRONT:8a108743] | IBIZA MODULAR LOUNGE | 499.95 | 250 | Outdoor | 🏕️ Outdoor, 🤖 Robot-friendly, ❌ No Pet |
| [SHOW_FRONT:deeaf477] | Ecksofa LEWII | 799.99 | 213 | L-Form | ⚡ Relax-function, 🇩🇪 German, ❌ No Pet |
| [SHOW_FRONT:07a5fd09] | Modulares Cursal | 1159.00 | 284 | Modulsofa | ✅ Pet-friendly, 🇩🇪 German, 🤖 Robot |
| [SHOW_FRONT:26e2c9a4] | Big-Sofa XL KALLIE | 1299.99 | 340 | Design | 🇩🇪 German, 🤖 Robot-friendly, ❌ No Pet |
| [SHOW_FRONT:9e76416b] | Ecksofa OLEA-L2 | 1429.90 | 289 | Eckcouch | ✅ Pet-friendly, 🤖 Robot-friendly, 🧶 Cord |
| [SHOW_FRONT:05ff5e7f] | Designersofa Chantal | 1499.99 | 302 | Design | 💎 Samt/Velvet, 🤖 Robot-friendly, ❌ No Pet |
| [SHOW_FRONT:cd74f0e2] | Wohnlandschaft Orion | 2249.99 | 409 | U-Form | 🇩🇪 German, 📏 4-meter wide, ❌ No Pet |
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ success: false, text: "No messages provided." });
    }

    const lastUserMessage = messages[messages.length - 1].content;

    // ২. ওপেন-রাউটার কল (সরাসরি প্রম্পটে ইনভেন্টরি পাঠিয়ে দেওয়া)
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.LLM_MODEL || "google/gemini-2.0-flash-001",
        temperature: 0.1, // কম টেম্পারেচার মানে বেশি এক্যুরেসি
        messages: [
          {
            role: "system",
            content: `তুমি LemonSKN Furniture-এর একজন প্রফেশনাল সেলস অ্যাসিস্ট্যান্ট। 

নিচে আমাদের স্টকের ৯টি সোফার তালিকা দেওয়া হলো। এই টেবিলের বাইরে কোনো তথ্য বা সংখ্যা কল্পনা করবে না।

### 📋 OFFICIAL INVENTORY:
${FURNITURE_INVENTORY_MARKDOWN}

🔴 কঠোর নিয়মাবলী (CRITICAL RULES):
1. **বাজেট চেক:** ইউজার যদি বলে "500 ইউরোর নিচে", তবে শুধুমাত্র সেই প্রোডাক্টগুলো দেখাবে যার দাম < 500।
2. **সাইজ চেক:** যদি কেউ ১৬০ সেমি বা ছোট রুমের কথা বলে, তবে অবশ্যই 'Schlafsofa Arelis' সাজেস্ট করবে।
3. **পেট-ফ্রেন্ডলি:** যদি বিড়াল বা কুকুরের কথা বলে, তবে শুধুমাত্র Cursal (1159€) বা OLEA-L2 (1429€) সাজেস্ট করবে।
4. **ট্যাগ:** প্রতিটি সোফার নামের সাথে অবশ্যই তার [SHOW_FRONT:ID] ট্যাগটি দিতে হবে।
5. **ভাষা:** বাংলা (Bengali)।
6. **যদি না থাকে:** ইউজারের ক্রাইটেরিয়া অনুযায়ী কিছু না থাকলে বিনয়ের সাথে বলবে যে বর্তমানে আমাদের স্টকে নেই। মিথ্যা তথ্য দিবে না।`
          },
          ...messages.slice(-6) // আগের ৩-৪টি কনভারসেশন মনে রাখার জন্য
        ]
      }),
    });

    const aiData = await response.json();
    const finalText = aiData.choices?.[0]?.message?.content || "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।";

    return NextResponse.json({
      success: true,
      text: finalText
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, text: "সার্ভার সমস্যা হয়েছে 😔" }, { status: 500 });
  }
}




























/*
git add . 
git commit -m "HU"
git push origin main 

*/