//C:\Users\Shanon\al-rajjak-1\app\api\track-activity\route.ts



import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// এনভায়রনমেন্ট ভেরিয়েবল চেক করা হচ্ছে
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, details, url } = body;
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Supabase-এ ডেটা পাঠানো
    const { error } = await supabase
      .from('user_activities')
      .insert([
        { 
          action: action, 
          details: details, 
          url: url,
          user_agent: userAgent
        }
      ]);

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}