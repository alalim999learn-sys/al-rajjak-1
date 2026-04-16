//C:\Users\Shanon\al-rajjak-1\app\furn\[slug]\page.tsx



import { notFound } from 'next/navigation';
import { getFurnitureClientInfo } from '@/app/lib/furn'; // আপনার ফার্নিচার ডাটা ফাংশন
import FurnitureChat from '@/components/furniture';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const clientData = getFurnitureClientInfo(slug);

  if (!clientData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-2 sm:p-4">
      {/* FurnitureChat কম্পোনেন্ট কল করা হলো */}
      <FurnitureChat clientData={clientData} />
    </div>
  );
}