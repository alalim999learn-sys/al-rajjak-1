//C:\Users\Shanon\al-rajjak-1\app\four\page.tsx



import { FaEnvelope, FaLinkedin, FaWhatsapp, FaGraduationCap, FaCertificate, FaBriefcase, FaProjectDiagram } from 'react-icons/fa';

export default function StudentPortfolio() {
  return (
    <main className="min-h-screen bg-[#f8fafc] py-0 md:py-16 px-0 md:px-4">
      {/* Main Container */}
      <div className="min-h-screen md:min-h-0 max-w-4xl mx-auto bg-white md:shadow-[0_20px_50px_rgba(0,0,0,0.05)] md:rounded-[2.5rem] overflow-hidden border-0 md:border border-slate-100">
        
        {/* Banner with Mesh Gradient Effect */}
        <div className="h-48 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca] relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="px-6 md:px-12 pb-16 relative">
          
          {/* Profile Image - Elevated */}
          <div className="flex justify-center -mt-24">
            <div className="relative">
                <img 
                src="/HUUUU/pexels-kadirxaltintas-25391398.jpg" 
                alt="Liam Cole"
                className="w-40 h-40 md:w-48 md:h-48 rounded-full border-[6px] border-white shadow-2xl object-cover"
                />
            </div>
          </div>

          {/* Header Info */}
          <div className="text-center mt-8">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Liam Cole</h1>
            <div className="flex items-center justify-center gap-2 mt-3">
                <span className="h-[1px] w-8 bg-indigo-200"></span>
                <p className="text-indigo-600 font-bold text-sm md:text-base uppercase tracking-[0.2em]">
                    Finance Student • Class of 2028
                </p>
                <span className="h-[1px] w-8 bg-indigo-200"></span>
            </div>
            <p className="text-slate-500 mt-2 font-medium flex items-center justify-center gap-2">
                <FaGraduationCap className="text-indigo-400" /> University of Michigan
            </p>
          </div>

          {/* Modern Contact Action Bar (One Line) */}
          <div className="mt-10 flex justify-center gap-4">
            <a href="mailto:liam.cole@example.com" className="group flex items-center gap-2 bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-100">
              <FaEnvelope className="text-rose-500" /> 
              <span className="font-semibold text-sm hidden md:block">Email</span>
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" className="group flex items-center gap-2 bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all border border-slate-100">
              <FaLinkedin className="text-blue-600" /> 
              <span className="font-semibold text-sm hidden md:block">LinkedIn</span>
            </a>
            <a href="https://wa.me/1234567890" target="_blank" className="group flex items-center gap-2 bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-green-50 hover:text-green-700 transition-all border border-slate-100">
              <FaWhatsapp className="text-green-500" /> 
              <span className="font-semibold text-sm hidden md:block">WhatsApp</span>
            </a>
          </div>

         
          <div className="grid md:grid-cols-12 gap-10 mt-16">
            
            <div className="md:col-span-7 space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                        <span className="p-2 bg-indigo-50 rounded-lg text-indigo-600 text-lg"><FaBriefcase /></span> 
                        About Me
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-base bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                        Motivated Finance student at the <span className="text-indigo-600 font-semibold">University of Michigan</span>. Deeply passionate about investment banking, quantitative analysis, and U.S. market trends. Dedicated to applying data-driven insights to solve complex financial challenges in the American corporate landscape.
                    </p>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                        <span className="p-2 bg-indigo-50 rounded-lg text-indigo-600 text-lg"><FaBriefcase /></span> 
                        Experience
                    </h2>
                    <div className="space-y-8 pl-4 border-l-2 border-indigo-100 ml-4">
                        <div className="relative">
                            <div className="absolute -left-[25px] top-1 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white shadow-sm"></div>
                            <h3 className="font-bold text-slate-900 text-lg">Investment Analyst Intern</h3>
                            <p className="text-indigo-600 font-semibold text-sm">Michigan Student Investment Fund • 2025 - Present</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[25px] top-1 w-4 h-4 bg-slate-300 rounded-full border-4 border-white"></div>
                            <h3 className="font-bold text-slate-900 text-lg">Finance Club Member</h3>
                            <p className="text-indigo-600 font-semibold text-sm">University of Michigan • 2024 - Present</p>
                        </div>
                    </div>
                </section>
            </div>

            <div className="md:col-span-5 space-y-12">
                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">Technical Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {['Financial Modeling', 'Excel / SQL', 'Market Research', 'Data Visualization', 'Quantitative Methods', 'Python'].map((skill) => (
                            <span key={skill} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold shadow-sm hover:border-indigo-300 transition-colors">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
                <section className="bg-indigo-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                    <h2 className="text-xl font-bold mb-4">Education</h2>
                    <div className="space-y-1">
                        <p className="font-bold text-lg">BSc in Finance</p>
                        <p className="text-indigo-200 text-sm">University of Michigan</p>
                        <p className="text-indigo-300 font-medium mt-2">2024 - 2028</p>
                    </div>
                </section>
            </div>
          </div>

          <div className="mt-16 pt-10 border-t border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center flex items-center justify-center gap-3">
                <FaProjectDiagram className="text-indigo-600" /> Academic Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
                {[ { title: "Wall Street Prep Challenge", desc: "Equity valuation and portfolio optimization." },
                   { title: "Michigan Consulting Group", desc: "Market entry strategy for tech startups." },
                   { title: "Investment Fund Project", desc: "Comprehensive asset research and allocation." } ].map((p, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-indigo-600 mb-2">{p.title}</h3>
                        <p className="text-slate-500 text-sm">{p.desc}</p>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}