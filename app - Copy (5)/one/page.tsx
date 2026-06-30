//C:\Users\Shanon\al-rajjak-1\app\one\page.tsx



import { FaEnvelope, FaLinkedin, FaWhatsapp, FaGlobe, FaPlane, FaBriefcase, FaGraduationCap, FaAward } from 'react-icons/fa';

export default function MarketingPortfolio() {
  return (
    <main className="min-h-screen bg-slate-50 py-0 md:py-12">
      <div className="min-h-screen md:min-h-0 md:max-w-3xl mx-auto bg-white md:shadow-2xl md:rounded-[2rem] overflow-hidden border-0 md:border border-slate-100">
        
        {/* Header Background */}
        <div className="h-40 bg-gradient-to-r from-blue-900 via-indigo-800 to-emerald-900"></div>

        <div className="px-6 md:px-8 pb-10">
          {/* Profile Image */}
          <div className="flex justify-center -mt-20">
            <img 
              src="/HUUUU/pexels-denigrafias-8655333.jpg" 
              alt="Alex Rivera" 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover ring-4 ring-emerald-400/50"
            />
          </div>

          {/* Name and Identity */}
          <div className="text-center mt-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Alex Rivera</h1>
            <p className="text-emerald-700 font-bold text-sm md:text-lg mt-2 uppercase tracking-widest flex items-center justify-center gap-2">
              <FaGlobe /> International Business Strategy
            </p>
          </div>

          {/* Contact Section */}
          <div className="mt-8 flex flex-nowrap justify-center gap-2 md:gap-4 px-2">
            <a href="mailto:alex.marketing@example.com" className="flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition text-xs font-medium">
              <FaEnvelope className="text-red-500" /> Email
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" className="flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition text-xs font-medium">
              <FaLinkedin className="text-blue-600" /> LinkedIn
            </a>
            <a href="https://wa.me/1234567890" target="_blank" className="flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition text-xs font-medium">
              <FaWhatsapp className="text-green-500" /> WhatsApp
            </a>
          </div>

          {/* About Me Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
              <FaPlane className="text-indigo-600" /> Professional Summary
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Results-oriented professional with a solid foundation in the Spanish market, currently expanding expertise into the <strong>Irish business landscape</strong>. 
              Specializing in cross-border digital strategies, business analytics, and market expansion, I focus on bridging the gap between data insights and sustainable commercial growth.
            </p>
          </div>

          {/* Skills Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Core Competencies</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-slate-600 text-sm">
              <li>✔ International Market Strategy</li>
              <li>✔ Business Analytics (Power BI, Excel)</li>
              <li>✔ SEO/SEM & Digital Growth</li>
              <li>✔ Cross-Cultural Communication</li>
              <li>✔ E-commerce Management</li>
              <li>✔ Data-Driven Decision Making</li>
            </ul>
          </div>

          {/* Projects Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Key Projects</h2>
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <strong>Cross-Border Strategy</strong> – Developed market entry frameworks for European digital expansion.
              </div>
              <div>
                <strong>Analytics Dashboard</strong> – Built KPIs tracking system to monitor multi-regional campaign performance.
              </div>
              <div>
                <strong>Growth Campaign</strong> – Managed end-to-end digital marketing cycles boosting engagement by 25%.
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2 flex items-center gap-2">
              <FaBriefcase className="text-indigo-600" /> Professional Experience
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-900">VIP Hospitality Assistant</h3>
                <p className="text-sm text-slate-500">Mutua Madrid Open | Apr 2026 - May 2026</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Junior Digital Strategist (PuntoQPack)</h3>
                <p className="text-sm text-slate-500">Aug 2025 - Feb 2026 | Spain</p>
                <p className="text-sm text-slate-600 mt-1">Driving SEO and Business Communication across regional digital platforms.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Marketing Intern (Becario)</h3>
                <p className="text-sm text-slate-500">Mar 2025 - Aug 2025 | Móstoles, Spain</p>
              </div>
            </div>
          </div>

          {/* Education & Achievements */}
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h2 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
                <FaGraduationCap /> Education
              </h2>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li><strong>MSc in Business Analytics</strong><br/>Univ. CEU San Pablo (2026-2027)</li>
                <li><strong>B.B.A. + Marketing</strong><br/>Univ. Rey Juan Carlos (2020-2025)</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h2 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
                <FaAward /> Highlights
              </h2>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Best Marketing Intern Award</li>
                <li>• 30% Sales growth project</li>
                <li>• International workshop leadership</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-slate-400 text-xs">
            <p>Global Mindset • Data-Driven Approach • Based in Ireland</p>
          </div>
        </div>
      </div>
    </main>
  );
}