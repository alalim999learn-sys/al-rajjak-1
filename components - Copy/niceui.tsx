


// components/nicechat.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';

// moneys.ts এর সাথে সামঞ্জস্যপূর্ণ ইন্টারফেস
interface FAQ {
  question: string;
  answer: string;
}

interface ClientData {
  id: string;
  slug: string;
  shopName: string;
  logoUrl: string;
  mapUrl: string;
  message: string;
  faqs: FAQ[];
  infoPoints: string[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function NiceUI({ clientData }: { clientData: ClientData }) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `Guten Tag! Ich bin আপনার AI-Assistent. ${clientData.message}` 
    }
  ]);
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // অটো স্ক্রল
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
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    if (typeof e !== 'string') setInput('');
    setLoading(true);

    try {
      // আপনার নতুন এপিআই /api/money এ হিট করবে
      const response = await fetch('/api/money', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          slug: clientData.slug
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      } else {
        throw new Error("API Error");
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Entschuldigung, es gibt ein Verbindungsproblem. Bitte versuchen Sie es später noch einmal." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: '100%', maxWidth: '400px', height: '600px', backgroundColor: 'white',
      borderRadius: '24px', border: '1px solid #e2e8f0', display: 'flex',
      flexDirection: 'column', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
      position: 'relative', margin: '0 auto'
    }}>
      
      {/* Header Section */}
      <div style={{
        height: '80px', backgroundColor: '#0f172a', padding: '0 20px',
        display: 'flex', alignItems: 'center', gap: '15px', flexShrink: 0
      }}>
        <div style={{
          width: '45px', height: '45px', backgroundColor: 'white', borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          overflow: 'hidden', flexShrink: 0, border: '1px solid #1e293b'
        }}>
          <img 
            src={clientData.logoUrl} 
            alt={clientData.shopName} 
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} 
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px', lineHeight: '1.2' }}>
            {clientData.shopName}
          </span>
          <span style={{ color: '#22c55e', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
            <span style={{ width: '6px', height: '6px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block' }}></span>
            KI-Assistent Online
          </span>
        </div>
      </div>

      {/* Booking Form Overlay */}
      {showForm && (
        <div style={{
          position: 'absolute', inset: '80px 0 0 0', backgroundColor: 'white',
          zIndex: 20, padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px'
        }}>
          <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', marginBottom: '5px' }}>Termin buchen</h4>
          <input style={inputStyle} placeholder="Vollständiger Name" />
          <input style={inputStyle} placeholder="E-Mail oder Telefon" />
          <textarea style={{ ...inputStyle, height: '80px', resize: 'none' }} placeholder="Ihre Nachricht..."></textarea>
          <button 
            onClick={() => { alert('Gesendet! Vielen Dank.'); setShowForm(false); }}
            style={{
              padding: '12px', backgroundColor: '#16a34a', color: 'white',
              border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px'
            }}
          >
            Anfrage Senden
          </button>
          <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '12px', cursor: 'pointer', marginTop: '5px' }}>
            Zurück zum Chat
          </button>
        </div>
      )}

      {/* Messages Area */}
      <div ref={scrollRef} style={{
        flex: 1, overflowY: 'auto', padding: '15px', backgroundColor: '#f8fafc',
        display: 'flex', flexDirection: 'column', gap: '12px'
      }}>
        {messages.map((m, i) => {
          const hasMapTag = m.content.includes("[SHOW_MAP_BUTTON]");
          const cleanContent = m.content.replace("[SHOW_MAP_BUTTON]", "").trim();

          return (
            <div key={i} style={{
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%', padding: '10px 14px', borderRadius: '16px',
              fontSize: '13px', lineHeight: '1.5',
              backgroundColor: m.role === 'user' ? '#0f172a' : 'white',
              color: m.role === 'user' ? 'white' : '#1e293b',
              border: m.role === 'user' ? 'none' : '1px solid #e2e8f0',
            }}>
              {cleanContent}

              {hasMapTag && (
                <div style={{ marginTop: '10px' }}>
                  <a 
                    href={clientData.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      padding: '10px 14px', backgroundColor: '#2563eb', color: 'white',
                      borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '11px',
                    }}
                  >
                    📍 Auf Google Maps öffnen
                  </a>
                </div>
              )}
            </div>
          );
        })}
        {loading && (
          <div style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', marginLeft: '5px' }}>
            KI schreibt...
          </div>
        )}

        {/* FAQ Quick Replies */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
          {clientData.faqs.map((faq, index) => (
            <button
              key={index}
              onClick={() => handleSend(faq.question)}
              style={{
                fontSize: '11px', padding: '6px 12px', borderRadius: '20px',
                backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #dbeafe',
                cursor: 'pointer'
              }}
            >
              {faq.question}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        {!showForm && messages.length > 2 && (
          <button 
            onClick={() => setShowForm(true)}
            style={{
              alignSelf: 'center', padding: '10px 24px', backgroundColor: '#16a34a',
              color: 'white', border: 'none', borderRadius: '25px',
              fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', 
              marginTop: '10px', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)'
            }}
          >
            🚀 Jetzt anfragen
          </button>
        )}
      </div>

      {/* Input Box Area */}
      <div style={{ padding: '15px', borderTop: '1px solid #f1f5f9', backgroundColor: 'white' }}>
        <form onSubmit={handleSend} style={{
          display: 'flex', gap: '8px', backgroundColor: '#f1f5f9',
          padding: '8px 15px', borderRadius: '30px', alignItems: 'center'
        }}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Schreiben Sie eine Nachricht..."
            style={{
              flex: 1, background: 'transparent', border: 'none',
              outline: 'none', fontSize: '13px', color: '#1e293b'
            }}
          />
          <button 
            type="submit" 
            disabled={loading || !input.trim()} 
            style={{
              width: '35px', height: '35px', backgroundColor: '#0f172a',
              border: 'none', borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: input.trim() ? 1 : 0.5
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: '9px', color: '#cbd5e1', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Powered by Shanon Alam
        </p>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', 
  padding: '12px', 
  border: '1px solid #cbd5e1',
  borderRadius: '12px', 
  fontSize: '13px', 
  outline: 'none',
  boxSizing: 'border-box'
};