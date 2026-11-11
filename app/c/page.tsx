/////////C:\Users\Shanon\al-rajjak-1\app\c\page.tsx







'use client';

import React, { useState } from 'react';
import StripeCheckoutModal from '../../components/StripCheckoutModal';

interface MenuItem {
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
  items: MenuItem[];
}

const CAFE_MENU_DATA: Category[] = [
  {
    id: 'hot-drinks',
    title: 'Hot Drinks',
    subtitle: '',
    items: [
      {
        id: 'flat-white',
        name: 'Flat White',
        description: 'Rich espresso with micro-foamed velvety milk.',
        price: '£3.50',
        priceValue: 3.50,
        image: '/30/white.jpg',
        badge: 'Popular'
      },
      {
        id: 'latte',
        name: 'Latte / Cappuccino',
        description: 'Classic espresso balanced with steamed milk and foam.',
        price: '£3.80',
        priceValue: 3.80,
        image: '/30/latte.jpg'
      },
      {
        id: 'americano',
        name: 'Americano',
        description: 'Espresso shots topped with hot water for a clean, bold taste.',
        price: '£3.00',
        priceValue: 3.00,
        image: '/30/ameriano.jpg'
      },
      {
        id: 'espresso',
        name: 'Espresso',
        description: 'Short, strong, and intensely aromatic single or double shot.',
        price: '£2.50',
        priceValue: 2.50,
        image: '/30/epress.jpg'
      },
      {
        id: 'hot-choco',
        name: 'Hot Chocolate',
        description: 'Decadent Belgian chocolate topped with marshmallows.',
        price: '£4.00',
        priceValue: 4.00,
        image: '/30/mars.jpg',
        badge: 'Comfort'
      }
    ]
  },
  {
    id: 'bakery',
    title: 'Bakery & Pastries',
    subtitle: '',
    items: [
      {
        id: 'butter-croissant',
        name: 'Butter Croissant',
        description: 'Flaky, golden, and freshly baked French style pastry.',
        price: '£2.80',
        priceValue: 2.80,
        image: '/30/cr.jpg',
        badge: 'Fresh'
      },
      {
        id: 'almond-croissant',
        name: 'Almond Croissant',
        description: 'Filled with rich almond frangipane and topped with flakes.',
        price: '£3.50',
        priceValue: 3.50,
        image: '/30/almond.jpg'
      },
      {
        id: 'muffin',
        name: 'Blueberry Muffin',
        description: 'Soft sponge packed with juicy blueberries and a crumb topping.',
        price: '£3.00',
        priceValue: 3.00,
        image: '/30/muffin.jpg'
      },
      {
        id: 'brownie',
        name: 'Chocolate Brownie',
        description: 'Fudgy, rich dark chocolate square with a crispy crust.',
        price: '£3.20',
        priceValue: 3.20,
        image: '/30/brownie.jpg'
      }
    ]
  },
  {
    id: 'breakfast-lunch',
    title: 'Breakfast & Lunch',
    subtitle: '',
    items: [
      {
        id: 'avocado-toast',
        name: 'Avocado & Poached Egg Toast',
        description: 'Smashed avocado, chilli flakes, and free-range egg on sourdough.',
        price: '£7.50',
        priceValue: 7.50,
        image: '/30/3-1.jpg',
        badge: 'Chef Choice'
      },
      {
        id: 'smoked-salmon-bagel',
        name: 'Smoked Salmon & Cream Cheese Bagel',
        description: 'Fresh bagel layered with creamy cheese, smoked salmon, and dill.',
        price: '£7.20',
        priceValue: 7.20,
        image: '/30/3-2.jpg',
        badge: 'Popular'
      },
      {
        id: 'chicken-panini',
        name: 'Chicken & Pesto Panini',
        description: 'Grilled chicken breast, basil pesto, and mozzarella.',
        price: '£6.80',
        priceValue: 6.80,
        image: '/30/3-3.jpg'
      }
    ]
  },
  {
    id: 'cold-drinks',
    title: 'Cold Drinks',
    subtitle: '',
    items: [
      {
        id: 'iced-latte',
        name: 'Iced Latte',
        description: 'Double shot espresso poured over cold milk and ice cubes.',
        price: '£4.20',
        priceValue: 4.20,
        image: '/30/401.jpg',
        badge: 'Refreshing'
      },
      {
        id: 'iced-matcha',
        name: 'Iced Matcha Green Tea',
        description: 'Premium ceremonial grade Japanese matcha over ice and milk.',
        price: '£4.50',
        priceValue: 4.50,
        image: '/30/403.jpg'
      },
      {
        id: 'orange-juice',
        name: 'Fresh Orange Juice',
        description: '100% freshly squeezed sweet oranges, chilled to perfection.',
        price: '£3.50',
        priceValue: 3.50,
        image: '/30/404.jpg'
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

interface OrderHistoryItem {
  orderId: string;
  time: string;
  items: CartItem[];
  totalAmount: number;
}

export default function CafeMenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>('hot-drinks');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isStripeModalOpen, setIsStripeModalOpen] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([]);

  const currentCategoryData = CAFE_MENU_DATA.find((cat) => cat.id === activeCategory) || CAFE_MENU_DATA[0];

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.id === item.id);
      if (existing) {
        return prevCart.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prevCart, { id: item.id, name: item.name, price: item.price, priceValue: item.priceValue, quantity: 1 }];
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
    if (cart.length === 0) return;

    setIsProcessing(true);
    setIsCartOpen(false);

    const currentCartCopy = [...cart];
    const currentTotal = totalPrice;

    setTimeout(() => {
      const newOrder: OrderHistoryItem = {
        orderId: `AC-${Math.floor(1000 + Math.random() * 9000)}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        items: currentCartCopy,
        totalAmount: currentTotal
      };

      setOrderHistory((prev) => [newOrder, ...prev]);
      setCart([]); // পেমেন্ট শেষে কার্ট খালি করা হচ্ছে

      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  const totalRevenue = orderHistory.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="w-full h-dvh bg-stone-50 text-stone-900 grid grid-rows-[auto_1fr_auto] antialiased selection:bg-amber-400 selection:text-stone-950 overflow-hidden relative">

      <style jsx>{`
        @keyframes colorShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-shop-name {
          background: linear-gradient(270deg, #00f2fe, #4facfe, #00ff87, #ff007f, #00f2fe);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: colorShift 5s ease infinite;
        }
        .animated-review-text {
          background: linear-gradient(270deg, #ffd700, #ff4500, #00ffff, #ff1493, #ffd700);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: colorShift 5s ease infinite;
        }
      `}</style>

      {/* HEADER & CATEGORY TABS */}
      <div className="w-full bg-white shadow-md z-30 flex-shrink-0">
        <header className="bg-[#3e2723] text-stone-100 px-4 py-3.5 border-b border-[#4e342e] w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-transparent border border-amber-500/30 flex items-center justify-center text-amber-400 text-base shadow-sm flex-shrink-0">
                ☕
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-black tracking-widest uppercase animated-shop-name leading-none truncate">
                  Astral Café
                </h1>
                <p className="text-[10px] text-amber-200/70 font-medium mt-1 tracking-tight truncate">
                  8 Regency St, SW1P 2EB
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="bg-amber-400 hover:bg-amber-300 text-stone-950 px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95"
              >
                {showHistory ? '← Back to Menu' : '📊 Owner Dashboard'}
              </button>

              {totalItemsCount > 0 && !showHistory && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="bg-amber-400 hover:bg-amber-300 text-stone-950 px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>🛒 Cart</span>
                  <span className="bg-stone-950 text-amber-300 px-1.5 py-0.5 rounded-full text-[10px]">
                    {totalItemsCount}
                  </span>
                </button>
              )}
            </div>
          </div>
        </header>

        {!showHistory && (
          <div className="bg-stone-200 border-b border-stone-300 w-full">
            <div className="grid grid-cols-2 gap-0 w-full">
              {CAFE_MENU_DATA.map((cat, idx) => {
                const isActive = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full py-3 px-2 text-xs font-bold tracking-wide transition-all text-center truncate cursor-pointer select-none ${
                      idx % 2 === 0 ? 'border-r border-stone-300' : ''
                    } ${idx < 2 ? 'border-b border-stone-300' : ''} ${
                      isActive ? 'bg-[#3e2723] text-amber-100 font-black shadow-inner' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* MAIN VIEW */}
      {showHistory ? (
        <main className="w-full overflow-y-auto bg-stone-100 px-4 py-4 space-y-4 z-10 pb-28">
          
          <button
            onClick={() => setShowHistory(false)}
            className="w-full bg-[#3e2723] hover:bg-[#2c1d1a] text-amber-300 py-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
          >
            <span>← Return to Menu & Take Order</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-stone-200 p-4 rounded-3xl shadow-sm flex flex-col justify-between">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-700">Total Revenue Today</span>
              <h3 className="text-2xl font-black text-stone-900 mt-2">£{totalRevenue.toFixed(2)}</h3>
              <p className="text-[10px] text-stone-500 mt-1">Live POS Stream</p>
            </div>

            <div className="bg-white border border-stone-200 p-4 rounded-3xl shadow-sm flex flex-col justify-between">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-700">Completed Orders</span>
              <h3 className="text-2xl font-black text-stone-900 mt-2">{orderHistory.length}</h3>
              <p className="text-[10px] text-stone-500 mt-1">Stripe Verified</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-600">Live Orders Stream</h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-300 px-2 py-0.5 rounded-full font-extrabold">● Real-time Sync</span>
            </div>

            {orderHistory.length === 0 ? (
              <div className="bg-white border border-stone-200 p-8 rounded-3xl text-center space-y-2 shadow-xs">
                <span className="text-2xl">☕</span>
                <p className="text-xs font-bold text-stone-800">No orders placed yet</p>
                <p className="text-[11px] text-stone-500">Go to menu and place a test order to see live updates instantly on this dashboard.</p>
              </div>
            ) : (
              orderHistory.map((order) => (
                <div key={order.orderId} className="bg-white border border-stone-200 p-4 rounded-2xl shadow-xs flex justify-between items-center transition-all hover:border-amber-400">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-stone-900">{order.orderId}</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-700 border border-emerald-300 px-2 py-0.5 rounded-md font-extrabold">Paid (Stripe)</span>
                    </div>
                    <p className="text-xs font-bold text-stone-700">
                      {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </p>
                    <span className="text-[10px] text-stone-400 font-mono">🕒 {order.time}</span>
                  </div>
                  <span className="text-base font-black text-stone-900 font-mono">£{order.totalAmount.toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        </main>
      ) : (
        <main className="w-full overflow-y-auto bg-stone-50 px-3 py-3 space-y-3 z-10 pb-28">
          <div className="space-y-3">
            {currentCategoryData.items.map((item) => {
              const cartItem = cart.find((c) => c.id === item.id);
              const qty = cartItem ? cartItem.quantity : 0;

              return (
                <div key={item.id} className="group bg-white border border-stone-200 hover:border-amber-400 rounded-2xl flex items-stretch h-32 shadow-xs transition-all overflow-hidden">
                  <div className="relative w-28 h-full bg-stone-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-l-2xl" />
                  </div>

                  <div className="flex-1 min-w-0 p-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h3 className="text-xs sm:text-sm font-extrabold text-stone-900 truncate">{item.name}</h3>
                        {item.badge && (
                          <span className="text-[9px] font-extrabold uppercase bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-600 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-stone-900">{item.price}</span>

                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-stone-900 hover:bg-stone-800 text-amber-300 px-3.5 py-1.5 rounded-xl text-xs font-black active:scale-95 cursor-pointer shadow-xs transition-all"
                        >
                          + Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-stone-100 border border-stone-300 rounded-xl px-2 py-1 shadow-inner">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-6 h-6 bg-white border border-stone-300 text-stone-800 font-bold rounded-lg flex items-center justify-center active:scale-90 cursor-pointer shadow-xs"
                          >
                            -
                          </button>
                          <span className="text-xs font-black text-stone-900 w-4 text-center">{qty}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-6 h-6 bg-stone-900 text-amber-300 font-black rounded-lg flex items-center justify-center active:scale-90 cursor-pointer shadow-xs"
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
      )}

      {/* FOOTER & REVIEW */}
      <footer className="w-full bg-stone-950 text-stone-100 p-3.5 z-30 border-t border-stone-800 shadow-2xl flex-shrink-0 space-y-2.5">
        {cart.length > 0 && !showHistory && (
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-3.5 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-amber-400 font-extrabold">
                {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'} Selected
              </p>
              <p className="text-base font-black text-white">Total: £{totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs px-3.5 py-2.5 rounded-xl font-bold cursor-pointer transition-all"
              >
                View Cart
              </button>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsStripeModalOpen(true);
                }}
                className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-lg transition-all active:scale-95"
              >
                Pay Now
              </button>
            </div>
          </div>
        )}

        <a
          href="https://search.google.com/local/writereview?placeid=ChIJsxvXmt0EdkgRhuFj9XuiBk0"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white hover:bg-stone-100 text-stone-950 font-extrabold py-3 px-4 rounded-xl text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
        >
          <svg className="w-4 h-4 text-rose-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-black text-xs tracking-wider animated-review-text">📍 Leave a Google Review</span>
        </a>
      </footer>

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="p-4 bg-[#3e2723] text-white flex justify-between items-center">
              <h2 className="font-bold text-xs uppercase tracking-wider">Your Order Summary</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-stone-300 hover:text-white font-bold text-lg px-2 cursor-pointer">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h4 className="font-bold text-xs text-stone-900">{item.name}</h4>
                    <p className="text-xs text-stone-500">{item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => decreaseQuantity(item.id)} className="w-6 h-6 bg-stone-100 border border-stone-300 rounded font-bold text-xs cursor-pointer flex items-center justify-center">
                      -
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, priceValue: item.priceValue, description: '', image: '' })} className="w-6 h-6 bg-stone-900 text-amber-300 rounded font-bold text-xs cursor-pointer flex items-center justify-center">
                      +
                    </button>
                    <button onClick={() => removeItemCompletely(item.id)} className="ml-2 text-rose-500 hover:text-rose-700 text-xs font-bold cursor-pointer" title="Remove">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-stone-50 space-y-3">
              <div className="flex justify-between font-black text-sm text-stone-900">
                <span>Total Amount:</span>
                <span>£{totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsStripeModalOpen(true);
                }}
                className="w-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-md cursor-pointer"
              >
                Proceed to Pay (£{totalPrice.toFixed(2)})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STRIPE CHECKOUT MODAL - FIXED: Now passes live current cart and totalPrice correctly */}
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
          setPaymentSuccess(false);
          setIsStripeModalOpen(false);
          setShowHistory(true);
        }}
        shopName="Astral Café"
      />

    </div>
  );
}