//C:\Users\Shanon\al-rajjak-1\app\yt-one\page.tsx



import React from 'react';

export default function PlumbingLandingPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center font-sans text-gray-900">
      
      {/* 1. Header */}
      <header className="w-full p-4 flex justify-between items-center bg-white shadow-sm">
        <h1 className="text-xl font-bold text-blue-900">Schulz Sanitär</h1>
        <div className="text-blue-900">⚙️</div>
      </header>

      {/* 2. Main Headline */}
      <main className="flex-1 w-full max-w-sm p-6 text-center">
        <h2 className="text-3xl font-extrabold text-blue-900 leading-tight mb-4">
          Lokaler Sanitär-Experte für Berlin.
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Schnell. Zuverlässig. Fachgerecht.
        </p>

        {/* 3. Service Icons Grid */}
        <div className="grid grid-cols-3 gap-2 mb-10">
          {[
            { icon: '🛠️', label: 'Notdienst' },
            { icon: '🚿', label: 'Bad' },
            { icon: '🔥', label: 'Heizung' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <div className="text-2xl mb-1">{item.icon}</div>
              <p className="text-[10px] font-semibold uppercase">{item.label}</p>
            </div>
          ))}
        </div>

        {/* 4. Golden CTA Button */}
        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-lg shadow-lg transition-all transform active:scale-95">
          KOSTENLOSES BERATUNGSGESPRÄCH
        </button>
        <p className="text-sm text-gray-500 mt-3 font-medium">
          Jetzt für nur 600€
        </p>
      </main>

      {/* 5. Trust Bar */}
      <footer className="w-full p-4 text-center text-gray-400 text-xs">
        ⭐⭐⭐⭐⭐ 5.0 / 5.0 – TÜV zertifiziert
      </footer>
    </div>
  );
}