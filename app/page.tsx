import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* --- Navigation --- */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-blue-900">Shanon Alam<span className="text-blue-500">.de</span></div>
          <div className="hidden md:flex gap-8 font-medium text-slate-600">
            <a href="#services" className="hover:text-blue-700">Services</a>
            <a href="#security" className="hover:text-blue-700">IT-Sicherheit</a>
            <Link href="/impressum" className="hover:text-blue-700">Impressum</Link>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Kontakt
          </button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
            KI-Lösungen für Arztpraxen
          </span>
          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
            Automatisieren Sie Ihre <span className="text-blue-700">Patienten-Kommunikation</span>
          </h1>
          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Wir entwickeln intelligente KI-Chatbots, die Termine buchen und Patientenanfragen rund um die Uhr beantworten – 100% DSGVO-konform für deutsche Kliniken.
          </p>
          <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">
            <button className="bg-blue-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:bg-blue-800 transition">
              Kostenlose Demo anfordern
            </button>
            <button className="bg-white border-2 border-slate-200 px-10 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition">
              Fallstudien ansehen
            </button>
          </div>
        </div>
      </header>

      {/* --- Security & Trust Section --- */}
      <section id="security" className="bg-white py-20 border-y">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-blue-600 mb-4 text-3xl">🛡️</div>
            <h3 className="text-xl font-bold mb-3">Maximale Sicherheit</h3>
            <p className="text-slate-600">Als Cybersecurity-Experte garantiere ich, dass Ihre Patientendaten nach höchsten Standards verschlüsselt werden.</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-blue-600 mb-4 text-3xl">🤖</div>
            <h3 className="text-xl font-bold mb-3">Intelligente KI</h3>
            <p className="text-slate-600">Unsere Bots verstehen medizinische Fachbegriffe und entlasten Ihr Empfangspersonal spürবার.</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-blue-600 mb-4 text-3xl">⚡</div>
            <h3 className="text-xl font-bold mb-3">Schnelle Integration</h3>
            <p className="text-slate-600">In weniger als 48 Stunden ist Ihr System einsatzbereit und mit Ihrem Kalender synchronisiert.</p>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:row justify-between items-center gap-6">
          <p>© 2026 Shanon Alam. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6 underline underline-offset-4">
            <Link href="/impressum" className="hover:text-white">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}