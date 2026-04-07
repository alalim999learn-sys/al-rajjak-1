//C:\Users\Shanon\al-rajjak-1\components\CardealerChat.tsx


"use client";
import React, { useState, useRef, useEffect } from 'react';
import CarCard from './CarCard';

export default function CarDealerChat({ clientData }: { clientData: any }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Guten Tag! Ich bin Ihr KI-Berater von ${clientData.shopName}. Wie kann ich Ihnen heute helfen?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
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
      setMessages(prev => [...prev, { role: 'assistant', content: "Systemfehler. Bitte versuchen Sie es später erneut." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={chatContainer}>
      {/* --- PREMIUM HEADER --- */}
      <div style={header}>
        <div style={headerInfo}>
          <div style={onlineBadge}></div>
          <span style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '1px' }}>{clientData.shopName}</span>
        </div>
        <button onClick={() => setShowContactForm(!showContactForm)} style={contactToggleBtn}>
          {showContactForm ? "Chat" : "Kontakt"}
        </button>
      </div>

      <div ref={scrollRef} style={body}>
        {showContactForm ? (
          /* --- CONTACT FORM --- */
          <div style={formWrapper}>
            <h3 style={{fontSize: '18px', marginBottom: '15px'}}>Kontaktanfrage</h3>
            <input placeholder="Name" style={formInput} />
            <input placeholder="Telefonnummer" style={formInput} />
            <textarea placeholder="Nachricht..." style={{...formInput, height: '80px'}}></textarea>
            <button style={formSubmitBtn} onClick={() => alert('Gesendet!')}>Anfrage Senden</button>
          </div>
        ) : (
          /* --- CHAT MESSAGES --- */
          messages.map((m, i) => {
            const matches = Array.from(m.content.matchAll(/\[SHOW_FRONT:(.*?)\]/g));
            const carIds = matches.map(match => match[1]);
            const cleanText = m.content.replace(/\[SHOW_FRONT:.*?\]/g, '').trim();

            return (
              <div key={i} style={{ 
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', 
                maxWidth: '85%',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
              }}>
                {cleanText && (
                  <div style={{ 
                    ...bubbleStyle, 
                    backgroundColor: m.role === 'user' ? '#000' : '#fff', 
                    color: m.role === 'user' ? '#fff' : '#000',
                    borderRadius: m.role === 'user' ? '18px 18px 2px 18px' : '2px 18px 18px 18px',
                  }}>
                    {cleanText}
                  </div>
                )}
                
                {carIds.length > 0 && (
                  <div style={carSlider}>
                    {carIds.map(id => {
                      const car = clientData.properties.find((p: any) => p.id === id);
                      if (!car) return null;
                      return <CarCard key={id} car={car} />;
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
        {loading && <div style={typingIndicator}>KI analysiert Bestand...</div>}
      </div>

      {/* --- INPUT AREA --- */}
      {!showContactForm && (
        <div style={inputArea}>
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Schreiben Sie uns..." 
            style={inputStyle}
          />
          <button onClick={handleSend} style={sendBtn}>🚀</button>
        </div>
      )}
    </div>
  );
}

// --- STYLES (Nice & Premium) ---

const chatContainer: React.CSSProperties = { 
  width: '100%', maxWidth: '420px', height: '650px', 
  display: 'flex', flexDirection: 'column', 
  backgroundColor: '#f8fafc', borderRadius: '28px', 
  overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
  border: '1px solid #e2e8f0', fontFamily: 'Inter, sans-serif'
};

const header: React.CSSProperties = { 
  background: '#000', color: '#fff', padding: '20px', 
  display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
};

const headerInfo: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '10px' };
const onlineBadge: React.CSSProperties = { width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 10px #22c55e' };

const contactToggleBtn: React.CSSProperties = {
  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
  color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer'
};

const body: React.CSSProperties = { 
  flex: 1, overflowY: 'auto', padding: '20px', 
  display: 'flex', flexDirection: 'column', gap: '15px', 
  background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)' 
};

const bubbleStyle: React.CSSProperties = { 
  padding: '12px 16px', fontSize: '14px', 
  lineHeight: '1.5', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' 
};

const carSlider: React.CSSProperties = { 
  display: 'flex', gap: '15px', overflowX: 'auto', 
  padding: '10px 0', scrollbarWidth: 'none' 
};

const inputArea: React.CSSProperties = { 
  padding: '20px', background: '#fff', display: 'flex', gap: '10px', borderTop: '1px solid #f1f5f9' 
};

const inputStyle: React.CSSProperties = { 
  flex: 1, padding: '12px', borderRadius: '14px', 
  border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px' 
};

const sendBtn: React.CSSProperties = { 
  background: '#000', border: 'none', borderRadius: '14px', 
  width: '45px', height: '45px', cursor: 'pointer' 
};

const typingIndicator: React.CSSProperties = { fontSize: '11px', color: '#64748b', fontStyle: 'italic' };

// Form Styles
const formWrapper: React.CSSProperties = { padding: '20px', background: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0' };
const formInput: React.CSSProperties = { width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' };
const formSubmitBtn: React.CSSProperties = { width: '100%', padding: '12px', background: '#000', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' };