


//immo/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { realEstateClients } from '@/app/lib/realestate'; // পাথ চেক করুন
import RealEstateChat from '@/components/RealEstateChat';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // ১. params-কে await করতে হবে (Next.js 15 নিয়ম)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const client = realEstateClients.find(c => c.slug === slug);

  if (!client) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* ক্লায়েন্ট ডাটা পাঠিয়ে দেওয়া হলো */}
      <RealEstateChat clientData={client} />
    </div>
  );
}