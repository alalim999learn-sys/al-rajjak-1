//C:\Users\Shanon\al-rajjak-1\app\lib\furn.ts



import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ibeqeoxnafefmvotwrkr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZXFlb3huYWZlbWZ2b3R3cmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMDcxMzQsImV4cCI6MjA5MTg4MzEzNH0.QWlDSlW0qy6fmlHTadsKx-2miq2Y8wHb4axDuGfAC-g";

// ক্লায়েন্ট কনফিগারেশন আরও সহজ করা হলো
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

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

export async function getFurnitureClientInfo(slug: string) {
  const client = clients[slug]; 
  if (!client) return null;

  try {
    // টাইমআউট ১০ সেকেন্ড করা হলো যাতে স্লো নেটেও কাজ করে
    const { data: products, error } = await supabase
      .from("furniture")
      .select("*")
      .abortSignal(AbortSignal.timeout(10000)); 

    if (error) {
      console.error(`❌ Supabase Error:`, error.message);
      throw error;
    }

    console.log(`✅ Success: Found ${products?.length || 0} items for ${slug}`);

    const inventory = {
      beds: products?.filter(p => p.category?.toLowerCase().includes('bed')) || [],
      sofas: products?.filter(p => p.category?.toLowerCase().includes('sofa')) || [],
      wardrobes: products?.filter(p => p.category?.toLowerCase().includes('wardrobe')) || []
    };

    return { ...client, properties: { inventory } };

  } catch (error: any) {
    console.error("🔥 Connection Issue:", error.message || error);
    return { ...client, properties: { inventory: { beds: [], sofas: [], wardrobes: [] } } };
  }
}