//C:\Users\Shanon\al-rajjak-1\components\furniture.tsx


 
"use client";
import React, { useState, useEffect, useRef } from 'react';

// --- Types ---
interface Product {
  id: string; name: string; brand: string | null; 
  category: string; sub_category: string; price: number; 
  original_price: number | null; 
  movement: string | null; glass_type: string | null;
  water_resistance: string | null; luminous: string | null;
  warranty: string | null; images: string[]; 
}

const CATEGORY_MAP_ES: Record<string, string[]> = {
  "Lujo": ["Metal", "Cuero"],
  "Reloj Inteligente": ["Silicona", "Acero"],
  "Deportivo": ["Digital", "Analógico"],
  "Casual": ["Cuero", "Correa Nato"]
};

export default function GlobalSmartShop() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [selectedRange, setSelectedRange] = useState<'all' | 'entry' | 'mid' | 'high'>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [welcomeMsg, setWelcomeMsg] = useState<string>(""); 
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [shopOwnerNumber] = useState('34111111111');

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProduct]);

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const resProd = await fetch('/api/admin/watches'); 
        const dataProd = await resProd.json();
        if (dataProd.success) setProducts(dataProd.data || []);

        const resWelcome = await fetch('/api/admin/welcom');
        const dataWelcome = await resWelcome.json();
        if (dataWelcome.success && dataWelcome.data && dataWelcome.data.length > 0) {
          const activeMsg = dataWelcome.data.find((m: any) => m.is_active !== false);
          if (activeMsg) setWelcomeMsg(activeMsg.content);
        }
      } catch (e) { 
        console.error("Error loading data:", e); 
      } finally { 
        setTimeout(() => setIsLoading(false), 800); 
      }
    };
    loadInitialData();
  }, []);

  const resetModal = () => {
    setSelectedProduct(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setActiveImgIdx(0);
  };

  const handleStart = (clientX: number, clientY: number) => {
    if (scale > 1) {
      setIsDragging(true);
      dragStart.current = { x: clientX - position.x, y: clientY - position.y };
    }
  };
  const handleMove = (clientX: number, clientY: number) => {
    if (isDragging) setPosition({ x: clientX - dragStart.current.x, y: clientY - dragStart.current.y });
  };
  const handleEnd = () => setIsDragging(false);

  const getProcessedProducts = () => {
    let filtered = products.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSub = selectedSubCategory === 'All' || p.sub_category === selectedSubCategory;
      return matchCat && matchSub;
    });
    const sorted = [...filtered].sort((a, b) => a.price - b.price);
    if (selectedRange === 'all') return sorted;
    const oneThird = Math.floor(sorted.length / 3);
    if (selectedRange === 'entry') return sorted.slice(0, oneThird || 1);
    if (selectedRange === 'mid') return sorted.slice(oneThird, 2 * oneThird || sorted.length);
    return sorted.slice(2 * oneThird);
  };

  const categories = ["All", ...Object.keys(CATEGORY_MAP_ES)];
  const currentSubCats = selectedCategory !== 'All' ? ["All", ...(CATEGORY_MAP_ES[selectedCategory] || [])] : [];

  return (
    <div className="smart-shop-fullscreen-overlay">
      <div style={containerStyle}>
        
        {/* --- Header Section (Rainbow Welcome Message) --- */}
        <div style={headerStyle}>
          <div style={{ fontSize: '18px', fontWeight: '900', color: '#FFD700', padding: '12px 0 2px 0' }}>WATCH VAULT ES</div>
          {welcomeMsg && (
            <div className="db-welcome-msg rainbow-text">
              {welcomeMsg}
            </div>
          )}
        </div>

        <div style={scrollContainer} className="hide-scrollbar">
          {/* Filters */}
          <div style={{ padding: '10px 15px', background: '#0f172a' }}>
            <p style={labelStyle}>Categoría</p>
            <div style={filterRow} className="hide-scrollbar">
              {categories.map(cat => (
                <button key={cat} onClick={() => { setSelectedCategory(cat); setSelectedSubCategory('All'); }}
                  style={{ ...pillStyle, background: selectedCategory === cat ? '#FF4500' : '#1e293b' }}>{cat}</button>
              ))}
            </div>

            {selectedCategory !== 'All' && (
              <>
                <p style={{...labelStyle, marginTop: '10px'}}>Material / Tipo</p>
                <div style={filterRow} className="hide-scrollbar">
                  {currentSubCats.map(sub => (
                    <button key={sub} onClick={() => setSelectedSubCategory(sub)}
                      style={{ ...pillStyle, background: selectedSubCategory === sub ? '#3b82f6' : '#1e293b', fontSize: '11px' }}>{sub}</button>
                  ))}
                </div>
              </>
            )}

            <p style={{...labelStyle, marginTop: '10px'}}>Presupuesto</p>
            <div style={budgetGrid}>
              {['all', 'entry', 'mid', 'high'].map(r => (
                <button key={r} onClick={() => setSelectedRange(r as any)} 
                  style={{ ...budgetBtn, background: selectedRange === r ? '#FFD700' : '#1e293b', color: selectedRange === r ? '#000' : '#fff' }}>{r.toUpperCase()}</button>
              ))}
            </div>
          </div>

          {/* Grid View */}
          <div style={{ padding: '0 15px 20px' }}>
            {isLoading ? (
              <div style={galleryGridStyle}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="skeleton-card"><div className="skeleton-img" /><div className="skeleton-text" /></div>
                ))}
              </div>
            ) : (
              <div style={galleryGridStyle}>
                {getProcessedProducts().map(item => {
                  const hasDiscount = item.original_price && item.original_price > item.price;
                  const discountPercent = hasDiscount ? Math.round(((item.original_price! - item.price) / item.original_price!) * 100) : 0;
                  return (
                    <div key={item.id} style={productCardStyle} onClick={() => setSelectedProduct(item)}>
                      <div style={{ position: 'relative' }}>
                        <img src={item.images?.[0]} alt={item.name} style={productImgStyle} />
                        {hasDiscount && <div style={discountBadge}>-{discountPercent}%</div>}
                      </div>
                      <div style={{ padding: '12px 10px' }}>
                        <div style={brandLabelStyle}>{item.brand || 'PREMIUM'}</div>
                        <div style={modelNameStyle}>{item.name}</div>
                        <div style={{ marginTop: '8px' }}>
                          {hasDiscount && <div style={{ color: '#94a3b8', textDecoration: 'line-through', fontSize: '12px', fontWeight: '600' }}>€{item.original_price}</div>}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={currentPriceStyle}>€{item.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Modal Section */}
        {selectedProduct && (
          <div style={modalOverlay}>
            <div style={modalContent} className="hide-scrollbar">
              <button onClick={resetModal} style={closeBtnStyle}>✕</button>
              <div style={sliderSection} 
                onMouseDown={(e) => handleStart(e.clientX, e.clientY)} onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
                onMouseUp={handleEnd} onMouseLeave={handleEnd}
                onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
                onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)} onTouchEnd={handleEnd}
              >
                <img src={selectedProduct.images[activeImgIdx]} 
                  style={{ ...modalImgStyle, transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging ? 'none' : 'transform 0.2s' }} 
                  alt="watch" draggable={false} />
                {scale === 1 && selectedProduct.images.length > 1 && (
                   <><button style={navBtnLeft} onClick={(e) => { e.stopPropagation(); setActiveImgIdx(prev => prev > 0 ? prev - 1 : selectedProduct.images.length - 1); }}>❮</button>
                   <button style={navBtnRight} onClick={(e) => { e.stopPropagation(); setActiveImgIdx(prev => prev < selectedProduct.images.length - 1 ? prev + 1 : 0); }}>❯</button></>
                )}
              </div>

              <div style={modalDetails}>
                <div style={brandLabelStyle}>{selectedProduct.brand}</div>
                <h2 style={{ fontSize: '24px', fontWeight: '900', margin: '5px 0' }}>{selectedProduct.name}</h2>
                <div style={{ margin: '15px 0', padding: '10px', background: '#f0fdf4', borderRadius: '8px', borderLeft: '5px solid #16a34a' }}>
                    {selectedProduct.original_price && selectedProduct.original_price > selectedProduct.price ? (
                      <>
                        <div style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '16px', fontWeight: 'bold' }}>€{selectedProduct.original_price}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span style={{ fontSize: '32px', fontWeight: '900', color: '#16a34a' }}>€{selectedProduct.price}</span>
                            <span style={{ background: '#ef4444', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '14px', fontWeight: '900' }}>
                              -{Math.round(((selectedProduct.original_price - selectedProduct.price)/selectedProduct.original_price)*100)}% OFF
                            </span>
                        </div>
                      </>
                    ) : (
                      <span style={{ fontSize: '32px', fontWeight: '900', color: '#16a34a' }}>€{selectedProduct.price}</span>
                    )}
                </div>
                <div style={specsBox}>
                  <p style={specRow}><span>⚙️ Movimiento:</span> <b>{selectedProduct.movement || 'N/A'}</b></p>
                  <p style={specRow}><span>💎 Cristal:</span> <b>{selectedProduct.glass_type || 'N/A'}</b></p>
                  <p style={specRow}><span>🌊 Water Res:</span> <b>{selectedProduct.water_resistance || 'N/A'}</b></p>
                  <p style={specRow}><span>🛡️ Garantía:</span> <b>{selectedProduct.warranty || 'N/A'}</b></p>
                </div>
                <button onClick={() => {
                    const msg = encodeURIComponent(`Hola, me interesa este reloj:\n*${selectedProduct.brand} - ${selectedProduct.name}*\nPrecio: €${selectedProduct.price}`);
                    window.open(`https://wa.me/${shopOwnerNumber}?text=${msg}`, '_blank');
                }} style={whatsappBtn}>WHATSAPP ORDER</button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .smart-shop-fullscreen-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #0f172a; z-index: 9999; overflow: hidden; font-family: 'Inter', sans-serif; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          
          /* --- Animated Welcome Message --- */
          .db-welcome-msg { 
            font-size: 13px; 
            padding-bottom: 8px; 
            font-weight: 800; 
            max-width: 90%; 
            margin: 0 auto;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .rainbow-text {
            animation: rainbowAnimation 2s linear infinite;
          }

          @keyframes rainbowAnimation {
            0%   { color: #32CD32; } /* Lime */
            33%  { color: #FFFF00; } /* Yellow */
            66%  { color: #FFA500; } /* Orange */
            100% { color: #32CD32; } /* Back to Lime */
          }

          .skeleton-card { background: #1e293b; border-radius: 12px; padding: 10px; height: 220px; }
          .skeleton-img { width: 100%; height: 130px; background: #334155; border-radius: 8px; }
          .skeleton-text { width: 80%; height: 12px; background: #334155; margin-top: 10px; border-radius: 4px; }
        `}</style>
      </div>
    </div>
  );
}

// --- Styles (CSS-in-JS) ---
const containerStyle: React.CSSProperties = { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', top: 0, left: 0 }; 
const headerStyle: React.CSSProperties = { background: '#1e293b', textAlign: 'center', borderBottom: '1px solid #334155' };
const scrollContainer: React.CSSProperties = { flex: 1, overflowY: 'auto' };
const filterRow: React.CSSProperties = { display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px' };
const labelStyle: React.CSSProperties = { color: '#FFD700', fontSize: '10px', fontWeight: '900', marginBottom: '5px', textTransform: 'uppercase' };
const pillStyle: React.CSSProperties = { color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '15px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' };
const budgetGrid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' };
const budgetBtn: React.CSSProperties = { border: 'none', padding: '8px', borderRadius: '8px', fontSize: '10px', fontWeight: '900' };
const galleryGridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' };
const productCardStyle: React.CSSProperties = { background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', cursor: 'pointer' };
const productImgStyle: React.CSSProperties = { width: '100%', height: '160px', objectFit: 'contain', background: '#f8fafc' };
const discountBadge: React.CSSProperties = { position: 'absolute', top: '8px', right: '8px', background: '#ef4444', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '900', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' };
const brandLabelStyle: React.CSSProperties = { fontSize: '10px', color: '#ef4444', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.5px' };
const modelNameStyle: React.CSSProperties = { fontWeight: '700', fontSize: '13px', color: '#1e293b', height: '34px', overflow: 'hidden', marginTop: '2px' };
const currentPriceStyle: React.CSSProperties = { color: '#059669', fontWeight: '900', fontSize: '19px' };
const modalOverlay: React.CSSProperties = { position: 'fixed', inset: 0, background: '#fff', zIndex: 100000 };
const modalContent: React.CSSProperties = { height: '100%', overflowY: 'auto' };
const sliderSection: React.CSSProperties = { height: '400px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' };
const modalImgStyle: React.CSSProperties = { maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' };
const modalDetails: React.CSSProperties = { padding: '20px', color: '#1e293b' };
const specsBox: React.CSSProperties = { background: '#f1f5f9', padding: '15px', borderRadius: '10px', marginBottom: '20px' };
const specRow: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' };
const whatsappBtn: React.CSSProperties = { width: '100%', padding: '16px', background: '#25D366', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)' };
const closeBtnStyle: React.CSSProperties = { position: 'absolute', top: '15px', left: '15px', background: 'rgba(15, 23, 42, 0.8)', color: '#fff', borderRadius: '50%', width: '40px', height: '40px', border: 'none', zIndex: 101, cursor: 'pointer', fontSize: '18px' };
const navBtnLeft: React.CSSProperties = { position: 'absolute', left: '10px', background: 'rgba(0,0,0,0.2)', color: '#fff', border: 'none', borderRadius: '50%', width: '35px', height: '35px', zIndex: 10 };
const navBtnRight: React.CSSProperties = { position: 'absolute', right: '10px', background: 'rgba(0,0,0,0.2)', color: '#fff', border: 'none', borderRadius: '50%', width: '35px', height: '35px', zIndex: 10 };