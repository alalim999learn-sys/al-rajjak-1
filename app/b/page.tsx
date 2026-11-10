


//////////C:\Users\Shanon\al-rajjak-1\app\b\page.tsx





'use client';

import React, { useState } from 'react';
import StripeCheckoutModal from '../../components/StripCheckoutModal';

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  image: string;
  badge?: string;
}

interface Category {
  id: string;
  title: string;
  subtitle: string;
  services: Service[];
}

const MENU_DATA: Category[] = [
  {
    id: 'haircuts',
    title: 'Haircuts',
    subtitle: 'Classic cuts, fades, and precision styling.',
    services: [
      {
        id: 'std-cut',
        name: 'Standard Cut',
        description: 'Classic scissor and clipper trim tailored to your style.',
        price: '£18',
        priceValue: 18.00,
        image: '/30/standard.jpg'
      },
      {
        id: 'skin-fade',
        name: 'Skin Fade',
        description: 'Precision zero-grade skin fade with seamless blending.',
        price: '£22',
        priceValue: 22.00,
        image: '/30/skin-fade.jpg',
        badge: 'Popular'
      },
      {
        id: 'clipper-cut',
        name: 'Clipper Cut',
        description: 'Single guard buzz cut over the whole head with clean edges.',
        price: '£14',
        priceValue: 14.00,
        image: '/30/clipper-cut.jpg'
      },
      {
        id: 'kids-cut',
        name: 'Kids Cut (Under 12)',
        description: 'Patient and friendly haircutting service for younger boys.',
        price: '£12',
        priceValue: 12.00,
        image: '/30/ids.jpg'
      },
      {
        id: 'senior-cut',
        name: 'Senior Cut (65+ / OAP)',
        description: 'Traditional, smart haircutting for our senior gents.',
        price: '£12',
        priceValue: 12.00,
        image: '/30/senior.jpg'
      }
    ]
  },
  {
    id: 'beard',
    title: 'Beard & Shaving',
    subtitle: 'Expert beard sculpting, hot towel shaves, and outlines.',
    services: [
      {
        id: 'beard-trim',
        name: 'Beard Trim & Shape Up',
        description: 'Trimmer shaping with razor edge outline for a tidy look.',
        price: '£12',
        priceValue: 12.00,
        image: '/30/trim.jpg'
      },
      {
        id: 'hot-towel',
        name: 'Hot Towel Wet Shave',
        description: 'Traditional straight razor shave with essential oils & hot towel.',
        price: '£16',
        priceValue: 16.00,
        image: '/30/hot.jpg',
        badge: 'Relaxing'
      },
      {
        id: 'beard-sculpt',
        name: 'Beard Sculpting & Lineup',
        description: 'Detailed beard sculpting, gradient fading, and razor sharp lines.',
        price: '£14',
        priceValue: 14.00,
        image: '/30/lineup.jpg'
      }
    ]
  },
  {
    id: 'combos',
    title: 'Combo Deals',
    subtitle: 'Get the complete treatment and save money.',
    services: [
      {
        id: 'hair-beard-combo',
        name: 'Haircut & Beard Combo',
        description: 'Any haircut of your choice combined with a professional beard trim & shape up.',
        price: '£28',
        priceValue: 28.00,
        image: '/30/combo.jpg',
        badge: 'Save £4'
      },
      {
        id: 'vip-package',
        name: 'The VIP Grooming Package',
        description: 'Haircut, Beard Sculpting, Hot Towel Wet Shave, Wash & Hair Styling finish.',
        price: '£38',
        priceValue: 38.00,
        image: '/30/luxury.jpg',
        badge: 'Best Value'
      }
    ]
  }
];

interface CartItem {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  quantity: number;
}

export default function BarberMenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>('haircuts');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isStripeModalOpen, setIsStripeModalOpen] = useState<boolean>(false);
  
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  const currentCategoryData = MENU_DATA.find((cat) => cat.id === activeCategory) || MENU_DATA[0];

  const addToCart = (service: Service) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.id === service.id);
      if (existing) {
        return prevCart.map((c) => (c.id === service.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prevCart, { id: service.id, name: service.name, price: service.price, priceValue: service.priceValue, quantity: 1 }];
    });
  };

  const decreaseQuantity = (id: string) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.id === id);
      if (existing && existing.quantity > 1) {
        return prevCart.map((c) => (c.id === id ? { ...c, quantity: c.quantity - 1 } : c));
      }
      return prevCart.filter((c) => c.id !== id);
    });
  };

  const removeItemCompletely = (id: string) => {
    setCart((prevCart) => prevCart.filter((c) => c.id !== id));
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);

  const handleStripePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col antialiased selection:bg-neutral-900 selection:text-white m-0 p-0">
      
      <style jsx>{`
        @keyframes colorShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient-text {
          background: linear-gradient(270deg, #f59e0b, #ec4899, #06b6d4, #10b981, #f59e0b);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: colorShift 2s ease infinite;
        }
      `}</style>

      <div className="w-full h-dvh bg-white text-neutral-900 flex flex-col overflow-hidden relative m-0 p-0">
        
        {/* NAVBAR */}
        <header className="bg-neutral-950 text-white px-4 py-3.5 flex-shrink-0 border-b border-neutral-800/80 z-30 fixed top-0 left-0 right-0 shadow-md">
          <div className="flex items-center justify-between w-full">
            
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-transparent border border-amber-500/30 flex items-center justify-center text-amber-400 text-base shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                ✂️
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-black tracking-widest uppercase animated-gradient-text leading-none truncate drop-shadow-sm">
                  Barber King
                </h1>
                <p className="text-[10px] text-neutral-400 font-medium mt-1 tracking-tight truncate">
                  74 Baker St, W1U 6TB
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {totalItemsCount > 0 && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>🛒 Cart</span>
                  <span className="bg-neutral-950 text-amber-300 px-1.5 py-0.5 rounded-full text-[10px]">
                    {totalItemsCount}
                  </span>
                </button>
              )}

              <a
                href="tel:+442079460921"
                className="group bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700/90 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-tight transition-all duration-300 flex items-center gap-1.5 active:scale-95 shadow-sm flex-shrink-0 cursor-pointer"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="font-mono text-[10px] tracking-wider text-neutral-200">Call Shop</span>
              </a>
            </div>

          </div>
        </header>

        {/* CATEGORY TABS */}
        <div className="w-full bg-neutral-100 border-b border-neutral-200/90 z-20 fixed top-[65px] left-0 right-0">
          <div className="flex w-full">
            {MENU_DATA.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-1 h-12 px-1 text-center text-xs font-bold tracking-wide transition-all duration-200 relative cursor-pointer select-none flex items-center justify-center ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-inner'
                      : 'text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200/70'
                  }`}
                >
                  <span className={`transition-all duration-200 truncate ${isActive ? 'animated-gradient-text font-black' : 'text-neutral-700 font-semibold'}`}>
                    {cat.title}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400 animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN CONTENT & SERVICES LIST */}
        <main className="flex-1 overflow-y-auto bg-white px-4 pt-[130px] pb-32 space-y-4">
          <div className="space-y-3.5">
            {currentCategoryData.services.map((service) => {
              const cartItem = cart.find((c) => c.id === service.id);
              const qty = cartItem ? cartItem.quantity : 0;

              return (
                <div
                  key={service.id}
                  className="group bg-white border border-neutral-200/90 hover:border-neutral-300 rounded-2xl flex items-stretch h-28 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <div className="relative w-28 h-full bg-neutral-100 flex-shrink-0 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover rounded-l-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0 p-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h3 className="text-xs font-bold text-neutral-950 truncate tracking-tight">
                          {service.name}
                        </h3>
                        {service.badge && (
                          <span className="text-[9px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200/80 px-2 py-0.5 rounded-md flex-shrink-0">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-800 line-clamp-2 leading-relaxed font-medium">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-neutral-950 tracking-tight">
                        {service.price}
                      </span>

                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(service)}
                          className="bg-neutral-950 hover:bg-neutral-800 text-amber-400 px-3 py-1 rounded-xl text-xs font-extrabold active:scale-95 cursor-pointer"
                        >
                          + Select
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-neutral-100 border border-neutral-300 rounded-xl px-2 py-1">
                          <button
                            onClick={() => decreaseQuantity(service.id)}
                            className="w-5 h-5 bg-white border border-neutral-300 text-neutral-800 font-bold rounded-md flex items-center justify-center active:scale-90 cursor-pointer text-xs"
                          >
                            -
                          </button>
                          <span className="text-xs font-extrabold text-neutral-900 w-3 text-center">{qty}</span>
                          <button
                            onClick={() => addToCart(service)}
                            className="w-5 h-5 bg-neutral-950 text-amber-400 font-bold rounded-md flex items-center justify-center active:scale-90 cursor-pointer text-xs"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* FOOTER & CHECKOUT BAR */}
        <footer className="bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 p-3.5 fixed bottom-0 left-0 right-0 z-30 shadow-lg space-y-2">
          {cart.length > 0 && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                  {totalItemsCount} {totalItemsCount === 1 ? 'Service' : 'Services'} Selected
                </p>
                <p className="text-base font-black text-white">Total: £{totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs px-3 py-2 rounded-lg font-bold cursor-pointer"
                >
                  View Cart
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsStripeModalOpen(true);
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-4 py-2 rounded-lg text-xs uppercase tracking-wider cursor-pointer"
                >
                  Pay Now
                </button>
              </div>
            </div>
          )}

          <a
            href="https://search.google.com/local/writereview?placeid=ChIJ7UCbfbMbdkgR7HR4gf6GWKk"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-extrabold py-2.5 px-4 rounded-xl text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md cursor-pointer"
          >
            <span className="text-sm flex-shrink-0">📍</span>
            <span className="animated-gradient-text font-black text-xs tracking-wider">
              Leave a Google Review
            </span>
          </a>
        </footer>

        {/* CART DRAWER */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-black/70 z-50 flex justify-end backdrop-blur-xs">
            <div className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
              <div className="p-4 bg-neutral-950 text-white flex justify-between items-center">
                <h2 className="font-bold text-sm">Your Selected Services</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-neutral-400 hover:text-white font-bold text-lg px-2 cursor-pointer">
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h4 className="font-bold text-xs text-neutral-900">{item.name}</h4>
                      <p className="text-xs text-neutral-500">{item.price} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => decreaseQuantity(item.id)} className="w-6 h-6 bg-neutral-100 border border-neutral-300 rounded font-bold text-xs cursor-pointer flex items-center justify-center">
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, priceValue: item.priceValue, description: '', image: '' })} className="w-6 h-6 bg-neutral-950 text-amber-400 rounded font-bold text-xs cursor-pointer flex items-center justify-center">
                        +
                      </button>
                      <button onClick={() => removeItemCompletely(item.id)} className="ml-2 text-rose-500 hover:text-rose-700 text-xs font-bold cursor-pointer" title="Remove">
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t bg-neutral-50 space-y-3">
                <div className="flex justify-between font-black text-sm text-neutral-900">
                  <span>Total Amount:</span>
                  <span>£{totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsStripeModalOpen(true);
                  }}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Proceed to Pay (£{totalPrice.toFixed(2)})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STRIPE CHECKOUT MODAL */}
        <StripeCheckoutModal
          isOpen={isStripeModalOpen}
          onClose={() => {
            setIsStripeModalOpen(false);
            setPaymentSuccess(false);
          }}
          cart={cart}
          totalPrice={totalPrice}
          isProcessing={isProcessing}
          paymentSuccess={paymentSuccess}
          onPaymentSubmit={handleStripePayment}
          onSuccessClose={() => {
            setCart([]);
            setPaymentSuccess(false);
            setIsStripeModalOpen(false);
          }}
          shopName="Barber King"
        />

      </div>
    </div>
  );
}