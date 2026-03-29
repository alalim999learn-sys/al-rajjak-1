import React from 'react';
import Image from 'next/image'; // ১. Image কম্পোনেন্ট ইমপোর্ট করো
import { Shield, Cpu, ArrowRight, Award, GraduationCap, Code2, Smartphone } from 'lucide-react';
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function AboutMe() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <Navbar />

      <main className="max-w-7xl mx-auto pt-36 pb-24 px-6 relative z-10">
        
        {/* Hero Section */}
        <section className="grid lg:grid-cols-12 gap-16 items-center mb-32">
          
          {/* Image & Badges (Right side on desktop) */}
          <div className="lg:col-span-5 order-first lg:order-last relative group">
            <div className="relative aspect-[4/5] bg-slate-100 rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.01] group-hover:shadow-blue-100 border-4 border-white">
              {/* ২. তোমার ছবি এখানে বসবে */}
              <Image 
                src="/profile.jpg" // public/profile.jpg পথটি নিশ্চিত করো
                alt="Shanon Khan - AI & Security Expert"
                fill
                className="object-cover object-center"
                priority // পেজ লোড হওয়ার সাথে সাথে এটি লোড হবে
              />
              {/* Overlay Gradient for Text Readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              
              {/* Quote on Image */}
              <div className="absolute bottom-8 left-8 right-8 z-10">
                 <h2 className="text-2xl font-black italic text-white leading-tight">"Mastering Security to Build Smarter AI."</h2>
              </div>
            </div>

            {/* Education Badge (Floating) */}
            <div className="absolute -bottom-8 -left-8 bg-white shadow-3xl p-6 rounded-3xl border border-slate-50 flex items-center gap-4 z-20 transition-transform group-hover:-translate-x-2 group-hover:translate-y-2">
              <div className="bg-blue-100 p-3.5 rounded-2xl text-blue-700">
                <GraduationCap size={26} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Alumni</p>
                <p className="text-base font-bold text-slate-800">Dhaka College</p>
                <p className="text-xs font-medium text-slate-500">Class of 202X</p>
              </div>
            </div>
            
            {/* Experience Badge (Floating) */}
            <div className="absolute -top-6 -right-6 bg-slate-900 text-white shadow-3xl p-5 rounded-3xl border border-slate-700 flex flex-col items-center justify-center z-20 rotate-12 transition-transform group-hover:rotate-0">
               <Shield size={32} className="mb-2 text-blue-400" />
               <p className="text-2xl font-black">100%</p>
               <p className="text-[10px] font-bold uppercase tracking-tighter opacity-80">GDPR Compliant</p>
            </div>
          </div>

          {/* Text Content (Left side on desktop) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100">
              <Shield size={16} /> Security-First AI Developer
            </div>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.95] text-slate-950">
              I Build <span className="text-blue-700">Secure</span>, High-Performance AI.
            </h1>
            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">
              আমি শানন খান। একজন Cybersecurity এবং Web Development স্পেশালিস্ট। ঢাকা কলেজ এবং মোহাম্মদপুর মডেলের শিক্ষা থেকে শুরু করে বর্তমানে আমি ছোট এবং মাঝারি সাইটগুলোর সিকিউরিটি মাস্টার এবং কাস্টম এআই ট্রেনিং স্পেশালিস্ট।
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              {[
                { icon: <Code2 size={18} />, name: 'Next.js Expert' },
                { icon: <Smartphone size={18} />, name: 'Flutter Dev' },
                { icon: <Shield size={18} />, name: 'Site Hardening' },
                { icon: <Cpu size={18} />, name: 'Custom AI Models' },
              ].map(skill => (
                <div key={skill.name} className="flex items-center gap-2.5 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 font-bold text-slate-800 text-sm shadow-inner">
                  <div className="text-blue-700">{skill.icon}</div> {skill.name}
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-6">
              <a href="/#contact" className="bg-blue-700 text-white px-9 py-5 rounded-2xl font-black shadow-2xl shadow-blue-100 hover:bg-slate-950 transition-all flex items-center gap-2.5 group active:scale-95">
                Start a Secure Project <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </div>
          
        </section>

        {/* Expertise Grid */}
        <section className="mb-24 relative">
          <div className="absolute inset-0 bg-slate-50 rounded-[50px] -z-10 border border-slate-100 shadow-inner"></div>
          <div className="p-16">
            <div className="text-center mb-20 max-w-2xl mx-auto">
              <h2 className="text-5xl font-black tracking-tighter mb-5">Core Expertise</h2>
              <p className="text-xl text-slate-600 font-medium leading-relaxed">নিরাপদ এআই এবং হাই-পারফরম্যান্স অ্যাপ্লিকেশনের সমন্বয়—আপনার ব্যবসার ডিজিটাল সুরক্ষার ভিত্তি।</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                { title: "Site Security Master", desc: "ছোট এবং মাঝারি সাইটগুলোকে হ্যাকারদের হাত থেকে রক্ষা করা এবং সার্ভার-লেভেল হার্ডেনিং নিশ্চিত করাই আমার বিশেষত্ব।", icon: <Shield size={28} /> },
                { title: "Custom AI Training", desc: "আপনার বিজনেস ডাটা দিয়ে কাস্টম এআই মডেল (Llama/OpenAI) ট্রেন করা, যেন বোট শুধু আপনার ব্যবসার কথাই বলে।", icon: <Cpu size={28} /> },
                { title: "Next.js & Flutter", desc: "হাই-স্পিড ওয়েব এবং ক্রস-প্ল্যাটফর্ম মোবাইল অ্যাপ তৈরিতে আমি Next.js এবং Flutter-এর লেটেস্ট টেকনোলজি ব্যবহার করি।", icon: <Smartphone size={28} /> }
              ].map((skill, index) => (
                <div key={index} className="p-12 bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-50 hover:shadow-2xl hover:shadow-blue-50 transition-all duration-300 hover:-translate-y-2 group">
                  <div className="bg-blue-700 text-white p-4 w-fit rounded-2xl mb-8 shadow-lg shadow-blue-100 transition-transform group-hover:rotate-6">
                    {skill.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight text-slate-950">{skill.title}</h3>
                  <p className="text-slate-600 font-medium text-base leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}