


// components/solar.tsx

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { SolarClient } from '@/app/lib/solar'; 

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function SolarChatUI({ clientData }: { clientData: SolarClient }) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `Guten Tag! Ich bin der KI-Assistent von ${clientData.shopName}. Was möchten Sie wissen? Lassen Sie uns darüber sprechen.` 
    }
  ]);
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false); // ফর্ম ওপেন করার স্টেট
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

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
      const response = await fetch('/api/electrician', { // তোর নতুন এপিআই রুট
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          clientData: clientData
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
        content: "Entschuldigung, ein Fehler ist aufgetreten. Bitte versuchen Sie es später noch einmal." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: '100%', maxWidth: '380px', height: '650px', backgroundColor: 'white',
      borderRadius: '2rem', border: '1px solid #f1f5f9', display: 'flex',
      flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
      position: 'relative', margin: '0 auto'
    }}>
      
      {/* --- Sticky Header with Contact Button --- */}
      <div style={{
        padding: '15px 20px', borderBottom: '1px solid #f1f5f9', backgroundColor: 'white',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
        position: 'sticky', top: 0, zIndex: 30
      }}>
        <img src={clientData.logoUrl} alt="Logo" style={{ height: '30px', maxWidth: '100px', objectFit: 'contain' }} />
        
        {/* কন্টাক্ট ফর্ম বাটন */}
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          style={{
            backgroundColor: isFormOpen ? '#ef4444' : '#2563eb',
            color: 'white', padding: '8px 14px', borderRadius: '12px', border: 'none',
            fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s'
          }}
        >
          {isFormOpen ? "Chat x" : "Termin Buchen"}
        </button>
      </div>

      <div style={{ position: 'relative', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* --- Contact Form Overlay --- */}
        {isFormOpen && (
          <div style={{
            position: 'absolute', inset: 0, backgroundColor: 'white', zIndex: 25,
            padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px',
            animation: 'slideIn 0.3s ease-out'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>Kontaktformular</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Bitte füllen Sie das Formular aus, wir melden uns umgehend.</p>
            
            <input placeholder="Name" style={formInputStyle} />
            <input placeholder="Telefon" style={formInputStyle} />
            <input placeholder="Email" style={formInputStyle} />
            <textarea placeholder="Wie können wir helfen?" style={{ ...formInputStyle, height: '80px', resize: 'none' }} />
            
            <button style={{
              backgroundColor: '#0f172a', color: 'white', padding: '14px',
              borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer'
            }}>
              Anfrage Senden
            </button>
          </div>
        )}

        {/* --- Messages Area --- */}
        <div ref={scrollRef} style={{
          flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px'
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%', padding: '12px 16px', borderRadius: '18px',
              fontSize: '13px', lineHeight: '1.5',
              backgroundColor: m.role === 'user' ? '#2563eb' : '#f1f5f9',
              color: m.role === 'user' ? 'white' : '#1e293b',
              boxShadow: m.role === 'user' ? '0 4px 12px rgba(37,99,235,0.2)' : 'none'
            }}>
              {m.content}
            </div>
          ))}
          {loading && <div style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '5px' }}>AI schreibt...</div>}
        </div>
      </div>

      {/* --- Input Box Area --- */}
      <div style={{ padding: '15px', borderTop: '1px solid #f1f5f9' }}>
        <form onSubmit={handleSend} style={{
          display: 'flex', gap: '8px', backgroundColor: '#f8fafc',
          padding: '10px 18px', borderRadius: '30px', border: '1px solid #e2e8f0'
        }}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Fragen Sie uns etwas..."
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '14px' }}
          />
          <button type="submit" disabled={loading || !input.trim()} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#2563eb"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: '9px', color: '#cbd5e1', marginTop: '10px' }}>
          POWERED BY SHANON ALAM
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}} />
    </div>
  );
}

const formInputStyle = {
  width: '100%', padding: '12px', borderRadius: '10px',
  border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none'
};