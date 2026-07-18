//C:\Users\Shanon\al-rajjak-1\app\ireland\barber\page.tsx



'use client';

import React from 'react';
import Image from 'next/image';

export default function BarberPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Navbar - Responsive */}
      <nav className="flex flex-wrap justify-between items-center p-6 border-b gap-4">
        <h1 className="text-2xl font-bold tracking-tighter">BARBER SMITHS</h1>
        <div className="space-x-4 md:space-x-6">
          <span className="cursor-pointer hover:text-gray-500">Barbers</span>
          <span className="cursor-pointer hover:text-gray-500">Contact</span>
          <button className="bg-black text-white px-4 py-2 rounded transition hover:bg-gray-800">Book Now</button>
        </div>
      </nav>

      {/* Hero Section - Responsive */}
      <section 
        className="relative w-full h-[500px] md:h-[600px] flex flex-col justify-center items-center text-center text-white px-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/i/barber-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-4">
          <h2 className="text-4xl md:text-7xl font-bold leading-tight">THIS WAS THE BARBERS I WAS</h2>
          <p className="text-xl md:text-2xl mt-2 font-light italic">telling you about</p>
          <p className="mt-6 md:mt-8 max-w-xl mx-auto text-base md:text-xl">
            We believe in affordable quality, where every haircut is a step toward bringing out the best version of yourself.
          </p>
          <div className="mt-8 md:mt-10 flex flex-wrap justify-center gap-4">
            <button className="bg-white text-black px-8 py-3 md:px-10 md:py-4 rounded font-bold hover:bg-gray-200 transition">Book Now</button>
            <button className="border border-white text-white px-8 py-3 md:px-10 md:py-4 rounded hover:bg-white/20 transition">View Locations</button>
          </div>
          <p className="mt-8 text-xs md:text-sm font-semibold tracking-widest uppercase">★★★★★ Rated • 100+ Reviews • Dublin, Ireland</p>
        </div>
      </section>

      {/* Hairstyles Images Section - Responsive Grid */}
      <section className="py-12 md:py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {['/i/b1.jpg', '/i/b2.jpg', '/i/b3.jpg'].map((src, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl shadow-xl">
              <Image 
                src={src} 
                alt={`Hairstyle ${idx + 1}`} 
                width={500} 
                height={500} 
                className="w-full h-[350px] md:h-[450px] object-cover hover:scale-105 transition duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Our Locations Section - Ireland/Dublin Updated */}
      <section className="py-12 md:py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Our Locations</h3>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Dublin, Ireland</h2>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl grid md:grid-cols-2 gap-8 md:gap-12 items-center border border-gray-100">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">Temple Bar</h3>
              <p className="text-gray-500 mb-6 italic">Premium grooming experience in the heart of Dublin.</p>
              
              <div className="space-y-4 text-gray-700 text-base md:text-lg">
                <p className="flex items-center gap-3"><span>📍</span> 12 Crown Alley, Temple Bar, Dublin 2, Ireland</p>
                <p className="flex items-center gap-3"><span>📞</span> +353 1 670 0000</p>
                <p className="flex items-center gap-3"><span>🪑</span> 6 Professional Styling Chairs</p>
              </div>
              
              <div className="mt-8 bg-gray-50 p-4 md:p-6 rounded-xl border">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><span>🕒</span> Opening Hours</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                  <p>Mon - Fri: <span className="font-bold text-gray-800">10am - 7pm</span></p>
                  <p>Saturday: <span className="font-bold text-gray-800">9am - 6pm</span></p>
                  <p>Sunday: <span className="font-bold text-red-500">Closed</span></p>
                </div>
              </div>
            </div>

            <div className="aspect-[4/3] w-full relative overflow-hidden rounded-2xl shadow-2xl">
              <Image src="/i/location.jpg" alt="Barber Shop Dublin" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Responsive */}
      <footer className="bg-black text-white py-12 md:py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold mb-4">BARBER SMITHS</h2>
            <p className="text-gray-400">Premium grooming services in Ireland.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Our Services</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:opacity-80 transition"><Image src="/i/insta.jpg" alt="Instagram" width={40} height={40} className="rounded-full" /></a>
              <a href="#" className="hover:opacity-80 transition"><Image src="/i/fb.jpg" alt="Facebook" width={40} height={40} className="rounded-full" /></a>
              <a href="#" className="hover:opacity-80 transition"><Image src="/i/x.png" alt="Twitter/X" width={40} height={40} className="rounded-full" /></a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs md:text-sm">
          © 2026 Barber Smiths Ireland. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
8500