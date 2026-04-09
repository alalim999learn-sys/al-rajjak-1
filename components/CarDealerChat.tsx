//C:\Users\Shanon\al-rajjak-1\components\CardealerChat.tsx



"use client";
import React, { useState, useRef, useEffect } from 'react';

// --- ১. গুগল ম্যাপ বাটন কম্পোনেন্ট ---
const MapButton = ({ link }: { link: string }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer" 
    style={mapButtonStyle}
  >
    📍 In Google Maps öffnen
  </a>
);

// --- ২. ইমেজ মোডাল (Extreme Boundary Solution) ---
const ImageModal = ({ car, onClose }: { car: any; onClose: () => void }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  if (!car) return null;
  const safeImagePath = car.image?.startsWith('/') ? car.image : `/${car.image}`;

  const handleZoom = (delta: number) => {
    setZoom(prev => {
      const newZoom = Math.min(Math.max(prev + delta, 1), 4);
      if (newZoom === 1) setPosition({ x: 0, y: 0 });
      return newZoom;
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1 && imgRef.current) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // --- ডাইনামিক বাউন্ডারি ক্যালকুলেশন ---
      const rect = imgRef.current.getBoundingClientRect();
      
      // জুম ছাড়া ইমেজের যে সাইজ বর্তমানে স্ক্রিনে দেখা যাচ্ছে
      const displayedWidth = rect.width / zoom;
      const displayedHeight = rect.height / zoom;

      // জুম হওয়ার কারণে ওপর-নিচে এবং ডানে-বামে কতটুকু বাড়তি জায়গা তৈরি হলো
      const limitX = (displayedWidth * (zoom - 1)) / 2;
      const limitY = (displayedHeight * (zoom - 1)) / 2;

      // মুভমেন্টকে সীমানার ভেতরে লক করে দেওয়া
      const constrainedX = Math.max(-limitX, Math.min(limitX, newX));
      const constrainedY = Math.max(-limitY, Math.min(limitY, newY));

      setPosition({ x: constrainedX, y: constrainedY });
    }
  };

  return (
    <div style={modalOverlayFixedStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
        
        <div style={zoomControls}>
          <button onClick={() => handleZoom(0.5)} style={zoomBtn}>➕</button>
          <button onClick={() => handleZoom(-0.5)} style={zoomBtn}>➖</button>
          {zoom > 1 && <button onClick={() => {setZoom(1); setPosition({x:0, y:0});}} style={zoomBtn}>🔄</button>}
        </div>

        <div 
          style={imageContainer} 
          onMouseDown={(e) => { 
            if(zoom > 1) { 
              setIsDragging(true); 
              setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y }); 
            }
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          <img 
            ref={imgRef}
            src={safeImagePath} 
            alt={car.name} 
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`, 
              cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
              userSelect: 'none'
            }} 
            draggable={false} 
          />
        </div>

        <div style={{ padding: '20px', background: '#ffffff', color: '#000' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{car.name}</h2>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#e11d48', marginTop: '5px' }}>{car.price}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '15px' }}>
            <div style={modalSpecStyle}>⚙️ {car.specs?.engine}</div>
            <div style={modalSpecStyle}>🐎 {car.specs?.hp} PS</div>
            <div style={modalSpecStyle}>📅 {car.specs?.year}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ৩. কন্টাক্ট ফর্ম ---
const ContactForm = ({ clientData, onClose }: { clientData: any; onClose: () => void }) => (
  <div style={modalOverlayFixedStyle} onClick={onClose}>
    <div style={formContentStyle} onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} style={closeBtnStyleDark}>✕</button>
      <h3 style={{ marginBottom: '20px', color: '#000', fontSize: '18px', fontWeight: 'bold' }}>Kontaktanfrage</h3>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={(e) => { e.preventDefault(); alert('Anfrage gesendet!'); onClose(); }}>
        <input type="text" placeholder="Name" style={formInputStyle} required />
        <input type="email" placeholder="E-Mail" style={formInputStyle} required />
        <select style={formInputStyle} defaultValue="">
          <option value="" disabled>Auto auswählen</option>
          {clientData.properties.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <textarea placeholder="Nachricht" style={{ ...formInputStyle, height: '80px', resize: 'none' }}></textarea>
        <button type="submit" style={submitBtnStyle}>Anfrage Senden</button>
      </form>
    </div>
  </div>
);

// --- ৪. মেইন চ্যাট কম্পোনেন্ট ---
export default function CarDealerChat({ clientData }: { clientData: any }) {
  const [messages, setMessages] = useState([{ role: 'assistant', content: `Guten Tag! Willkommen bei ${clientData.shopName}.` }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      if (data.success) setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Technischer Fehler. Versuchen Sie es später." }]);
    } finally { setLoading(false); }
  };

  return (
    <>
      <div className="chat-container-main" style={containerStyle}>
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        `}</style>

        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={clientData.logoUrl} alt="Logo" style={{ width: '99px', borderRadius: '5px' }} />
            <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{clientData.shopName}</div>
          </div>
          <button onClick={() => setShowForm(true)} style={contactBtnStyle}>Kontakt</button>
        </div>

        <div ref={scrollRef} className="custom-scrollbar" style={chatBodyStyle}>
          {messages.map((m, i) => {
            const carIds = Array.from(m.content.matchAll(/\[SHOW_FRONT:(.*?)\]/g)).map(match => match[1]);
            const hasMap = m.content.includes("[SHOW_MAP]");
            const cleanText = m.content.replace(/\[SHOW_FRONT:.*?\]/g, '').replace(/\[SHOW_MAP\]/g, '').trim();
            
            return (
              <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', display: 'flex', flexDirection: 'column' }}>
                {cleanText && (
                  <div style={{ ...bubbleBase, backgroundColor: m.role === 'user' ? '#000' : '#fff', color: m.role === 'user' ? '#fff' : '#111', border: '1px solid #e2e8f0' }}>
                    {cleanText}
                    {hasMap && <MapButton link={clientData.locationLink} />}
                  </div>
                )}
                {carIds.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                    {carIds.map(id => {
                      const car = clientData.properties.find((p: any) => p.id === id);
                      if (!car) return null;
                      return (
                        <div key={id} style={carCardSmallStyle} onClick={() => setSelectedCar(car)}>
                          <img src={car.image} style={{ width: '100%', height: '80px', objectFit: 'cover' }} alt={car.name} />
                          <div style={{ padding: '6px' }}>
                            <div style={{ fontSize: '11px', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{car.name}</div>
                            <div style={{ fontSize: '10px', color: '#e11d48', fontWeight: 'bold' }}>{car.price}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          {loading && <div style={{ fontSize: '12px', color: '#94a3b8', paddingLeft: '5px' }}>Tipper...</div>}
        </div>

        <div style={inputWrapperStyle}>
          <input 
            style={inputFieldStyle} 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
            placeholder="Frage nach Autos..." 
          />
          <button onClick={handleSend} style={sendButtonStyle}>🚀</button>
        </div>
      </div>

      {selectedCar && <ImageModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
      {showForm && <ContactForm clientData={clientData} onClose={() => setShowForm(false)} />}
    </>
  );
}

// --- স্টাইলস ---
const mapButtonStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#4285F4', color: '#fff', padding: '10px', borderRadius: '10px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold', marginTop: '10px', boxShadow: '0 4px 10px rgba(66, 133, 244, 0.3)' };
const containerStyle: React.CSSProperties = { width: '90%', maxWidth: '400px', height: '600px', background: '#f8fafc', borderRadius: '25px', display: 'flex', flexDirection: 'column', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999, border: '1px solid #e2e8f0', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden' };
const headerStyle: React.CSSProperties = { background: '#000', padding: '15px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const contactBtnStyle: React.CSSProperties = { background: '#fff', color: '#000', border: 'none', padding: '5px 12px', borderRadius: '15px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' };
const chatBodyStyle: React.CSSProperties = { flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px' };
const bubbleBase: React.CSSProperties = { padding: '10px 14px', borderRadius: '15px', fontSize: '13px', lineHeight: '1.4' };
const carCardSmallStyle: React.CSSProperties = { background: '#fff', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0', cursor: 'pointer' };
const inputWrapperStyle: React.CSSProperties = { padding: '15px', background: '#fff', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '10px' };
const inputFieldStyle: React.CSSProperties = { flex: 1, padding: '10px 15px', borderRadius: '25px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px', color: '#000' };
const sendButtonStyle: React.CSSProperties = { background: '#000', border: 'none', width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' };
const modalOverlayFixedStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(3px)' };
const modalContentStyle: React.CSSProperties = { width: '90%', maxWidth: '400px', background: '#fff', borderRadius: '25px', overflow: 'hidden', position: 'relative' };
const formContentStyle: React.CSSProperties = { width: '90%', maxWidth: '400px', background: '#fff', borderRadius: '25px', padding: '25px', position: 'relative' };
const imageContainer: React.CSSProperties = { width: '100%', height: '280px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' };
const formInputStyle: React.CSSProperties = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none', color: '#000' };
const submitBtnStyle: React.CSSProperties = { width: '100%', background: '#000', color: '#fff', padding: '14px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' };
const modalSpecStyle: React.CSSProperties = { background: '#f1f5f9', padding: '6px', borderRadius: '6px', fontSize: '11px', textAlign: 'center', color: '#475569' };
const closeBtnStyle: React.CSSProperties = { position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', zIndex: 10 };
const closeBtnStyleDark: React.CSSProperties = { position: 'absolute', top: '10px', right: '10px', background: '#f1f5f9', color: '#000', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' };
const zoomControls: React.CSSProperties = { position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '5px', zIndex: 10 };
const zoomBtn: React.CSSProperties = { background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '12px' };