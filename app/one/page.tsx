//C:\Users\Shanon\al-rajjak-1\app\one\page.tsx


// app/six/page.tsx
import { FaEnvelope, FaLinkedin, FaWhatsapp, FaGraduationCap } from 'react-icons/fa';

export default function StudentPortfolioIreland() {
  return (
    <main className="min-h-screen bg-[#f8f7ff] py-0 md:py-16 px-0 md:px-4">
      {/* Main Container */}
      <div className="max-w-5xl mx-auto bg-white md:shadow-[0_20px_50px_rgba(67,0,138,0.15)] md:rounded-[3rem] overflow-hidden border border-[#e0d7ff]">
        
        {/* Banner - Deep Purple Gradient */}
        <div className="h-64 bg-gradient-to-r from-[#43008a] via-[#5e17a3] to-[#7b2cbf] relative flex items-end justify-center pb-12">
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
              <p className="text-[#43008a] font-bold mt-2 text-lg uppercase tracking-wider">Business & Finance • Class of 2027</p>
              {/* Added University Name Here */}
              <p className="text-slate-600 font-semibold mt-1">Trinity College Dublin</p>
            </div>
          </div>

          {/* Social Pills with Purple Icons */}
          <div className="flex justify-center flex-wrap gap-3 mb-16">
            <a href="mailto:email@example.com" className="flex items-center gap-2 px-6 py-2 bg-slate-100 text-[#43008a] rounded-full font-bold hover:bg-[#43008a] hover:text-white transition-all text-sm border border-[#43008a]">
              <FaEnvelope className="text-[#43008a] hover:text-white" /> Email
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-2 bg-slate-100 text-[#43008a] rounded-full font-bold hover:bg-[#43008a] hover:text-white transition-all text-sm border border-[#43008a]">
              <FaLinkedin className="text-[#43008a] hover:text-white" /> LinkedIn
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-2 bg-slate-100 text-[#43008a] rounded-full font-bold hover:bg-[#43008a] hover:text-white transition-all text-sm border border-[#43008a]">
              <FaWhatsapp className="text-[#43008a] hover:text-white" /> WhatsApp
            </a>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-12">
            
            <div className="space-y-12">
              <section>
                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-8 bg-[#43008a] rounded-full"></div> About Me
                </h2>
                <p className="text-slate-600 leading-relaxed bg-[#f8f7ff] p-8 rounded-2xl border border-[#e0d7ff]">
                  Ambitious Business & Finance student at Trinity College Dublin. Passionate about leveraging financial modeling and market strategies to drive corporate growth in the Irish landscape.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-2 h-8 bg-[#43008a] rounded-full"></div> Experience
                </h2>
                <div className="space-y-6">
                  <div className="p-4 border border-slate-100 rounded-2xl hover:border-[#43008a] transition-all">
                    <h3 className="font-bold text-slate-900">Finance Analyst Intern</h3>
                    <p className="text-xs text-[#43008a] font-bold mt-1">Dublin Fintech Hub • 2026</p>
                  </div>
                  <div className="p-4 border border-slate-100 rounded-2xl hover:border-[#43008a] transition-all">
                    <h3 className="font-bold text-slate-900">Junior Strategist</h3>
                    <p className="text-xs text-[#43008a] font-bold mt-1">TCD Business Society • 2025</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-12">
              <section className="bg-[#43008a] text-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-xl font-black mb-4 flex items-center gap-3">
                  <FaGraduationCap className="text-2xl" /> Education
                </h2>
                <div className="space-y-1">
                  <p className="font-bold text-lg">BSc in Business & Finance</p>
                  <p className="text-[#d8b4fe] font-medium">Trinity College Dublin</p>
                  <p className="text-purple-200 pt-2 text-sm">2023 - 2027</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-black text-slate-900 mb-6">Technical Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {['Financial Modeling', 'Data Analytics', 'Risk Management', 'Excel', 'Python'].map((s) => (
                    <span key={s} className="px-4 py-2 bg-[#f8f7ff] text-[#43008a] rounded-lg font-bold text-sm border border-[#e0d7ff]">
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="mt-16 bg-white border-2 border-slate-100 p-8 rounded-[2rem]">
            <h2 className="text-xl font-black mb-6 text-center text-[#43008a]">Academic Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[1,2,3].map((i) => (
                 <div key={i} className="bg-[#f8f7ff] p-5 rounded-2xl border-b-4 border-[#43008a]">
                    <h3 className="font-bold text-slate-900">Project {i}</h3>
                    <p className="text-sm text-slate-600 mt-2">Strategic analysis for the Irish market.</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}