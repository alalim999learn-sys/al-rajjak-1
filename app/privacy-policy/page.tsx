




import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Globe, Info } from 'lucide-react';
import Navbar from "../Navbar";
import Footer from "../Footer";
export default function PrivacyPolicy() {
  return (
  
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 relative overflow-hidden">
      {/* Background Decor */}
            <Navbar />
      <div className="absolute top-0 left-0 w-1/3 h-[500px] bg-gradient-to-b from-blue-50 to-transparent -z-10 opacity-70" />

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-blue-700 font-bold mb-12 hover:gap-4 transition-all duration-300 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" /> 
          Back to Home
        </Link>

        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-3 text-blue-700 font-bold mb-4">
            <ShieldCheck size={28} />
            <span className="tracking-widest uppercase text-xs">Privacy Framework</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6">
            Privacy Policy<span className="text-blue-700">.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-xl border-l-4 border-blue-700 pl-6 italic leading-relaxed">
            Your privacy is our priority. We believe in total transparency and zero data collection.
          </p>
        </header>

        {/* Policy Content */}
        <div className="space-y-16">
          
          {/* Section 1: No Collection */}
          <section className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100">
            <div className="w-12 h-12 bg-blue-700 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-100">
              <EyeOff size={24} />
            </div>
            <h2 className="text-3xl font-black mb-4 text-slate-900 italic">No Data Collection</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              We do not collect, store, or process any personal data from our visitors. 
              Our website is designed as a pure information platform. No cookies, no tracking pixels, 
              and no user profiles are created during your stay.
            </p>
          </section>

          {/* Section 2: GDPR */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="p-8 border border-slate-100 rounded-[2rem] hover:bg-slate-50 transition">
              <Lock className="text-blue-700 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">GDPR Compliance</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                As we do not collect any personal data, we strictly adhere to the principles of 
                data minimization according to the General Data Protection Regulation (GDPR).
              </p>
            </div>
            <div className="p-8 border border-slate-100 rounded-[2rem] hover:bg-slate-50 transition">
              <Globe className="text-blue-700 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Server Logs</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Our hosting provider may store temporary server logs (IP address, browser type) 
                strictly for security and technical stability. These are not used to identify individuals.
              </p>
            </div>
          </section>

          {/* Section 3: Contact Responsibility */}
          <section className="border-t border-slate-100 pt-16">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
              <Info className="text-blue-700" size={24} />
              Responsible Authority
            </h3>
            <div className="bg-white border-2 border-slate-900 p-8 rounded-3xl inline-block shadow-[8px_8px_0px_0px_#1d4ed8]">
              <p className="font-bold text-xl text-slate-900">Shanon Alam</p>
              <p className="text-slate-600">Cornel Goli, Agargaon</p>
              <p className="text-slate-600">Dhaka - 1207, Bangladesh</p>
              <a href="mailto:shanon@shanon-alam.de" className="text-blue-700 font-bold block mt-4 hover:underline">
                shanon@shanon-alam.de
              </a>
            </div>
          </section>

          {/* Legal German Text (Important for German Clients) */}
          <section className="text-sm text-slate-400 font-medium space-y-4">
            <p className="uppercase tracking-widest text-[10px] font-black text-slate-600">Rechtliche Hinweise</p>
            <p>
              Wir nutzen keine Analyse-Tools oder Werbe-Tracking. Sollten Sie uns per E-Mail kontaktieren, 
              werden Ihre Angaben zwecks Bearbeitung der Anfrage bei uns gespeichert. 
              Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
          </section>

        </div>

        {/* Footer */}
       
      </main>
      <Footer />
    </div>
  );
}