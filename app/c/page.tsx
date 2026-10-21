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
    subtitle: '',
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
    subtitle: '',
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
    subtitle: '',
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
    subtitle: '',
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

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
  };

  return (
    <div className="w-full h-dvh bg-stone-50 text-stone-900 grid grid-rows-[auto_1fr_auto] antialiased selection:bg-amber-400 selection:text-stone-950 overflow-hidden relative">

      {/* CSS Styles for smooth animated text gradients */}
      <style jsx>{`
        @keyframes colorShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-shop-name {
          background: linear-gradient(270deg, #00f2fe, #4facfe, #00ff87, #ff007f, #00f2fe);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: colorShift 5s ease infinite;
        }
        .animated-review-text {
          background: linear-gradient(270deg, #ffd700, #ff4500, #00ffff, #ff1493, #ffd700);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: colorShift 5s ease infinite;
        }
      `}</style>

      {/* ROW 1: LOCKED TOP SECTION (Header + Category Grid - Never Overlapped) */}
      <div className="w-full bg-stone-50 shadow-md z-30 flex-shrink-0">

        {/* NAVBAR */}
        <header className="bg-[#3e2723] text-stone-100 px-4 py-3.5 border-b border-[#4e342e] w-full">
  <div className="flex items-center justify-between w-full">

    {/* Left: Transparent Logo & Cafe Name */}
    <div className="flex items-center gap-2.5 group">
      <div className="w-9 h-9 rounded-xl bg-transparent border border-amber-500/30 flex items-center justify-center text-amber-400 text-base shadow-sm flex-shrink-0">
        ☕
      </div>
      <div className="min-w-0">
        <h1 className="text-sm font-black tracking-widest uppercase animated-shop-name leading-none truncate">
          Bean & Brew
        </h1>
        <p className="text-[10px] text-amber-200/70 font-medium mt-1 tracking-tight truncate">
          Artisan Coffee & Bakery
        </p>
      </div>
    </div>

    {/* Right: Real UK Phone Number Button */}
    <a
      href="tel:+442079460922"
      className="relative group bg-[#2d1b18] hover:bg-[#231513] text-amber-100 border border-amber-900/40 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-tight transition-all duration-300 flex items-center gap-1.5 active:scale-95 shadow-xs flex-shrink-0 cursor-pointer"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
      </span>
      <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span className="font-mono text-[10px] tracking-wider text-amber-100">020 7946 0922</span>
    </a>

  </div>
</header>

        {/* CATEGORY GRID WITH WORKING MOBILE TAP EVENTS */}
        <div className="bg-stone-200 border-b border-stone-300 w-full">
          <div className="grid grid-cols-2 gap-0 w-full">
            {CAFE_MENU_DATA.map((cat, idx) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                  className={`w-full py-3 px-2 text-xs font-bold tracking-wide transition-all duration-150 text-center truncate rounded-none cursor-pointer select-none ${
                    idx % 2 === 0 ? 'border-r border-stone-300' : ''
                  } ${idx < 2 ? 'border-b border-stone-300' : ''} ${
                    isActive
                      ? 'bg-[#3e2723] text-amber-100 font-black shadow-inner'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ROW 2: INDEPENDENT SCROLLABLE CONTENT (Never crashes with category buttons) */}
      <main className="w-full overflow-y-auto bg-stone-50 px-3 py-3 space-y-3 z-10">

        {/* MENU ITEMS CARDS */}
        <div className="space-y-3">
          {currentCategoryData.items.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-stone-200 hover:border-amber-400 rounded-2xl flex items-stretch h-32 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden active:scale-[0.99]"
            >
              {/* Full-Height Image */}
              <div className="relative w-28 h-full bg-stone-100 flex-shrink-0 overflow-hidden">
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
                    <h3 className="text-xs sm:text-sm font-extrabold text-stone-900 truncate tracking-tight">
                      {item.name}
                    </h3>
                    {item.badge && (
                      <span className="text-[9px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md flex-shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-[12px] text-stone-600 line-clamp-2 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="text-sm font-black text-stone-900 tracking-tight">
                  {item.price}
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* ROW 3: FIXED BOTTOM FOOTER */}
      <footer className="w-full bg-stone-950 text-stone-100 p-3.5 z-30 border-t border-stone-800 shadow-xl flex-shrink-0">
        <a
          href="https://search.google.com/local/writereview?placeid=YOUR_GOOGLE_PLACE_ID"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white hover:bg-stone-100 text-stone-950 font-extrabold py-3 px-4 rounded-xl text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md cursor-pointer"
        >
          <svg className="w-4 h-4 text-rose-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-black text-xs tracking-wider animated-review-text">
            📍 Leave a Google Review
          </span>
        </a>
      </footer>

    </div>
  );
}