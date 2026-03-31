//C:\Users\Shanon\al-rajjak-1\app\page.tsx
// C:\Users\Shanon\al-rajjak-1\app\page.tsx
// C:\Users\Shanon\al-rajjak-1\app\page.tsx
// C:\Users\Shanon\al-rajjak-1\app\page.tsx
import Image from 'next/image';
import Navbar from "./Navbar";
import AIChatRow from '../components/AIChatRow';
import CookieBanner from "./CookieBanner"; 
import { 
  UserPlus, 
  ArrowRight,
  Mail,
  Globe
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shanon Alam | KI-Automatisierungsexperte',
  description: 'Skalieren Sie Ihr Unternehmen mit KI-Agenten. Automatisierung für Solo-Experten.',
};
export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative">
      <Navbar /> 

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
        <div className="flex-1 space-y-6">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
            KI-Automatisierungsexperte
          </div>
          <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter text-slate-900">
            Skalieren Sie Ihr <span className="text-blue-700">Unternehmen</span> mit KI-Agenten.
          </h2>
          <p className="text-xl text-slate-600 max-w-lg mx-auto md:mx-0 font-medium">
            Ich entwickle maßgeschneiderte KI-Assistenten für Ärzte, Anwälte und Cafés, die Buchungen automatisieren und wöchentlich über 20 Stunden Arbeit sparen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#contact" className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-black hover:shadow-xl transition flex items-center justify-center gap-2">
              KI-Strategie starten <ArrowRight size={20} />
            </a>
            <a href="https://www.linkedin.com/in/shanon-khan-52852a283/" target="_blank" rel="noopener noreferrer" className="border border-slate-300 px-8 py-4 rounded-2xl font-bold hover:bg-white transition flex items-center justify-center gap-2">
              <UserPlus /> LinkedIn
            </a>
          </div>
        </div>
        
        <div className="flex-1 relative flex justify-center">
          <div className="w-64 h-64 md:w-[400px] md:h-[400px] bg-blue-700 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition duration-500 border-8 border-white">
            <Image 
              src="/shanon-99.png" 
              alt="Shanon Khan - KI Experte" 
              fill
              className="grayscale hover:grayscale-0 transition duration-500 object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Industry-Specific AI Section */}
      <section id="services" className="bg-white py-24 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 tracking-tighter uppercase">Branchenspezifische KI</h3>
            <p className="text-slate-500 font-medium max-w-xl mx-auto italic">
              "Maßgeschneiderte Automatisierung, die rund um die Uhr Leads generiert und Kundenanfragen bearbeitet."
            </p>
          </div>
          <div className="mt-12">
            <AIChatRow />
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl md:text-5xl font-black mb-8 italic tracking-tighter">
            "Erst Qualität, dann Honorar."
          </h3>
          <p className="text-xl text-slate-400 font-medium">Ich baue Vertrauen durch Ergebnisse auf. Wenn Sie mit der Leistung der KI nicht zufrieden sind, schulden Sie mir keinen Cent.</p>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-4xl font-black mb-6 tracking-tighter">Bereit zur Automatisierung?</h3>
            <p className="text-slate-600 mb-10 text-lg font-medium">Lassen Sie uns besprechen, wie ich ein KI-System für Sie baue, das arbeitet, während Sie schlafen.</p>
            <div className="space-y-6">
              <a href="mailto:shanon@shanon-alam.de" className="flex items-center gap-4 text-xl font-bold hover:text-blue-700 transition cursor-pointer">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-700"><Mail size={24} /></div> shanon@shanon-alam.de
              </a>
              <a href="https://www.shanon-alam.de" className="flex items-center gap-4 text-xl font-bold hover:text-blue-700 transition cursor-pointer">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-700"><Globe size={24} /></div> www.shanon-alam.de
              </a>
              <a href="https://www.linkedin.com/in/shanon-khan-52852a283/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-xl font-bold hover:text-blue-700 transition cursor-pointer">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </div> 
                LinkedIn Profile
              </a>
            </div>
          </div>
          <div className="bg-blue-700 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <h4 className="text-3xl font-black mb-4 relative z-10">Solo-Experten-Strategie</h4>
            <p className="text-blue-100 mb-8 relative z-10 font-medium">Die direkte Zusammenarbeit mit mir garantiert 100% Qualität ohne Agentur-Overhead. Pure Ergebnisse.</p>
            <a href="https://wa.me/8801601177293" className="inline-block bg-white text-blue-700 px-8 py-3 rounded-xl font-black hover:bg-slate-50 transition relative z-10">Kontakt via WhatsApp</a>
          </div>
        </div>

        {/* Legal Links Addition */}
        <div className="mt-24 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 font-medium text-sm">
          <p>© 2026 Shanon Khan | Built with Next.js</p>
          <div className="flex gap-6">
            <a href="/impressum" className="hover:text-slate-900 transition">Impressum</a>
            <a href="/datenschutz" className="hover:text-slate-900 transition">Datenschutzerklärung</a>
          </div>
        </div>
      </footer>

      <CookieBanner /> 
    </div>
  );
}