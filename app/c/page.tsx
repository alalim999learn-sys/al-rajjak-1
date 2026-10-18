


/////////C:\Users\Shanon\al-rajjak-1\app\c\page.tsx





'use client';

import React, { useState } from 'react';

interface MenuItem {
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
  items: MenuItem[];
}

const CAFE_MENU_DATA: Category[] = [
  {
    id: 'hot-drinks',
    title: 'Hot Drinks',
    subtitle: 'Artisan specialty coffee and warming brews.',
    items: [
      {
        id: 'flat-white',
        name: 'Flat White',
        description: 'Rich espresso with micro-foamed velvety milk.',
        price: '£3.50',
        image: '/30/white.jpg',
        badge: 'Popular'
      },
      {
        id: 'latte',
        name: 'Latte / Cappuccino',
        description: 'Classic espresso balanced with steamed milk and foam.',
        price: '£3.80',
        image: '/30/latte.jpg'
      },
      {
        id: 'americano',
        name: 'Americano',
        description: 'Espresso shots topped with hot water for a clean, bold taste.',
        price: '£3.00',
        image: '/30/ameriano.jpg'
      },
      {
        id: 'espresso',
        name: 'Espresso',
        description: 'Short, strong, and intensely aromatic single or double shot.',
        price: '£2.50',
        image: '/30/epress.jpg'
      },
      {
        id: 'hot-choco',
        name: 'Hot Chocolate',
        description: 'Decadent Belgian chocolate topped with marshmallows.',
        price: '£4.00',
        image: '/30/mars.jpg',
        badge: 'Comfort'
      }
    ]
  },
  {
    id: 'bakery',
    title: 'Bakery & Pastries',
    subtitle: 'Freshly baked goods and sweet treats daily.',
    items: [
      {
        id: 'butter-croissant',
        name: 'Butter Croissant',
        description: 'Flaky, golden, and freshly baked French style pastry.',
        price: '£2.80',
        image: '/30/cr.jpg',
        badge: 'Fresh'
      },
      {
        id: 'almond-croissant',
        name: 'Almond Croissant',
        description: 'Filled with rich almond frangipane and topped with flakes.',
        price: '£3.50',
        image: '/30/almond.jpg'
      },
      {
        id: 'muffin',
        name: 'Blueberry Muffin',
        description: 'Soft sponge packed with juicy blueberries and a crumb topping.',
        price: '£3.00',
        image: '/30/muffin.jpg'
      },
      {
        id: 'brownie',
        name: 'Chocolate Brownie',
        description: 'Fudgy, rich dark chocolate square with a crispy crust.',
        price: '£3.20',
        image: '/30/brownie.jpg'
      }
    ]
  },
  {
    id: 'breakfast-lunch',
    title: 'Breakfast & Lunch',
    subtitle: 'Hearty toasties, paninis, and light bites.',
    items: [
      {
        id: 'avocado-toast',
        name: 'Avocado & Poached Egg Toast',
        description: 'Smashed avocado, chilli flakes, and free-range egg on sourdough.',
        price: '£7.50',
        image: '/30/3-1.jpg',
        badge: 'Chef Choice'
      },
      {
        id: 'smoked-salmon-bagel',
        name: 'Smoked Salmon & Cream Cheese Bagel',
        description: 'Fresh bagel layered with creamy cheese, smoked salmon, and dill.',
        price: '£7.20',
        image: '/30/3-2.jpg',
        badge: 'Popular'
      },
      {
        id: 'chicken-panini',
        name: 'Chicken & Pesto Panini',
        description: 'Grilled chicken breast, basil pesto, and mozzarella.',
        price: '£6.80',
        image: '/30/3-3.jpg'
      }
    ]
  },
  {
    id: 'cold-drinks',
    title: 'Cold Drinks',
    subtitle: 'Refreshing iced coffees and fresh juices.',
    items: [
      {
        id: 'iced-latte',
        name: 'Iced Latte',
        description: 'Double shot espresso poured over cold milk and ice cubes.',
        price: '£4.20',
        image: '/30/401.jpg',
        badge: 'Refreshing'
      },
      {
        id: 'iced-matcha',
        name: 'Iced Matcha Green Tea',
        description: 'Premium ceremonial grade Japanese matcha over ice and milk.',
        price: '£4.50',
        image: '/30/403.jpg'
      },
      {
        id: 'orange-juice',
        name: 'Fresh Orange Juice',
        description: '100% freshly squeezed sweet oranges, chilled to perfection.',
        price: '£3.50',
        image: '/30/404.jpg'
      }
    ]
  }
];

export default function CafeMenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>('hot-drinks');
  const currentCategoryData = CAFE_MENU_DATA.find((cat) => cat.id === activeCategory) || CAFE_MENU_DATA[0];

  return (
    <div className="min-h-screen bg-amber-950/20 flex justify-center items-center p-0 sm:py-6 antialiased selection:bg-amber-400 selection:text-amber-950">
      
      {/* MOBILE APP CONTAINER */}
      <div className="w-full h-dvh sm:h-[860px] sm:max-w-[420px] bg-amber-50/30 text-amber-950 flex flex-col sm:rounded-[36px] sm:border-[6px] sm:border-amber-900/30 shadow-2xl overflow-hidden relative">
        
        {/* NAVBAR - Warm Coffee & Cream Theme */}
        <header className="bg-amber-900 text-amber-50 px-4 py-3.5 flex-shrink-0 z-30 sticky top-0 shadow-sm border-b border-amber-800">
          <div className="flex items-center justify-between">
            
            {/* Left: Animated Logo & Cafe Name */}
            <div className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-950 border border-amber-300 flex items-center justify-center font-black text-xs tracking-tighter shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                B&B
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 animate-pulse transition-all duration-300 leading-none truncate">
                  Bean & Brew
                </h1>
                <p className="text-[10px] text-amber-200/80 font-medium mt-1 tracking-tight truncate">
                  Artisan Coffee & Bakery
                </p>
              </div>
            </div>

            {/* Right: Real UK Phone Number Button */}
            <a
              href="tel:+442079460922"
              className="relative group bg-amber-800 hover:bg-amber-700 text-amber-100 border border-amber-700/80 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-tight transition-all duration-300 flex items-center gap-1.5 active:scale-95 shadow-sm flex-shrink-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <svg className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-mono text-[10px] tracking-wider text-amber-100">020 7946 0922</span>
            </a>

          </div>
        </header>

        {/* STICKY 2x2 CATEGORY GRID (Zero Gap & Warm Food-Friendly 3-Term Colors) */}
        <div className="sticky top-[57px] z-20 bg-amber-100/60 border-b border-amber-200">
          <div className="grid grid-cols-2 gap-0">
            {CAFE_MENU_DATA.map((cat, idx) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full py-3 px-2 text-xs font-bold tracking-wide transition-all duration-200 text-center truncate rounded-none ${
                    idx % 2 === 0 ? 'border-r border-amber-200/60' : ''
                  } ${idx < 2 ? 'border-b border-amber-200/60' : ''} ${
                    isActive
                      ? 'bg-amber-600 text-white font-black shadow-inner'
                      : 'bg-amber-50/80 text-amber-900 hover:bg-amber-100 hover:text-amber-950'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* MIDDLE SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-white px-3 pt-3 pb-28 space-y-3 scrollbar-none">
          
          {/* CATEGORY HEADER */}
          <div className="px-0.5 pt-0.5">
            <h2 className="text-base font-extrabold text-amber-950 tracking-tight">
              {currentCategoryData.title}
            </h2>
            <p className="text-[11px] text-amber-800/70 font-normal leading-normal">
              {currentCategoryData.subtitle}
            </p>
          </div>

          {/* MENU ITEMS CARDS */}
          <div className="space-y-3">
            {currentCategoryData.items.map((item) => (
              <div
                key={item.id}
                className="group bg-white border border-amber-200/60 hover:border-amber-300 rounded-2xl flex items-stretch h-28 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden active:scale-[0.99]"
              >
                {/* Full-Height Image Attached to Top, Bottom & Left Edge */}
                <div className="relative w-28 h-full bg-amber-50 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-l-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0 p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h3 className="text-xs font-bold text-amber-950 truncate tracking-tight">
                        {item.name}
                      </h3>
                      {item.badge && (
                        <span className="text-[9px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md flex-shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-amber-900/70 line-clamp-2 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="text-sm font-black text-amber-950 tracking-tight">
                    {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>

        {/* BOTTOM FIXED FOOTER */}
        <footer className="bg-amber-900 text-amber-50 p-3.5 absolute bottom-0 left-0 right-0 z-30 border-t border-amber-800">
          <a
            href="https://search.google.com/local/writereview?placeid=YOUR_GOOGLE_PLACE_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-extrabold py-3 px-4 rounded-xl text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md"
          >
            <svg className="w-4 h-4 text-amber-950 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            Leave a Google Review
          </a>
        </footer>

      </div>
    </div>
  );
}