////C:\Users\Shanon\al-rajjak-1\components\StripCheckoutModal.tsx








'use client';

import React, { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  quantity: number;
}

interface StripeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  totalPrice: number;
  isProcessing: boolean;
  paymentSuccess: boolean;
  onPaymentSubmit: (e: React.FormEvent) => void;
  onSuccessClose: () => void;
  shopName?: string; // 👈 ডাইনামিক শপ নেম প্রপস
}

export default function StripeCheckoutModal({
  isOpen,
  onClose,
  cart,
  totalPrice,
  isProcessing,
  paymentSuccess,
  onPaymentSubmit,
  onSuccessClose,
  shopName = 'Astral Café', // ডিফল্ট ক্যাফে নাম দেওয়া হলো
}: StripeCheckoutModalProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  if (!isOpen) return null;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    let formatted = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += value[i];
    }
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
      setExpiry(`${value.slice(0, 2)}/${value.slice(2)}`);
    } else {
      setExpiry(value);
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    setCvc(value);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Stripe Header */}
        <div className="bg-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img 
              src="/30/strip.png" 
              alt="Stripe" 
              className="h-5 object-contain"
            />
            <span className="text-xs text-slate-400 font-medium border-l border-slate-700 pl-3">
              Secure Checkout ({shopName})
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {paymentSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto font-bold shadow-inner">
              ✓
            </div>
            <h2 className="text-xl font-bold text-slate-900">Payment Successful!</h2>
            <p className="text-xs text-slate-500">
              Your order has been placed successfully and sent to {shopName}. Thank you!
            </p>
            <button
              onClick={onSuccessClose}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
            >
              Close & Return to Menu
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>{shopName} Order</span>
                <span>£{totalPrice.toFixed(2)}</span>
              </div>
              <div className="text-[11px] text-slate-500 space-y-1 border-t pt-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span>£{(item.priceValue * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Express Checkout</p>
              <button 
                onClick={onPaymentSubmit}
                className="w-full bg-black text-white py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 cursor-pointer shadow-xs"
              >
                <span>Pay / GPay</span> — Pay £{totalPrice.toFixed(2)}
              </button>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-[10px] text-slate-400 uppercase tracking-widest">Or pay with card</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <form onSubmit={onPaymentSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Card Information</label>
                <input 
                  type="text" 
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="4242 4242 4242 4242" 
                  maxLength={19}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-indigo-600 tracking-wider font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Expiration</label>
                  <input 
                    type="text" 
                    value={expiry}
                    onChange={handleExpiryChange}
                    placeholder="MM / YY" 
                    maxLength={5}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-indigo-600 tracking-wider font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">CVC</label>
                  <input 
                    type="text" 
                    value={cvc}
                    onChange={handleCvcChange}
                    placeholder="CVC" 
                    maxLength={4}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-indigo-600 tracking-wider font-mono"
                  />
                </div>
              </div>

              <button
  type="submit"
  disabled={isProcessing}
  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50 mt-4"
>
  {isProcessing ? 'Processing Secure Payment...' : `Pay £${totalPrice.toFixed(2)} Now`}
</button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}