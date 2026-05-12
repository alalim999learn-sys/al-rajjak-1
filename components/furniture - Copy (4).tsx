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

export default function GlobalSmartShop() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [selectedRange, setSelectedRange] = useState<'all' | 'entry' | 'mid' | 'high'>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [shopOwnerNumber] = useState('34111111111');

  // --- Zoom/Pan States ---
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/admin/watches'); 
        const data = await res.json();
        if (data.success) setProducts(data.data || []);
      } catch (e) { console.error("Error", e); }
      finally { setTimeout(() => setIsLoading(false), 800); }
    };
    loadProducts();
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

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="smart-shop-fullscreen-overlay">
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div style={{ fontSize: '18px', fontWeight: '900', color: '#FFD700', padding: '12px 0' }}>WATCH VAULT ES</div>
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
            <p style={{...labelStyle, marginTop: '10px'}}>Presupuesto</p>
            <div style={budgetGrid}>
              {['all', 'entry', 'mid', 'high'].map(r => (
                <button key={r} onClick={() => setSelectedRange(r as any)} 
                  style={{ ...budgetBtn, background: selectedRange === r ? '#FFD700' : '#1e293b', color: selectedRange === r ? '#000' : '#fff' }}>{r.toUpperCase()}</button>
              ))}
            </div>
          </div>

          {/* Grid View with Skeleton Loader */}
          <div style={{ padding: '0 15px 20px' }}>
            {isLoading ? (
              <div style={galleryGridStyle}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="skeleton-card">
                    <div className="skeleton-img" />
                    <div className="skeleton-text" />
                    <div className="skeleton-text short" />
                  </div>
                ))}
              </div>
            ) : (
              <div style={galleryGridStyle}>
                {getProcessedProducts().map(item => (
                  <div key={item.id} style={productCardStyle} onClick={() => setSelectedProduct(item)}>
                    <div style={{ position: 'relative' }}>
                      <img src={item.images?.[0]} alt={item.name} style={productImgStyle} />
                      {item.original_price && item.original_price > item.price && (
                        <div style={discountBadge}>-{Math.round(((item.original_price - item.price)/item.original_price)*100)}%</div>
                      )}
                    </div>
                    <div style={{ padding: '10px' }}>
                      <div style={brandLabelStyle}>{item.brand || 'Premium'}</div>
                      <div style={modelNameStyle}>{item.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={currentPriceStyle}>€{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* --- Modal with Slider & Zoom --- */}
        {selectedProduct && (
          <div style={modalOverlay}>
            <div style={modalContent} className="hide-scrollbar">
              <button onClick={resetModal} style={closeBtnStyle}>✕</button>
              
              <div style={sliderSection} 
                onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
                onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
                onMouseUp={handleEnd} onMouseLeave={handleEnd}
                onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
                onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
                onTouchEnd={handleEnd}
              >
                <img src={selectedProduct.images[activeImgIdx]} 
                  style={{ 
                    ...modalImgStyle, 
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, 
                    transition: isDragging ? 'none' : 'transform 0.2s',
                    cursor: scale > 1 ? 'grab' : 'default'
                  }} 
                  alt="watch" draggable={false} />
                
                {/* Navigation Arrows (Only show when not zoomed) */}
                {scale === 1 && selectedProduct.images.length > 1 && (
                   <>
                    <button style={navBtnLeft} onClick={(e) => { e.stopPropagation(); setActiveImgIdx(prev => prev > 0 ? prev - 1 : selectedProduct.images.length - 1); }}>❮</button>
                    <button style={navBtnRight} onClick={(e) => { e.stopPropagation(); setActiveImgIdx(prev => prev < selectedProduct.images.length - 1 ? prev + 1 : 0); }}>❯</button>
                   </>
                )}

                <div style={zoomControlsStyle}>
                  <button onClick={() => setScale(Math.min(scale + 0.5, 4))} style={zoomBtnStyle}>➕</button>
                  <button onClick={() => { setScale(1); setPosition({x:0, y:0}); }} style={zoomBtnStyle}>🔄</button>
                  <button onClick={() => setScale(Math.max(scale - 0.5, 1))} style={zoomBtnStyle}>➖</button>
                </div>
              </div>

              {/* Thumbnails Slider */}
              {selectedProduct.images.length > 1 && (
                <div style={{ display: 'flex', gap: '8px', padding: '10px 20px', overflowX: 'auto', background: '#f8fafc' }} className="hide-scrollbar">
                  {selectedProduct.images.map((img, idx) => (
                    <img key={idx} src={img} onClick={() => {setActiveImgIdx(idx); setScale(1); setPosition({x:0, y:0});}}
                      style={{ width: '55px', height: '55px', objectFit: 'cover', borderRadius: '8px', border: activeImgIdx === idx ? '2px solid #FF4500' : '2px solid #e2e8f0', cursor: 'pointer', flexShrink: 0 }} />
                  ))}
                </div>
              )}

              <div style={modalDetails}>
                <div style={brandLabelStyle}>{selectedProduct.brand}</div>
                <h2 style={{ fontSize: '22px', fontWeight: '900', margin: '5px 0' }}>{selectedProduct.name}</h2>
                <div style={{ fontSize: '26px', fontWeight: '900', color: '#16a34a', marginBottom: '15px' }}>€{selectedProduct.price}</div>

                <div style={specsBox}>
                  <p style={specRow}><span>⚙️ Movimiento:</span> <b>{selectedProduct.movement || 'N/A'}</b></p>
                  <p style={specRow}><span>💎 Cristal:</span> <b>{selectedProduct.glass_type || 'N/A'}</b></p>
                  <p style={specRow}><span>🌊 Water Res:</span> <b>{selectedProduct.water_resistance || 'N/A'}</b></p>
                  <p style={specRow}><span>🛡️ Garantía:</span> <b>{selectedProduct.warranty || 'N/A'}</b></p>
                </div>

                <button onClick={() => window.open(`https://wa.me/${shopOwnerNumber}?text=Info: ${selectedProduct.name}`, '_blank')} 
                  style={whatsappBtn}>WHATSAPP ORDER</button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .smart-shop-fullscreen-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #0f172a; z-index: 9999; overflow: hidden; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          
          /* Skeleton Loader Styles */
          .skeleton-card { background: #1e293b; border-radius: 12px; padding: 10px; display: flex; flexDirection: column; gap: 8px; height: 220px; }
          .skeleton-img { width: 100%; height: 130px; background: #334155; border-radius: 8px; position: relative; overflow: hidden; }
          .skeleton-text { width: 80%; height: 12px; background: #334155; border-radius: 4px; position: relative; overflow: hidden; }
          .skeleton-text.short { width: 40%; }
          
          .skeleton-img::after, .skeleton-text::after {
            content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
            animation: shimmer 1.5s infinite;
          }
          @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        `}</style>
      </div>
    </div>
  );
}

// --- Styles ---
const containerStyle: React.CSSProperties = { width: '100%', height: '100%', display: 'flex', flexDirection: 'column' };
const headerStyle: React.CSSProperties = { background: '#1e293b', textAlign: 'center', borderBottom: '1px solid #334155' };
const scrollContainer: React.CSSProperties = { flex: 1, overflowY: 'auto' };
const filterRow: React.CSSProperties = { display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px' };
const labelStyle: React.CSSProperties = { color: '#FFD700', fontSize: '10px', fontWeight: '900', marginBottom: '5px', textTransform: 'uppercase' };
const pillStyle: React.CSSProperties = { color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '15px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' };
const budgetGrid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' };
const budgetBtn: React.CSSProperties = { border: 'none', padding: '8px', borderRadius: '8px', fontSize: '10px', fontWeight: '900' };
const galleryGridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' };
const productCardStyle: React.CSSProperties = { background: '#fff', borderRadius: '12px', overflow: 'hidden' };
const productImgStyle: React.CSSProperties = { width: '100%', height: '150px', objectFit: 'contain', background: '#f8fafc' };
const discountBadge: React.CSSProperties = { position: 'absolute', top: '5px', right: '5px', background: '#ef4444', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: '900' };
const brandLabelStyle: React.CSSProperties = { fontSize: '9px', color: '#ef4444', fontWeight: '900', textTransform: 'uppercase' };
const modelNameStyle: React.CSSProperties = { fontWeight: '700', fontSize: '12px', color: '#1e293b', height: '32px', overflow: 'hidden' };
const currentPriceStyle: React.CSSProperties = { color: '#16a34a', fontWeight: '900', fontSize: '15px' };
const modalOverlay: React.CSSProperties = { position: 'absolute', inset: 0, background: '#fff', zIndex: 10000 };
const modalContent: React.CSSProperties = { height: '100%', overflowY: 'auto' };
const sliderSection: React.CSSProperties = { height: '380px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', touchAction: 'none' };
const modalImgStyle: React.CSSProperties = { maxHeight: '90%', maxWidth: '90%', objectFit: 'contain', userSelect: 'none' };
const modalDetails: React.CSSProperties = { padding: '20px', color: '#1e293b' };
const specsBox: React.CSSProperties = { background: '#f1f5f9', padding: '15px', borderRadius: '10px', marginBottom: '20px' };
const specRow: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' };
const whatsappBtn: React.CSSProperties = { width: '100%', padding: '15px', background: '#25D366', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '900', cursor: 'pointer' };
const closeBtnStyle: React.CSSProperties = { position: 'absolute', top: '15px', left: '15px', background: '#0f172a', color: '#fff', borderRadius: '50%', width: '35px', height: '35px', border: 'none', zIndex: 101, cursor: 'pointer' };
const zoomControlsStyle: React.CSSProperties = { position: 'absolute', bottom: '15px', right: '15px', display: 'flex', gap: '8px' };
const zoomBtnStyle: React.CSSProperties = { width: '35px', height: '35px', borderRadius: '8px', background: '#0f172a', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const navBtnLeft: React.CSSProperties = { position: 'absolute', left: '10px', background: 'rgba(0,0,0,0.3)', color: '#fff', border: 'none', borderRadius: '50%', width: '30px', height: '30px', zIndex: 10, cursor: 'pointer' };
const navBtnRight: React.CSSProperties = { position: 'absolute', right: '10px', background: 'rgba(0,0,0,0.3)', color: '#fff', border: 'none', borderRadius: '50%', width: '30px', height: '30px', zIndex: 10, cursor: 'pointer' };