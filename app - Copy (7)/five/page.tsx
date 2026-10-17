//C:\Users\Shanon\al-rajjak-1\app\five\page.tsx



// app/three/page.tsx
import { FaEnvelope, FaLinkedin, FaWhatsapp, FaGraduationCap, FaBriefcase, FaProjectDiagram } from 'react-icons/fa';

export default function StudentPortfolioAmber() {
  return (
    <main className="min-h-screen bg-[#fffbeb] py-0 md:py-16 px-0 md:px-4">
      {/* Main Container */}
      <div className="min-h-screen md:min-h-0 max-w-4xl mx-auto bg-white md:shadow-[0_20px_50px_rgba(217,119,6,0.1)] md:rounded-[2.5rem] overflow-hidden border-0 md:border border-amber-100">
        
        {/* Banner with Mesh Gradient Effect */}
        <div className="h-48 bg-gradient-to-br from-[#b45309] via-[#d97706] to-[#f59e0b] relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="px-6 md:px-12 pb-16 relative">
          
          {/* Profile Image - Elevated */}
          <div className="flex justify-center -mt-24">
            <div className="relative">
                <img 
                src="/HUUUU/try1.png" 
                alt="Lucía Valero"
                className="w-40 h-40 md:w-48 md:h-48 rounded-full border-[6px] border-white shadow-2xl object-cover"
                />
            </div>
          </div>

          {/* Header Info */}
          <div className="text-center mt-8">
            <h1 className="text-4xl md:text-5xl font-black text-amber-950 tracking-tight">
              Lucía Valero
            </h1>
            
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="h-[1px] w-8 bg-amber-200"></span>
              <p className="text-amber-700 font-bold text-sm md:text-base uppercase tracking-[0.2em]">
                International Business • Class of 2027
              </p>
              <span className="h-[1px] w-8 bg-amber-200"></span>
            </div>

            <p className="text-amber-600 mt-2 font-medium flex items-center justify-center gap-2">
              <FaGraduationCap className="text-amber-500" /> IE University, Madrid
            </p>
          </div>

          {/* Contact Action Bar */}
          <div className="mt-10 flex justify-center gap-4">
            <a href="mailto:lucia.valero@ie.edu" className="group flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2.5 rounded-xl hover:bg-orange-100 hover:text-orange-700 transition-all border border-amber-100">
              <FaEnvelope className="text-amber-600" /> 
              <span className="font-semibold text-sm hidden md:block">Email</span>
            </a>
            <a href="https://linkedin.com/in/luciavalero" target="_blank" className="group flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2.5 rounded-xl hover:bg-orange-100 hover:text-orange-700 transition-all border border-amber-100">
              <FaLinkedin className="text-amber-600" /> 
              <span className="font-semibold text-sm hidden md:block">LinkedIn</span>
            </a>
            <a href="https://wa.me/34600000000" target="_blank" className="group flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2.5 rounded-xl hover:bg-orange-100 hover:text-orange-700 transition-all border border-amber-100">
              <FaWhatsapp className="text-amber-600" /> 
              <span className="font-semibold text-sm hidden md:block">WhatsApp</span>
            </a>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-12 gap-10 mt-16">
            
            <div className="md:col-span-7 space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-amber-950 flex items-center gap-3 mb-6">
                        <span className="p-2 bg-amber-100 rounded-lg text-amber-700 text-lg"><FaBriefcase /></span> 
                        About Me
                    </h2>
                    <p className="text-amber-900 leading-relaxed text-base bg-amber-50/50 p-6 rounded-3xl border border-amber-100">
                        Motivated International Business student at <span className="text-amber-700 font-semibold">IE University, Madrid</span>. Passionate about global market strategy, cross-cultural management, and emerging business trends. Dedicated to applying academic insights to real-world corporate challenges within the vibrant Madrid business ecosystem.
                    </p>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold text-amber-950 flex items-center gap-3 mb-6">
                        <span className="p-2 bg-amber-100 rounded-lg text-amber-700 text-lg"><FaBriefcase /></span> 
                        Experience
                    </h2>
                    <div className="space-y-8 pl-4 border-l-2 border-amber-200 ml-4">
                        <div className="relative">
                            <div className="absolute -left-[25px] top-1 w-4 h-4 bg-amber-600 rounded-full border-4 border-white shadow-sm"></div>
                            <h3 className="font-bold text-amber-950 text-lg">Business Development Intern</h3>
                            <p className="text-amber-700 font-semibold text-sm">IE Business Club • 2025 - Present</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[25px] top-1 w-4 h-4 bg-amber-300 rounded-full border-4 border-white"></div>
                            <h3 className="font-bold text-amber-950 text-lg">International Strategy Assistant</h3>
                            <p className="text-amber-700 font-semibold text-sm">Madrid Startup Hub • 2024 - 2025</p>
                        </div>
                    </div>
                </section>
            </div>

            <div className="md:col-span-5 space-y-12">
                <section>
                    <h2 className="text-xl font-bold text-amber-950 mb-6 flex items-center gap-3">Technical Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {['Global Strategy', 'Market Research', 'Cross-Cultural Mgmt', 'Data Analytics', 'Project Management', 'Spanish / English'].map((skill) => (
                            <span key={skill} className="px-4 py-2 bg-white border border-amber-200 text-amber-800 rounded-xl text-xs font-bold shadow-sm hover:border-amber-400 transition-colors">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
                <section className="bg-amber-950 text-amber-100 p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                    <h2 className="text-xl font-bold mb-4">Education</h2>
                    <div className="space-y-1">
                        <p className="font-bold text-lg">BBA in International Business</p>
                        <p className="text-amber-300 text-sm">IE University, Madrid</p>
                        <p className="text-amber-400 font-medium mt-2">2023 - 2027</p>
                    </div>
                </section>
            </div>
          </div>

          <div className="mt-16 pt-10 border-t border-amber-100">
            <h2 className="text-2xl font-bold text-amber-950 mb-8 text-center flex items-center justify-center gap-3">
                <FaProjectDiagram className="text-amber-600" /> Academic Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
                {[ { title: "Spanish Market Entry", desc: "Analysis of market entry strategies for tech startups in Madrid." },
                   { title: "Global Supply Chain", desc: "Optimizing logistics for international retail expansion." },
                   { title: "IE Case Competition", desc: "Developing a strategic plan for cross-border corporate growth." } ].map((p, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm">
                        <h3 className="font-bold text-amber-700 mb-2">{p.title}</h3>
                        <p className="text-amber-800 text-sm">{p.desc}</p>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}