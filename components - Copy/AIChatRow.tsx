// components/AIChatRow.tsx
// components/AIChatRow.tsx
// components/AIChatRow.tsx
// components/AIChatRow.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';

const ChatBox = ({ title, avatar, agentName, placeholder, welcomeMsg, buttonText }: any) => {
  const [messages, setMessages] = useState([{ role: 'assistant', content: welcomeMsg }]);
  const [input, setInput] = useState('');
  const [showForm, setShowForm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // অটো-স্ক্রল লজিক
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showForm]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    const currentMessages = [...messages, userMsg];
    setMessages(currentMessages);
    setInput('');
    setMessages(prev => [...prev, { role: 'assistant', content: 'Schreibt...' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: currentMessages, role: title }),
      });
      const data = await response.json();
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { role: 'assistant', content: data.content };
        return newMsgs;
      });
    } catch (error) {
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { role: 'assistant', content: "Entschuldigung, Verbindungsproblem." };
        return newMsgs;
      });
    }
  };

  return (
    <div style={{ 
      width: '100%', height: '480px', backgroundColor: 'white', borderRadius: '24px', 
      border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', 
      overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', position: 'relative' 
    }}>
      
      {/* Header */}
      <div style={{ height: '65px', backgroundColor: '#0f172a', padding: '0 15px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <div style={{ width: '36px', height: '36px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{avatar}</div>
        <div style={{ color: 'white' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '-0.3px' }}>{title}</div>
          <div style={{ color: '#22c55e', fontSize: '10px', fontWeight: '600' }}>● {agentName} (Online)</div>
        </div>
      </div>

      {/* Booking Form Overlay */}
      {showForm && (
        <div style={{ position: 'absolute', top: '65px', left: 0, right: 0, bottom: 0, backgroundColor: 'white', zIndex: 20, padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', animation: 'fadeIn 0.2s ease-in' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a', marginBottom: '5px' }}>{buttonText} Formular</h4>
          <input placeholder="Vollständiger Name" style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '12px', outline: 'none' }} />
          <input placeholder="E-Mail oder Telefon" style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '12px', outline: 'none' }} />
          <textarea 
            placeholder={title.includes("Praxis") ? "Grund des Besuchs..." : "Ihre Nachricht..."} 
            style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '12px', height: '80px', outline: 'none', resize: 'none' }}
          ></textarea>
          <button 
            onClick={() => { alert('Gesendet! Wir melden uns in Kürze.'); setShowForm(false); }} 
            style={{ backgroundColor: '#22c55e', color: 'white', padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', marginTop: '5px' }}
          >
            Anfrage Senden
          </button>
          <button onClick={() => setShowForm(false)} style={{ background: 'none', color: '#64748b', fontSize: '12px', border: 'none', cursor: 'pointer', fontWeight: '500' }}>Zurück zum Chat</button>
        </div>
      )}

      {/* Chat Messages Area */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '15px', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            <div style={{ 
              padding: '10px 14px', borderRadius: '15px', fontSize: '12px', lineHeight: '1.5',
              backgroundColor: m.role === 'user' ? '#0f172a' : 'white', 
              color: m.role === 'user' ? 'white' : '#1e293b', 
              border: m.role === 'user' ? 'none' : '1px solid #e2e8f0',
              boxShadow: m.role === 'user' ? '0 4px 10px rgba(15, 23, 42, 0.15)' : '0 2px 5px rgba(0,0,0,0.02)'
            }}>
              {m.content}
            </div>
          </div>
        ))}
        
        {/* Call to Action Button inside Chat */}
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            style={{ 
              alignSelf: 'center', marginTop: '10px', padding: '10px 20px', 
              backgroundColor: '#22c55e', color: 'white', border: 'none', 
              borderRadius: '25px', fontSize: '12px', fontWeight: '800', 
              cursor: 'pointer', boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            📅 {buttonText}
          </button>
        )}
      </div>

      {/* Message Input Box */}
      <div style={{ padding: '15px', borderTop: '1px solid #f1f5f9', backgroundColor: 'white' }}>
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', width: '100%', gap: '8px', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '25px' }}>
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder={placeholder} 
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '12px', color: '#1e293b' }} 
          />
          <button type="submit" style={{ background: '#0f172a', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default function AIChatRow() {
  return (
    <section style={{ padding: '20px 0' }}>
      <style>{`
        .ai-grid { 
          display: grid; 
          gap: 25px; 
          grid-template-columns: repeat(4, 1fr); 
          max-width: 1400px; 
          margin: 0 auto; 
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 1280px) { .ai-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .ai-grid { grid-template-columns: 1fr; padding: 0 10px; } }
      `}</style>
      
      <div className="ai-grid">
        {/* ১. মেডিকেল অ্যাসিস্ট্যান্ট (লিসা) */}
        <ChatBox 
          title="Praxis Dr. Müller" 
          avatar="🏥" 
          agentName="Lisa" 
          placeholder="Frage zu Dr. Müller..." 
          welcomeMsg="Guten Tag! Ich bin Lisa. Ich helfe Ihnen bei der Terminplanung für Dr. med. Thomas Müller. Wie kann ich helfen?" 
          buttonText="Termin buchen" 
        />

        {/* ২. লিগ্যাল অ্যাসিস্ট্যান্ট (ম্যাক্স) */}
        <ChatBox 
          title="Kanzlei Schmidt" 
          avatar="⚖️" 
          agentName="Max" 
          placeholder="Ihre Rechtsanfrage..." 
          welcomeMsg="Hallo! Ich bin Max, der Assistent von Rechtsanwalt Schmidt. Möchten Sie eine Erstberatung buchen?" 
          buttonText="Beratung planen" 
        />

        {/* ৩. টেকনিক্যাল অ্যাসিস্ট্যান্ট (এলেনা) */}
        <ChatBox 
          title="IT-Consulting Wagner" 
          avatar="🛠️" 
          agentName="Elena" 
          placeholder="Projektanfrage..." 
          welcomeMsg="Hi! Ich bin Elena. Möchten Sie ein technisches Projekt mit Herrn Wagner besprechen?" 
          buttonText="Termin vereinbaren" 
        />

        {/* ৪. কমার্শিয়াল অ্যাসিস্ট্যান্ট (লুকাস) */}
        <ChatBox 
          title="E-Shop Weber" 
          avatar="🛍️" 
          agentName="Lukas" 
          placeholder="Frage zum Produkt..." 
          welcomeMsg="Willkommen! Ich bin Lukas. Ich helfe Ihnen bei Bestellungen oder Abholterminen." 
          buttonText="Jetzt Bestellen" 
        />
      </div>
    </section>
  );
}