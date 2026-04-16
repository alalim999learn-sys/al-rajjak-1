//C:\Users\Shanon\al-rajjak-1\components\RealEstateChat.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';

export default function RealEstateChat({ clientData }: { clientData: any }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Guten Tag! Ich bin der KI-Berater von ${clientData.ownerName}. Wie kann ich Ihnen heute helfen?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // অটোমেটিক স্ক্রল ডাউন
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg], clientData })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Systemfehler. Bitte versuchen Sie es später erneut." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      {/* --- HEADER --- */}
      <div style={headerStyle}>
        <img src={clientData.logoUrl} alt="Logo" style={logoStyle} />
        <div style={{ fontWeight: '900', color: 'white', textTransform: 'uppercase' }}>{clientData.shopName}</div>
      </div>

      {/* --- CHAT BODY --- */}
      <div ref={scrollRef} style={chatBodyStyle}>
        {messages.map((m, i) => {
          // AI যখন [SHOW_FRONT:p1] পাঠাবে, সেটা খুঁজে বের করা
          const matches = Array.from(m.content.matchAll(/\[SHOW_FRONT:(.*?)\]/g));
          const propertyIds = matches.map(match => match[1]);
          const cleanText = m.content.replace(/\[SHOW_FRONT:.*?\]/g, '').trim();

          return (
            <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
              {cleanText && (
                <div style={{ ...bubbleStyle, backgroundColor: m.role === 'user' ? '#000' : '#fff', color: m.role === 'user' ? '#fff' : '#000' }}>
                  {cleanText}
                </div>
              )}
              
              {/* গাড়ির কার্ড শো করা */}
              {propertyIds.length > 0 && (
                <div style={carGridStyle}>
                  {propertyIds.map(id => {
                    const car = clientData.properties.find((p: any) => p.id === id);
                    if (!car) return null;
                    return (
                      <div key={id} style={carCardStyle}>
                        <img src={car.image} alt={car.name} style={carImgStyle} />
                        <div style={{ padding: '8px' }}>
                          <div style={carNameStyle}>{car.name}</div>
                          <div style={carPriceStyle}>{car.price}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        {loading && <div style={{ fontSize: '12px', color: '#999', padding: '10px' }}>KI schreibt...</div>}
      </div>

      {/* --- INPUT SECTION --- */}
      <div style={inputAreaStyle}>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Schreiben Sie uns..." 
          style={inputStyle}
        />
        <button onClick={handleSend} style={sendBtnStyle}>🚀</button>
      </div>
    </div>
  );
}

// --- STYLES ---
const containerStyle: React.CSSProperties = { width: '100%', maxWidth: '400px', height: '600px', backgroundColor: '#f4f7f6', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontFamily: 'sans-serif', border: '1px solid #ddd' };
const headerStyle: React.CSSProperties = { backgroundColor: '#000', padding: '15px', display: 'flex', alignItems: 'center', gap: '10px' };
const logoStyle: React.CSSProperties = { width: '35px', height: '35px', backgroundColor: '#fff', borderRadius: '8px', objectFit: 'contain' };
const chatBodyStyle: React.CSSProperties = { flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px' };
const bubbleStyle: React.CSSProperties = { padding: '10px 15px', borderRadius: '15px', fontSize: '14px', border: '1px solid #e2e8f0', lineHeight: '1.4' };
const carGridStyle: React.CSSProperties = { display: 'flex', gap: '10px', overflowX: 'auto', marginTop: '10px', paddingBottom: '5px' };
const carCardStyle: React.CSSProperties = { flex: '0 0 140px', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #ddd' };
const carImgStyle: React.CSSProperties = { width: '100%', height: '100px', objectFit: 'cover' };
const carNameStyle: React.CSSProperties = { fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden' };
const carPriceStyle: React.CSSProperties = { fontSize: '10px', color: '#2563eb', fontWeight: '900' };
const inputAreaStyle: React.CSSProperties = { padding: '15px', backgroundColor: '#fff', display: 'flex', gap: '10px', borderTop: '1px solid #eee' };
const inputStyle: React.CSSProperties = { flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none' };
const sendBtnStyle: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' };