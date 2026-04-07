


//C:\Users\Shanon\al-rajjak-1\components\ElectricianChat.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';

// ১. ইন্টারফেসগুলোকে অপশনাল (?) করে দেওয়া হয়েছে যাতে ডাটা মিসিং থাকলেও বিল্ড ফেইল না করে
interface FAQ {
  question: string;
  answer: string;
}

interface ClientData {
  id?: string;
  slug?: string;
  shopName: string;
  logoUrl?: string;
  mapUrl?: string;
  welcomeMsg?: string;
  category?: string;
  faqs?: FAQ[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ElectricianChat({ clientData }: { clientData: ClientData }) {
  // ২. ডিফল্ট ভ্যালু সেট করা হয়েছে যাতে ডাটা না থাকলেও ক্র্যাশ না করে
  const shopTitle = clientData?.shopName || "Elektro-Service";
  const welcome = clientData?.welcomeMsg || "Wie kann ich Ihnen heute helfen?";
  const faqs = clientData?.faqs || [];

  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `Guten Tag! Ich bin Ihr KI-Assistent. ${welcome}` 
    }
  ]);
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, showForm]);

  const handleSend = async (e?: React.FormEvent | string) => {
    if (typeof e !== 'string' && e) e.preventDefault();
    
    const messageText = typeof e === 'string' ? e : input;
    if (!messageText.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMsg]);
    if (typeof e !== 'string') setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/electrician', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          clientData: clientData
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Verbindungsproblem. Bitte versuchen Sie es später erneut." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={logoBoxStyle}>
          {clientData?.logoUrl ? (
            <img src={clientData.logoUrl} alt="Logo" style={imgStyle} />
          ) : (
            <span style={{fontSize: '20px'}}>⚡</span>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={titleStyle}>{shopTitle}</span>
          <span style={statusStyle}>
            <span style={dotStyle}></span> Elektro-Experte Online
          </span>
        </div>
      </div>

      {/* Appointment Form */}
      {showForm && (
        <div style={formOverlayStyle}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Termin vereinbaren</h4>
          <input style={inputFieldStyle} placeholder="Ihr Name" />
          <input style={inputFieldStyle} placeholder="Telefonnummer" />
          <textarea style={{ ...inputFieldStyle, height: '80px' }} placeholder="Was ist das Problem?"></textarea>
          <button 
            onClick={() => { alert('Gesendet!'); setShowForm(false); }}
            style={submitBtnStyle}
          >
            Absenden
          </button>
          <button onClick={() => setShowForm(false)} style={backBtnStyle}>Abbrechen</button>
        </div>
      )}

      {/* Chat Area */}
      <div ref={scrollRef} style={chatBodyStyle}>
        {messages.map((m, i) => (
          <div key={i} style={{
            ...bubbleStyle,
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: m.role === 'user' ? '#0f172a' : 'white',
            color: m.role === 'user' ? 'white' : '#1e293b',
            border: m.role === 'user' ? 'none' : '1px solid #e2e8f0',
          }}>
            {m.content}
          </div>
        ))}
        {loading && <div style={typingStyle}>Schreibt...</div>}

        {/* FAQs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {faqs.map((faq, index) => (
            <button key={index} onClick={() => handleSend(faq.question)} style={faqBtnStyle}>
              {faq.question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={footerStyle}>
        <form onSubmit={handleSend} style={inputGroupStyle}>
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Nachricht..." 
            style={mainInputStyle} 
          />
          <button type="submit" disabled={!input.trim()} style={sendBtnStyle}>🚀</button>
        </form>
      </div>
    </div>
  );
}

// --- STYLES ---
const containerStyle: React.CSSProperties = { width: '100%', maxWidth: '400px', height: '600px', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', position: 'relative' };
const headerStyle: React.CSSProperties = { height: '70px', backgroundColor: '#0f172a', padding: '0 15px', display: 'flex', alignItems: 'center', gap: '12px' };
const logoBoxStyle: React.CSSProperties = { width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' };
const imgStyle: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'contain' };
const titleStyle: React.CSSProperties = { color: 'white', fontWeight: 'bold', fontSize: '13px' };
const statusStyle: React.CSSProperties = { color: '#22c55e', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' };
const dotStyle: React.CSSProperties = { width: '6px', height: '6px', backgroundColor: '#22c55e', borderRadius: '50%' };
const chatBodyStyle: React.CSSProperties = { flex: 1, overflowY: 'auto', padding: '15px', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '10px' };
const bubbleStyle: React.CSSProperties = { maxWidth: '85%', padding: '10px 12px', borderRadius: '14px', fontSize: '13px', lineHeight: '1.4' };
const faqBtnStyle: React.CSSProperties = { fontSize: '11px', padding: '5px 10px', borderRadius: '15px', backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #dbeafe', cursor: 'pointer' };
const footerStyle: React.CSSProperties = { padding: '15px', borderTop: '1px solid #eee' };
const inputGroupStyle: React.CSSProperties = { display: 'flex', gap: '8px', backgroundColor: '#f1f5f9', padding: '5px 10px', borderRadius: '25px' };
const mainInputStyle: React.CSSProperties = { flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '13px' };
const sendBtnStyle: React.CSSProperties = { border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' };
const formOverlayStyle: React.CSSProperties = { position: 'absolute', inset: '70px 0 0 0', backgroundColor: 'white', zIndex: 10, padding: '20px' };
const inputFieldStyle: React.CSSProperties = { width: '100%', padding: '10px', marginBottom: '8px', borderRadius: '8px', border: '1px solid #ddd' };
const submitBtnStyle: React.CSSProperties = { width: '100%', padding: '12px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' };
const backBtnStyle: React.CSSProperties = { width: '100%', background: 'none', border: 'none', color: '#666', fontSize: '12px', marginTop: '10px', cursor: 'pointer' };
const typingStyle: React.CSSProperties = { fontSize: '11px', color: '#999', fontStyle: 'italic' };