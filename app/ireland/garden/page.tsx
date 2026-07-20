//C:\Users\Shanon\al-rajjak-1\app\ireland\garden\page.tsx



'use client';

import React from 'react';

export default function FenelonGardenPage() {
  const services = [
    { title: "Grass Cutting & Lawn Care", desc: "Lawn Care takes pleasure in being familiar with each client's property and individual requirements.", img: "/i/grasscut.avif" },
    { title: "Hedge Trimming & Cutting", desc: "Professional hedge trimming, reduction, and removal services are what we offer for various shapes and sizes.", img: "/i/hedge.avif" },
    { title: "Planting & Potting", desc: "We provide excellent planting & potting services depending on your budget, style, or situation.", img: "/i/planting.avif" },
    { title: "Overgrown Garden", desc: "It is possible to trim back and eliminate waste from weeds, brambles, tall grass, trees, and bushes.", img: "/i/overgrown.avif" },
    { title: "Redesign Of Beds", desc: "We will redesign your flower bed to improve soil fertility and drainage to look its best.", img: "/i/redesign.avif" },
    { title: "Weeding", desc: "Let Fenelon garden maintenance free your home of invasive weeds and get your flower beds back.", img: "/i/weeding.avif" },
  ];

  const features = [
    { title: "On Time, Every Time", desc: "We care about the timeline. We will be delivering our services at the desired time always!" },
    { title: "Trusted and Insured", desc: "All services we perform for you are totally licensed and insured by our business." },
    { title: "True Lawn Specialists", desc: "In addition to the best certified items, sophisticated, specialized tools and equipment are used." },
    { title: "Experienced Team", desc: "Our team of experts will meet you requirements without a doubt." },
    { title: "High Quality Services", desc: "We provide the highest quality to our customers at all times." },
    { title: "Many Successful Projects", desc: "We have completed each one of our projects successfully! Looking forward to working with you!" }
  ];

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Header */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-xl font-bold text-green-700">Fenelon Garden Maintenance</h1>
        <div className="space-x-4 font-semibold hidden md:block">
          <a href="#home">Home</a> <a href="#services">Services</a> <a href="#why">Why Us</a> <a href="#contact">Contact</a>
        </div>
        <a href="tel:0833624865" className="bg-green-600 text-white px-4 py-2 rounded">083 362 4865</a>
      </nav>

      {/* Hero Section - Fixed Zoom Issue */}
{/* Hero Section - Fixed with aspect-video */}
<section 
  id="home" 
  className="relative w-full min-h-[60vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-white text-center py-40"
  style={{ backgroundImage: "url('/i/88.png')" }}
>
  {/* ডার্ক ওভারলে */}
  <div className="absolute inset-0 bg-black/50 z-10"></div>

  {/* কন্টেন্ট */}
  <div className="relative z-20 px-4">
    <h2 className="text-4xl md:text-5xl font-bold mb-6">The Best Care For Your Beautiful Garden</h2>
    <button className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition">
      Request a Callback
    </button>
  </div>
</section>
      {/* Services */}
      <section id="services" className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition">
              <img src={s.img} alt={s.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-green-800">{s.title}</h3>
                <p className="text-gray-600 mb-4">{s.desc}</p>
                <a href="#contact" className="text-green-600 font-bold border-b-2 border-green-600 hover:text-green-700">Get a Quote</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why" className="py-20 bg-gray-100 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold mb-3 text-green-800">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="py-16 bg-green-900 text-white text-center px-6">
        <h3 className="text-3xl font-bold mb-3">Subscribe for Updates</h3>
        <p className="mb-8 text-green-100 max-w-lg mx-auto">Sign up today for hints, tips and the latest product news - plus exclusive special offers.</p>
        <div className="max-w-md mx-auto relative">
          <input 
            type="email" 
            placeholder="Enter your email address..." 
            className="w-full p-4 rounded-full bg-green-800 text-white placeholder-gray-300 outline-none border-2 border-green-700 focus:border-green-400 pl-6 pr-32" 
          />
          <button className="absolute right-1 top-1 bottom-1 bg-green-600 px-6 rounded-full font-bold hover:bg-green-700 transition">
            Join
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white p-10 text-center">
        <h4 className="text-2xl font-bold mb-6">Contact</h4>
        <div className="space-y-2 text-gray-300">
          <p>📞 083 362 4865</p>
          <p>📧 info@fenelongardenmaintenance.ie</p>
          <p>📍 The Yard, Marino Avenue East</p>
        </div>
        <p className="mt-8 font-bold text-green-500">Fenelon Garden Maintenance</p>
      </footer>
    </div>
  );
}