//C:\Users\Shanon\al-rajjak-1\app\ireland\cafe\page.tsx



'use client';

import React from 'react';
import Image from 'next/image';

const menuItems = [
  { src: '/i/cafe/Decadent chocolate fudge cake slice.jpg', alt: 'Chocolate Fudge Cake' },
  { src: '/i/cafe/fresh fruit cream cake.jpg', alt: 'Fruit Cream Cake' },
  { src: '/i/cafe/Birthday-Cake Club-Berry -RoseChantillybyTessaHuff.jpg', alt: 'Birthday Cake' },
  { src: '/i/cafe/GoldenflakyandimpossiblyfragrantcroissantsthewaytheyshouldbeIspentabutteryafternoonat.jpg', alt: 'Croissant' },
  { src: '/i/cafe/FruitandCreamCheeseDanishPastry.jpg', alt: 'Danish Pastry' },
  { src: '/i/cafe/CinnamonRollswithCreamCheeseIcing.jpg', alt: 'Cinnamon Roll' },
  { src: '/i/cafe/latte--art.jpg', alt: 'Latte Art' },
  { src: '/i/cafe/VanillaIcedLatte.webp', alt: 'Vanilla Iced Latte' },
  { src: '/i/cafe/PourOverCoffeeBrewingMakePourOverCoffee.jpg', alt: 'Pour Over Coffee' },
];

const reviews = [
  { name: "Sarah J.", text: "Best coffee in Dublin! The atmosphere is so cozy and welcoming.", rating: "⭐⭐⭐⭐⭐" },
  { name: "Liam O.", text: "I love their croissants, they taste just like the ones in Paris. Highly recommend!", rating: "⭐⭐⭐⭐⭐" },
  { name: "Emma W.", text: "A hidden gem! Perfect place to work and enjoy a delicious slice of cake.", rating: "⭐⭐⭐⭐" },
];

export default function CafeLanding() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav style={{ backgroundColor: '#1e050048' }} className="fixed w-full z-50 p-3 flex justify-between items-center shadow-md backdrop-blur-sm">
        <div className="flex items-center">
          <span style={{ color: '#24c700', borderColor: '#24c700' }} className="text-xl md:text-3xl font-extrabold italic tracking-tighter border-2 px-2 py-0.5 rounded-sm">
            EIC
          </span>
          <span className="ml-2 text-lg md:text-2xl font-serif font-bold text-white tracking-wide">
            Emerald Irish Cafe
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <span style={{ color: '#24c700' }} className="hidden md:inline text-sm font-bold">
            Contact: +353 1 234 5678
          </span>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm font-bold transition">
            Order Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[66vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center pt-16" style={{ backgroundImage: "url('/i/cafe/cafe.png')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white p-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Welcome to Emerald Irish Cafe</h1>
          <p className="text-lg md:text-xl mb-6">Authentic flavors in the heart of Ireland</p>
          
          <div className="flex flex-col gap-3 mb-8 text-sm md:text-base font-semibold">
            <p className="flex justify-center items-center gap-2">
              <span>📞</span> +353 1 234 5678
            </p>
            <div className="flex flex-col items-center gap-3">
              <p className="flex justify-center items-center gap-2">
                <span>📍</span> Main Street, Dublin, Ireland
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-row gap-2 justify-center">
            <button className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition text-xs sm:text-sm md:text-base whitespace-nowrap">
              View Menu
            </button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold hover:bg-orange-600 transition text-xs sm:text-sm md:text-base whitespace-nowrap">
              Order Online
            </button>
            <button className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition text-xs sm:text-sm md:text-base whitespace-nowrap">
              View on Maps
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-full">
                <img src={item.src} alt={item.alt} className="w-full h-64 object-cover" loading="lazy" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-700">{item.alt}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Positive Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="text-orange-500 mb-2">{review.rating}</div>
                <p className="text-gray-600 italic mb-4">"{review.text}"</p>
                <p className="font-bold text-gray-900">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Combined Subscription & Location Section */}
      <section className="bg-gray-800 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-white items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Get 20% Off Your First Order!</h2>
            <p className="mb-6 text-gray-300">Join our newsletter to get exclusive deals.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Enter your email" className="w-full p-3 rounded outline-none text-white bg-gray-700 placeholder-gray-300 border border-gray-600" />
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-bold transition">Subscribe</button>
            </form>
          </div>
          
          <div className="text-center md:text-left md:pl-12 border-t md:border-t-0 md:border-l border-gray-700 pt-8 md:pt-0">
            <h2 className="text-3xl font-bold mb-4">Visit Us</h2>
            <p className="mb-6 text-gray-300 text-lg">Main Street, Dublin, Ireland</p>
            <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition">View on Google Maps</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-10">
        <div className="flex justify-center mb-6">
          <div className="flex space-x-4">
            <a href="#" className="hover:opacity-80 transition"><Image src="/i/insta.jpg" alt="Instagram" width={40} height={40} className="rounded-full" /></a>
            <a href="#" className="hover:opacity-80 transition"><Image src="/i/fb.jpg" alt="Facebook" width={40} height={40} className="rounded-full" /></a>
            <a href="#" className="hover:opacity-80 transition"><Image src="/i/x.png" alt="Twitter/X" width={40} height={40} className="rounded-full" /></a>
          </div>
        </div>
        <p>&copy; 2026 Emerald Irish Cafe. All rights reserved.</p>
      </footer>
    </div>
  );
}