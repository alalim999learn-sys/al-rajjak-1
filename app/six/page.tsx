//C:\Users\Shanon\al-rajjak-1\app\six\page.tsx



// app/six/page.tsx
import { FaEnvelope, FaLinkedin, FaWhatsapp, FaGraduationCap, FaBriefcase, FaProjectDiagram } from 'react-icons/fa';

export default function StudentPortfolioSky() {
  return (
    <main className="min-h-screen bg-[#f0f9ff] py-0 md:py-16 px-0 md:px-4">
      {/* Main Container */}
      <div className="max-w-5xl mx-auto bg-white md:shadow-[0_20px_50px_rgba(199,248,255,0.5)] md:rounded-[3rem] overflow-hidden border border-[#c7f8ff]">
        
        {/* Banner - Gradient Sky */}
        <div className="h-64 bg-gradient-to-r from-[#0ea5e9] via-[#38bdf8] to-[#7dd3fc] relative flex items-end justify-center pb-12">
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
              <p className="text-[#0284c7] font-bold mt-2 text-lg">International Business • Class of 2027</p>
            </div>
          </div>

          {/* Social Pills */}
          <div className="flex justify-center gap-3 mb-16">
            {['Email', 'LinkedIn', 'WhatsApp'].map((item) => (
              <button key={item} className="px-6 py-2 bg-slate-900 text-white rounded-full font-medium hover:bg-[#0284c7] transition-colors text-sm">
                {item}
              </button>
            ))}
          </div>

          {/* Two Column Layout with modified design */}
          <div className="grid md:grid-cols-2 gap-12">
            
            <div className="space-y-12">
              <section>
                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-8 bg-[#7dd3fc] rounded-full"></div> About Me
                </h2>
                <p className="text-slate-600 leading-relaxed bg-[#f0f9ff] p-8 rounded-2xl border border-[#c7f8ff]">
                  Motivated International Business student at IE University. Dedicated to applying academic insights to real-world corporate challenges.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-2 h-8 bg-[#7dd3fc] rounded-full"></div> Experience
                </h2>
                <div className="space-y-6">
                  <div className="p-4 border border-slate-100 rounded-2xl hover:border-[#7dd3fc] transition-all">
                    <h3 className="font-bold text-slate-900">Business Development Intern</h3>
                    <p className="text-xs text-[#0284c7] font-bold mt-1">IE Business Club • 2025</p>
                  </div>
                  <div className="p-4 border border-slate-100 rounded-2xl hover:border-[#7dd3fc] transition-all">
                    <h3 className="font-bold text-slate-900">Strategy Assistant</h3>
                    <p className="text-xs text-[#0284c7] font-bold mt-1">Madrid Startup Hub • 2024</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-12">
              <section className="bg-slate-900 text-white p-8 rounded-3xl">
                <h2 className="text-xl font-black mb-4">Education</h2>
                <p className="font-bold">BBA in International Business</p>
                <p className="text-[#7dd3fc]">IE University, Madrid</p>
                <p className="text-slate-400 mt-2">2023 - 2027</p>
              </section>

              <section>
                <h2 className="text-xl font-black text-slate-900 mb-6">Technical Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {['Strategy', 'Data Analytics', 'Management', 'Spanish', 'English'].map((s) => (
                    <span key={s} className="px-4 py-2 bg-[#f0f9ff] text-[#0284c7] rounded-lg font-bold text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Academic Projects Footer */}
          <div className="mt-16 bg-white border-2 border-slate-100 p-8 rounded-[2rem]">
            <h2 className="text-xl font-black mb-6 text-center">Academic Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[1,2,3].map((i) => (
                 <div key={i} className="bg-[#f0f9ff] p-5 rounded-2xl border-b-4 border-[#7dd3fc]">
                    <h3 className="font-bold text-slate-900">Project {i}</h3>
                    <p className="text-sm text-slate-600 mt-2">Strategic analysis for market growth.</p>
                 </div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}