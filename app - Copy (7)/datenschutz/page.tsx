


//C:\Users\Shanon\al-rajjak-1\app\datenschutz
// app/datenschutz/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Info, Activity } from 'lucide-react';
import Navbar from "../Navbar"; // নিশ্চিত করুন আপনার প্রজেক্টে এই পাথ ঠিক আছে

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Shanon Alam',
  description: 'Informationen zum Umgang mit Ihren persönlichen Daten bei Shanon Alam.',
  robots: 'noindex', 
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 relative overflow-hidden">
      <Navbar />
      
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-1/3 h-[500px] bg-gradient-to-b from-blue-50 to-transparent -z-10 opacity-70" />

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-blue-700 font-bold mb-12 hover:gap-4 transition-all duration-300 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" /> 
          Zurück zur Startseite
        </Link>

        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-3 text-blue-700 font-bold mb-4">
            <ShieldCheck size={28} />
            <span className="tracking-widest uppercase text-xs">Datenschutz-Standard</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6">
            Datenschutz<span className="text-blue-700">.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-xl border-l-4 border-blue-700 pl-6 italic leading-relaxed">
            Wir schützen Ihre Privatsphäre. Keine Cookies, kein Tracking persönlicher Daten.
          </p>
        </header>

        {/* Policy Content */}
        <div className="space-y-16">
          
          {/* Section 1: Privacy-Friendly Analysis (Updated for Vercel) */}
          <section className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100">
            <div className="w-12 h-12 bg-blue-700 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-100">
              <Activity size={24} />
            </div>
            <h2 className="text-3xl font-black mb-4 text-slate-900 italic">Datenschutzfreundliche Analyse</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              Auf dieser Website werden **keinerlei personenbezogene Daten** erhoben, die Sie identifizierbar machen könnten. 
              Zur technischen Optimierung nutzen wir **Vercel Web Analytics**. 
              Dieses Tool verwendet **keine Cookies** und speichert keine persönlichen Informationen. 
              Ihr Besuch bleibt vollkommen anonym.
            </p>
          </section>

          {/* Section 2: Cookies & Tracking */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="p-8 border border-slate-100 rounded-[2rem] hover:bg-slate-50 transition">
              <Lock className="text-blue-700 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Keine Cookies</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Wir verwenden keine Tracking-Cookies (weder First-Party noch Third-Party) 
                und keine invasiven Technologien wie Google Analytics oder Facebook-Pixel.
              </p>
            </div>
            <div className="p-8 border border-slate-100 rounded-[2rem] hover:bg-slate-50 transition">
              <EyeOff className="text-blue-700 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Anonymer Zugriff</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Da wir keine Kontaktformulare oder Registrierungen anbieten, gibt es keine 
                Möglichkeit, versehentlich private Daten über diese Website an uns zu übermitteln.
              </p>
            </div>
          </section>

          {/* Section 3: Responsible Authority */}
          <section className="border-t border-slate-100 pt-16">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
              <Info className="text-blue-700" size={24} />
              Verantwortliche Stelle
            </h3>
            <div className="bg-white border-2 border-slate-900 p-8 rounded-3xl inline-block shadow-[8px_8px_0px_0px_#1d4ed8]">
              <p className="font-bold text-xl text-slate-900">Shanon Alam</p>
              <p className="text-slate-600">Cornel Goli, Agargaon</p>
              <p className="text-slate-600">Dhaka - 1207, Bangladesch</p>
              <p className="text-blue-700 font-bold mt-4">shanon@shanon-alam.de</p>
            </div>
          </section>

          {/* Section 4: Hosting Disclaimer */}
          <section className="text-sm text-slate-400 font-medium space-y-4 pb-12">
            <p className="uppercase tracking-widest text-[10px] font-black text-slate-600">Technischer Hinweis & Analytics</p>
            <p>
              Diese Website wird auf **Vercel** gehostet. Vercel erhebt anonyme statistische Daten, 
              um die Sicherheit und Stabilität der Website zu gewährleisten. 
              Hierbei werden keine IP-Adressen dauerhaft gespeichert, die eine Identifizierung 
              einzelner Nutzer ermöglichen würden (gemäß DSGVO-Standard)
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}