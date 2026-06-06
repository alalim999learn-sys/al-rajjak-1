//C:\Users\Shanon\al-rajjak-1\app\lib\furn.ts



// app\lib\furn.ts

const clients: Record<string, any> = {
  "stuttgart-furniture": {
    slug: "stuttgart-furniture",
    shopName: "Stuttgart Premium Furniture",
    welcomeMessage: "Willkommen! আমি আপনার এআই অ্যাসিস্ট্যান্ট। আমি কি আমাদের সেরা ফার্নিচার কালেকশনগুলো আপনাকে দেখাব?",
    email: "shanon@lemonskn.com",
    phone: "+49 711 85983644",
    address: "Stuttgart, Germany",
    logoUrl: "/furniture/logo.webp"
  }
};

// তুই চ্যাটবটে যে ডাটাগুলো সেভ করতে চাস, সেগুলো এখানে অ্যারে হিসেবে রাখবি
const allProducts: any[] = [
  // তোর সব প্রোডাক্টের অবজেক্ট এখানে রাখবি
  // যেমন: { id: "...", title: "...", category: "beds", ... }
];

export async function getFurnitureClientInfo(slug: string) {
  const client = clients[slug]; 
  if (!client) return null;

  try {
    // সুপাবেস কল করার বদলে এখন সরাসরি ফিল্টার হবে
    console.log(`✅ Success: Loading inventory for ${slug}`);

    const inventory = {
      beds: allProducts.filter(p => p.category?.toLowerCase().includes('bed')),
      sofas: allProducts.filter(p => p.category?.toLowerCase().includes('sofa')),
      wardrobes: allProducts.filter(p => p.category?.toLowerCase().includes('wardrobe'))
    };

    return { ...client, properties: { inventory } };

  } catch (error: any) {
    console.error("🔥 Error processing static data:", error.message || error);
    return { ...client, properties: { inventory: { beds: [], sofas: [], wardrobes: [] } } };
  }
}