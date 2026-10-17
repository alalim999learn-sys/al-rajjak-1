//C:\Users\Shanon\al-rajjak-1\app\barber\page.tsx



  




'use client';


import { useState, useEffect } from 'react';

import Image from 'next/image';

import barberData from '../../data/barbar.json';


// 🎯 টাইপ ডেফিনিশনসমূহ (JSON অনুযায়ী ৫টি ফিক্সড ভাষা)

type Lang = 'en' | 'es' | 'fr' | 'it' | 'de';


interface TranslatableText {

  en: string;

  es: string;

  fr: string;

  it: string;

  de: string;

}


interface StyleItem {

  name: string;

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


// 🌐 ডাইনামিক ইন্টারফেস ডিকশনারি

const translations: Record<Lang, { subtitle: string; call: string; book: string; noStyles: string; selectModel: string }> = {

  en: { subtitle: "Elevate your look with premium styling", call: "Call Us", book: "Book Appointment", noStyles: "No styles found.", selectModel: "Choose a Collection" },

  es: { subtitle: "Eleva tu estilo con un corte premium", call: "Llamar", book: "Reservar Cita", noStyles: "No se encontraron estilos.", selectModel: "Elige una Colección" },

  fr: { subtitle: "Sublimez votre style avec nos coupes premium", call: "Appeler", book: "Réserver", noStyles: "Aucun style trouvé.", selectModel: "Choisir une Collection" },

  it: { subtitle: "Eleva il tuo look con uno stile premium", call: "Chiama", book: "Prenota Cita", noStyles: "Nessuno stile trovato.", selectModel: "Scegli una Collezione" },

  de: { subtitle: "Veredeln Sie Ihren Look mit Premium-Styling", call: "Anrufen", book: "Termin Buchen", noStyles: "Keine Stile gefunden.", selectModel: "Kollektion Wählen" },

};


export default function BarberCatalog() {

  // ⚡ Hydration ফিক্স করার জন্য মাউন্টেড স্টেট

  const [mounted, setMounted] = useState(false);


  // 🌐 ভাষা সিলেকশন ট্র্যাক করার স্টেট

  const [isLangSelected, setIsLangSelected] = useState(false);


  // ১. ভাষা স্টেট

  const [currentLang, setCurrentLang] = useState<Lang>('es');

 

  // ২. ক্যাটাগরি স্টেট

  const [activeCategoryId, setActiveCategoryId] = useState<string>(

    typedBarberData.categories?.[0]?.id || ''

  );

 

  // ৩. মডেল স্টেট

  const [activeModelId, setActiveModelId] = useState<string>('');

 

  // ৪. লাইটবক্স ইমেজ স্টেট

  const [selectedImage, setSelectedImage] = useState<string | null>(null);


  const languages = [

    { code: 'es', flag: '🇪🇸', name: 'Español' },

    { code: 'en', flag: '🇬🇧', name: 'English' },

    { code: 'fr', flag: '🇫🇷', name: 'Français' },

    { code: 'it', flag: '🇮🇹', name: 'Italiano' },

    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },

  ];


  useEffect(() => {

    setMounted(true);

  }, []);


  // একটিভ ক্যাটাগরি অবজেক্ট খোঁজা

  const activeCategory = typedBarberData.categories.find(cat => cat.id === activeCategoryId);


  // ক্যাটাগরি চেঞ্জ হলে ১ম মডেল অটো-সিলেক্ট করার লজিক

  useEffect(() => {

    if (activeCategory && activeCategory.models.length > 0) {

      setActiveModelId(activeCategory.models[0].id);

    } else {

      setActiveModelId('');

    }

  }, [activeCategoryId, activeCategory]);


  // একটিভ মডেল অবজেক্ট খোঁজা

  const activeModel = activeCategory?.models.find(mod => mod.id === activeModelId);


  // 💬 WhatsApp বুকিং লিঙ্ক জেনারেটর

  const getWhatsAppLink = (styleName: string) => {

    const phoneNumber = "+34600000000";

    const cleanName = styleName.replace(/_/g, ' ');

    const text = encodeURIComponent(`Hola Al-Rajjak Barber, me gustaría reservar el estilo premium: *${cleanName}* ✂️`);

    return `https://wa.me/${phoneNumber}?text=${text}`;

  };


  const handleLangSelect = (langCode: Lang) => {

    setCurrentLang(langCode);

    setIsLangSelected(true);

  };


  if (!mounted) {

    return <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans" />;

  }


  return (

    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased selection:bg-amber-500 selection:text-black pb-24">

     

      {/* 🛑 ল্যাঙ্গুয়েজ সিলেকশন মোডাল (প্রিমিয়াম ব্লার লুক) */}

      {!isLangSelected && (

        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-xl flex items-center justify-center p-4">

          <div className="w-full max-w-sm bg-neutral-900/90 border border-neutral-800/80 rounded-3xl p-6 text-center shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-300">

            <div className="space-y-2">

              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 text-2xl border border-amber-500/20 shadow-inner">

                ✂️

              </div>

              <h2 className="text-xl font-black tracking-wider uppercase bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">

                Shop name Barber

              </h2>

              <p className="text-xs text-neutral-400">

                Selecciona tu idioma / Select your language

              </p>

            </div>


            <div className="grid grid-cols-1 gap-2">

              {languages.map((lang) => (

                <button

                  key={lang.code}

                  type="button"

                  onClick={() => handleLangSelect(lang.code as Lang)}

                  className="flex items-center justify-between px-5 py-3.5 bg-neutral-950/50 hover:bg-neutral-800/70 border border-neutral-800 hover:border-amber-500/40 rounded-2xl transition-all duration-300 text-left group"

                >

                  <div className="flex items-center gap-3">

                    <span className="text-xl group-hover:scale-110 transition-transform duration-300">{lang.flag}</span>

                    <span className="text-xs font-bold text-neutral-200 group-hover:text-amber-400 transition-colors">

                      {lang.name}

                    </span>

                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 group-hover:text-amber-500/60">

                    [{lang.code}]

                  </span>

                </button>

              ))}

            </div>

           

            <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest pt-2">

              Premium Grooming Experience

            </p>

          </div>

        </div>

      )}


      {/* 👑 ফিক্সড হেডার সেকশন */}

      <header className="sticky top-0 z-40 backdrop-blur-md bg-neutral-950/90 border-b border-neutral-900/80 px-4 py-4 max-w-md mx-auto w-full space-y-4">

        <div className="flex flex-col gap-3">

         

          {/* 🌐 ল্যাঙ্গুয়েজ কুইক সুইচার বার */}

          <div className="flex items-center justify-between bg-neutral-900/50 p-1.5 rounded-xl border border-neutral-900/60">

            <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-black px-1.5">

              LANG

            </span>

            <div className="flex gap-0.5 bg-neutral-950 p-0.5 rounded-lg border border-neutral-800/60">

              {languages.map((lang) => (

                <button

                  key={lang.code}

                  type="button"

                  onClick={() => setCurrentLang(lang.code as Lang)}

                  className={`px-2 py-1 rounded-md text-[10px] font-black transition-all duration-300 flex items-center gap-1 ${

                    currentLang === lang.code

                      ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'

                      : 'text-neutral-400 hover:text-neutral-200'

                  }`}

                >

                  <span>{lang.flag}</span>

                  <span>{lang.code.toUpperCase()}</span>

                </button>

              ))}

            </div>

          </div>


          {/* 👑 ব্র্যান্ড টাইটেল ও সাবটাইটেল */}

          <div className="space-y-0.5">

            <h1 className="text-2xl font-black tracking-tight uppercase bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">

              Al-Rajjak Barber

            </h1>

            <p className="text-[11px] text-neutral-400 font-medium tracking-wide">

              {translations[currentLang].subtitle}

            </p>

          </div>


          {/* ✂️ মেইন ক্যাটাগরি ফিল্টার বাটন */}

          <div className="flex flex-wrap gap-2 pt-1">

            {typedBarberData.categories.map((category) => {

              const isActive = activeCategoryId === category.id;

              return (

                <button

                  key={category.id}

                  type="button"

                  onClick={() => setActiveCategoryId(category.id)}

                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-300 border ${

                    isActive

                      ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md shadow-amber-500/10 font-black'

                      : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-neutral-200'

                  }`}

                >

                  <span className="text-sm">{category.emoji}</span>

                  <span>{category.name[currentLang] || category.name['en']}</span>

                </button>

              );

            })}

          </div>


          {/* ⚡ সাব-মডেল ফিল্টার কালেকশন বাটন */}

          {activeCategory && activeCategory.models.length > 0 && (

            <div className="flex flex-col gap-1.5 pt-2.5 border-t border-neutral-900/80">

              <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-black px-1">

                {translations[currentLang].selectModel}

              </span>

              <div className="flex flex-wrap gap-1.5">

                {activeCategory.models.map((model) => {

                  const isActive = activeModelId === model.id;

                  return (

                    <button

                      key={model.id}

                      type="button"

                      onClick={() => setActiveModelId(model.id)}

                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-300 border ${

                        isActive

                          ? 'bg-neutral-100 text-neutral-950 border-white shadow-md font-black'

                          : 'bg-neutral-900/60 text-neutral-400 border-neutral-800/80 hover:border-neutral-700'

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


      {/* 📦 মেইন ক্যাটালগ বডি */}

      <main className="max-w-md mx-auto px-4 py-4">

        {activeModel ? (

          <div className="space-y-4">

           

            {/* কালেকশন ইন্ডিকেটর ট্যাগ */}

            <div className="inline-flex items-center gap-2 border-l-2 border-amber-500 pl-2.5 py-0.5">

              <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase">

                {activeModel.name[currentLang] || activeModel.name['en']}

              </span>

            </div>


            {/* ২-কলাম লাক্সারি গ্রিড লেআউট */}

            <div className="grid grid-cols-2 gap-3.5">

              {activeModel.styles.map((style, idx) => (

                <div

                  key={idx}

                  className="group relative flex flex-col bg-gradient-to-b from-neutral-900 to-neutral-900/40 rounded-2xl overflow-hidden border border-neutral-800/70 hover:border-neutral-700/90 transition-all duration-300 shadow-xl justify-between hover:-translate-y-0.5"

                >

                  {/* 📷 হেয়ারস্টাইল ইমেজ স্লট */}

                  <div

                    onClick={() => setSelectedImage(style.img)}

                    className="relative w-full aspect-square bg-neutral-950 overflow-hidden cursor-zoom-in"

                  >

                    <Image

                      src={style.img}

                      alt={style.name}

                      fill

                      sizes="(max-width: 450px) 50vw, 33vw"

                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95 ease-out"

                      priority={idx < 4}

                    />

                   

                    {/* লাক্সারি প্রাইস ট্যাগ */}

                    <div className="absolute bottom-2.5 left-2.5 bg-neutral-950/80 backdrop-blur-md px-2 py-1 rounded-lg border border-neutral-800/80 shadow-md">

                      <span className="text-amber-400 font-black text-xs tracking-wider">

                        {style.price}

                      </span>

                    </div>

                  </div>


                  {/* 📝 টেক্সট ডেসক্রিপশন এবং ইন্টারেকশন */}

                  <div className="p-3 flex flex-col gap-2.5 flex-grow justify-between bg-neutral-900/20">

                    <div className="space-y-1">

                      <h3 className="font-bold text-xs tracking-wide text-neutral-100 group-hover:text-amber-400 transition-colors duration-300 line-clamp-1 capitalize">

                        {style.name.replace(/_/g, ' ')}

                      </h3>

                      <p className="text-[10px] text-neutral-400 leading-normal font-medium line-clamp-2 min-h-[30px]">

                        {style.desc[currentLang] || style.desc['en']}

                      </p>

                    </div>


                    {/* 🟢 মডার্ন বুকিং WhatsApp বাটন */}

                    <a

                      href={getWhatsAppLink(style.name)}

                      target="_blank"

                      rel="noopener noreferrer"

                      className="w-full bg-neutral-950/80 hover:bg-amber-500 border border-neutral-800 hover:border-amber-400 text-center py-2 rounded-xl text-[10px] font-black text-neutral-300 hover:text-neutral-950 transition-all duration-300 flex items-center justify-center gap-1.5 shadow-inner"

                    >

                      <svg className="w-3 h-3 text-emerald-500 group-hover:text-neutral-950 fill-current transition-colors" viewBox="0 0 24 24">

                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.847.001-2.633-1.019-5.101-2.872-6.958C16.59 1.983 14.131 1.212 11.5 1.212c-5.442 0-9.866 4.413-9.87 9.848-.002 1.81.488 3.579 1.419 5.141l-.949 3.465 3.548-.93z"/>

                      </svg>

                      {translations[currentLang].book}

                    </a>

                  </div>


                </div>

              ))}

            </div>

          </div>

        ) : (

          <div className="text-center py-16 text-neutral-500 text-xs tracking-wider uppercase font-bold">

            {translations[currentLang].noStyles}

          </div>

        )}

      </main>


      {/* 🔮 প্রিমিয়াম লাইটবক্স ইমেজ ভিউ মোডাল */}

      {selectedImage && (

        <div

          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"

          onClick={() => setSelectedImage(null)}

        >

          <div className="relative w-full max-w-md h-[65vh] rounded-2xl overflow-hidden border border-neutral-800/80 shadow-2xl animate-in fade-in zoom-in-95 duration-200">

            <Image

              src={selectedImage}

              alt="Expanded Premium View"

              fill

              className="object-contain"

            />

            <button

              type="button"

              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-800 text-white flex items-center justify-center text-xs font-black transition-transform hover:scale-105 active:scale-95"

              onClick={() => setSelectedImage(null)}

            >

              ✕

            </button>

          </div>

        </div>

      )}


      {/* 💈 মিনিমালিস্ট লাক্সারি ফুটার */}

      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent pt-12 pb-5 text-center pointer-events-none">

        <p className="text-[9px] text-neutral-500 font-black tracking-widest pointer-events-auto uppercase opacity-60">

          Powered by   Premium Experience

        </p>

      </footer>


    </div>

  );






























 

} 