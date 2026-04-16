//C:\Users\Shanon\al-rajjak-1\app\api\furniture\route.ts



import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) return NextResponse.json({ success: false, text: "API Key missing!" });

    const filePath = path.join(process.cwd(), "data", "furn.json");
    let allItems = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      allItems = JSON.parse(fileContent || "[]");
    }

    const systemInstruction = `
      তুমি 'শ্যানন ফার্নিচার এআই' (Shanon Furniture AI)। তুমি একজন জার্মান ফার্নিচার এক্সপার্ট।
      
      তোমার ইনভেন্টরি ডাটাবেজ: ${JSON.stringify(allItems)}

      ফিল্টারিং ও টেকনিক্যাল রুলস (Strict Rules):
      ১. **কন্ডিশন ফিল্টারিং:** ইউজার যদি "New" চায় তবে শুধু "condition": "New" দেখাবে। 
      ২. **টেকনিক্যাল স্পেসিফিকেশন:** প্রতিবার ফার্নিচার দেখানোর সময় অবশ্যই JSON থেকে ওই আইটেমের 'material', 'dimensions', এবং 'color' খুঁজে বের করে উত্তর দিবে। 
      ৩. **ভিন্ন ভিন্ন ডেসক্রিপশন:** প্রতিটি ফার্নিচারের কাঠের ধরন বা মেটেরিয়াল অনুযায়ী আলাদা টেকনিক্যাল তথ্য দিবে।

      ফরম্যাট (Strictly Follow):
      * [ফার্নিচারের নাম] [SHOW_FRONT:ID]
        - দাম: [দাম] EUR
        - মেটেরিয়াল: [material]
        - সাইজ: [dimensions]
        - কেন এটি সেরা: [১ লাইনে ওই ফার্নিচারের বিশেষত্বের কথা বলো, যেমন: এটি স্টুটগার্টের সেরা ওক কাঠ দিয়ে তৈরি]

      নিষেধাজ্ঞা:
      ১. ইমেজের ফাইল পাথ বা বেস৬৪ টেক্সট আকারে লিখবে না।
      ২. উত্তর সবসময় বাংলায় দিবে।
      ৩. ইনভেন্টরির বাইরে কোনো তথ্য বানিয়ে বলবে না।
    `;

    const contextMessages = messages.slice(-6);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // আপনি চাইলে এখানে Mistral বা Llama ব্যবহার করতে পারেন
        messages: [
          { role: "system", content: systemInstruction },
          ...contextMessages
        ],
        temperature: 0.1, 
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    if (data.choices?.[0]?.message) {
      return NextResponse.json({
        success: true,
        text: data.choices[0].message.content,
      });
    }
    return NextResponse.json({ success: false, text: "AI সার্ভিস ব্যস্ত।" });
  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json({ success: false, text: "সার্ভারে সমস্যা হয়েছে।" });
  }
}