//C:\Users\Shanon\al-rajjak-1\app\api\analyze-activities\route.ts



import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// এনভায়রনমেন্ট ভেরিয়েবলগুলো ধরা হচ্ছে
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const openRouterKey = process.env.OPENROUTER_API_KEY;

export async function GET() {
  try {
    // সেফটি চেক: কি-গুলো আছে কি না
    if (!supabaseUrl || !supabaseAnonKey || !openRouterKey) {
      return NextResponse.json({ 
        error: "Missing API Keys in .env.local" 
      }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // ১. সুপাবেস থেকে ডাটা রিড করা
    const { data: activities, error } = await supabase
      .from('user_activities')
      .select('action, details, url, timestamp')
      .order('timestamp', { ascending: false })
      .limit(50);

    if (error) throw error;

    if (!activities || activities.length === 0) {
      return NextResponse.json({ summary: "বিশ্লেষণ করার মতো কোনো ডাটা পাওয়া যায়নি।" });
    }

    // ২. AI-এর জন্য ডাটা টেক্সট ফরম্যাটে সাজানো
    const activityLog = activities.map(a => 
      `- Action: ${a.action}, Details: ${JSON.stringify(a.details)}, Time: ${new Date(a.timestamp).toLocaleString()}`
    ).join("\n");

    // ৩. OpenRouter-এর মাধ্যমে Gemini Flash 2.0 কল করা
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Watch Store AI Analyst",
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001",
        "messages": [
          {
            "role": "system",
            "content": "তুমি একজন বিজনেস অ্যানালিস্ট। নিচের ডাটা দেখে বাংলা ভাষায় একটি ছোট এবং কার্যকরী বিজনেস সামারি তৈরি করো।"
          },
          {
            "role": "user",
            "content": `এখানে কিছু ইউজার অ্যাক্টিভিটি ডাটা দেওয়া হলো, এগুলো এনালাইসিস করে দোকানের মালিকের জন্য একটি রিপোর্ট দাও: \n${activityLog}`
          }
        ],
      })
    });

    const aiData = await response.json();
    
    if (aiData.error) {
      throw new Error(aiData.error.message || "OpenRouter AI Error");
    }

    const summary = aiData.choices[0].message.content;

    return NextResponse.json({ summary });

  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}