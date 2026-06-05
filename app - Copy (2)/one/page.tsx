//C:\Users\Shanon\al-rajjak-1\app\one\page.tsx



export default function MarketingPortfolio() {
  return (
    <main className="min-h-screen bg-slate-50 py-0 md:py-12">
      <div className="min-h-screen md:min-h-0 md:max-w-3xl mx-auto bg-white md:shadow-2xl md:rounded-[2rem] overflow-hidden border-0 md:border border-slate-100">
        
        <div className="h-40 bg-gradient-to-r from-indigo-800 via-purple-700 to-indigo-900"></div>

        <div className="px-6 md:px-8 pb-10">
          {/* Profile Image */}
          <div className="flex justify-center -mt-20">
            <img 
              src="/HUUUU/pexels-denigrafias-8655333.jpg" 
              alt="Marketing Professional" 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover ring-4 ring-amber-400/50"
            />
          </div>

          {/* Name and Identity */}
          <div className="text-center mt-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Alex Rivera</h1>
            <p className="text-indigo-600 font-bold text-md md:text-lg mt-2 uppercase tracking-widest">Digital Marketing & Business Analytics</p>
          </div>

          {/* Contact Section */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="mailto:alex.marketing@example.com" className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition text-sm font-medium">
              📧 Email
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition text-sm font-medium">
              🔗 LinkedIn
            </a>
            <a href="https://wa.me/1234567890" target="_blank" className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-green-100 hover:text-green-700 transition text-sm font-medium">
              💬 WhatsApp
            </a>
          </div>

          {/* About Me Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">About Me</h2>
            <p className="text-slate-600 text-sm">
              Passionate digital marketing professional with a strong background in analytics, SEO, and business communication. 
              My goal is to help brands grow through data-driven strategies and creative campaigns.
            </p>
          </div>

          {/* Skills Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Skills</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-slate-600 text-sm">
              <li>✔ SEO & SEM</li>
              <li>✔ Business Analytics</li>
              <li>✔ E-commerce Strategy</li>
              <li>✔ Communication & Branding</li>
              <li>✔ Data Visualization (Excel, Power BI)</li>
              <li>✔ Content Marketing</li>
            </ul>
          </div>

          {/* Projects Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Projects</h2>
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <strong>SEO Optimization Project</strong> – Improved organic traffic by 40% for an e-commerce site.
              </div>
              <div>
                <strong>Marketing Dashboard</strong> – Built a Power BI dashboard to track campaign KPIs.
              </div>
              <div>
                <strong>Social Media Campaign</strong> – Managed Instagram ads that boosted engagement by 25%.
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Achievements</h2>
            <ul className="list-disc list-inside text-slate-600 text-sm space-y-2">
              <li>🏅 Awarded “Best Marketing Intern” at PuntoQPack</li>
              <li>📈 Increased online sales by 30% during internship</li>
              <li>🌍 Organized international marketing workshop for students</li>
            </ul>
          </div>

          {/* Professional Experience */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Professional Experience</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-900">VIP Hospitality Assistant</h3>
                <p className="text-sm text-slate-500">Mutua Madrid Open | Apr 2026 - May 2026</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Junior Marketing Digital (PuntoQPack)</h3>
                <p className="text-sm text-slate-500">Aug 2025 - Feb 2026 | Hybrid</p>
                <p className="text-sm text-slate-600 mt-1">SEO, E-commerce, & Business Communication</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Becario Marketing (Internship)</h3>
                <p className="text-sm text-slate-500">Mar 2025 - Aug 2025 | Móstoles, Spain</p>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h2 className="text-lg font-bold text-indigo-900 mb-3">🎓 Education</h2>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li><strong>Master in Business Analytics</strong><br/>Universidad CEU San Pablo (2026-2027)</li>
                <li><strong>B.B.A. + Marketing</strong><br/>Universidad Rey Juan Carlos (2020-2025)</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h2 className="text-lg font-bold text-indigo-900 mb-3">🏆 Certifications</h2>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Excel Certification - Advanced (Santander)</li>
                <li>• Google Digital Garage</li>
                <li>• HubSpot Content Marketing Pro</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
