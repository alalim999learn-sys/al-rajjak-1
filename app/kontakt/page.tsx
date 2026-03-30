


//kontakt/page.tsx
import Navbar from "../Navbar";
import Link from 'next/link';

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 relative overflow-hidden">
      <Navbar />
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-[600px] bg-gradient-to-l from-blue-50 to-transparent -z-10 opacity-70" />

      <main className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-2 text-blue-700 font-bold mb-4">
            <span className="tracking-widest uppercase text-xs font-black">Kontaktieren Sie mich</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 italic">
            Kontakt<span className="text-blue-700">.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-xl border-l-4 border-blue-700 pl-6 leading-relaxed font-medium">
            Haben Sie Fragen zu Ihrem KI-Prototyp oder zur Sicherheit Ihrer Praxis? 
            Ich antworte Ihnen persönlich und zeitnah.
          </p>
        </header>

        {/* Security Note Card */}
        <section className="mb-12">
          <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl flex flex-col md:flex-row items-start gap-6">
            <div className="bg-blue-700 text-white p-3 rounded-xl shrink-0">
              {/* Shield SVG Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <h3 className="text-sm font-black text-blue-900 mb-1 uppercase tracking-tighter">Sicherheitshinweis</h3>
              <p className="text-blue-800/80 font-semibold leading-snug">
                Aus Sicherheitsgründen verzichte ich auf klassische Kontaktformulare, 
                um Ihre Daten vor Spam zu schützen. Bitte nutzen Sie die direkten Kanäle unten.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          
          {/* Email Card */}
          <a 
            href="mailto:shanon@shanon-alam.de" 
            className="group bg-slate-50 p-10 rounded-[2rem] border border-slate-100 hover:border-blue-200 transition-all duration-300"
          >
            <div className="text-blue-700 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </div>
            <h3 className="text-xl font-black mb-1 uppercase italic text-slate-800">E-Mail</h3>
            <p className="text-slate-500 font-bold mb-6 text-[10px] uppercase tracking-[0.2em]">Direkter Kontakt</p>
            <p className="text-blue-700 font-black text-lg break-all">shanon@shanon-alam.de</p>
          </a>

          {/* LinkedIn Card */}
          <a 
            href="https://www.linkedin.com/in/shanon-khan-52852a283/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-slate-50 p-10 rounded-[2rem] border border-slate-100 hover:border-blue-200 transition-all duration-300"
          >
            <div className="text-blue-700 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </div>
            <h3 className="text-xl font-black mb-1 uppercase italic text-slate-800">LinkedIn</h3>
            <p className="text-slate-500 font-bold mb-6 text-[10px] uppercase tracking-[0.2em]">Professional Network</p>
            <p className="text-blue-700 font-black text-lg underline underline-offset-4 tracking-tighter">shanon-khan</p>
          </a>

          {/* WhatsApp Card */}
          <div className="bg-slate-900 p-10 rounded-[2rem] border border-slate-800 shadow-xl flex flex-col justify-between group">
            <div>
              <div className="text-blue-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h3 className="text-xl font-black mb-1 uppercase italic text-white">WhatsApp</h3>
              <p className="text-slate-400 font-bold mb-8 text-[10px] uppercase tracking-[0.2em]">Schneller Support</p>
            </div>
            
            <div className="space-y-4">
              <a 
                href="https://wa.me/8801601177293" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-black py-4 px-4 rounded-xl text-center font-black hover:bg-blue-600 hover:text-white transition-all block uppercase text-xs tracking-widest"
              >
                Jetzt Chatten
              </a>
              <a 
                href="tel:+8801601177293" 
                className="text-white/30 hover:text-blue-400 text-[10px] font-black transition-colors block text-center tracking-[0.3em]"
              >
                +880 1601 177293
              </a>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <footer className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-slate-100 pt-10">
          <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
            <span>Antwortzeit: Innerhalb von 24h (Werktage)</span>
          </div>

          <Link 
            href="/" 
            className="text-slate-400 hover:text-blue-700 font-black text-[10px] uppercase tracking-[0.2em] transition-colors"
          >
            ← Zurück zur Startseite
          </Link>
        </footer>
      </main>
    </div>
  );
}