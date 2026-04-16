//C:\Users\Shanon\al-rajjak-1\components\CardealerChat.tsx



"use client";
import React, { useState, useRef, useEffect } from 'react';

// --- ১. ইমেজ মোডাল (Zoom & Drag) ---
const ImageModal = ({ car, onClose }: { car: any; onClose: () => void }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  if (!car) return null;
  const carPhoto = car.image || car.img || "/no-photo.png";

  const handleZoom = (delta: number) => {
    setZoom(prev => {
      const newZoom = Math.min(Math.max(prev + delta, 1), 4);
      if (newZoom === 1) setPosition({ x: 0, y: 0 });
      return newZoom;
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1 && imgRef.current) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  return (
    <div style={modalOverlayFixedStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
        <div style={zoomControls}>
          <button onClick={() => handleZoom(0.5)} style={zoomBtn}>➕</button>
          <button onClick={() => handleZoom(-0.5)} style={zoomBtn}>➖</button>
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
            src={carPhoto} 
            alt={car.model} 
            style={{
              maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`, 
              cursor: zoom > 1 ? 'grab' : 'default', transition: isDragging ? 'none' : 'transform 0.2s', userSelect: 'none'
            }} 
            draggable={false} 
          />
        </div>
        <div style={{ padding: '20px', background: '#fff' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#000' }}>{car.brand} {car.model}</h2>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#e11d48', marginTop: '5px' }}>
             {typeof car.price === 'string' && !car.price.includes('€') ? `€${car.price}` : car.price}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '15px' }}>
            <div style={modalSpecStyle}>⚙️ {car.engine || 'N/A'}</div>
            <div style={modalSpecStyle}>🐎 {car.hp || '0'} PS</div>
            <div style={modalSpecStyle}>📅 {car.year || 'N/A'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ২. কন্টাক্ট ফর্ম ---
const ContactForm = ({ clientData, onClose }: { clientData: any; onClose: () => void }) => (
  <div style={modalOverlayFixedStyle} onClick={onClose}>
    <div style={formContentStyle} onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} style={closeBtnStyleDark}>✕</button>
      <h3 style={{ marginBottom: '20px', color: '#000', fontSize: '18px', fontWeight: 'bold' }}>Kontaktanfrage</h3>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Name" style={formInputStyle} />
        <input type="email" placeholder="E-Mail" style={formInputStyle} />
        <select style={formInputStyle} defaultValue="">
          <option value="" disabled>Auto auswählen</option>
          {clientData.properties.map((p: any) => <option key={p.id} value={p.id}>{p.brand} {p.model}</option>)}
        </select>
        <textarea placeholder="Nachricht" style={{ ...formInputStyle, height: '80px' }}></textarea>
        <button type="button" onClick={() => {alert('Gesendet!'); onClose();}} style={submitBtnStyle}>Anfrage Senden</button>
      </form>
    </div>
  </div>
);

// --- ৩. মেইন চ্যাট কম্পোনেন্ট (UPDATED) ---
export default function CarDealerChat({ clientData }: { clientData: any }) {
  const [messages, setMessages] = useState([{ role: 'assistant', content: `Guten Tag! Willkommen bei ${clientData.shopName}. Wie kann ich Ihnen helfen?` }]);
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
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Technischer Fehler." }]);
    } finally { setLoading(false); }
  };

  return (
    <>
      <div style={containerStyle}>
        <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }`}</style>
        
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={clientData.logoUrl} alt="Logo" style={{ width: '35px', height: '35px', borderRadius: '5px' }} />
            <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{clientData.shopName}</div>
          </div>
          <button onClick={() => setShowForm(true)} style={contactBtnStyle}>Kontakt</button>
        </div>

        <div ref={scrollRef} className="custom-scrollbar" style={chatBodyStyle}>
          {messages.map((m, i) => {
            const carIds = Array.from(m.content.matchAll(/\[SHOW_FRONT:(.*?)\]/g)).map(match => match[1].trim());
            const cleanText = m.content.replace(/\[SHOW_FRONT:.*?\]/g, '').trim();
            
            return (
              <div key={`msg-${i}`} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '90%' }}>
                {cleanText && (
                  <div style={{ 
                    ...bubbleBase, 
                    backgroundColor: m.role === 'user' ? '#000' : '#fff', 
                    color: m.role === 'user' ? '#fff' : '#000', 
                    border: '1px solid #e2e8f0',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {cleanText}
                  </div>
                )}
                
                {carIds.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                    {carIds.map((id, index) => {
                      const car = clientData.properties.find((p: any) => String(p.id) === id);
                      if (!car) return null;
                      return (
                        <div 
                          key={`msg-${i}-car-${id}-${index}`} 
                          style={carCardSmallStyle} 
                          onClick={() => setSelectedCar(car)}
                        >
                          <img src={car.image || car.img || "/no-photo.png"} style={{ width: '100%', height: '70px', objectFit: 'cover' }} alt={car.model} />
                          <div style={{ padding: '5px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>{car.brand} {car.model}</div>
                            <div style={{ fontSize: '9px', color: '#e11d48', fontWeight: 'bold' }}>
                               {typeof car.price === 'string' && !car.price.includes('€') ? `€${car.price}` : car.price}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          {loading && <div style={{ fontSize: '11px', color: '#94a3b8' }}>Schreibt...</div>}
        </div>

        <div style={inputWrapperStyle}>
          <input style={inputFieldStyle} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Nachricht..." />
          <button onClick={handleSend} style={sendButtonStyle}>🚀</button>
        </div>
      </div>
      {selectedCar && <ImageModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
      {showForm && <ContactForm clientData={clientData} onClose={() => setShowForm(false)} />}
    </>
  );
}

// স্টাইল অবজেক্টগুলো (অপরিবর্তিত)
const containerStyle: React.CSSProperties = { width: '360px', height: '520px', background: '#f8fafc', borderRadius: '20px', display: 'flex', flexDirection: 'column', position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden' };
const headerStyle: React.CSSProperties = { background: '#000', padding: '12px 15px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const chatBodyStyle: React.CSSProperties = { flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' };
const bubbleBase: React.CSSProperties = { padding: '8px 12px', borderRadius: '15px', fontSize: '13px' };
const carCardSmallStyle: React.CSSProperties = { background: '#fff', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'transform 0.2s' };
const inputWrapperStyle: React.CSSProperties = { padding: '10px', background: '#fff', display: 'flex', gap: '8px' };
const inputFieldStyle: React.CSSProperties = { flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '13px', color: '#000' };
const sendButtonStyle: React.CSSProperties = { background: '#000', border: 'none', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer', color: '#fff' };
const modalOverlayFixedStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' };
const modalContentStyle: React.CSSProperties = { width: '90%', maxWidth: '380px', background: '#fff', borderRadius: '15px', overflow: 'hidden', position: 'relative' };
const imageContainer: React.CSSProperties = { width: '100%', height: '250px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' };
const modalSpecStyle: React.CSSProperties = { background: '#f1f5f9', padding: '5px', borderRadius: '5px', fontSize: '10px', color: '#000', textAlign: 'center' };
const closeBtnStyle: React.CSSProperties = { position: 'absolute', top: '10px', right: '10px', background: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer', zIndex: 100, width: '25px', height: '25px' };
const contactBtnStyle: React.CSSProperties = { background: '#fff', color: '#000', border: 'none', padding: '5px 10px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' };
const closeBtnStyleDark: React.CSSProperties = { position: 'absolute', top: '10px', right: '10px', background: '#f1f5f9', border: 'none', cursor: 'pointer', borderRadius: '50%', width: '25px', height: '25px' };
const formContentStyle: React.CSSProperties = { width: '90%', maxWidth: '350px', background: '#fff', padding: '20px', borderRadius: '15px', position: 'relative' };
const formInputStyle: React.CSSProperties = { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', color: '#000', fontSize: '13px' };
const submitBtnStyle: React.CSSProperties = { width: '100%', background: '#000', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const zoomControls: React.CSSProperties = { position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '5px', zIndex: 100 };
const zoomBtn: React.CSSProperties = { background: '#fff', border: 'none', padding: '5px', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' };