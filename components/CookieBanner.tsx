"use client";
import { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // চেক করবে আগে থেকে একসেপ্ট করা আছে কি না
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000); // ২ সেকেন্ড পর দেখাবে
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[100] flex justify-center animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-white border border-slate-200 shadow-2xl rounded-[2rem] p-6 md:p-8 max-w-4xl w-full flex flex-col md:flex-row items-center gap-6">
        
        {/* Icon & Text */}
        <div className="flex items-center gap-4 flex-1">
          <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 hidden sm:block">
            <ShieldCheck size={32} />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg font-black text-slate-900 leading-tight mb-1">
              Your Privacy Matters
            </h4>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              We use cookies to improve your experience and analyze our traffic. By clicking "Accept", you agree to our 
              <a href="/privacy-policy" className="text-blue-700 underline ml-1 hover:text-blue-800">Privacy Policy</a>.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsVisible(false)}
            className="flex-1 md:flex-none px-6 py-3 text-slate-500 font-bold text-sm hover:text-slate-900 transition"
          >
            Decline
          </button>
          <button 
            onClick={acceptCookies}
            className="flex-1 md:flex-none px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition shadow-lg shadow-slate-200"
          >
            Accept All
          </button>
        </div>

        {/* Close Button (Optional) */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-slate-300 hover:text-slate-900"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}