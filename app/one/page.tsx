//C:\Users\Shanon\al-rajjak-1\app\one\page.tsx

 

// app/one/page.tsx
import { FaEnvelope, FaLinkedin, FaWhatsapp, FaBalanceScale, FaGavel } from 'react-icons/fa';

export default function LawStudentPortfolio() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] py-0 md:py-16 px-0 md:px-4">
      {/* Main Container */}
      <div className="max-w-5xl mx-auto bg-white md:shadow-[0_20px_50px_rgba(0,51,102,0.15)] md:rounded-[3rem] overflow-hidden border border-blue-100">
        
        {/* Banner - Academic Blue Gradient */}
        <div className="h-64 bg-gradient-to-r from-[#003366] via-[#004a99] to-[#0066cc] relative flex items-end justify-center pb-12">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <div className="px-6 md:px-16 pb-16 relative">
          
          {/* Profile Image & Info */}
          <div className="-mt-20 mb-8 flex flex-col items-center">
            <img 
              src="/HUUUU/try1.png" 
              alt="Lucía Valero"
              className="w-40 h-40 rounded-3xl border-[8px] border-white shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
            />
            <div className="text-center mt-6">
              <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Lucía Valero</h1>
              <p className="text-[#003366] font-bold mt-2 text-lg uppercase tracking-wider">Bachelor of Laws (LLB) • Class of 2027</p>
              <p className="text-slate-600 font-semibold mt-1">Maynooth University</p>
            </div>
          </div>

          {/* Social Pills */}
          <div className="flex justify-center flex-wrap gap-3 mb-16">
            <a href="mailto:email@example.com" className="flex items-center gap-2 px-6 py-2 bg-slate-100 text-[#003366] rounded-full font-bold hover:bg-[#003366] hover:text-white transition-all text-sm border border-[#003366]">
              <FaEnvelope /> Email
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-2 bg-slate-100 text-[#003366] rounded-full font-bold hover:bg-[#003366] hover:text-white transition-all text-sm border border-[#003366]">
              <FaLinkedin /> LinkedIn
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-2 bg-slate-100 text-[#003366] rounded-full font-bold hover:bg-[#003366] hover:text-white transition-all text-sm border border-[#003366]">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-12">
            
            <div className="space-y-12">
              <section>
                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-8 bg-[#003366] rounded-full"></div> About Me
                </h2>
                <p className="text-slate-600 leading-relaxed bg-[#f0f4f8] p-8 rounded-2xl border border-blue-100">
                  Dedicated Law student at Maynooth University. Committed to social justice, legal research, and understanding the nuances of the Irish constitutional and civil law framework.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-2 h-8 bg-[#003366] rounded-full"></div> Experience
                </h2>
                <div className="space-y-6">
                  <div className="p-4 border border-slate-100 rounded-2xl hover:border-[#003366] transition-all">
                    <h3 className="font-bold text-slate-900">Legal Intern</h3>
                    <p className="text-xs text-[#003366] font-bold mt-1">Kildare Law Firm • 2026</p>
                  </div>
                  <div className="p-4 border border-slate-100 rounded-2xl hover:border-[#003366] transition-all">
                    <h3 className="font-bold text-slate-900">Volunteer Advocate</h3>
                    <p className="text-xs text-[#003366] font-bold mt-1">Maynooth Student Legal Society • 2025</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-12">
              <section className="bg-[#003366] text-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-xl font-black mb-4 flex items-center gap-3">
                  <FaBalanceScale className="text-2xl" /> Education
                </h2>
                <div className="space-y-1">
                  <p className="font-bold text-lg">Bachelor of Laws (LLB)</p>
                  <p className="text-[#aaccff] font-medium">Maynooth University</p>
                  <p className="text-blue-200 pt-2 text-sm">2023 - 2027</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-black text-slate-900 mb-6">Legal Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {['Legal Research', 'Drafting', 'Constitutional Law', 'Contract Law', 'Public Speaking'].map((s) => (
                    <span key={s} className="px-4 py-2 bg-[#f0f4f8] text-[#003366] rounded-lg font-bold text-sm border border-blue-100">
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Legal Research & Advocacy Section */}
          <div className="mt-16 bg-white border-2 border-slate-100 p-8 rounded-[2rem]">
            <h2 className="text-xl font-black mb-6 text-center text-[#003366] flex items-center justify-center gap-2">
                <FaGavel /> Legal Research & Advocacy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="bg-[#f0f4f8] p-5 rounded-2xl border-b-4 border-[#003366]">
                  <h3 className="font-bold text-slate-900">Constitutional Review</h3>
                  <p className="text-sm text-slate-600 mt-2">Critical analysis of recent Irish constitutional amendments.</p>
               </div>
               <div className="bg-[#f0f4f8] p-5 rounded-2xl border-b-4 border-[#003366]">
                  <h3 className="font-bold text-slate-900">Contractual Disputes</h3>
                  <p className="text-sm text-slate-600 mt-2">Case study on breach of contract under Irish common law.</p>
               </div>
               <div className="bg-[#f0f4f8] p-5 rounded-2xl border-b-4 border-[#003366]">
                  <h3 className="font-bold text-slate-900">Human Rights Mooting</h3>
                  <p className="text-sm text-slate-600 mt-2">Representing cases in simulated courtroom environments.</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}