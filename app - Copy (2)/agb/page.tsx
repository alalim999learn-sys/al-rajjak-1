



// app/agb/page.tsx
import React from 'react';
import { ArrowLeft, AlertTriangle, CreditCard, Cpu } from 'lucide-react';
import Navbar from "../Navbar";
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'AGB | Shanon Alam - KI-Automatisierung & IT-Sicherheit',
  description: 'Allgemeine Geschäftsbedingungen für die Dienstleistungen von Shanon Khan.',
  robots: 'noindex', 
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans relative">
      <Navbar />

      {/* Content Wrapper with Padding */}
      <main className="max-w-4xl mx-auto pt-32 pb-20 px-6">
        <a href="/" className="inline-flex items-center gap-2 text-blue-700 font-bold mb-10 hover:gap-3 transition-all group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" /> Zurück zur Startseite
        </a>
        
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
          Allgemeine Geschäftsbedingungen<span className="text-blue-700"> (AGB)</span>
        </h1>
        <p className="text-slate-500 mb-12 font-medium italic border-b pb-8">Stand: März 2026</p>

        <div className="space-y-12 text-slate-700 leading-relaxed">
          
          {/* Section 1: AI Technology */}
          <section className="group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-700"><Cpu size={24} /></div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">1. KI-Technologie & Modell-Training</h2>
            </div>
            <p className="mb-4 text-lg">
              Ich nutze fortschrittliche KI-Schnittstellen (wie OpenAI, Anthropic oder Meta), um maßgeschneiderte KI-Agenten für Ihr Unternehmen zu entwickeln. Diese Bots werden mit den vom Kunden bereitgestellten Daten trainiert, um eine präzise Interaktion zu gewährleisten.
            </p>
            <div className="p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl flex gap-4 items-start shadow-sm">
              <AlertTriangle className="text-amber-600 shrink-0" size={24} />
              <div className="text-sm text-amber-800 font-medium">
                <strong className="block mb-1 text-amber-900">Haftungsausschluss zur Genauigkeit:</strong> 
                Trotz höchster Sorgfalt ist KI-Technologie nicht fehlerfrei. KI-Agenten können gelegentlich ungenaue, unvollständige oder fehlerhafte Informationen liefern (sog. „Halluzinationen“). Shanon-Alam.de haftet nicht für geschäftliche Entscheidungen oder Schäden, die aus KI-generierten Fehlern resultieren. Die Endkontrolle der Bot-Ausgaben obliegt dem Kunden.
              </div>
            </div>
          </section>

          {/* Section 2: Payment Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-50 rounded-lg text-green-700"><CreditCard size={24} /></div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">2. Zahlungsbedingungen & 50% Anzahlung</h2>
            </div>
            <p className="mb-4 font-medium text-slate-900">
              Um die Projektrealisierung und die Kosten für die Infrastruktur abzusichern, gilt folgende Zahlungsstruktur:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="bg-blue-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-1 font-bold">1</span>
                <span><strong>50% Anzahlung:</strong> Diese ist vor Projektbeginn fällig. Die Anzahlung ist nicht erstattungsfähig, da sie die initiale Planung, Arbeitszeit und Bereitstellung der Infrastruktur abdeckt.</span>
              </li>
              <li className="flex items-start gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="bg-blue-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-1 font-bold">2</span>
                <span><strong>50% Restzahlung:</strong> Diese ist unmittelbar nach Projektabschluss und erfolgreicher Implementierung auf der Plattform des Kunden fällig.</span>
              </li>
            </ul>
          </section>

          {/* Section 3: Data Handling */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">3. Datenschutz & DSGVO</h2>
            <p>
              Ich halte mich strikt an die Richtlinien der **DSGVO (Datenschutz-Grundverordnung)**. Alle für das Training bereitgestellten Daten werden vertraulich behandelt und ausschließlich im Rahmen der notwendigen API-Verarbeitung genutzt.
            </p>
          </section>

          {/* Section 4: Maintenance */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">4. Wartung & Support</h2>
            <p>
              Fehlerbehebungen und Feinabstimmungen sind für die ersten **30 Tage nach dem Launch** kostenlos enthalten. Nach Ablauf dieses Zeitraums können zusätzliche Gebühren für die Wartung oder das API-Management anfallen, sofern keine separate Wartungsvereinbarung besteht.
            </p>
          </section>
        </div>
      </main>

    
    </div>
  );
}