//C:\Users\Shanon\al-rajjak-1\app\api\admin\furniture\route.ts



import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

// GET: সব প্রোডাক্ট বা নির্দিষ্ট ক্যাটাগরি দেখাবে
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    // টেবিলের নাম আপডেট করা হয়েছে
    let query = supabase.from("bismillah_table").select("*");

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, count: data?.length || 0, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: নতুন প্রোডাক্ট যোগ করবে
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ভ্যালিডেশন চেক
    if (!body.title || !body.pricing?.current_price) {
      return NextResponse.json(
        { success: false, error: "Title and Current Price are required!" },
        { status: 400 }
      );
    }

    // Supabase টেবিলের জন্য ডাটা ফরম্যাট
    // বডি থেকে আসা নেস্টেড অবজেক্টগুলো সরাসরি JSONB কলামে সেভ হবে
    const insertData = {
      id: body.id,
      category: body.category,
      brand: body.brand,
      title: body.title,
      status: body.status,
      description: body.description,
      
      // ডিরেক্ট প্রাইস কলাম (ফিল্টারিং এর সুবিধার জন্য)
      current_price: Number(body.pricing.current_price),
      original_price: Number(body.pricing.original_price) || null,
      discount_label: body.pricing.discount_label || "",
      
      // JSONB কলামসমূহ
      pricing: body.pricing, 
      images: body.images, 
      features: body.features,
      material_info: body.material_info,
      dimensions_info: body.dimensions_info,
      delivery_info: body.delivery_info,
      certifications: body.certifications || {}
    };

    const { data, error } = await supabase
      .from("bismillah_table") // টেবিলের নাম আপডেট
      .insert([insertData])
      .select();

    if (error) {
      console.error("Supabase Insert Error:", error);
      throw error;
    }

    return NextResponse.json({ 
      success: true, 
      data, 
      message: "Product Published Successfully!" 
    });

  } catch (error: any) {
    console.error("POST Error Details:", error);
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
}

// DELETE: প্রোডাক্ট ডিলিট করবে
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("bismillah_table") // টেবিলের নাম আপডেট
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}