//C:\Users\Shanon\al-rajjak-1\app\two\page.tsx



import { FaEnvelope, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
export default function GreenyPortfolio() {
  return (
    <main className="min-h-screen bg-emerald-50/50 py-12 px-0 md:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white p-8 rounded-none md:rounded-[2rem] border border-emerald-100 shadow-sm flex flex-col-reverse md:flex-row items-center justify-between gap-8 w-full">
          {/* Text on Left */}
          <div className="text-center md:text-left w-full">
            {/* Added whitespace-nowrap to keep name on one line */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 whitespace-nowrap">Alex Rivera</h1>
            <p className="text-emerald-700 font-bold mt-1 uppercase tracking-widest text-xs md:text-sm">
              Digital Marketing & Business Analytics
            </p>
            
            {/* Contact Buttons: flex-nowrap keeps them in one row, gap-2 saves space */}
            <div className="mt-6 flex flex-nowrap justify-center md:justify-start gap-2">
              <a href="mailto:alex.marketing@example.com" className="flex items-center gap-1.5 px-3 md:px-5 py-2 bg-emerald-600 text-white rounded-full text-[10px] md:text-sm font-medium hover:bg-emerald-700 transition whitespace-nowrap">
                <FaEnvelope className="text-white shrink-0" /> Email
              </a>
              <a href="#" className="flex items-center gap-1.5 px-3 md:px-5 py-2 bg-slate-100 text-slate-700 rounded-full text-[10px] md:text-sm font-medium hover:bg-blue-50 transition whitespace-nowrap">
                <FaLinkedin className="text-blue-600 shrink-0" /> LinkedIn
              </a>
              <a href="#" className="flex items-center gap-1.5 px-3 md:px-5 py-2 bg-slate-100 text-slate-700 rounded-full text-[10px] md:text-sm font-medium hover:bg-green-50 transition whitespace-nowrap">
                <FaWhatsapp className="text-green-500 shrink-0" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Image on Right */}
          <img 
            src="/HUUUU/pexels-denigrafias-8655333.jpg" 
            alt="Alex Rivera" 
            className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-emerald-100 shrink-0"
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8">
          <div className="space-y-0 md:space-y-8">
            <section className="bg-white p-6 rounded-none md:rounded-3xl border border-emerald-100 shadow-sm w-full">
              <h2 className="text-lg font-bold text-slate-900 mb-4">About Me</h2>
              <p className="text-slate-600 text-sm leading-relaxed">Passionate digital marketing professional with a strong background in analytics, SEO, and business communication.</p>
            </section>
            <section className="bg-white p-6 rounded-none md:rounded-3xl border border-emerald-100 shadow-sm w-full">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {['SEO & SEM', 'Business Analytics', 'E-commerce', 'Power BI', 'Content'].map((s) => (
                  <span key={s} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-[11px] font-bold border border-emerald-100">{s}</span>
                ))}
              </div>
            </section>
          </div>

          <div className="md:col-span-2 space-y-0 md:space-y-8">
            <section className="bg-white p-8 rounded-none md:rounded-3xl border border-emerald-100 shadow-sm w-full">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Professional Experience</h2>
              <div className="space-y-6">
                {[
                  { title: "VIP Hospitality Assistant", company: "Mutua Madrid Open", date: "Apr 2026 - May 2026" },
                  { title: "Junior Marketing Digital", company: "PuntoQPack", date: "Aug 2025 - Feb 2026" },
                  { title: "Becario Marketing (Internship)", company: "Móstoles, Spain", date: "Mar 2025 - Aug 2025" }
                ].map((job, i) => (
                  <div key={i} className="border-l-2 border-emerald-200 pl-4">
                    <h3 className="font-bold text-slate-900">{job.title}</h3>
                    <p className="text-sm text-emerald-600 font-medium">{job.company}</p>
                    <p className="text-[11px] text-slate-400">{job.date}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="bg-white p-8 rounded-none md:rounded-3xl border border-emerald-100 shadow-sm w-full">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Education & Certifications</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="text-sm">
                  <p className="font-bold text-emerald-800">Education</p>
                  <p className="text-slate-600 text-xs mt-1">Master in Business Analytics, Universidad CEU San Pablo</p>
                </div>
                <div className="text-sm">
                  <p className="font-bold text-emerald-800">Certifications</p>
                  <p className="text-slate-600 text-xs mt-1">• Excel Advanced<br/>• Google Digital Garage</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="text-center text-slate-400 text-xs py-4">© 2026 Alex Rivera. All Rights Reserved.</div>
      </div>
    </main>
  );
}