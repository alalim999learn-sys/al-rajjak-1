//C:\Users\Shanon\al-rajjak-1\app\api\cars\route.ts


import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) return NextResponse.json({ success: false, text: "API Key missing!" });

    const filePath = path.join(process.cwd(), "data", "cars.json");
    let allCars = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      allCars = JSON.parse(fileContent || "[]");
    }

    const systemInstruction = `
      তুমি 'শ্যানন এআই' (Shanon AI)। তুমি একজন প্রফেশনাল কার ডিলার এবং অটোমোবাইল এক্সপার্ট।
      
      তোমার ইনভেন্টরি ডাটাবেজ: ${JSON.stringify(allCars)}

      ফিল্টারিং ও টেকনিক্যাল রুলস (Strict Rules):
      ১. **ডাটা ফিল্টারিং:** ইউজার যদি "New" চায় তবে শুধু "condition": "New" গাড়ি দেখাবে। "Used" চাইলে শুধু "Used/Reconditioned" দেখাবে।
      ২. **টেকনিক্যাল স্পেসিফিকেশন:** প্রতিবার গাড়ি দেখানোর সময় অবশ্যই JSON থেকে ওই গাড়ির 'year', 'engine', 'torque', এবং 'tyreSize' খুঁজে বের করে উত্তর দিবে। 
      ৩. **ভিন্ন ভিন্ন ডেসক্রিপশন:** সব গাড়ির জন্য একই কথা (যেমন: "উচ্চ মানের গাড়ি") বলবে না। প্রতিটির জন্য আলাদা আলাদা টেকনিক্যাল তথ্য দিবে।

      ফরম্যাট (Strictly Follow):
      * [গাড়ির নাম] [SHOW_FRONT:ID]
        - দাম: [দাম]
        - কন্ডিশন: [গাড়ির কন্ডিশন]
        - টেকনিক্যাল ডিটেইলস: এটি [year] মডেলের গাড়ি, যাতে আছে [engine] ইঞ্জিন এবং [torque] টর্ক। এতে [tyreSize] সাইজের টায়ার ব্যবহার করা হয়েছে।
        - কেন কিনবেন: [১ লাইনে ওই গাড়ির বিশেষ কোনো সুবিধার কথা বলো]

      নিষেধাজ্ঞা:
      ১. ইমেজের ফাইল পাথ (যেমন: /cars/1.webp) টেক্সট আকারে লিখবে না।
      ২. উত্তর সবসময় বাংলায় দিবে।
      ৩. ইনভেন্টরির বাইরে কোনো তথ্য বানিয়ে বলবে না।
    `;

    // মেমোরি ম্যানেজমেন্ট
    const contextMessages = messages.slice(-6);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemInstruction },
          ...contextMessages
        ],
        temperature: 0.1, // নিখুঁত ডাটা রিড করার জন্য টেম্পারেচার ০.১ ই সেরা
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