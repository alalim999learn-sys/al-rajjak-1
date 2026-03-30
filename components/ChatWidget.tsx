


//components/ChatWidgets.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [currentRole, setCurrentRole] = useState('agent');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 🛠️ Global function to trigger from anywhere
  useEffect(() => {
    (window as any).activateAI = (role: string, welcome: string) => {
      setIsOpen(true);
      setCurrentRole(role);
      setMessages([{ role: 'assistant', content: welcome }]);
    };
  }, []);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg], role: currentRole }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error. Try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} style={{ backgroundColor: '#0f172a', color: 'white', padding: '15px', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div style={{ width: '320px', height: '480px', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          <div style={{ backgroundColor: '#0f172a', padding: '15px', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{currentRole.toUpperCase()} MODE</span>
            <X size={18} onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }} />
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '15px', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%', padding: '10px', borderRadius: '12px', fontSize: '13px', backgroundColor: m.role === 'user' ? '#0f172a' : '#fff', color: m.role === 'user' ? '#fff' : '#000', border: '1px solid #e2e8f0' }}>
                {m.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} style={{ padding: '10px', borderTop: '1px solid #eee', display: 'flex', gap: '5px' }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type..." style={{ flex: 1, padding: '8px', borderRadius: '20px', border: '1px solid #ddd', outline: 'none' }} />
            <button type="submit" style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px', borderRadius: '50%', border: 'none' }}><Send size={16} /></button>
          </form>
        </div>
      )}
    </div>
  );
}