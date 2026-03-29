


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

  // অটোমেটিক স্ক্রল ডাউন করার জন্য
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

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

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();

      // Groq থেকে আসা ডাটা অবজেক্ট চেক করা (role & content)
      if (data && data.content) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        console.error("Invalid data format received:", data);
        setMessages((prev) => [...prev, { role: 'assistant', content: "I received an empty response. Please check the API settings." }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, { role: 'assistant', content: "Connection error. Please ensure your GROQ_API_KEY is set in Vercel and redeploy." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      style={{ zIndex: 999999, position: 'fixed', bottom: '100px', right: '40px' }}
      className="font-sans flex flex-col items-end"
    >
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-6 w-[320px] md:w-[400px] h-[500px] bg-white rounded-[28px] shadow-[0_20px_80px_rgba(0,0,0,0.4)] border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          
          {/* Header - Solid Black */}
          <div className="bg-black p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Bot size={22} />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-[10px] uppercase tracking-widest leading-none">Shanon-AI</span>
                <span className="text-[8px] text-green-400 font-bold uppercase mt-1 tracking-tighter italic">Secure Agent Active</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-blue-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-[22px] text-[13px] font-medium leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-700 text-white rounded-tr-none' 
                    : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            
            {/* Loading Spinner */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-4 rounded-[22px] rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 className="animate-spin text-blue-700" size={16} />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Thinking...</span>
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
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-blue-700 outline-none text-black placeholder:text-slate-400 font-medium"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-blue-700 text-white p-3 rounded-xl hover:bg-black transition-all shadow-lg active:scale-90 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-700 text-white w-16 h-16 rounded-full shadow-[0_15px_45px_rgba(29,78,216,0.5)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-2 border-white/10 group"
      >
        {isOpen ? (
          <X size={30} />
        ) : (
          <div className="relative">
             <MessageCircle size={30} />
             <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-blue-700 rounded-full animate-pulse"></span>
          </div>
        )}
      </button>
    </div>
  );
}