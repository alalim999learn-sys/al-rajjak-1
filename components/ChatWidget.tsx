


//components/ChatWidget.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi Shanon! I'm your AI agent. How can I help today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await response.json();
      if (data.content) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* পরিবর্তন: bottom-24 এবং right-10 দিয়ে আরও ভেতরে আনা হয়েছে এবং z-index সর্বোচ্চ করা হয়েছে */
    <div 
      style={{ zIndex: 999999, position: 'fixed', bottom: '100px', right: '40px' }}
      className="font-sans flex flex-col items-end"
    >
      
      {/* Chat Window - Open State */}
      {isOpen && (
        <div className="mb-6 w-[320px] md:w-[400px] h-[500px] bg-white rounded-[28px] shadow-[0_20px_80px_rgba(0,0,0,0.4)] border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10">
          
          {/* Header */}
          <div className="bg-black p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Bot size={22} />
              </div>
              <span className="font-black text-xs uppercase tracking-widest">Shanon-AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-blue-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-[20px] text-[13px] font-medium leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-blue-700 text-white rounded-tr-none' 
                    : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none shadow-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-[20px] rounded-tl-none shadow-sm">
                  <Loader2 className="animate-spin text-blue-700" size={16} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-blue-700 outline-none text-black"
            />
            <button 
              onClick={handleSend}
              className="bg-blue-700 text-white p-3 rounded-xl hover:bg-black transition-all"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-700 text-white w-16 h-16 rounded-full shadow-[0_10px_40px_rgba(29,78,216,0.5)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all border-2 border-white/10"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}