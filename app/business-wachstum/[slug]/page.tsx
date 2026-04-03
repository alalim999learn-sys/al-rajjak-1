


//C:\Users\Shanon\al-rajjak-1\app\business-wachstum\[slug]\page.tsx
import { clients } from '@/app/lib/moneys'; 
import NiceUI from '@/components/niceui'; // আপনার প্রিমিয়াম ইউআই
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// মেটাডেটা জেনারেশন (ব্রাউজার টাইটেল ফিক্স করার জন্য)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const client = clients.find((c) => c.slug === slug);

  return {
    title: `${client ? client.shopName : 'KI Demo'} | Shanon Alam`,
    description: `KI-gestützte Business Wachstum für ${client ? client.shopName : 'Unternehmen'} - Powered by Shanon Alam`,
  };
}

export default async function BusinessWachstumPage({ params }: { params: Promise<{ slug: string }> }) {
  // ১. প্যারামসকে অ্যাওয়েট করা (Next.js 15+ এর জন্য প্রয়োজনীয়)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // ২. moneys.ts থেকে ডাইনামিক ডাটা খুঁজে বের করা
  const client = clients.find((c) => c.slug === slug);

  // ৩. সেফটি চেক: ডাটা না থাকলে ৪-০-৪ দেখাবে
  if (!client) {
    return notFound();
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      {/* আপনার সেই হাই-এন্ড চ্যাট ইউআই */}
      <NiceUI clientData={client} />

      {/* ব্র্যান্ডিং ক্রেডিট */}
      <p className="mt-6 text-gray-300 text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">
        Powered by Shanon Alam
      </p>
    </main>
  );
}