

//appterms/page.tsx

// app/terms/page.tsx
import React from 'react';
import { ArrowLeft, AlertTriangle, CreditCard, Cpu } from 'lucide-react';
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function TermsAndConditions() {
  return (
    // ১. এখান থেকে py-20 এবং px-6 সরিয়ে দিলাম যাতে ফুটার ফুল উইডথ পায়
    <div className="min-h-screen bg-white text-slate-900 font-sans relative">
      <Navbar />

      {/* ২. কন্টেন্টকে একটি আলাদা wrapper-এ রাখলাম যেখানে প্যাডিং দেওয়া আছে */}
      <main className="max-w-4xl mx-auto pt-32 pb-20 px-6">
        <a href="/" className="inline-flex items-center gap-2 text-blue-700 font-bold mb-10 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Homepage
        </a>
        
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Terms of Service</h1>
        <p className="text-slate-500 mb-12 font-medium italic border-b pb-8">Effective Date: March 2026</p>

        <div className="space-y-12 text-slate-700 leading-relaxed">
          
          {/* Section 1: AI Technology & API Usage */}
          <section className="group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-700"><Cpu size={24} /></div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">1. AI Technology & Model Training</h2>
            </div>
            <p className="mb-4">
              I utilize advanced AI APIs (such as OpenAI, Anthropic, or Meta) to build and train custom agents for your business. These bots are fine-tuned using the specific data and documents provided by the client to ensure high-quality interactions.
            </p>
            <div className="p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl flex gap-4 items-start">
              <AlertTriangle className="text-amber-600 shrink-0" size={24} />
              <p className="text-sm text-amber-800 font-medium">
                <strong>Disclaimer on Accuracy:</strong> While I implement rigorous training protocols, AI technology is not perfect. AI agents may occasionally provide incorrect, incomplete, or biased information (commonly known as "hallucinations"). Shanon-Alam.de is not liable for any business decisions or damages resulting from AI-generated errors. The client is responsible for final oversight of the bot's output.
              </p>
            </div>
          </section>

          {/* Section 2: Payment Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-50 rounded-lg text-green-700"><CreditCard size={24} /></div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">2. Payment Policy & 50% Deposit</h2>
            </div>
            <p className="mb-4 font-medium text-slate-900">
              To ensure commitment and cover initial API and server infrastructure costs, the following payment structure applies:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="bg-blue-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-1">1</span>
                <span><strong>50% Advance Payment:</strong> Required upfront before project commencement. This is non-refundable as it covers labor and initial setup.</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="bg-blue-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-1">2</span>
                <span><strong>50% Final Payment:</strong> Due immediately upon project completion and deployment on the client's platform.</span>
              </li>
            </ul>
          </section>

          {/* Section 3: Data Handling */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">3. Data Privacy & GDPR</h2>
            <p>
              I strictly follow GDPR/DSGVO guidelines for German clients. Any data provided for training will be handled securely and will not be shared with unauthorized third parties outside of the necessary AI API processing.
            </p>
          </section>

          {/* Section 4: Maintenance */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">4. Maintenance & Support</h2>
            <p>
              Free bug-fixing and fine-tuning are provided for the first 30 days post-launch. After this period, ongoing maintenance or API management fees may apply as per a separate agreement.
            </p>
          </section>
        </div>
      </main>

      {/* ৩. এখন ফুটার মেইন ডিভ-এর বাইরে (অথবা প্যাডিং ছাড়া ডিভ-এ) থাকায় ফুল উইডথ পাবে */}
      <Footer />
    </div>
  );
}