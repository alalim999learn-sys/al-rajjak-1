


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
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        
        {/* ৪. ডাইনামিক স্টাইল - এখানে company.avatar বা নির্দিষ্ট কালার ব্যবহার করতে পারো */}
        <div className="p-6 border-b text-center" style={{ backgroundColor: `#f3f4f6` }}>
         <img 
              src={company.logo} 
              alt={company.name} 
              style={{ height: '64px', margin: '0 auto 16px', objectFit: 'contain' }} 
            />
          <h1 className="text-xl font-bold text-gray-800">{company.name} AI Assistant</h1>
          <p className="text-sm text-gray-500">{company.category}</p>
        </div>
        
        {/* ৫. পুরো company অবজেক্টটি পাঠানোই ভালো যাতে AI সব ইনফো পায় */}
        <ChatInterface 
          companyData={company} 
          slug={slug}
        />
      </div>
    </main>
  );
}