// app/Footer.tsx
// app/Footer.tsx
// app/Footer.tsx
"use client";
import React from 'react';
import { Mail, Shield, User, MessageCircle } from 'lucide-react'; 

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 px-6 border-t border-slate-800 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 pb-16">
          
          {/* 1. Brand Section */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="bg-blue-700 p-1.5 rounded-lg">
                <Shield className="text-white" size={18} />
              </div>
              <h3 className="text-2xl font-black tracking-tighter">
                SHANON-ALAM<span className="text-blue-500">.DE</span>
              </h3>
            </div>
            <p className="text-slate-400 font-medium max-w-xs text-center mx-auto md:text-left md:mx-0">
              Scaling German businesses with high-performance AI Automation.
            </p>
          </div>

          {/* 2. Quick Links (সব লিঙ্ক এখানে) */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm">Navigation</h4>
            <div className="grid grid-cols-2 gap-4 text-slate-400 font-medium">
              <div className="flex flex-col gap-3">
                <a href="/" className="hover:text-blue-400 transition">Home</a>
                <a href="/#services" className="hover:text-blue-400 transition">Services</a>
                <a href="/about" className="hover:text-blue-400 transition">About Me</a>
              </div>
              <div className="flex flex-col gap-3">
                <a href="/terms" className="hover:text-blue-400 transition">Terms</a>
                <a href="/impressum" className="hover:text-blue-400 transition">Impressum</a>
                <a href="/privacy-policy" className="hover:text-blue-400 transition">Privacy</a>
              </div>
            </div>
          </div>

          {/* 3. Contact Section */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm">Contact</h4>
            <div className="space-y-4">
              <p className="text-slate-400 font-medium italic">shanon@shanon-alam.de</p>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-slate-800 rounded-xl hover:bg-blue-700 transition group">
                  <User size={18} className="group-hover:scale-110 transition" /> 
                  <span className="text-xs font-bold">LinkedIn</span>
                </a>
                <a href="mailto:shanon@shanon-alam.de" className="flex items-center gap-2 p-3 bg-slate-800 rounded-xl hover:bg-blue-700 transition group">
                  <Mail size={18} className="group-hover:scale-110 transition" /> 
                  <span className="text-xs font-bold">Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Area */}
        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-[12px] font-bold uppercase tracking-widest">
          <p>© 2026 Shanon Khan | Cyber Security & AI Expert | Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}