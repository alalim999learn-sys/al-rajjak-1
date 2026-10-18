


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
        image: '/30/latte.jpg',


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
        image: '/30/epress.jpg',
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
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-0 sm:py-6 selection:bg-white selection:text-black">
      
      {/* MOBILE APP CONTAINER */}
      <div className="w-full max-w-sm sm:max-w-md h-screen sm:h-[880px] bg-white text-neutral-900 flex flex-col sm:rounded-[36px] sm:border-[8px] sm:border-neutral-900 shadow-2xl overflow-hidden relative">
        
        {/* TOP HEADER */}
        <header className="bg-black/95 backdrop-blur-md text-white px-5 py-4 flex-shrink-0 border-b border-neutral-800 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-black text-sm tracking-tighter">
                B&B
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight uppercase leading-none">Bean & Brew</h1>
                <p className="text-[10px] text-neutral-400 mt-0.5">Artisan Coffee & Bakery</p>
              </div>
            </div>
            <a
              href="tel:+447000000000"
              className="bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700/80 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 active:scale-95"
            >
              <svg className="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call
            </a>
          </div>
        </header>

        {/* MIDDLE SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-none">
          
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none sticky top-0 bg-white/90 backdrop-blur-sm z-10 py-1">
            {CAFE_MENU_DATA.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all flex-shrink-0 ${
                    isActive
                      ? 'bg-black text-white shadow-md shadow-neutral-900/20 scale-105'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>

          {/* Category Title & Subtitle */}
          <div className="px-1 pt-1">
            <h2 className="text-base font-extrabold text-neutral-900 tracking-tight">{currentCategoryData.title}</h2>
            <p className="text-[11px] text-neutral-500 font-medium">{currentCategoryData.subtitle}</p>
          </div>

          {/* Menu Items Cards */}
          <div className="space-y-3 pb-24">
            {currentCategoryData.items.map((item) => (
              <div
                key={item.id}
                className="group bg-white border border-neutral-200/90 rounded-2xl p-3 flex items-center gap-3.5 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-200"
              >
                {/* Item Image */}
                <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h3 className="text-xs font-bold text-neutral-900 truncate">{item.name}</h3>
                    {item.badge && (
                      <span className="text-[9px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded-full flex-shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500 line-clamp-2 mb-2 leading-relaxed font-normal">
                    {item.description}
                  </p>
                  <div className="text-xs font-black text-neutral-900">
                    {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>

        {/* BOTTOM FIXED FOOTER */}
        <footer className="bg-black/95 backdrop-blur-md text-white py-3.5 px-4 flex-shrink-0 border-t border-neutral-800 absolute bottom-0 left-0 right-0 z-20">
          <a
            href="https://search.google.com/local/writereview?placeid=YOUR_GOOGLE_PLACE_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white text-black hover:bg-neutral-100 font-bold py-2.5 px-4 rounded-xl text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg"
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