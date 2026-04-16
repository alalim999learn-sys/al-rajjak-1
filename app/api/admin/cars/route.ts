//C:\Users\Shanon\al-rajjak-1\app\api\admin\cars\route.ts



import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "cars.json");

// ১. ডাটা পড়ার জন্য
export async function GET() {
  if (!fs.existsSync(filePath)) return NextResponse.json([]);
  const fileData = fs.readFileSync(filePath, "utf8");
  return NextResponse.json(JSON.parse(fileData || "[]"));
}

// ২. নতুন গাড়ি ADD করার জন্য
export async function POST(req: Request) {
  const newCar = await req.json();
  const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "[]";
  const cars = JSON.parse(fileData || "[]");
  
  // নতুন গাড়ি যোগ করা (একটি ইউনিক আইডি সহ)
  const updatedCars = [...cars, { ...newCar, id: Date.now().toString() }];
  fs.writeFileSync(filePath, JSON.stringify(updatedCars, null, 2));
  
  return NextResponse.json({ success: true });
}

// ৩. গাড়ি DELETE করার জন্য
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const fileData = fs.readFileSync(filePath, "utf8");
  const cars = JSON.parse(fileData || "[]");
  
  // আইডি ফিল্টার করে গাড়িটি বাদ দেওয়া
  const updatedCars = cars.filter((car: any) => car.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(updatedCars, null, 2));
  
  return NextResponse.json({ success: true });
}