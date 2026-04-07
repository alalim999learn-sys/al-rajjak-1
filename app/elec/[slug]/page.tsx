



import { notFound } from 'next/navigation';
import { electricianClients } from '@/app/lib/electrician';
import ElectricianChat from '@/components/ElectricianChat';

// ১. ফাংশনটিকে 'async' করুন
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  
  // ২. params-কে await করে slug বের করুন
  const { slug } = await params;

  // ৩. এবার slug দিয়ে ক্লায়েন্ট খুঁজুন
  const client = electricianClients.find(c => c.slug === slug);

  if (!client) return notFound();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md shadow-2xl rounded-3xl overflow-hidden border border-white">
        <div className="bg-black p-6 flex items-center gap-4">
          <img 
            src={client.logoUrl} 
            className="w-12 h-12 rounded-full border-2 border-yellow-500 object-cover" 
            alt="logo" 
          />
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">{client.shopName}</h2>
            <span className="text-yellow-500 text-xs font-bold uppercase tracking-wider">{client.category}</span>
          </div>
        </div>
        <ElectricianChat clientData={client} />
      </div>
    </div>
  );
}