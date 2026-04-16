//C:\Users\Shanon\al-rajjak-1\components\furniture.tsx



"use client";
import React, { useState, useRef, useEffect } from 'react';

// --- ১. ফার্নিচার ইমেজ মোডাল (Zoom & Drag) ---
const ImageModal = ({ item, onClose }: { item: any; onClose: () => void }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  if (!item) return null;
  const photo = item.image || item.img || "/no-photo.png";

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
            src={photo} 
            alt={item.name} 
            style={{
              maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`, 
              cursor: zoom > 1 ? 'grab' : 'default', transition: isDragging ? 'none' : 'transform 0.2s', userSelect: 'none'
            }} 
            draggable={false} 
          />
        </div>
        <div style={{ padding: '20px', background: '#fff' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#000' }}>{item.name}</h2>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#e11d48', marginTop: '5px' }}>
             {typeof item.price === 'string' && !item.price.includes('€') ? `€${item.price}` : item.price}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '15px' }}>
            <div style={modalSpecStyle}>🪵 {item.material || 'Holz'}</div>
            <div style={modalSpecStyle}>📏 {item.dimensions || 'N/A'}</div>
            <div style={modalSpecStyle}>📦 {item.stock || 'Auf Lager'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ২. কন্টাক্ট ফর্ম (অটোমেশন সহ আপডেট করা) ---
const ContactForm = ({ clientData, onClose }: { clientData: any; onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    selectedFurniture: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          item: formData.selectedFurniture,
          message: formData.message,
          shopName: clientData.shopName
        }),
      });

      if (res.ok) {
        alert('Erfolgreich gesendet! (সফলভাবে পাঠানো হয়েছে)');
        onClose();
      } else {
        alert('Fehler beim Senden. (পাঠাতে সমস্যা হয়েছে)');
      }
    } catch (error) {
      console.error(error);
      alert('Technischer Fehler.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={modalOverlayFixedStyle} onClick={onClose}>
      <div style={formContentStyle} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={closeBtnStyleDark}>✕</button>
        <h3 style={{ marginBottom: '20px', color: '#000', fontSize: '18px', fontWeight: 'bold' }}>Anfrage Senden</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            required
            type="text" 
            placeholder="Name" 
            style={formInputStyle} 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            required
            type="email" 
            placeholder="E-Mail" 
            style={formInputStyle} 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <select 
            required
            style={formInputStyle} 
            value={formData.selectedFurniture}
            onChange={(e) => setFormData({...formData, selectedFurniture: e.target.value})}
          >
            <option value="" disabled>Möbel auswählen</option>
            {clientData.properties.map((p: any) => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>
          <textarea 
            placeholder="Nachricht" 
            style={{ ...formInputStyle, height: '80px' }}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
          <button 
            type="submit" 
            disabled={loading}
            style={{...submitBtnStyle, opacity: loading ? 0.7 : 1}}
          >
            {loading ? 'Sendet...' : 'Anfrage Abschicken'}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- ৩. মেইন ফার্নিচার চ্যাট কম্পোনেন্ট ---
export default function FurnitureChat({ clientData }: { clientData: any }) {
  const [messages, setMessages] = useState([{ role: 'assistant', content: `Willkommen bei ${clientData.shopName}! Wie kann ich Ihnen bei Ihrer Einrichtung helfen?` }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
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
      const res = await fetch('/api/furniture', {
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
            const itemIds = Array.from(m.content.matchAll(/\[SHOW_FRONT:(.*?)\]/g)).map(match => match[1].trim());
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
                
                {itemIds.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                    {itemIds.map((id, index) => {
                      const item = clientData.properties.find((p: any) => String(p.id) === id);
                      if (!item) return null;
                      return (
                        <div 
                          key={`msg-${i}-item-${id}-${index}`} 
                          style={itemCardSmallStyle} 
                          onClick={() => setSelectedItem(item)}
                        >
                          <img src={item.image || item.img || "/no-photo.png"} style={{ width: '100%', height: '70px', objectFit: 'cover' }} alt={item.name} />
                          <div style={{ padding: '5px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>{item.name}</div>
                            <div style={{ fontSize: '9px', color: '#e11d48', fontWeight: 'bold' }}>
                               {typeof item.price === 'string' && !item.price.includes('€') ? `€${item.price}` : item.price}
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
      {selectedItem && <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      {showForm && <ContactForm clientData={clientData} onClose={() => setShowForm(false)} />}
    </>
  );
}

// স্টাইল অবজেক্টগুলো
const containerStyle: React.CSSProperties = { width: '360px', height: '520px', background: '#f8fafc', borderRadius: '20px', display: 'flex', flexDirection: 'column', position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden' };
const headerStyle: React.CSSProperties = { background: '#000', padding: '12px 15px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const chatBodyStyle: React.CSSProperties = { flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' };
const bubbleBase: React.CSSProperties = { padding: '8px 12px', borderRadius: '15px', fontSize: '13px' };
const itemCardSmallStyle: React.CSSProperties = { background: '#fff', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'transform 0.2s' };
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
const zoomBtn: React.CSSProperties = { background: '#fff', border: 'none', padding: '5px', borderRadius: '5px', cursor: 'pointer', fontSize: '14px'  };