


// app/solar/[slug]/page.tsx
// app/solar/[slug]/page.tsx
// app/solar/[slug]/page.tsx
import { getSolarClientBySlug } from '../../lib/solar'; // পাথ ফিক্স করা হয়েছে (app/solar/[slug] থেকে app/lib এ যেতে ২ ধাপ যথেষ্ট)
import SolarChatUI from '../../../components/solar';
import { notFound } from 'next/navigation';

export default async function SolarPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const client = getSolarClientBySlug(slug);

  if (!client) return notFound();

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <SolarChatUI clientData={client} />
    </main>
  );
}