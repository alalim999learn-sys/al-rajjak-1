"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/about' },
    { name: 'Terms', href: '/terms' },
    { name: 'Impressum', href: '/impressum' },
    { name: 'Privacy', href: '/privacy-policy' },
  ];

  return (
    <>
      {/* Navbar: Inline Style দিয়ে একদম সলিড কালো নিশ্চিত করা হয়েছে */}
      <nav 
        style={{ backgroundColor: '#000000' }} // Pure Black
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-white/10 ${
          isScrolled ? 'py-3 shadow-2xl' : 'py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          
          {/* Logo - White Text */}
          <a href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="bg-white p-1.5 rounded-lg group-hover:bg-blue-600 transition-colors">
              <Shield className="text-black group-hover:text-white" size={18} />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">
              SHANON<span className="text-blue-500">-ALAM</span>
            </span>
          </a>

          {/* Desktop Navigation - All White Text */}
          <div className="hidden lg:flex items-center space-x-7">
            <div className="flex items-center space-x-6 text-[11px] font-black uppercase tracking-widest text-white">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-white hover:text-blue-500 transition-colors whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <a href="/#contact" className="bg-white text-black px-6 py-2.5 rounded-xl text-xs font-black hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 group shrink-0">
              Get Started <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile Toggle Button - White */}
          <button 
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu Overlay - Full Black */}
        <div 
          style={{ backgroundColor: '#000000' }}
          className={`lg:hidden absolute top-full left-0 w-full border-t border-white/10 shadow-2xl transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
          }`}
        >
          <div className="p-6 flex flex-col space-y-5">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className="text-lg font-black text-white hover:text-blue-500 flex justify-between items-center border-b border-white/5 pb-3"
              >
                {link.name} <ArrowRight size={18} className="text-white/30" />
              </a>
            ))}
            
            <a href="/#contact" onClick={() => setIsOpen(false)} className="bg-white text-black py-4 rounded-2xl text-center text-md font-black mt-4 active:scale-95 transition-transform">
              Start Project
            </a>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}