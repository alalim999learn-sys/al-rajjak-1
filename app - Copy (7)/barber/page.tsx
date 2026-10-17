//C:\Users\Shanon\al-rajjak-1\app\barber\page.tsx
 


'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import barberData from '../../data/barbar.json';

type Lang = 'en' | 'es' | 'fr' | 'it' | 'de';

interface TranslatableText {
  en: string;
  es: string;
  fr: string;
  it: string;
  de: string;
}

interface StyleItem {
  name: TranslatableText;
  img: string;
  price: string;
  desc: TranslatableText;
}

interface ModelItem {
  id: string;
  name: TranslatableText;
  styles: StyleItem[];
}

interface CategoryItem {
  id: string;
  emoji: string;
  name: TranslatableText;
  models: ModelItem[];
}

interface BarberDataStructure {
  categories: CategoryItem[];
}

const typedBarberData = barberData as BarberDataStructure;

const translations: Record<Lang, { 
  subtitle: string; 
  noStyles: string; 
  selectCategory: string; 
  selectModel: string;    
  close: string; 
  details: string 
}> = {
  en: { 
    subtitle: "Elevate your look with premium styling", 
    noStyles: "No styles found.", 
    selectCategory: "Choose your style vibe:", 
    selectModel: "Select your exact haircut:", 
    close: "Close", 
    details: "STYLE DETAILS" 
  },
  es: { 
    subtitle: "Eleva tu estilo con un corte premium", 
    noStyles: "No se encontraron estilos.", 
    selectCategory: "Elige tu estilo o vibración:", 
    selectModel: "Selecciona tu corte de pelo exacto:", 
    close: "Cerrar", 
    details: "DETALLES DEL ESTILO" 
  },
  fr: { 
    subtitle: "Sublimez votre style avec nos coupes premium", 
    noStyles: "Aucun style trouvé.", 
    selectCategory: "Choisissez votre style de coupe:", 
    selectModel: "Sélectionnez votre coupe exacte:", 
    close: "Fermer", 
    details: "DÉTAILS DU STYLE" 
  },
  it: { 
    subtitle: "Eleva il tuo look con uno stile premium", 
    noStyles: "Nessuno stile trovato.", 
    selectCategory: "Scegli il tuo stile ideale:", 
    selectModel: "Seleziona il tuo taglio di capelli esatto:", 
    close: "Chiudi", 
    details: "DETTAGLI DELLO STILE" 
  },
  de: { 
    subtitle: "Veredeln Sie Ihren Look mit Premium-Styling", 
    noStyles: "Keine Stile gefunden.", 
    selectCategory: "Wählen Sie Ihren Stil-Vibe:", 
    selectModel: "Wählen Sie Ihren genauen Haarschnitt:", 
    close: "Schließen", 
    details: "STIL-DETAILS" 
  },
};

export default function BarberCatalog() {
  const [mounted, setMounted] = useState(false);
  const [isLangSelected, setIsLangSelected] = useState(false);
  const [currentLang, setCurrentLang] = useState<Lang>('es');
  const [activeCategoryId, setActiveCategoryId] = useState<string>(typedBarberData.categories?.[0]?.id || '');
  const [activeModelId, setActiveModelId] = useState<string>('');
  
  const [selectedStyle, setSelectedStyle] = useState<StyleItem | null>(null);

  const languages = [
    { code: 'es', flag: '🇪🇸', name: 'Español' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'it', flag: '🇮🇹', name: 'Italiano' }, // 💡 ফিক্সড: 'font' পরিবর্তন করে 'flag' করা হয়েছে
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeCategory = typedBarberData.categories.find(cat => cat.id === activeCategoryId);

  useEffect(() => {
    if (activeCategory && activeCategory.models.length > 0) {
      setActiveModelId(activeCategory.models[0].id);
    } else {
      setActiveModelId('');
    }
  }, [activeCategoryId, activeCategory]);

  const activeModel = activeCategory?.models.find(mod => mod.id === activeModelId);

  const closeDetailsModal = () => {
    setSelectedStyle(null);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-black text-zinc-100 font-sans" />;
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased pb-12">
      
      <style jsx global>{`
        @keyframes rgbFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-rgb {
          background: linear-gradient(to right, #ff3333, #33ff33, #ffff33, #33ffff, #ff33ff, #ff3333);
          background-size: 300% auto;
          animation: rgbFlow 6s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* 🛑 ল্যাঙ্গুয়েজ সিলেকশন মোডাল */}
      {!isLangSelected && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300">
          <div className="w-full max-w-xs bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center shadow-2xl space-y-5">
            <div className="space-y-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 text-zinc-300 text-lg border border-zinc-700/60 mb-2">
                ✂️
              </div>
              <h2 className="text-xl font-black tracking-tight uppercase animate-rgb">
                 Barna Barbería
              </h2>
              <p className="text-[11px] text-zinc-400">
                Selecciona tu idioma / Select language
              </p>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setCurrentLang(lang.code as Lang);
                    setIsLangSelected(true);
                  }}
                  className="flex items-center justify-between px-4 py-3 bg-zinc-950 hover:bg-zinc-800 border border-zinc-850 rounded-xl transition-all active:scale-98 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-xs font-medium text-zinc-200">
                      {lang.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">
                    [{lang.code.toUpperCase()}]
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 👑 মোবাইল অপ্টিমাইজড ফিক্সড হেডার — সর্বোচ্চ উপরে উঠানোর জন্য স্পেসিং জিরো করা হয়েছে */}
      <header className="sticky top-0 z-40 bg-black/95 border-b border-zinc-900 px-4 pt-1 pb-2 max-w-md mx-auto w-full space-y-1">
        <div className="flex flex-col gap-1">
          
          {/* 🌐 ল্যাঙ্গুয়েজ বার (একদম ডান কোণায় সেট করা হয়েছে কোনো এক্সট্রা মার্জিন ছাড়া) */}
          <div className="flex justify-end items-center h-5">
            <div className="flex gap-0.5 bg-zinc-900/80 p-0.5 rounded-lg border border-zinc-850">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setCurrentLang(lang.code as Lang)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                    currentLang === lang.code
                      ? 'bg-zinc-100 text-black font-black shadow-sm'
                      : 'text-zinc-400'
                  }`}
                >
                  <span>{lang.flag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ব্র্যান্ড টাইটেল */}
          <div className="space-y-0">
            <h1 className="text-2xl font-black tracking-tight uppercase animate-rgb leading-none mt-0.5">
               Barna Barbería
            </h1>
            <p className="text-[10px] text-zinc-400 font-medium leading-tight mt-0.5">
              {translations[currentLang].subtitle}
            </p>
          </div>

          {/* ✂️ ১. ক্যাটাগরি ফিল্টার */}
          <div className="flex flex-col gap-1 pt-0.5">
            <span className="text-[11px] font-black tracking-wider text-zinc-300 uppercase border-l-2 border-zinc-500 pl-2">
              {translations[currentLang].selectCategory}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {typedBarberData.categories.map((category) => {
                const isActive = activeCategoryId === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategoryId(category.id)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold transition-all active:scale-95 border ${
                      isActive
                        ? 'bg-zinc-100 text-black border-white font-extrabold'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                    }`}
                  >
                    <span>{category.emoji}</span>
                    <span>{category.name[currentLang] || category.name['en']}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ⚡ ২. সাব-মডেল কালেকশন ফিল্টার */}
          {activeCategory && activeCategory.models.length > 0 && (
            <div className="flex flex-col gap-1 pt-1.5 border-t border-zinc-900">
              <span className="text-[11px] font-black tracking-wider text-zinc-300 uppercase border-l-2 border-zinc-500 pl-2">
                {translations[currentLang].selectModel}
              </span>
              <div className="flex flex-wrap gap-1">
                {activeCategory.models.map((model) => {
                  const isActive = activeModelId === model.id;
                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => setActiveModelId(model.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all border ${
                        isActive
                          ? 'bg-zinc-800 text-white border-zinc-700'
                          : 'bg-zinc-900/40 text-zinc-400 border-zinc-850'
                      }`}
                    >
                      {model.name[currentLang] || model.name['en']}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 📦 মেইন ক্যাটালগ গ্রিড */}
      <main className="max-w-md mx-auto px-3 py-2">
        {activeModel ? (
          <div className="space-y-3">
            
            <div className="inline-flex items-center gap-2 border-l-2 border-zinc-500 pl-2 py-0.5">
              <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                {activeModel.name[currentLang] || activeModel.name['en']}
              </span>
            </div>

            {/* ২-কলাম রেসপন্সিভ মোবাইল গ্রিড */}
            <div className="grid grid-cols-2 gap-2.5">
              {activeModel.styles.map((style, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedStyle(style)}
                  className="group relative flex flex-col bg-zinc-900 rounded-xl overflow-hidden border border-zinc-850 shadow-md justify-between active:scale-98 transition-transform cursor-pointer"
                >
                  {/* 📷 이미지 স্লট */}
                  <div className="relative w-full aspect-square bg-zinc-950 overflow-hidden">
                    <Image
                      src={style.img}
                      alt={style.name[currentLang] || style.name['en']}
                      fill
                      sizes="(max-width: 450px) 50vw, 33vw"
                      className="object-cover object-center opacity-90"
                      priority={idx < 4}
                    />
                    
                    {/* মিনিমালিস্ট প্রাইস ট্যাগ */}
                    <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-zinc-800">
                      <span className="text-zinc-200 font-extrabold text-[11px]">
                        {style.price}
                      </span>
                    </div>
                  </div>

                  {/* 📝 টেক্সট */}
                  <div className="p-2 flex flex-col justify-between bg-zinc-900/50">
                    <h3 className="font-bold text-[11px] tracking-wide text-zinc-200 line-clamp-1">
                      {style.name[currentLang] || style.name['en']}
                    </h3>
                    <p className="text-[9px] text-zinc-400 line-clamp-2 mt-0.5 min-h-[26px] leading-tight">
                      {style.desc[currentLang] || style.desc['en']}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-zinc-600 text-xs font-bold uppercase">
            {translations[currentLang].noStyles}
          </div>
        )}
      </main>

      {/* 🌟 👑 মোবাইল ফুল-স্ক্রিন লাক্সারি মোডাল */}
      {selectedStyle && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-3 transition-all duration-200 overflow-y-auto">
          
          <div className="w-full max-w-md grid grid-cols-5 items-center py-3 border-b border-zinc-900">
            <div className="col-span-1"></div>
            
            <div className="col-span-3 text-center flex flex-col space-y-0.5">
              <h3 className="text-lg font-black tracking-widest uppercase animate-rgb">
                 Barna Barbería
              </h3>
              <p className="text-[11px] font-bold tracking-wide animate-rgb">
                Calle de Mallorca, 245, Barcelona
              </p>
            </div>

            <div className="col-span-1 flex justify-end">
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-200 flex items-center justify-center text-xs font-bold transition-all active:scale-90"
                onClick={closeDetailsModal}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="w-full max-w-md flex-grow flex items-center justify-center my-3 overflow-hidden relative rounded-2xl bg-zinc-950 border border-zinc-900">
            <div className="relative w-full aspect-square max-h-[45vh] overflow-hidden">
              <Image
                src={selectedStyle.img}
                alt={selectedStyle.name[currentLang] || selectedStyle.name['en']}
                fill
                draggable={false}
                className="object-cover select-none"
              />
            </div>
          </div>

          <div className="w-full max-w-md bg-zinc-900 p-4 rounded-2xl border border-zinc-800 space-y-4 shadow-xl">
            <div className="flex justify-between items-start gap-3">
              <div className="space-y-1 flex-grow">
                <h2 className="text-lg font-black text-white uppercase tracking-wide">
                  {selectedStyle.name[currentLang] || selectedStyle.name['en']}
                </h2>
                <p className="text-xs text-zinc-400 leading-tight">
                  {selectedStyle.desc[currentLang] || selectedStyle.desc['en']}
                </p>
              </div>
              
              <div className="bg-zinc-100 text-black font-black text-base px-3 py-1.5 rounded-xl shadow-md text-center min-w-[65px]">
                {selectedStyle.price}
              </div>
            </div>

            <button
              type="button"
              onClick={closeDetailsModal}
              className="w-full bg-zinc-800 active:bg-zinc-700 border border-zinc-700 text-zinc-200 text-center py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-98 shadow-sm"
            >
              {translations[currentLang].close}
            </button>
          </div>
        </div>
      )}

      <footer className="w-full text-center py-4 text-[9px] text-zinc-600 font-bold tracking-widest uppercase opacity-40">
        Premium Grooming Experience
      </footer>

    </div>
  );
}