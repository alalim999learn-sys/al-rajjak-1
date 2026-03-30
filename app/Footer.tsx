// app/Footer.tsx
// app/Footer.tsx
// app/Footer.tsx
// app/Footer.tsx
"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 px-6 border-t border-slate-800 w-full relative z-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 pb-16">
          
          {/* 1. Brand Section */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="bg-blue-700 p-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="text-2xl font-black tracking-tighter uppercase italic">
                SHANON-ALAM<span className="text-blue-500">.DE</span>
              </h3>
            </div>
            <p className="text-slate-400 font-medium max-w-xs text-xs mx-auto md:text-left md:mx-0 leading-relaxed">
              Skalierung deutscher Unternehmen durch hochperformante KI-Automatisierung und Cybersecurity.
            </p>
          </div>

          {/* 2. Quick Links (AGB যুক্ত করা হয়েছে) */}
          <div className="text-center md:text-left">
            <h4 className="text-[10px] font-black mb-6 text-white uppercase tracking-[0.4em] opacity-40">Navigation</h4>
            <div className="grid grid-cols-2 gap-4 text-slate-400 font-bold text-[11px] uppercase tracking-widest">
              <div className="flex flex-col gap-3">
                <Link href="/" className="hover:text-blue-400 transition-colors">Startseite</Link>
                <Link href="/#services" className="hover:text-blue-400 transition-colors">Leistungen</Link>
                <Link href="/ueber-mich" className="hover:text-blue-400 transition-colors">Über mich</Link>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/agb" className="hover:text-blue-400 transition-colors text-blue-500">AGB</Link>
                <Link href="/impressum" className="hover:text-blue-400 transition-colors">Impressum</Link>
                <Link href="/datenschutz" className="hover:text-blue-400 transition-colors">Datenschutz</Link>
              </div>
            </div>
          </div>

          {/* 3. Contact Section */}
          <div className="text-center md:text-left">
            <h4 className="text-[10px] font-black mb-6 text-white uppercase tracking-[0.4em] opacity-40">Kontakt</h4>
            <div className="space-y-6">
              <p className="text-blue-500 font-black italic tracking-tighter text-sm underline underline-offset-4">shanon@shanon-alam.de</p>
              <div className="flex justify-center md:justify-start gap-3">
                {/* LinkedIn Icon SVG */}
                <a href="https://www.linkedin.com/in/shanon-khan-52852a283/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-xl hover:bg-blue-700 transition-all group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                {/* Email Icon SVG */}
                <a href="mailto:shanon@shanon-alam.de" className="p-3 bg-slate-800 rounded-xl hover:bg-blue-700 transition-all group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="pt-8 border-t border-slate-800 text-center text-slate-600 text-[9px] font-black uppercase tracking-[0.5em]">
          <p>© 2026 SHANON KHAN | ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  );
}