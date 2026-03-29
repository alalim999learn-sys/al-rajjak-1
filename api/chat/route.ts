


//api/chat/routeModule.ts
// app/api/chat/route.ts  <-- নিশ্চিত করো এই নামই আছে
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // চেক করো API KEY লোড হয়েছে কি না (ডিবাগিং এর জন্য)
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'API Key is missing' }, { status: 500 });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", 
        messages: [
          {
            role: "system",
            content: "You are Shanon Khan's Personal AI Agent. You represent Shanon Khan, a Cybersecurity and AI expert from Dhaka College. You help German businesses with AI automation and security. Be professional, concise, and mention Shanon's skills in Next.js, Flutter, and GDPR compliance."
          },
          ...messages
        ],
      }),
    });

    const data = await response.json();
    
    // Groq থেকে আসা এরর হ্যান্ডলিং
    if (data.error) {
       return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json(data.choices[0].message);

  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json({ error: 'AI Error' }, { status: 500 });
  }
}