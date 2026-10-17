


//////////C:\Users\Shanon\al-rajjak-1\app\b\page.tsx




"use client";

import React, { useState } from "react";

// Types for the barber service items
interface ServiceItem {
  id: number;
  name: string;
  price: string;
  description: string;
  icon: string;
}

export default function BarberShopDemo(): React.JSX.Element {
  // State for tracking selected service card
  const [selectedService, setSelectedService] = useState<number | null>(null);

  // List of services with prices matching Bognor Regis target demographic
  const services: ServiceItem[] = [
    {
      id: 1,
      name: "Gents Haircut",
      price: "£15.00",
      description: "Classic styling, wash, precision cut & finish",
      icon: "✂️",
    },
    {
      id: 2,
      name: "Beard Trim & Shape",
      price: "£10.00",
      description: "Hot towel treatment, razor edging & premium beard oil",
      icon: "🪒",
    },
    {
      id: 3,
      name: "Full Combo (Hair & Beard)",
      price: "£22.00",
      description: "Complete grooming: haircut, beard styling, wash & hot towel",
      icon: "👑",
    },
    {
      id: 4,
      name: "Kids / Senior Haircut",
      price: "£12.00",
      description: "Special rate for Under 12s or Seniors (65+)",
      icon: "💈",
    },
  ];

  // Placeholder Google Review link for Bognor Regis demo
  const googleReviewUrl: string =
    "https://search.google.com/local/writereview?placeid=ChIJ31s_DEMODUgRvI3k0eH8YgM";
  
  // Phone number for Bognor Regis local area
  const phoneNumber: string = "01243 820000";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans max-w-md mx-auto relative pb-24 border-x border-neutral-800/80 shadow-2xl antialiased">
      
      {/* 1. TOP NAVBAR */}
      <nav className="sticky top-0 z-30 bg-neutral-950/95 backdrop-blur-md px-4 py-3.5 border-b border-neutral-800/80 flex items-center justify-between">
        {/* Left Side Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl">👑</span>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-amber-400 uppercase">
              Crown Barbers
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">
              Bognor Regis
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
      <main className="p-4 space-y-6">
        
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 p-4 rounded-2xl border border-neutral-800 relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/20 uppercase tracking-wider">
              Walk-ins Welcome
            </span>
            <h1 className="text-xl font-bold text-white mt-2">
              Premium Barbering & Styling
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Select a service below or leave us feedback on your visit.
            </p>
          </div>
        </div>

        {/* Service List with Prices */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
              <span>💈</span> Services & Pricing
            </h2>
            <span className="text-[11px] text-neutral-500">Tap service to highlight</span>
          </div>

          <div className="space-y-2.5">
            {services.map((service: ServiceItem) => {
              const isSelected = selectedService === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                    isSelected
                      ? "bg-neutral-900 border-amber-500/80 shadow-md shadow-amber-500/5"
                      : "bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 bg-neutral-950 rounded-lg border border-neutral-800">
                        {service.icon}
                      </span>
                      <div>
                        <h3 className="font-semibold text-sm text-neutral-100">
                          {service.name}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-0.5 leading-snug">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right pl-2">
                      <span className="font-bold text-amber-400 text-sm block">
                        {service.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Operating Info Card */}
        <section className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-800/80 text-xs space-y-2.5 text-neutral-400">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-800/50">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span>📍</span> Address:
            </span>
            <span className="text-neutral-200 font-medium">High Street, Bognor Regis</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-neutral-800/50">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span>🕒</span> Hours:
            </span>
            <span className="text-neutral-200 font-medium">Mon - Sat: 9am - 6pm</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span>💳</span> Payment:
            </span>
            <span className="text-neutral-200 font-medium">Cash & Cards Accepted</span>
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
          <span>Leave a 5-Star Review on Google</span>
        </a>
      </div>

    </div>
  );
}