

//impressum/page.tsx
import Link from 'next/link';
import Navbar from "../Navbar";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  MessageSquare, 
  ExternalLink 
} from 'lucide-react';

export default function Impressum() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 relative overflow-hidden">
      <Navbar />
      
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-gradient-to-b from-blue-50 to-transparent -z-10 opacity-70" />

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
            <span className="tracking-widest uppercase text-xs">Rechtliche Angaben (§ 5 TMG)</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6">
            Impressum<span className="text-blue-700">.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-xl border-l-4 border-blue-700 pl-6 italic leading-relaxed">
            Angaben gemäß § 5 TMG. Verantwortlich für den Inhalt und die Verwaltung dieser Plattform.
          </p>
        </header>

        {/* Information Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Address Card */}
          <section className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:shadow-blue-50 transition-all duration-500 group">
            <div className="w-14 h-14 bg-blue-700 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-200 group-hover:rotate-6 transition">
              <MapPin size={28} />
            </div>
            <h2 className="text-2xl font-black mb-4 text-slate-900">Adresse</h2>
            <div className="space-y-2 text-slate-600 font-medium text-lg leading-relaxed">
              <p className="text-slate-900 font-bold text-xl tracking-tight">Shanon Khan</p>
              <p>Cornel Goli, Agargaon</p>
              <p>Dhaka - 1207</p>
              <p className="text-blue-700 font-bold text-sm tracking-widest pt-2 uppercase">Bangladesch</p>
            </div>
          </section>

          {/* Contact Card */}
          <section className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:shadow-blue-50 transition-all duration-500 group">
            <div className="w-14 h-14 bg-blue-700 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-200 group-hover:-rotate-6 transition">
              <Phone size={28} />
            </div>
            <h2 className="text-2xl font-black mb-4 text-slate-900">Kontakt</h2>
            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-black uppercase tracking-tighter mb-1">E-Mail</span>
                <a href="mailto:shanon@shanon-alam.de" className="text-lg font-bold hover:text-blue-700 transition break-all">
                  shanon@shanon-alam.de
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-black uppercase tracking-tighter mb-2">Sofort-Support</span>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://wa.me/8801601177293" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:text-green-600 transition"
                  >
                    <MessageSquare size={18} /> <span className="text-sm font-bold">WhatsApp</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/shanon-khan-52852a283/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:text-blue-700 transition"
                  >
                    <ExternalLink size={18} /> <span className="text-sm font-bold">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Legal Disclaimer Section */}
        <div className="space-y-12 border-t border-slate-100 pt-16">
          <section className="max-w-2xl">
            <h3 className="text-2xl font-black mb-4 text-slate-900 flex items-center gap-2">
              <FileText className="text-blue-700" size={24} />
              Inhaltliche Verantwortlichkeit
            </h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              Verantwortlich für den Inhalt nach § 5 TMG und § 55 Abs. 2 RStV: <br />
              <span className="font-bold text-slate-800">Shanon Khan</span> <br />
              Cornel Goli, Agargaon, Dhaka - 1207, Bangladesch
            </p>
          </section>

          {/* Haftung für Inhalte */}
          <section className="max-w-3xl">
            <h3 className="text-xl font-black mb-4 text-slate-900 flex items-center gap-2 uppercase tracking-tighter">
              <ShieldCheck className="text-blue-700" size={20} />
              Haftung für Inhalte
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
            </p>
          </section>

          {/* Haftung für Links */}
          <section className="max-w-3xl">
            <h3 className="text-xl font-black mb-4 text-slate-900 flex items-center gap-2 uppercase tracking-tighter">
              <ExternalLink className="text-blue-700" size={20} />
              Haftung für Links
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
            </p>
          </section>

          {/* Urheberrecht */}
          <section className="max-w-3xl pb-10">
            <h3 className="text-xl font-black mb-4 text-slate-900 flex items-center gap-2 uppercase tracking-tighter">
              <FileText className="text-blue-700" size={20} />
              Urheberrecht
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium text-sm">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

