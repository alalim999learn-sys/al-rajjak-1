//C:\Users\Shanon\al-rajjak-1\app\api\init\route.ts



import clientPromise from "../../lib/mongodb"; 
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("furniture_db"); 
    
    // ডাটাবেজে প্রথম ডাটা এন্ট্রি
    const result = await db.collection("furniture").insertOne({
      title: "Initial Product",
      price: 0,
      description: "Database Initialized Successfully!",
      status: "Verified",
      createdAt: new Date()
    });

    return NextResponse.json({ 
      success: true,
      message: "Database created automatically!", 
      insertedId: result.insertedId 
    });
  } catch (e: any) {
    console.error("Connection Error:", e);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to connect", 
      details: e.message 
    }, { status: 500 });
  }
}