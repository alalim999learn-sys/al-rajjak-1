


//C:\Users\Shanon\al-rajjak-1\app\demo\[slug]\page.tsx
// C:\Users\Shanon\al-rajjak-1\app\demo\[slug]\page.tsx
import { getCompanyBySlug } from '@/app/lib/companies'; // ১. এই ফাংশনটি ইমপোর্ট করো
import ChatInterface from '@/components/ChatInterface';
import { notFound } from 'next/navigation';

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  // ১. প্যারামসকে অ্যাওয়েট করা (Next.js 15/16 নিয়ম)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // ২. কোম্পানি ডাটা খুঁজে বের করা (সঠিক পদ্ধতি)
  // সরাসরি companies[slug] না লিখে getCompanyBySlug ব্যবহার করো
  const company = getCompanyBySlug(slug);

  // ৩. সেফটি চেক: কোম্পানি না থাকলে ৪-০-৪ দেখাবে
  if (!company) {
    return notFound();
  }

  return (
   <main className="min-h-screen flex flex-col items-center justify-start bg-slate-50 p-4 pt-16 md:pt-24">
  <div className="max-w-[360px] w-full bg-white shadow-xl rounded-[2rem] overflow-hidden border border-gray-100 flex flex-col">
    
    {/* Header Section - Padding কমিয়ে p-6 করা হয়েছে */}
    <div className="p-6 border-b text-center bg-white"> 
      <div className="flex justify-center mb-3">
      <img 
  src={company.logo} 
  alt={company.name} 
  style={{ 
    height: '40px', 
    maxWidth: '120px', // অথবা '40%' 
    width: 'auto',     // এটি লোগোকে চ্যাপ্টা হতে দেবে না
    objectFit: 'contain',
    opacity: 0.9 
  }} 
/>
      </div>
      
      {/* ক্যাটাগরি টেক্সট আরও ছোট করা হয়েছে (text-[10px]) */}
      <p className="text-[10px] font-bold text-blue-500/80 uppercase tracking-[0.15em]">
        {company.category}
      </p>
    </div>
    
    {/* Chat Interface Section */}
    <div className="flex-1 bg-white">
      <ChatInterface 
        companyData={company} 
        slug={slug}
      />
    </div>
  </div>

  {/* Footer Credit */}
  <p className="mt-6 text-gray-300 text-[10px] font-semibold uppercase tracking-widest">
    Powered by Shanon Alam
  </p>
</main>
  );
}