//C:\Users\Shanon\al-rajjak-1\components\CardealerChat.tsx



"use client";
import React, { useState, useRef, useEffect } from 'react';

// --- ১. জুম এবং ড্র্যাগ সুবিধাসহ ইমেজ মোডাল (BLACK THEME) ---
const ImageModal = ({ car, onClose }: { car: any; onClose: () => void }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 1));
    if (zoom <= 1.5) setPosition({ x: 0, y: 0 });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const onMouseUp = () => setIsDragging(false);

  return (
    <div style={modalOverlayFixedStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={closeBtnStyle}>✕</button>
        <div style={zoomControls}>
          <button onClick={handleZoomIn} style={zoomBtn}>➕</button>
          <button onClick={handleZoomOut} style={zoomBtn}>➖</button>
        </div>
        <div style={imageContainer} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
          <img 
            src={car.image} 
            alt={car.name} 
            style={{
              ...modalImageStyle, 
              transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`, 
              cursor: zoom > 1 ? 'grab' : 'default'
            }} 
            draggable={false} 
          />
        </div>
        <div style={{ padding: '20px', background: '#111' }}>
          <h2 style={modalCarName}>{car.name}</h2>
          <div style={modalPrice}>{car.price}</div>
          <div style={modalGrid}>
            <div style={modalSpec}>⚙️ {car.specs.engine}</div>
            <div style={modalSpec}>🐎 {car.specs.hp} PS</div>
            <div style={modalSpec}>📅 {car.specs.year}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ২. কন্টাক্ট ফর্ম কম্পোনেন্ট ---
const ContactForm = ({ clientData, onClose }: { clientData: any; onClose: () => void }) => (
  <div style={modalOverlayFixedStyle} onClick={onClose}>
    <div style={formContentStyle} onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} style={closeBtnStyle}>✕</button>
      <h3 style={{ marginBottom: '15px', color: '#111' }}>Kontaktanfrage</h3>
      <form style={formWrapper} onSubmit={(e) => { e.preventDefault(); alert('Gesendet!'); onClose(); }}>
        <input type="text" placeholder="Name" style={formInput} required />
        <input type="email" placeholder="E-Mail" style={formInput} required />
        <input type="tel" placeholder="Telefon" style={formInput} />
        <select style={formInput}>
          {clientData.properties.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <textarea placeholder="Nachricht" style={{ ...formInput, height: '80px' }}></textarea>
        <button type="submit" style={submitBtn}>Anfrage Senden</button>
      </form>
    </div>
  </div>
);

// --- ৩. মেইন চ্যাট কম্পোনেন্ট ---
export default function CarDealerChat({ clientData }: { clientData: any }) {
  const [messages, setMessages] = useState([{ role: 'assistant', content: `Guten Tag! Willkommen bei ${clientData.shopName}.` }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, loading]);

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
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Fehler." }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="chat-container-main" style={containerStyle}>
      <style>{`
        @media (max-width: 600px) {
          .chat-container-main {
            width: 95% !important;
            height: 85vh !important;
            right: 2.5% !important;
            bottom: 10px !important;
            border-radius: 20px !important;
          }
        }
      `}</style>

      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={logoWrapper}>
            <img src="/logos/sd.jpg" alt="Logo" style={logoStyle} />
          </div>
          <div style={shopNameText}>{clientData.shopName}</div>
        </div>
        <button onClick={() => setShowForm(true)} style={contactTextStyle}>Kontakt</button>
      </div>

      <div ref={scrollRef} style={chatBodyStyle}>
        {messages.map((m, i) => {
          const carIds = Array.from(m.content.matchAll(/\[SHOW_FRONT:(.*?)\]/g)).map(match => match[1]);
          const cleanText = m.content.replace(/\[SHOW_FRONT:.*?\]/g, '').trim();
          return (
            <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '90%' }}>
              {cleanText && <div style={{ ...bubbleBase, backgroundColor: m.role === 'user' ? '#000' : '#fff', color: m.role === 'user' ? '#fff' : '#111' }}>{cleanText}</div>}
              {carIds.length > 0 && (
                <div style={carGridStyle}>
                  {carIds.map(id => {
                    const car = clientData.properties.find((p: any) => p.id === id);
                    return car ? (
                      <div key={id} style={carCardStyle} onClick={() => setSelectedCar(car)}>
                        <img src={car.image} style={carImageStyle} alt={car.name} />
                        <div style={cardInfo}>
                          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#111' }}>{car.name}</div>
                          <div style={{ fontSize: '11px', color: '#666' }}>{car.price}</div>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedCar && <ImageModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
      {showForm && <ContactForm clientData={clientData} onClose={() => setShowForm(false)} />}

      <div style={inputWrapper}>
        <input style={inputStyle} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Schreiben..." />
        <button onClick={handleSend} style={sendBtnStyle}>🚀</button>
      </div>
    </div>
  );
}

// --- CSS STYLES ---
const containerStyle: React.CSSProperties = { 
  width: '100%', 
  maxWidth: '420px', 
  height: '650px', 
  background: '#f1f5f9', 
  borderRadius: '30px', 
  display: 'flex', 
  flexDirection: 'column', 
  overflow: 'hidden', 
  position: 'fixed', 
  top: '50%',          // উপর থেকে ৫০%
  left: '50%',         // বাম থেকে ৫০%
  transform: 'translate(-50%, -50%)', // একদম নিখুঁত সেন্টারে নিয়ে আসার ম্যাজিক
  zIndex: 9999, 
  border: '1px solid #ddd',
  boxShadow: '0 20px 50px rgba(0,0,0,0.2)' 
};

const headerStyle: React.CSSProperties = { background: '#000', padding: '12px 15px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '70px' };
const logoWrapper: React.CSSProperties = { width: '60px', height: '60px', borderRadius: '8px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid #333', flexShrink: 0 };
const logoStyle: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'contain', padding: '2px' };
const shopNameText: React.CSSProperties = { fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.5px', lineHeight: '1.2' };
const contactTextStyle: React.CSSProperties = { background: '#fff', color: '#000', border: 'none', borderRadius: '20px', padding: '6px 15px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' };

const chatBodyStyle: React.CSSProperties = { flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px' };
const bubbleBase: React.CSSProperties = { padding: '10px 15px', borderRadius: '15px', fontSize: '13px', border: '1px solid #eee' };
const carGridStyle: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' };
const carCardStyle: React.CSSProperties = { background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #ddd', cursor: 'pointer', flex: '1 1 calc(50% - 10px)' };
const carImageStyle: React.CSSProperties = { width: '100%', height: '90px', objectFit: 'cover' };
const cardInfo: React.CSSProperties = { padding: '8px' };
const inputWrapper: React.CSSProperties = { padding: '15px', background: '#fff', display: 'flex', gap: '10px', borderTop: '1px solid #eee' };
const inputStyle: React.CSSProperties = { flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #ddd' };
const sendBtnStyle: React.CSSProperties = { background: '#000', border: 'none', borderRadius: '10px', color: '#fff', width: '45px', cursor: 'pointer' };

// মোডাল ফিক্সড পজিশন
const modalOverlayFixedStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.95)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' };
const modalContentStyle: React.CSSProperties = { width: '90%', maxWidth: '400px', background: '#111', borderRadius: '20px', overflow: 'hidden', position: 'relative', border: '1px solid #333' };
const imageContainer: React.CSSProperties = { width: '100%', height: '250px', overflow: 'hidden', position: 'relative', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #333' };
const modalImageStyle: React.CSSProperties = { width: '100%', transition: 'transform 0.1s ease-out' };
const closeBtnStyle: React.CSSProperties = { position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', zIndex: 1100 };
const zoomControls: React.CSSProperties = { position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '5px', zIndex: 1100 };
const zoomBtn: React.CSSProperties = { background: 'rgba(255,255,255,0.1)', border: '1px solid #444', color: '#fff', borderRadius: '5px', padding: '5px', cursor: 'pointer' };
const modalCarName: React.CSSProperties = { margin: '0', fontSize: '20px', fontWeight: '900', color: '#fff' };
const modalPrice: React.CSSProperties = { fontSize: '18px', fontWeight: 'bold', color: '#fff', marginTop: '5px' };
const modalGrid: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '15px' };
const modalSpec: React.CSSProperties = { fontSize: '11px', background: '#222', color: '#ccc', padding: '8px', borderRadius: '8px', border: '1px solid #333' };

const formContentStyle: React.CSSProperties = { width: '85%', maxWidth: '350px', background: '#fff', borderRadius: '20px', padding: '25px', position: 'relative' };
const formWrapper: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '10px' };
const formInput: React.CSSProperties = { padding: '10px', borderRadius: '8px', border: '1px solid #ddd', color: '#111' };
const submitBtn: React.CSSProperties = { background: '#000', color: '#fff', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };