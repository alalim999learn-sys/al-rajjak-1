//C:\Users\Shanon\al-rajjak-1\app\lib\cars.ts


import fs from "fs";
import path from "path";

// ১. ক্লায়েন্ট ডাটাবেজ (ডিলারের তথ্য এখানে থাকবে)
const clients: Record<string, any> = {
  "shanon-luxury": {
    slug: "shanon-luxury",
    shopName: "Shanon Luxury Cars",
    email: "shanon@lemonskn.com",
    phone: "+49 111 2223334",
    address: "Kurfürsten-Anlage 60, 69115 Heidelberg",
    locationLink: "https://www.google.com/maps/search/?api=1&query=Kurfürsten-Anlage+60+69115+Heidelberg", 
    logoUrl: "/cars/1.webp"
  }
};

// ২. JSON ফাইল থেকে ডাইনামিক ডাটা পড়ার ফাংশন
function getJsonCars() {
  try {
    const filePath = path.join(process.cwd(), "data", "cars.json");
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileData || "[]");
    }
  } catch (error) {
    console.error("Error reading cars.json:", error);
  }
  return [];
}

// ৩. ডাটা এক্সপোর্ট ফাংশন (এখন শুধু ডাইনামিক ডাটা রিটার্ন করবে)
export function getCarClientInfo(slug: string) {
  const client = clients[slug]; 
  if (!client) return null;

  const dynamicCars = getJsonCars();

  return {
    ...client,
    properties: dynamicCars 
  };
}