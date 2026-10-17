//C:\Users\Shanon\al-rajjak-1\app\laundry\page.tsx



'use client';

import Image from 'next/image';

export default function LaundryLanding() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. Navigation */}
   <nav className="flex justify-between items-center p-4 md:p-6 bg-white shadow-sm sticky top-0 z-50">
        <h1 className="text-lg md:text-2xl font-bold text-blue-600 tracking-tight">Long Lane Launderette</h1>
        <a href="#contact" className="bg-blue-600 text-white px-4 py-2 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-semibold hover:bg-blue-700 shadow-md transition-all flex items-center gap-1.5">
          📞 +353 1 234 5678
        </a>
      </nav>

      {/* 2. Hero Section */}
      <section 
        className="relative h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center text-white text-center overflow-hidden pb-16 md:pb-24 px-4" 
        style={{ backgroundImage: "url('/i/l.png')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-extrabold mb-4 md:mb-6 leading-tight drop-shadow-lg">
            Professional Laundry Services in Ireland
          </h2>
          <p className="text-sm sm:text-base md:text-xl mb-8 md:mb-10 text-white/90 drop-shadow-md">
            Quick, Reliable, and High-Quality Care for All Your Garments.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href="#contact" className="w-full sm:w-auto bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-lg hover:bg-blue-700 transition-all text-center">Book Now</a>
            <a href="https://wa.me/442074039259" className="w-full sm:w-auto bg-green-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-lg hover:bg-green-600 transition-all text-center">WhatsApp Us</a>
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h3 className="text-4xl font-extrabold mb-16 text-center text-slate-900">OUR SERVICES</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "SELF SERVICE", desc: "Fast, convenient, and easy. We provide high-quality assistance, soap, and a change machine for your convenience. Clean, sanitized machines ready for you at any time.", icon: "🧺" },
            { title: "SERVICE WASH", desc: "Drop off your items and let our friendly staff handle the rest. We wash, dry, and fold with professional care. We ensure your clothes get the perfect treatment based on your instructions.", icon: "👔" },
            { title: "DRY CLEANING", desc: "For those delicate items, we offer professional dry cleaning services to keep your suits, dresses, and coats looking brand new.", icon: "🧥" },
            { title: "IRONING ONLY", desc: "Pressed for time? Let us handle your ironing needs. Crisp, sharp, and perfectly finished clothes every time.", icon: "👕" }
          ].map((s, i) => (
            <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl hover:border-blue-500 transition-all duration-300">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h4 className="text-2xl font-bold mb-3 text-blue-900">{s.title}</h4>
              <p className="text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Price List Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-extrabold mb-16">OUR AFFORDABLE PRICES</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl text-slate-900 shadow-2xl">
              <h5 className="text-2xl font-bold mb-6 text-blue-600 border-b pb-4">Self-Service</h5>
              <div className="space-y-4 font-semibold text-lg">
                <p className="flex justify-between">Small Wash (8kg) <span>£6.00</span></p>
                <p className="flex justify-between">Large Wash (12kg) <span>£8.00</span></p>
                <p className="flex justify-between">Tumble Dryers <span>50p / 5m</span></p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl text-slate-900 shadow-2xl">
              <h5 className="text-2xl font-bold mb-6 text-blue-600 border-b pb-4">Service Wash</h5>
              <div className="space-y-4 font-semibold text-lg">
                <p className="flex justify-between">Small Wash <span>£13.00</span></p>
                <p className="flex justify-between">Large Wash <span>£16.00</span></p>
                <p className="text-sm text-slate-500 mt-4 italic">*Prices exclude specific fabric treatments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-20 px-4 bg-slate-100">
        <h3 className="text-4xl font-extrabold mb-16 text-center text-slate-900">WHAT OUR CUSTOMERS SAY</h3>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah J.", text: "Impeccable service! My clothes are always perfectly folded and smell so fresh." },
            { name: "Liam O.", text: "Fast, clean, and very friendly staff. Highly recommend for any service wash!" },
            { name: "Emma W.", text: "Best launderette in town. The self-service machines are very easy to use." }
          ].map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-yellow-400">
              <div className="text-yellow-400 mb-4 text-xl">★★★★★</div>
              <p className="italic mb-6 text-slate-700 leading-relaxed">"{t.text}"</p>
              <p className="font-bold text-blue-700 text-lg">- {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Contact Now Form Section */}
      <section id="contact" className="py-20 px-4 max-w-3xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
          <h3 className="text-3xl font-extrabold mb-4 text-center text-slate-900">Book / Contact Us</h3>
          <p className="text-slate-600 text-center mb-8">Fill out the form below and we will get back to you shortly.</p>
          
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
              <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
              <input type="tel" placeholder="02074039259" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Service Type</label>
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white">
                <option>Self Service</option>
                <option>Service Wash</option>
                <option>Dry Cleaning</option>
                <option>Ironing Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Message / Instructions</label>
              <textarea rows={4} placeholder="Write your requirements here..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="py-10 text-center bg-slate-900 text-slate-400 text-sm">
        <p>© 2026 Long Lane Launderette. All rights reserved.</p>
      </footer>
    </div>
  );
}