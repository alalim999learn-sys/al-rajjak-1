//C:\Users\Shanon\al-rajjak-1\app\api\admin\furniture\route.ts



import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

// GET: সব প্রোডাক্ট নিয়ে আসা (সাপোর্ট: category filter, limit)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "100");
    
    let query = supabase.from("bismillah_table").select("*");
    
    if (category && category !== "all") {
      // category based filtering (if you have category field)
      query = query.eq("type", category);
    }
    
    const { data, error } = await query
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return NextResponse.json({ success: true, data, count: data?.length || 0 });
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: নতুন ডাটা ইনসার্ট করা (সম্পূর্ণ JSONB সাপোর্ট)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔥 সম্পূর্ণ ডাটা ক্লিনিং (সব JSONB ফিল্ড ঠিক রাখা)
    const cleanData = {
      id: body.id || `PX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      brand: body.brand || null,
      title: body.title || null,
      type: body.type || null,
      status: body.status || null,
      description: body.description || null,
      original_price: body.original_price ? Number(body.original_price) : null,
      current_price: body.current_price ? Number(body.current_price) : 0,
      currency: body.currency || "EUR",
      discount_label: body.discount_label || null,
      dimensions: body.dimensions || null,
      color_primary: body.color_primary || null,
      fabric_type: body.fabric_type || null,
      
      // 🖼️ Images Array
      images: Array.isArray(body.images) ? body.images : [],
      
      // 📦 JSONB Fields (পুরো object সেভ হবে)
      service_info: body.service_info || {},
      material_info: body.material_info || {},
      frame_info: body.frame_info || {},
      cushion_info: body.cushion_info || {},
      dimensions_detailed: body.dimensions_detailed || {},
      warranty_info: body.warranty_info || {},
      delivery_info: body.delivery_info || {},
      colors_available: body.colors_available || [],
      certifications: body.certifications || {},
      load_capacity: body.load_capacity || {},
      payment_info: body.payment_info || {},
      
      created_at: new Date().toISOString()
    };

    console.log("📦 Inserting product:", cleanData.id, cleanData.title);

    const { data, error } = await supabase
      .from("bismillah_table")
      .insert([cleanData])
      .select();

    if (error) throw error;
    
    return NextResponse.json({ 
      success: true, 
      data: data?.[0],
      message: "Product created successfully!" 
    });
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT: প্রোডাক্ট আপডেট করা (সম্পূর্ণ JSONB সাপোর্ট)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, created_at, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required for update!" }, { status: 400 });
    }

    // 🔥 আপডেট ডাটা প্রস্তুত করা (সব JSONB ফিল্ড ঠিক রাখা)
    const cleanUpdate = {
      brand: updateData.brand || null,
      title: updateData.title || null,
      type: updateData.type || null,
      status: updateData.status || null,
      description: updateData.description || null,
      original_price: updateData.original_price ? Number(updateData.original_price) : null,
      current_price: updateData.current_price ? Number(updateData.current_price) : 0,
      currency: updateData.currency || "EUR",
      discount_label: updateData.discount_label || null,
      dimensions: updateData.dimensions || null,
      color_primary: updateData.color_primary || null,
      fabric_type: updateData.fabric_type || null,
      
      // 🖼️ Images Array
      images: Array.isArray(updateData.images) ? updateData.images : [],
      
      // 📦 JSONB Fields
      service_info: updateData.service_info || {},
      material_info: updateData.material_info || {},
      frame_info: updateData.frame_info || {},
      cushion_info: updateData.cushion_info || {},
      dimensions_detailed: updateData.dimensions_detailed || {},
      warranty_info: updateData.warranty_info || {},
      delivery_info: updateData.delivery_info || {},
      colors_available: updateData.colors_available || [],
      certifications: updateData.certifications || {},
      load_capacity: updateData.load_capacity || {},
      payment_info: updateData.payment_info || {},
    };

    console.log("✏️ Updating product:", id);

    const { data, error } = await supabase
      .from("bismillah_table")
      .update(cleanUpdate)
      .eq("id", id)
      .select();

    if (error) throw error;
    
    if (data?.length === 0) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      data: data?.[0],
      message: "Product updated successfully!" 
    });
  } catch (error: any) {
    console.error("PUT Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: প্রোডাক্ট ডিলিট করা
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID required for deletion" }, { status: 400 });
    }

    console.log("🗑️ Deleting product:", id);

    const { error, count } = await supabase
      .from("bismillah_table")
      .delete()
      .eq("id", id)
      .select();

    if (error) throw error;
    
    return NextResponse.json({ 
      success: true, 
      message: "Product deleted successfully!" 
    });
  } catch (error: any) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PATCH: প্রোডাক্টের নির্দিষ্ট ফিল্ড আপডেট (Partial Update)
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateFields } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 });
    }

    // শুধু পাঠানো ফিল্ডগুলো আপডেট হবে
    const { data, error } = await supabase
      .from("bismillah_table")
      .update(updateFields)
      .eq("id", id)
      .select();

    if (error) throw error;
    
    return NextResponse.json({ 
      success: true, 
      data: data?.[0],
      message: "Product partially updated!" 
    });
  } catch (error: any) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}