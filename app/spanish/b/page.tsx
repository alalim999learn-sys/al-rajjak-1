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
    title: 'Cortes de Pelo',
    subtitle: 'Cortes clásicos, desvanecidos y estilo de precisión.',
    services: [
      {
        id: 'std-cut',
        name: 'Corte Estándar',
        description: 'Recorte clásico de tijera y máquina adaptado a tu estilo.',
        price: '£18',
        image: '/30/standard.jpg'
      },
      {
        id: 'skin-fade',
        name: 'Desvanecido (Skin Fade)',
        description: 'Desvanecido de piel de grado cero de precisión con difuminado perfecto.',
        price: '£22',
        image: '/30/skin-fade.jpg',
        badge: 'Popular'
      },
      {
        id: 'clipper-cut',
        name: 'Corte con Máquina',
        description: 'Corte rapado con una sola guía en toda la cabeza con bordes limpios.',
        price: '£14',
        image: '/30/clipper-cut.jpg'
      },
      {
        id: 'kids-cut',
        name: 'Corte para Niños (Menores de 12)',
        description: 'Servicio de corte de pelo paciente y amigable para niños pequeños.',
        price: '£12',
        image: '/30/ids.jpg'
      },
      {
        id: 'senior-cut',
        name: 'Corte Senior (65+ / Jubilados)',
        description: 'Corte de pelo tradicional y elegante para nuestros clientes mayores.',
        price: '£12',
        image: '/30/senior.jpg'
      }
    ]
  },
  {
    id: 'beard',
    title: 'Barba y Afeitado',
    subtitle: 'Esculpido de barba experto, afeitados con toalla caliente y contornos.',
    services: [
      {
        id: 'beard-trim',
        name: 'Recorte y Perfilado de Barba',
        description: 'Moldeado con recortadora y contorno con navaja para un aspecto pulcro.',
        price: '£12',
        image: '/30/trim.jpg'
      },
      {
        id: 'hot-towel',
        name: 'Afeitado Húmedo con Toalla Caliente',
        description: 'Afeitado tradicional con navaja libre, aceites esenciales y toalla caliente.',
        price: '£16',
        image: '/30/hot.jpg',
        badge: 'Relajante'
      },
      {
        id: 'beard-sculpt',
        name: 'Esculpido y Líneas de Barba',
        description: 'Esculpido detallado de barba, desvanecido en degradé y líneas muy definidas.',
        price: '£14',
        image: '/30/lineup.jpg'
      }
    ]
  },
  {
    id: 'combos',
    title: 'Paquetes Combinados',
    subtitle: 'Obtén el tratamiento completo y ahorra dinero.',
    services: [
      {
        id: 'hair-beard-combo',
        name: 'Combo de Corte y Barba',
        description: 'Cualquier corte de pelo de tu elección combinado con un recorte y perfilado de barba profesional.',
        price: '£28',
        image: '/30/combo.jpg',
        badge: 'Ahorra £4'
      },
      {
        id: 'vip-package',
        name: 'El Paquete de Estética VIP',
        description: 'Corte de pelo, esculpido de barba, afeitado húmedo con toalla caliente, lavado y acabado de peinado.',
        price: '£38',
        image: '/30/luxury.jpg',
        badge: 'Mejor Valor'
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
                  The Barbers
                </h1>
                <p className="text-[10px] text-neutral-400 font-medium mt-1 tracking-tight truncate">
                  Estudio de Estética
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
              <span className="font-mono text-[10px] tracking-wider text-neutral-200">020 7946 0921</span>
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
            href="https://search.google.com/local/writereview?placeid=YOUR_GOOGLE_PLACE_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-neutral-900 hover:bg-neutral-800 border-2 border-white text-white font-extrabold py-3 px-4 rounded-xl text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg cursor-pointer"
          >
            <span className="text-base flex-shrink-0">📍</span>
            <span className="animated-gradient-text font-black text-xs tracking-wider">
              Dejar una reseña en Google
            </span>
          </a>
        </footer>

      </div>
    </div>
  );
}