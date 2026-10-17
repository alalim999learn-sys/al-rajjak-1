//C:\Users\Shanon\al-rajjak-1\app\four\page.tsx


// app/four/page.tsx
import { FaEnvelope, FaLinkedin, FaWhatsapp, FaGraduationCap, FaBriefcase, FaProjectDiagram } from 'react-icons/fa';

export default function StudentPortfolioEmerald() {
  return (
    <main className="min-h-screen bg-[#ecfdf5] py-0 md:py-16 px-0 md:px-4">
      {/* Main Container */}
      <div className="max-w-5xl mx-auto bg-white md:shadow-[0_20px_50px_rgba(16,185,129,0.2)] md:rounded-[3rem] overflow-hidden border border-emerald-100">
        
        {/* Banner - Emerald Gradient */}
        <div className="h-64 bg-gradient-to-r from-[#064e3b] via-[#059669] to-[#10b981] relative flex items-end justify-center pb-12">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <div className="px-6 md:px-16 pb-16 relative">
          
          {/* Profile Image - Overlapping the banner */}
          <div className="-mt-20 mb-8 flex flex-col items-center">
            <img 
              src="/HUUUU/try1.png" 
              alt="Lucía Valero"
              className="w-40 h-40 rounded-3xl border-[8px] border-white shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
            />
            <div className="text-center mt-6">
              <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Lucía Valero</h1>
              <p className="text-[#059669] font-bold mt-2 text-lg">International Business • Class of 2027</p>
            </div>
          </div>

          {/* Social Pills */}
          <div className="flex justify-center gap-3 mb-16">
            {['Email', 'LinkedIn', 'WhatsApp'].map((item) => (
              <button key={item} className="px-6 py-2 bg-slate-900 text-white rounded-full font-medium hover:bg-[#059669] transition-colors text-sm">
                {item}
              </button>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-12">
            
            <div className="space-y-12">
              <section>
                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-8 bg-[#10b981] rounded-full"></div> About Me
                </h2>
                <p className="text-slate-600 leading-relaxed bg-[#ecfdf5] p-8 rounded-2xl border border-emerald-100">
                  Motivated International Business student at IE University. Passionate about global market strategy, cross-cultural management, and emerging business trends.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-2 h-8 bg-[#10b981] rounded-full"></div> Experience
                </h2>
                <div className="space-y-6">
                  <div className="p-4 border border-slate-100 rounded-2xl hover:border-[#10b981] transition-all">
                    <h3 className="font-bold text-slate-900">Business Development Intern</h3>
                    <p className="text-xs text-[#059669] font-bold mt-1">IE Business Club • 2025 - Present</p>
                  </div>
                  <div className="p-4 border border-slate-100 rounded-2xl hover:border-[#10b981] transition-all">
                    <h3 className="font-bold text-slate-900">International Strategy Assistant</h3>
                    <p className="text-xs text-[#059669] font-bold mt-1">Madrid Startup Hub • 2024 - 2025</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-12">
              <section className="bg-slate-900 text-white p-8 rounded-3xl">
                <h2 className="text-xl font-black mb-4">Education</h2>
                <p className="font-bold">BBA in International Business</p>
                <p className="text-[#10b981]">IE University, Madrid</p>
                <p className="text-slate-400 mt-2">2023 - 2027</p>
              </section>

              <section>
                <h2 className="text-xl font-black text-slate-900 mb-6">Technical Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {['Global Strategy', 'Market Research', 'Cross-Cultural Mgmt', 'Data Analytics', 'Project Management'].map((s) => (
                    <span key={s} className="px-4 py-2 bg-[#ecfdf5] text-[#059669] rounded-lg font-bold text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Academic Projects Footer */}
          <div className="mt-16 bg-white border-2 border-slate-100 p-8 rounded-[2rem]">
            <h2 className="text-xl font-black mb-6 text-center flex items-center justify-center gap-2">
                <FaProjectDiagram className="text-[#059669]"/> Academic Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                 { title: "Spanish Market Entry", desc: "Analysis of market entry strategies." },
                 { title: "Global Supply Chain", desc: "Optimizing logistics for retail." },
                 { title: "IE Case Competition", desc: "Strategic growth planning." }
               ].map((p, i) => (
                 <div key={i} className="bg-[#ecfdf5] p-5 rounded-2xl border-b-4 border-[#10b981]">
                    <h3 className="font-bold text-slate-900">{p.title}</h3>
                    <p className="text-sm text-slate-600 mt-2">{p.desc}</p>
                 </div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}


 