


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
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-0 sm:py-6 selection:bg-white selection:text-black">
      
      {/* MOBILE APP CONTAINER (Strictly formatted for mobile width, full fit) */}
      <div className="w-full max-w-sm sm:max-w-md h-screen sm:h-[880px] bg-white text-neutral-900 flex flex-col sm:rounded-3xl sm:border sm:border-neutral-800 shadow-2xl overflow-hidden relative">
        
        {/* TOP HEADER (Fixed inside mobile view, Black Background) */}
        <header className="bg-black text-white px-5 py-4 flex-shrink-0 border-b border-neutral-800 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold tracking-tight uppercase">The Barbers</h1>
              <p className="text-[11px] text-neutral-400">Professional Grooming Studio</p>
            </div>
            <a
              href="tel:+447000000000"
              className="bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call
            </a>
          </div>
        </header>

        {/* MIDDLE SCROLLABLE CONTENT (White Background) */}
        <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
          
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {MENU_DATA.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex-shrink-0 ${
                    isActive
                      ? 'bg-black text-white shadow'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>

          {/* Category Title & Subtitle */}
          <div>
            <h2 className="text-base font-bold text-neutral-900 tracking-tight">{currentCategoryData.title}</h2>
            <p className="text-[11px] text-neutral-500">{currentCategoryData.subtitle}</p>
          </div>

          {/* Services List Cards */}
          <div className="space-y-3 pb-20">
            {currentCategoryData.services.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-neutral-200/80 rounded-2xl p-3 flex items-center gap-3.5 shadow-xs hover:border-neutral-300 transition-all"
              >
                {/* Service Image */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Service Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h3 className="text-xs font-bold text-neutral-900 truncate">{service.name}</h3>
                    {service.badge && (
                      <span className="text-[9px] font-semibold bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded-full border border-neutral-200 flex-shrink-0">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500 line-clamp-2 mb-1.5 leading-tight">
                    {service.description}
                  </p>
                  <div className="text-xs font-extrabold text-neutral-900">
                    {service.price}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>

        {/* BOTTOM FIXED FOOTER (Black Background with Google Review Button) */}
        <footer className="bg-black text-white py-3.5 px-4 flex-shrink-0 border-t border-neutral-800 absolute bottom-0 left-0 right-0 z-10">
          <a
            href="https://search.google.com/local/writereview?placeid=YOUR_GOOGLE_PLACE_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white text-black hover:bg-neutral-200 font-bold py-2.5 px-4 rounded-xl text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <svg className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            Leave a Google Review
          </a>
        </footer>

      </div>
    </div>
  );
}