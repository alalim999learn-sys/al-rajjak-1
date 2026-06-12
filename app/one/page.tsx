//C:\Users\Shanon\al-rajjak-1\app\one\page.tsx



import { FaEnvelope, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export default function StudentPortfolio() {
  return (
    <main className="min-h-screen bg-slate-50 py-0 md:py-12">
      <div className="min-h-screen md:min-h-0 md:max-w-3xl mx-auto bg-white md:shadow-2xl md:rounded-[2rem] overflow-hidden border-0 md:border border-slate-100">
        
        <div className="h-40 bg-gradient-to-r from-indigo-800 via-purple-700 to-indigo-900"></div>

        <div className="px-6 md:px-8 pb-10">
          {/* Profile Image */}
          <div className="flex justify-center -mt-20">
            <img 
              src="/HUUUU/1775143547615.jpg" 
              alt="Sara López"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover ring-4 ring-amber-400/50"
            />
          </div>

          {/* Name and Identity */}
          <div className="text-center mt-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Sara López</h1>
            <p className="text-indigo-600 font-bold text-md md:text-lg mt-2 uppercase tracking-widest">Finance Student at the University of Valladolid | Class of 2028</p>
          </div>

          {/* Contact Section */}
          <div className="mt-8 flex flex-nowrap justify-center gap-1.5 md:gap-4 px-2">
            <a href="mailto:diego.estudiante@example.com" className="flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition text-[9px] md:text-sm font-medium whitespace-nowrap">
              <FaEnvelope className="text-red-500 shrink-0" /> Email
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" className="flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition text-[9px] md:text-sm font-medium whitespace-nowrap">
              <FaLinkedin className="text-blue-600 shrink-0" /> LinkedIn
            </a>
            <a href="https://wa.me/1234567890" target="_blank" className="flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition text-[9px] md:text-sm font-medium whitespace-nowrap">
              <FaWhatsapp className="text-green-500 shrink-0" /> WhatsApp
            </a>
          </div>

          {/* About Me Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">About Me</h2>
            <p className="text-slate-600 text-sm">
              Motivated Finance student at the University of Valladolid. Deeply passionate about investment banking, 
              financial modeling, and market analysis. Dedicated to translating academic knowledge into 
              real-world financial solutions through university projects and professional internships.
            </p>
          </div>

          {/* Skills Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Technical Skills</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-slate-600 text-sm">
              <li>✔ Financial Modeling (DCF, LBO)</li>
              <li>✔ Data Analysis (Excel, SQL)</li>
              <li>✔ Market Research & Reporting</li>
              <li>✔ Corporate Communication</li>
              <li>✔ Power BI & Data Visualization</li>
              <li>✔ Quantitative Methods</li>
            </ul>
          </div>

          {/* Academic Projects Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Academic Projects</h2>
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <strong>Rotman Market Challenge</strong> – Asset valuation and risk assessment utilizing advanced DCF models.
              </div>
              <div>
                <strong>UVa Consulting Society</strong> – Market entry strategy analysis for emerging sectors.
              </div>
              <div>
                <strong>Student-Managed Fund</strong> – Active contribution to equity research and portfolio allocation analysis.
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Experience</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-900">Credit Analyst Intern</h3>
                <p className="text-sm text-slate-500">Student-Managed Fund | 2025 - Present</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Finance Forum Member</h3>
                <p className="text-sm text-slate-500">University of Valladolid | 2024 - Present</p>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h2 className="text-lg font-bold text-indigo-900 mb-3">🎓 Education</h2>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li><strong>BSc in Finance</strong><br/>University of Valladolid (2024-2028)</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h2 className="text-lg font-bold text-indigo-900 mb-3">🏆 Certifications</h2>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Bloomberg Market Concepts (BMC)</li>
                <li>• Advanced Financial Excel</li>
                <li>• Google Data Analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}