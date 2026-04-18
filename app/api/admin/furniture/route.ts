//C:\Users\Shanon\al-rajjak-1\app\api\admin\furniture\route.ts



import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// GET: সব প্রোডাক্ট বা নির্দিষ্ট ক্যাটাগরি দেখাবে
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "100");
    const search = searchParams.get("search");
    
    const client = await clientPromise;
    const db = client.db("furniture_db");
    
    let query: any = {};
    
    if (category && category !== "all") {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } }
      ];
    }
    
    const data = await db.collection("furniture")
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return NextResponse.json({ 
      success: true, 
      count: data.length,
      data: data.map(item => ({ 
        ...item, 
        mongoId: item._id.toString(),
        _id: undefined 
      })) 
    });
  } catch (error: any) { 
    return NextResponse.json({ success: false, error: error.message }, { status: 500 }); 
  }
}

// POST: নতুন প্রোডাক্ট যোগ করবে
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.title || !body.pricing?.current_price) {
      return NextResponse.json({ 
        success: false, 
        error: "Missing required fields: title and price are required" 
      }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db("furniture_db");
    
    const productId = body.id || `PX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const newProduct = {
      ...body,
      id: productId,
      basePrice: Number(body.pricing?.current_price) || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    if ((newProduct as any)._id) delete (newProduct as any)._id;
    
    const result = await db.collection("furniture").insertOne(newProduct);
    
    return NextResponse.json({ 
      success: true, 
      id: result.insertedId,
      productId: productId,
      message: "Product created successfully" 
    });
  } catch (error: any) { 
    console.error("POST Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 }); 
  }
}

// PUT: সম্পূর্ণ প্রোডাক্ট আপডেট করবে
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { mongoId, _id, ...updateData } = body;
    
    const targetId = mongoId || _id;
    
    if (!targetId || !ObjectId.isValid(targetId)) {
      return NextResponse.json({ success: false, error: "Valid Product ID is required" }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db("furniture_db");
    
    if (updateData.pricing?.current_price) {
      updateData.basePrice = Number(updateData.pricing.current_price);
    }
    
    const result = await db.collection("furniture").updateOne(
      { _id: new ObjectId(targetId) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    return NextResponse.json({ 
      success: true, 
      modifiedCount: result.modifiedCount,
      message: "Product updated successfully" 
    });
  } catch (error: any) { 
    console.error("PUT Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 }); 
  }
}

// PATCH: নির্দিষ্ট ফিল্ড আপডেট করবে
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { mongoId, _id, ...updateFields } = body;
    
    const targetId = mongoId || _id;
    
    if (!targetId || !ObjectId.isValid(targetId)) {
      return NextResponse.json({ success: false, error: "Valid Product ID is required" }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db("furniture_db");
    
    const result = await db.collection("furniture").updateOne(
      { _id: new ObjectId(targetId) },
      { $set: { ...updateFields, updatedAt: new Date() } }
    );
    
    return NextResponse.json({ 
      success: true, 
      modifiedCount: result.modifiedCount,
      message: "Product partially updated" 
    });
  } catch (error: any) { 
    console.error("PATCH Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 }); 
  }
}

// DELETE: প্রোডাক্ট ডিলিট করবে
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Valid Product ID required" }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db("furniture_db");
    
    const result = await db.collection("furniture").deleteOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({ 
      success: true, 
      deletedCount: result.deletedCount,
      message: "Product deleted successfully" 
    });
  } catch (error: any) { 
    console.error("DELETE Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 }); 
  }
}