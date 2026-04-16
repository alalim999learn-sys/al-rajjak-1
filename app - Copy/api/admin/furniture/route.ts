//C:\Users\Shanon\al-rajjak-1\app\api\admin\furniture\route.ts



import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "furn.json");

// ১. ডাটা পড়ার জন্য
export async function GET() {
  if (!fs.existsSync(filePath)) return NextResponse.json([]);
  const fileData = fs.readFileSync(filePath, "utf8");
  return NextResponse.json(JSON.parse(fileData || "[]"));
}

// ২. নতুন ফার্নিচার ADD করার জন্য
export async function POST(req: Request) {
  const newItem = await req.json();
  const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "[]";
  const items = JSON.parse(fileData || "[]");
  
  const updatedItems = [...items, { ...newItem, id: Date.now().toString() }];
  fs.writeFileSync(filePath, JSON.stringify(updatedItems, null, 2));
  
  return NextResponse.json({ success: true });
}

// ৩. ফার্নিচার DELETE করার জন্য
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const fileData = fs.readFileSync(filePath, "utf8");
  const items = JSON.parse(fileData || "[]");
  
  const updatedItems = items.filter((item: any) => item.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(updatedItems, null, 2));
  
  return NextResponse.json({ success: true });
}