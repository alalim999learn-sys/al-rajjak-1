//C:\Users\Shanon\al-rajjak-1\app\api\admin\watches\route.ts



import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// ডেমো প্রজেক্টের জন্য Anon Key ব্যবহার করা হচ্ছে
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: সব ঘড়ি দেখার জন্য
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("watches_new")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: নতুন ঘড়ি যোগ করার জন্য
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, error } = await supabase
      .from("watches_new")
      .insert([body])
      .select();

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE: ঘড়ি ডিলিট করার জন্য
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) throw new Error("ID required");

    const { error } = await supabase
      .from("watches_new")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// PUT: ঘড়ি আপডেট করার জন্য (Edit)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) throw new Error("ID required for update");

    const { data, error } = await supabase
      .from("watches_new")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}