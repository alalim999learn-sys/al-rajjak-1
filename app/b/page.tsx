


//////////C:\Users\Shanon\al-rajjak-1\app\b\page.tsx





'use client';

import React, { useState } from 'react';

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
}

interface Category {
  id: string;
  title: string;
  subtitle: string;
  services: Service[];
}

const MENU_DATA: Category[] = [
  {
    id: 'haircuts',
    title: 'Haircuts',
    subtitle: 'Classic cuts, fades, and precision styling.',
    services: [
      {
        id: 'std-cut',
        name: 'Standard Cut',
        description: 'Classic scissor and clipper trim tailored to your style.',
        price: '£18',
        image: '/30/standard.jpg'
      },
      {
        id: 'skin-fade',
        name: 'Skin Fade',
        description: 'Precision zero-grade skin fade with seamless blending.',
        price: '£22',
        image: '/30/skin-fade.jpg',
        badge: 'Popular'
      },
      {
        id: 'clipper-cut',
        name: 'Clipper Cut',
        description: 'Single guard buzz cut over the whole head with clean edges.',
        price: '£14',
        image: '/30/clipper-cut.jpg'
      },
      {
        id: 'kids-cut',
        name: 'Kids Cut (Under 12)',
        description: 'Patient and friendly haircutting service for younger boys.',
        price: '£12',
        image: '/30/ids.jpg'
      },
      {
        id: 'senior-cut',
        name: 'Senior Cut (65+ / OAP)',
        description: 'Traditional, smart haircutting for our senior gents.',
        price: '£12',
        image: '/30/senior.jpg'
      }
    ]
  },
  {
    id: 'beard',
    title: 'Beard & Shaving',
    subtitle: 'Expert beard sculpting, hot towel shaves, and outlines.',
    services: [
      {
        id: 'beard-trim',
        name: 'Beard Trim & Shape Up',
        description: 'Trimmer shaping with razor edge outline for a tidy look.',
        price: '£12',
        image: '/30/trim.jpg'
      },
      {
        id: 'hot-towel',
        name: 'Hot Towel Wet Shave',
        description: 'Traditional straight razor shave with essential oils & hot towel.',
        price: '£16',
        image: '/30/hot.jpg',
        badge: 'Relaxing'
      },
      {
        id: 'beard-sculpt',
        name: 'Beard Sculpting & Lineup',
        description: 'Detailed beard sculpting, gradient fading, and razor sharp lines.',
        price: '£14',
        image: '/30/lineup.jpg'
      }
    ]
  },
  {
    id: 'combos',
    title: 'Combo Deals',
    subtitle: 'Get the complete treatment and save money.',
    services: [
      {
        id: 'hair-beard-combo',
        name: 'Haircut & Beard Combo',
        description: 'Any haircut of your choice combined with a professional beard trim & shape up.',
        price: '£28',
        image: '/30/combo.jpg',
        badge: 'Save £4'
      },
      {
        id: 'vip-package',
        name: 'The VIP Grooming Package',
        description: 'Haircut, Beard Sculpting, Hot Towel Wet Shave, Wash & Hair Styling finish.',
        price: '£38',
        image: '/30/luxury.jpg',
        badge: 'Best Value'
      }
    ]
  }
];

export default function BarberMenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>('haircuts');
  const currentCategoryData = MENU_DATA.find((cat) => cat.id === activeCategory) || MENU_DATA[0];

  return (
    <div className="min-h-screen bg-neutral-950 flex justify-center items-center p-0 sm:py-6 antialiased selection:bg-neutral-900 selection:text-white">
      
      {/* MOBILE APP CONTAINER - Strictly Fullscreen on Mobile, Framed on Desktop */}
      <div className="w-full h-dvh sm:h-[860px] sm:max-w-[420px] bg-white text-neutral-900 flex flex-col sm:rounded-[36px] sm:border-[6px] sm:border-neutral-900 shadow-2xl overflow-hidden relative">
        
        {/* NAVBAR */}
        <header className="bg-neutral-950 text-white px-4 py-3.5 flex-shrink-0 border-b border-neutral-800/80 z-30 sticky top-0 shadow-md">
          <div className="flex items-center justify-between">
            
            {/* Left: Animated Logo & Shop Name */}
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neutral-800 to-neutral-900 border border-neutral-700/80 flex items-center justify-center font-black text-xs tracking-tighter text-amber-400 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                TB
              </div>
              <div className="min-w-0">
                {/* Shimmer/Pulse Text Animation for Shop Name */}
                <h1 className="text-sm font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-amber-300 animate-pulse transition-all duration-300 leading-none truncate">
                  The Barbers
                </h1>
                <p className="text-[10px] text-neutral-400 font-medium mt-1 tracking-tight truncate">
                  Grooming Studio
                </p>
              </div>
            </div>

            {/* Right: Real UK Phone Number Button with Glowing Pulse Animation */}
            <a
              href="tel:+442079460921"
              className="relative group bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700/90 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-tight transition-all duration-300 flex items-center gap-1.5 active:scale-95 shadow-sm flex-shrink-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <svg className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-mono text-[10px] tracking-wider text-neutral-200">020 7946 0921</span>
            </a>

          </div>
        </header>

        {/* MIDDLE SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-white px-4 pt-3 pb-28 space-y-4 scrollbar-none">
          
          {/* CATEGORY TABS */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md pt-1 pb-2 z-20 -mx-4 px-4 border-b border-neutral-100">
            <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
              {MENU_DATA.map((cat) => {
                const isActive = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 flex-shrink-0 active:scale-95 ${
                      isActive
                        ? 'bg-neutral-950 text-white shadow-md shadow-neutral-900/10'
                        : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/80'
                    }`}
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CATEGORY HEADER */}
          <div className="px-0.5 pt-0.5">
            <h2 className="text-base font-extrabold text-neutral-950 tracking-tight">
              {currentCategoryData.title}
            </h2>
            <p className="text-[11px] text-neutral-500 font-normal leading-normal">
              {currentCategoryData.subtitle}
            </p>
          </div>

          {/* SERVICES LIST CARDS - Image Attached to Top, Bottom, and Left Edges (Zero Padding) */}
          <div className="space-y-3.5">
            {currentCategoryData.services.map((service) => (
              <div
                key={service.id}
                className="group bg-white border border-neutral-200/90 hover:border-neutral-300 rounded-2xl flex items-stretch h-28 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden active:scale-[0.99]"
              >
                {/* Full-Height Image (Attached to left edge, top & bottom) */}
                <div className="relative w-28 h-full bg-neutral-100 flex-shrink-0 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover rounded-l-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Service Text Content */}
                <div className="flex-1 min-w-0 p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h3 className="text-xs font-bold text-neutral-950 truncate tracking-tight">
                        {service.name}
                      </h3>
                      {service.badge && (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200/80 px-2 py-0.5 rounded-md flex-shrink-0">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  <div className="text-sm font-black text-neutral-950 tracking-tight">
                    {service.price}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>

        {/* BOTTOM FIXED FOOTER */}
        <footer className="bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 p-3.5 absolute bottom-0 left-0 right-0 z-30">
          <a
            href="https://search.google.com/local/writereview?placeid=YOUR_GOOGLE_PLACE_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white hover:bg-neutral-100 text-neutral-950 font-extrabold py-3 px-4 rounded-xl text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg"
          >
            <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            Leave a Google Review
          </a>
        </footer>

      </div>
    </div>
  );
}