


//C:\Users\Shanon\al-rajjak-1\app\cars\[slug]\page.tsx
// C:\Users\Shanon\al-rajjak-1\app\cars\[slug]\page.tsx
import { notFound } from 'next/navigation';
import { getCarClientInfo } from '@/app/lib/cars';
import CarDealerChat from '@/components/CarDealerChat';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const clientData = getCarClientInfo(slug);

  if (!clientData) {
    notFound();
  }

  return (
    /* এখানে bg-black সরিয়ে bg-transparent করা হয়েছে 
       যাতে layout.tsx এর ব্যাকগ্রাউন্ড ইমেজটি দেখা যায়।
    */
    <div className="min-h-screen bg-transparent flex items-center justify-center p-2 sm:p-4">
      <CarDealerChat clientData={clientData} />
    </div>
  );
}