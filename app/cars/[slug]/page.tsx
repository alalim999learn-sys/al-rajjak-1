


//C:\Users\Shanon\al-rajjak-1\app\cars\[slug]\page.tsx
// C:\Users\Shanon\al-rajjak-1\app\cars\[slug]\page.tsx
import { notFound } from 'next/navigation';
import { carClientInfo } from '@/app/lib/cars';
import CarDealerChat from '@/components/CarDealerChat';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug !== carClientInfo.slug) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <CarDealerChat clientData={carClientInfo} />
    </div>
  );
}