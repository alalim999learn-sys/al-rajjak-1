


/////////C:\Users\Shanon\al-rajjak-1\app\c\page.tsx




"use client";

import React, { useState } from "react";

// Types for cafe menu items
interface MenuItem {
  id: number;
  category: "coffee" | "drinks" | "food";
  name: string;
  price: string;
  description: string;
  icon: string;
}

export default function CafeDemo(): React.JSX.Element {
  // Active category filter state
  const [activeCategory, setActiveCategory] = useState<string>("all");
  // Selected item highlight
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  // Menu items list tailored for a typical UK local cafe/snack bar
  const menuItems: MenuItem[] = [
    // Coffee & Hot Drinks
    {
      id: 1,
      category: "coffee",
      name: "Flat White",
      price: "£3.20",
      description: "Double shot espresso with silky micro-foamed milk",
      icon: "☕",
    },
    {
      id: 2,
      category: "coffee",
      name: "Espresso / Americano",
      price: "£2.50",
      description: "Rich roasted blend served hot or over ice",
      icon: "☕",
    },
    {
      id: 3,
      category: "coffee",
      name: "Hot Chocolate & Cream",
      price: "£3.50",
      description: "Belgian chocolate topped with whipped cream & marshmallows",
      icon: "🍫",
    },

    // Fresh Juices & Cold Drinks
    {
      id: 4,
      category: "drinks",
      name: "Fresh Orange Juice",
      price: "£3.50",
      description: "100% freshly squeezed Valencia oranges",
      icon: "🍊",
    },
    {
      id: 5,
      category: "drinks",
      name: "Berry Boost Smoothie",
      price: "£3.90",
      description: "Blended strawberries, blueberries, banana & apple juice",
      icon: "🍓",
    },
    {
      id: 6,
      category: "drinks",
      name: "Iced English Milk Tea",
      price: "£2.80",
      description: "Classic brew served over ice with your choice of milk",
      icon: "🧋",
    },

    // Breads, Toasties & Snacks
    {
      id: 7,
      category: "food",
      name: "Bacon & Egg Roll",
      price: "£4.50",
      description: "Smoked Sussex bacon in a freshly toasted brioche bun",
      icon: "🥓",
    },
    {
      id: 8,
      category: "food",
      name: "Cheddar & Ham Toastie",
      price: "£4.80",
      description: "Melted mature cheddar with sliced ham on sourdough bread",
      icon: "🥪",
    },
    {
      id: 9,
      category: "food",
      name: "Artisan Bread & Butter",
      price: "£3.00",
      description: "Warm crusty loaf slices served with salted English butter",
      icon: "🥖",
    },
    {
      id: 10,
      category: "food",
      name: "Butter Croissant / Pastry",
      price: "£2.80",
      description: "Freshly baked daily in-house",
      icon: "🥐",
    },
  ];

  // Filter items based on selected tab
  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  // Placeholder Google Review link for Bognor Regis target
  const googleReviewUrl: string =
    "https://search.google.com/local/writereview?placeid=ChIJ31s_DEMODUgRvI3k0eH8YgM";

  // Phone number for Bognor Regis local area
  const phoneNumber: string = "01243 821111";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans max-w-md mx-auto relative pb-24 border-x border-neutral-800/80 shadow-2xl antialiased">
      
      {/* 1. TOP NAVBAR */}
      <nav className="sticky top-0 z-30 bg-neutral-950/95 backdrop-blur-md px-4 py-3.5 border-b border-neutral-800/80 flex items-center justify-between">
        {/* Left Side Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl">☕</span>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-amber-400 uppercase">
              Bognor Bites
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">
              High Street Cafe
            </span>
          </div>
        </div>

        {/* Right Side Call Button */}
        <a
          href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
          className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-amber-400 font-semibold px-3 py-1.5 rounded-lg text-xs transition duration-150 active:scale-95"
        >
          <svg
            className="w-3.5 h-3.5 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.02-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span>Call: {phoneNumber}</span>
        </a>
      </nav>

      {/* 2. MIDDLE CONTENT SECTION */}
      <main className="p-4 space-y-5">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 p-4 rounded-2xl border border-neutral-800 relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/20 uppercase tracking-wider">
              Fresh Daily • High Street
            </span>
            <h1 className="text-xl font-bold text-white mt-2">
              Coffee, Juices & Fresh Breads
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Tap a category below to filter menu prices or rate your visit.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {[
            { id: "all", label: "All Items", icon: "✨" },
            { id: "coffee", label: "Coffee & Hot", icon: "☕" },
            { id: "drinks", label: "Juices & Cold", icon: "🍊" },
            { id: "food", label: "Bread & Toasties", icon: "🥪" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-2 rounded-xl font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all duration-150 ${
                activeCategory === tab.id
                  ? "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/10 font-bold"
                  : "bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Menu Items List */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between px-0.5">
            <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Menu & Price List ({filteredItems.length})
            </h2>
            <span className="text-[11px] text-neutral-500">Includes VAT</span>
          </div>

          <div className="space-y-2.5">
            {filteredItems.map((item: MenuItem) => {
              const isSelected = selectedItem === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                    isSelected
                      ? "bg-neutral-900 border-amber-500/80 shadow-md shadow-amber-500/5"
                      : "bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 bg-neutral-950 rounded-lg border border-neutral-800">
                        {item.icon}
                      </span>
                      <div>
                        <h3 className="font-semibold text-sm text-neutral-100">
                          {item.name}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-0.5 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right pl-2">
                      <span className="font-bold text-amber-400 text-sm block">
                        {item.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Cafe Operating Info */}
        <section className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-800/80 text-xs space-y-2.5 text-neutral-400">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-800/50">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span>📍</span> Address:
            </span>
            <span className="text-neutral-200 font-medium">High Street, Bognor Regis</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-neutral-800/50">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span>🕒</span> Opening Hours:
            </span>
            <span className="text-neutral-200 font-medium">Mon - Sun: 7:30am - 5:00pm</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span>🌱</span> Dietaries:
            </span>
            <span className="text-neutral-200 font-medium">Vegan & Gluten-Free Available</span>
          </div>
        </section>

      </main>

      {/* 3. BOTTOM FIXED REVIEW BUTTON */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-neutral-950/95 backdrop-blur-md p-3 border-t border-neutral-800/80 z-40">
        <a
          href={googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold py-3 px-4 rounded-xl shadow-lg shadow-amber-500/10 text-xs uppercase tracking-wider transition duration-150 active:scale-[0.98]"
        >
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span>Leave a 5-Star Google Review ⭐⭐⭐⭐⭐</span>
        </a>
      </div>

    </div>
  );
}