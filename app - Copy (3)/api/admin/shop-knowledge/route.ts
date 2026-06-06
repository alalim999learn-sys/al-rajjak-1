//C:\Users\Shanon\al-rajjak-1\app\api\admin\shop-knowledge\route.ts



import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// আপনার সুপাবেস কানেকশন
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ১. সব নলেজ ডেটা পড়ার জন্য (GET)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('shop_knowledge')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ২. নতুন নলেজ অ্যাড করার জন্য (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, info_text } = body;

    const { data, error } = await supabase
      .from('shop_knowledge')
      .insert([{ title, info_text }])
      .select();

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ৩. নলেজ ডিলিট করার জন্য (DELETE)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, error: "ID missing" }, { status: 400 });

    const { error } = await supabase
      .from('shop_knowledge')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}