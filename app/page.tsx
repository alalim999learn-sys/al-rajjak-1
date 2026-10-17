//C:\Users\Shanon\al-rajjak-1\app\page.tsx
// C:\Users\Shanon\al-rajjak-1\app\page.tsx
// C:\Users\Shanon\al-rajjak-1\app\page.tsx
// C:\Users\Shanon\al-rajjak-1\app\page.tsx
import Image from 'next/image';
import Navbar from "./Navbar";
import CookieBanner from "./CookieBanner"; 
import { 
  ArrowRight,
  Mail,
  Globe,
  Code,
  Video,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shanon Alam | Full-Stack & AI Engineer',
  description: 'Helping US Facebook pages grow, creative reel generation, competitor tracking, and high-performance web development.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative">
      <Navbar /> 

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-28 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
        <div className="flex-1 space-y-6">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
            Full-Stack Developer & Growth Engineer
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-slate-900">
            Scaling US Facebook Pages & Building <span className="text-blue-700">Digital Solutions</span>.
          </h1>
          <p className="text-lg text-slate-600 max-w-lg mx-auto md:mx-0 font-medium">
            I help businesses grow their Facebook presence, create high-converting product reels, track competitors, and build robust web apps using Next.js, TypeScript, Python, and Node.js.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#contact" className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-black hover:shadow-xl transition flex items-center justify-center gap-2">
              Let's Talk <ArrowRight size={20} />
            </a>
            <a href="https://www.linkedin.com/in/shanon-khan-52852a283/" target="_blank" rel="noopener noreferrer" className="border border-slate-300 px-8 py-4 rounded-2xl font-bold hover:bg-white transition flex items-center justify-center gap-2">
              LinkedIn Profile
            </a>
          </div>
        </div>

        <div className="flex-1 relative flex justify-center">
          <div className="w-64 h-64 md:w-[380px] md:h-[380px] bg-blue-700 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition duration-500 border-8 border-white relative">
            <Image 
              src="/shanon-99.png" 
              alt="Shanon Alam - Developer & Creator" 
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-24 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 tracking-tight">WHAT I DO</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              End-to-end digital services designed to scale your online brand and technical infrastructure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition">
              <div className="p-4 bg-blue-100 text-blue-700 rounded-2xl w-fit mb-6"><TrendingUp size={28} /></div>
              <h3 className="text-xl font-bold mb-3">FB Page Growth</h3>
              <p className="text-slate-600 text-sm">Strategic audience expansion and management helping US Facebook pages build active communities.</p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition">
              <div className="p-4 bg-blue-100 text-blue-700 rounded-2xl w-fit mb-6"><Video size={28} /></div>
              <h3 className="text-xl font-bold mb-3">Reels & Competitor Tracking</h3>
              <p className="text-slate-600 text-sm">Creating engaging product reels and using automated tools to track competitor strategies and market trends.</p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition">
              <div className="p-4 bg-blue-100 text-blue-700 rounded-2xl w-fit mb-6"><Code size={28} /></div>
              <h3 className="text-xl font-bold mb-3">Full-Stack Web Dev</h3>
              <p className="text-slate-600 text-sm">Custom web applications built with TypeScript, Next.js, Python, and Express.js tailored to your exact business needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Banner */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-black mb-6 tracking-tight uppercase text-blue-400">Core Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-bold">
            <span className="px-5 py-2.5 bg-slate-800 rounded-xl border border-slate-700">TypeScript</span>
            <span className="px-5 py-2.5 bg-slate-800 rounded-xl border border-slate-700">Next.js</span>
            <span className="px-5 py-2.5 bg-slate-800 rounded-xl border border-slate-700">JavaScript</span>
            <span className="px-5 py-2.5 bg-slate-800 rounded-xl border border-slate-700">Python</span>
            <span className="px-5 py-2.5 bg-slate-800 rounded-xl border border-slate-700">Express.js</span>
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-black mb-4 tracking-tight">Let's Build Something Together</h3>
            <p className="text-slate-600 mb-8 text-base font-medium">Ready to grow your Facebook page, create high-impact reels, or build a web app? Get in touch.</p>
            <div className="space-y-4">
              <a href="mailto:shanon@shanon-alam.de" className="flex items-center gap-4 text-lg font-bold hover:text-blue-700 transition">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-700"><Mail size={20} /></div> shanon@shanon-alam.de
              </a>
              <a href="https://www.linkedin.com/in/shanon-khan-52852a283/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-lg font-bold hover:text-blue-700 transition">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-700"><Globe size={20} /></div> LinkedIn Profile
              </a>
            </div>
          </div>
          <div className="bg-blue-700 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <h4 className="text-2xl font-black mb-3">Quick Connect</h4>
            <p className="text-blue-100 mb-6 text-sm font-medium">Reach out directly via WhatsApp for fast project discussions.</p>
            <a href="https://wa.me/8801601177293" className="inline-block bg-white text-blue-700 px-6 py-3 rounded-xl font-black hover:bg-slate-50 transition">Chat on WhatsApp</a>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm font-medium">
          <p>© 2026 Shanon Alam | Built with Next.js</p>
        </div>
      </footer>

      <CookieBanner /> 
    </div>
  );
}