"use client";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setShow(true);
  }, []);

  const handleConsent = (status: string) => {
    localStorage.setItem("cookie-consent", status);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[100] flex justify-center">
      <div className="bg-white border-2 border-slate-100 shadow-2xl rounded-[2rem] p-8 max-w-4xl w-full flex flex-col md:flex-row items-center gap-6">
        
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-black text-slate-900 mb-1">Privacy Settings</h4>
          <p className="text-slate-500 text-sm font-medium">
            We use cookies to ensure the best experience. You can accept all or reject non-essential cookies. 
            Read our <a href="/privacy-policy" className="underline text-blue-700">Privacy Policy</a>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* এই যে তোমার REJECT বাটন */}
          <button 
            onClick={() => handleConsent("rejected")}
            className="px-8 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold text-sm hover:bg-red-50 hover:text-red-600 transition"
          >
            Reject All
          </button>
          
          {/* এই যে তোমার ACCEPT বাটন */}
          <button 
            onClick={() => handleConsent("accepted")}
            className="px-10 py-4 bg-blue-700 text-white rounded-2xl font-black text-sm hover:bg-blue-800 transition shadow-lg shadow-blue-100"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}