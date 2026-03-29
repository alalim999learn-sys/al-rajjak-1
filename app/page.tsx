//C:\Users\Shanon\al-rajjak-1\app\page.tsx
// C:\Users\Shanon\al-rajjak-1\app\page.tsx
// C:\Users\Shanon\al-rajjak-1\app\page.tsx
import Image from 'next/image';
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner"; // নিশ্চিত করো এই ফাইলটি app ফোল্ডারেই আছে
import { 
  ShieldCheck, 
  Bot, 
  Mail, 
  Globe, 
  CheckCircle, 
  UserPlus, 
  Layout, 
  Zap,
  Stethoscope,
  Scale,
  Coffee,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative">
<Navbar /> {/* এই যে এখানে বসবে */}
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
        <div className="flex-1 space-y-6">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
            AI Automation Expert
          </div>
          <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter text-slate-900">
            Scale Your Business With <span className="text-blue-700">AI Agents.</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-lg mx-auto md:mx-0 font-medium">
            I build custom AI Assistants for Doctors, Lawyers, and Cafes that automate bookings and save 20+ hours of work weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#contact" className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-black hover:shadow-xl transition flex items-center justify-center gap-2">
              Start Your AI Journey <ArrowRight size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="border border-slate-300 px-8 py-4 rounded-2xl font-bold hover:bg-white transition flex items-center justify-center gap-2">
              <UserPlus size={20} /> LinkedIn
            </a>
          </div>
        </div>
        
        <div className="flex-1 relative flex justify-center">
          <div className="w-64 h-64 md:w-[400px] md:h-[400px] bg-blue-700 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition duration-500 border-8 border-white">
            <Image 
              src="/shanon-profile.jpg" 
              alt="Shanon Khan" 
              fill
              className="grayscale hover:grayscale-0 transition duration-500 object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Industry Solutions (The 14 Lakh Mission Section) */}
      <section id="services" className="bg-white py-24 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 tracking-tighter">Industry-Specific AI</h3>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">Tailored automation designed to capture leads and handle clients 24/7.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Medical */}
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-transparent hover:border-blue-200 transition group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-700 group-hover:text-white transition">
                <Stethoscope size={24} />
              </div>
              <h4 className="text-xl font-bold mb-2">Medical AI</h4>
              <p className="text-sm text-slate-500 mb-6">Automates patient bookings and answering medical FAQs instantly.</p>
              <a href="#" className="text-sm font-black text-blue-700 flex items-center gap-2">Try Demo <ArrowRight size={14}/></a>
            </div>

            {/* Legal */}
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-transparent hover:border-blue-200 transition group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-700 group-hover:text-white transition">
                <Scale size={24} />
              </div>
              <h4 className="text-xl font-bold mb-2">Legal Bot</h4>
              <p className="text-sm text-slate-500 mb-6">High-level lead qualification and initial consultation screening.</p>
              <a href="#" className="text-sm font-black text-blue-700 flex items-center gap-2">Try Demo <ArrowRight size={14}/></a>
            </div>

            {/* Cafe */}
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-transparent hover:border-blue-200 transition group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-700 group-hover:text-white transition">
                <Coffee size={24} />
              </div>
              <h4 className="text-xl font-bold mb-2">Cafe Assistant</h4>
              <p className="text-sm text-slate-500 mb-6">Handles table reservations and showcases menu items automatically.</p>
              <a href="#" className="text-sm font-black text-blue-700 flex items-center gap-2">Try Demo <ArrowRight size={14}/></a>
            </div>

            {/* General AI */}
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-transparent hover:border-blue-200 transition group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-700 group-hover:text-white transition">
                <Bot size={24} />
              </div>
              <h4 className="text-xl font-bold mb-2">Custom AI</h4>
              <p className="text-sm text-slate-500 mb-6">Don't see your industry? I build custom agents for any business goal.</p>
              <a href="#" className="text-sm font-black text-blue-700 flex items-center gap-2">Contact Me <ArrowRight size={14}/></a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl md:text-5xl font-black mb-8 italic tracking-tighter">"Quality First, Then You Pay."</h3>
          <p className="text-xl text-slate-400 font-medium">I believe in building trust through results. If you aren't satisfied with the AI performance, you don't owe me a cent.</p>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-4xl font-black mb-6 tracking-tighter">Ready to Automate?</h3>
            <p className="text-slate-600 mb-10 text-lg font-medium">Let's discuss how I can build an AI system that works while you sleep.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-xl font-bold hover:text-blue-700 transition cursor-pointer">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-700"><Mail /></div> shanon@shanon-alam.de
              </div>
              <div className="flex items-center gap-4 text-xl font-bold hover:text-blue-700 transition cursor-pointer">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-700"><Globe /></div> www.shanon-alam.de
              </div>
            </div>
          </div>
          <div className="bg-blue-700 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <h4 className="text-3xl font-black mb-4 relative z-10">Solo Expert Strategy</h4>
            <p className="text-blue-100 mb-8 relative z-10 font-medium">Working directly with me ensures 100% quality and zero agency overhead. Pure results.</p>
            <a href="https://wa.me/8801601177293" className="inline-block bg-white text-blue-700 px-8 py-3 rounded-xl font-black hover:bg-slate-50 transition relative z-10">Message on WhatsApp</a>
          </div>
        </div>
        <div className="mt-24 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 font-medium text-sm">
          <p>© 2026 Shanon Khan | Built with Next.js</p>
          <div className="flex gap-6">
             <a href="/impressum" className="hover:text-slate-900">Impressum</a>
             <a href="/privacy-policy" className="hover:text-slate-900">Privacy Policy</a>
          </div>
        </div>
      </footer>
<Footer />
      {/* Cookie Banner Component */}
      <CookieBanner /> 
    </div>
  );
}