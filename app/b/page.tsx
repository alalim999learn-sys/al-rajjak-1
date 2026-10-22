


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
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col antialiased selection:bg-neutral-900 selection:text-white m-0 p-0">
      
      {/* CSS Keyframes for fast animated text gradients */}
      <style jsx>{`
        @keyframes colorShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient-text {
          background: linear-gradient(270deg, #f59e0b, #ec4899, #06b6d4, #10b981, #f59e0b);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: colorShift 2s ease infinite;
        }
      `}</style>

      {/* FULL SCREEN CONTAINER WITH ZERO TOP/SIDE GAPS */}
      <div className="w-full h-dvh bg-white text-neutral-900 flex flex-col overflow-hidden relative m-0 p-0">
        
        {/* NAVBAR - FIXED TOP 0 */}
        <header className="bg-neutral-950 text-white px-4 py-3.5 flex-shrink-0 border-b border-neutral-800/80 z-30 fixed top-0 left-0 right-0 shadow-md">
          <div className="flex items-center justify-between w-full">
            
            {/* Left: Transparent Logo & Shop Name */}
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-transparent border border-amber-500/30 flex items-center justify-center text-amber-400 text-base shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                ✂️
              </div>
              <div className="min-w-0">
                {/* Fast Colorful Animated Shop Name */}
                <h1 className="text-sm font-black tracking-widest uppercase animated-gradient-text leading-none truncate drop-shadow-sm">
                 Barber King
                </h1>
                <p className="text-[10px] text-neutral-400 font-medium mt-1 tracking-tight truncate">
                  74 Baker St, W1U 6TB
                </p>
              </div>
            </div>

            {/* Right: Real UK Phone Number Button */}
            <a
              href="tel:+442079460921"
              className="relative group bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700/90 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-tight transition-all duration-300 flex items-center gap-1.5 active:scale-95 shadow-sm flex-shrink-0 cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <svg className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-mono text-[10px] tracking-wider text-neutral-200">+44 20 3302 5250</span>
            </a>

          </div>
        </header>

        {/* FULL WIDTH CATEGORY TABS (Sticky right below the fixed header) */}
        <div className="w-full bg-neutral-100 border-b border-neutral-200/90 z-20 fixed top-[65px] left-0 right-0">
          <div className="flex w-full">
            {MENU_DATA.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-1 h-12 px-1 text-center text-xs font-bold tracking-wide transition-all duration-200 relative cursor-pointer select-none flex items-center justify-center ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-inner'
                      : 'text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200/70'
                  }`}
                >
                  <span className={`transition-all duration-200 truncate ${isActive ? 'animated-gradient-text font-black' : 'text-neutral-700 font-semibold'}`}>
                    {cat.title}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400 animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* MIDDLE SCROLLABLE CONTENT (Padded top & bottom to prevent overlap with fixed navbar/footer) */}
        <main className="flex-1 overflow-y-auto bg-white px-4 pt-[130px] pb-28 space-y-4">
          
          {/* SERVICES LIST CARDS */}
          <div className="space-y-3.5">
            {currentCategoryData.services.map((service) => (
              <div
                key={service.id}
                className="group bg-white border border-neutral-200/90 hover:border-neutral-300 rounded-2xl flex items-stretch h-28 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden active:scale-[0.99]"
              >
                {/* Full-Height Image */}
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

                    <p className="text-[11px] text-neutral-800 line-clamp-2 leading-relaxed font-medium">
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

        {/* BOTTOM FIXED FOOTER - FIXED BOTTOM 0 */}
        <footer className="bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 p-3.5 fixed bottom-0 left-0 right-0 z-30 shadow-lg">
  <a
    href="https://search.google.com/local/writereview?placeid=ChIJ7UCbfbMbdkgR7HR4gf6GWKk"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full bg-neutral-900 hover:bg-neutral-800 border-2 border-white text-white font-extrabold py-3 px-4 rounded-xl text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg cursor-pointer"
  >
    <span className="text-base flex-shrink-0">📍</span>
    <span className="animated-gradient-text font-black text-xs tracking-wider">
      Leave a Google Review
    </span>
  </a>
</footer>

      </div>
    </div>
  );
}