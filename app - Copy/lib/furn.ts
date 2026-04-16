//C:\Users\Shanon\al-rajjak-1\app\lib\furn.ts



import fs from "fs";
import path from "path";

// ১. ফার্নিচার শপ ডাটাবেজ
const clients: Record<string, any> = {
  "stuttgart-furniture": {
    slug: "stuttgart-furniture",
    shopName: "Stuttgart Premium Furniture",
    email: "shanon@lemonskn.com",
    phone: "+49 711 85983644", // আপনার স্টুটগার্ট ল্যান্ডলাইন নম্বরটি এখানে দিলাম
    address: "Stuttgart, Germany",
    logoUrl: "/furniture/logo.webp"
  }
};

// ২. JSON ফাইল থেকে ফার্নিচার ডাটা পড়ার ফাংশন
function getJsonFurniture() {
  try {
    const filePath = path.join(process.cwd(), "data", "furn.json");
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileData || "[]");
    }
  } catch (error) {
    console.error("Error reading furn.json:", error);
  }
  return [];
}

// ৩. ডাটা এক্সপোর্ট ফাংশন
export function getFurnitureClientInfo(slug: string) {
  const client = clients[slug]; 
  if (!client) return null;

  const dynamicItems = getJsonFurniture();

  return {
    ...client,
    properties: dynamicItems 
  };
}