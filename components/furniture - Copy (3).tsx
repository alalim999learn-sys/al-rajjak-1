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
  const [shopOwnerNumber] = useState('34111111111');

  // Zoom/Pan States
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
      finally { setIsLoading(false); }
    };
    loadProducts();
  }, []);

  const calculateDiscount = (orig: number | null, curr: number) => {
    if (!orig || orig <= curr) return null;
    return Math.round(((orig - curr) / orig) * 100);
  };

  const resetModal = () => {
    setSelectedProduct(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // --- 🔥 Filter Logic (Back in Action) ---
  const getProcessedProducts = () => {
    let filtered = products.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSub = selectedSubCategory === 'All' || p.sub_category === selectedSubCategory;
      return matchCat && matchSub;
    });

    if (filtered.length === 0) return [];
    const sorted = [...filtered].sort((a, b) => a.price - b.price);
    
    if (selectedRange === 'all') return sorted;
    const oneThird = Math.floor(sorted.length / 3);
    if (selectedRange === 'entry') return sorted.slice(0, oneThird || 1);
    if (selectedRange === 'mid') return sorted.slice(oneThird, 2 * oneThird || sorted.length);
    if (selectedRange === 'high') return sorted.slice(2 * oneThird);
    return sorted;
  };

  const finalDisplay = getProcessedProducts();
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  
  // Get unique sub-categories based on selected category
  const subCategories = selectedCategory === 'All' 
    ? [] 
    : ["All", ...Array.from(new Set(products.filter(p => p.category === selectedCategory).map(p => p.sub_category)))];

  return (
    <div className="smart-shop-fullscreen-overlay">
      <div style={containerStyle}>
        
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ fontSize: '18px', fontWeight: '900', color: '#FFD700' }}>WATCH VAULT ES</div>
        </div>

        <div style={scrollContainer}>
          {/* --- Filters Section (Categoría, Sub, Presupuesto) --- */}
          <div style={{ padding: '15px', background: '#0f172a' }}>
            <p style={labelStyle}>Categoría</p>
            <div style={filterRow} className="hide-scrollbar">
              {categories.map(cat => (
                <button key={cat} onClick={() => { setSelectedCategory(cat); setSelectedSubCategory('All'); }}
                  style={{ ...pillStyle, background: selectedCategory === cat ? '#FF4500' : '#1e293b' }}>{cat}</button>
              ))}
            </div>

            {selectedCategory !== 'All' && subCategories.length > 1 && (
              <>
                <p style={labelStyle}>Sub Categoría</p>
                <div style={filterRow} className="hide-scrollbar">
                  {subCategories.map(sub => (
                    <button key={sub} onClick={() => setSelectedSubCategory(sub)}
                      style={{ ...pillStyle, background: selectedSubCategory === sub ? '#3b82f6' : '#1e293b', fontSize: '11px' }}>{sub}</button>
                  ))}
                </div>
              </>
            )}

            <p style={labelStyle}>Presupuesto</p>
            <div style={budgetGrid}>
              {['all', 'entry', 'mid', 'high'].map(r => (
                <button key={r} onClick={() => setSelectedRange(r as any)} 
                  style={{ ...budgetBtn, background: selectedRange === r ? '#FFD700' : '#1e293b', color: selectedRange === r ? '#000' : '#fff' }}>
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* --- Grid View --- */}
          <div style={{ padding: '0 15px 20px' }}>
            {isLoading ? (
              <div style={{ color: '#fff', textAlign: 'center' }}>Cargando...</div>
            ) : (
              <div style={galleryGridStyle}>
                {finalDisplay.map(item => {
                  const discount = calculateDiscount(item.original_price, item.price);
                  return (
                    <div key={item.id} style={productCardStyle} onClick={() => setSelectedProduct(item)}>
                      <div style={{ position: 'relative' }}>
                        <img src={item.images?.[0]} alt={item.name} style={productImgStyle} />
                        {discount && <div style={discountBadge}>-{discount}%</div>}
                      </div>
                      <div style={{ padding: '10px' }}>
                        <div style={brandLabelStyle}>{item.brand || 'Premium'}</div>
                        <div style={modelNameStyle}>{item.name}</div>
                        <div style={priceContainer}>
                          <span style={currentPriceStyle}>€{item.price}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* --- Modal with All Specs --- */}
        {selectedProduct && (
          <div style={modalOverlay}>
            <div style={modalContent} className="hide-scrollbar">
              <button onClick={resetModal} style={closeBtnStyle}>✕</button>
              
              <div style={sliderSection} 
                onMouseDown={(e) => { if(scale > 1) { setIsDragging(true); dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y }; }}}
                onMouseMove={(e) => { if(isDragging) setPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y }); }}
                onMouseUp={() => setIsDragging(false)}
                onTouchStart={(e) => { if(scale > 1) { setIsDragging(true); dragStart.current = { x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y }; }}}
                onTouchMove={(e) => { if(isDragging) setPosition({ x: e.touches[0].clientX - dragStart.current.x, y: e.touches[0].clientY - dragStart.current.y }); }}
                onTouchEnd={() => setIsDragging(false)}
              >
                <img src={selectedProduct.images[0]} 
                  style={{ ...modalImgStyle, transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging ? 'none' : 'transform 0.2s' }} 
                  alt="product" draggable={false} />
                <div style={zoomControlsStyle}>
                  <button onClick={() => setScale(Math.min(scale + 0.5, 4))} style={zoomBtnStyle}>➕</button>
                  <button onClick={() => { setScale(1); setPosition({x:0, y:0}); }} style={zoomBtnStyle}>🔄</button>
                </div>
              </div>

              <div style={modalDetails}>
                <div style={brandLabelStyle}>{selectedProduct.brand}</div>
                <h2 style={{ fontSize: '22px', fontWeight: '900' }}>{selectedProduct.name}</h2>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#16a34a', marginBottom: '15px' }}>€{selectedProduct.price}</div>

                <div style={specsBox}>
                  <p style={specRow}><span>⚙️ Movimiento:</span> <b>{selectedProduct.movement || 'N/A'}</b></p>
                  <p style={specRow}><span>💎 Cristal:</span> <b>{selectedProduct.glass_type || 'N/A'}</b></p>
                  <p style={specRow}><span>🌊 Water Res:</span> <b>{selectedProduct.water_resistance || 'N/A'}</b></p>
                  <p style={specRow}><span>🛡️ Garantía:</span> <b>{selectedProduct.warranty || 'N/A'}</b></p>
                </div>

                <button onClick={() => window.open(`https://wa.me/${shopOwnerNumber}?text=Info: ${selectedProduct.name}`, '_blank')} 
                  style={whatsappBtn}>WHATSAPP</button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .smart-shop-fullscreen-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #0f172a; z-index: 9999; overflow: hidden; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
      </div>
    </div>
  );
}

// --- Styles (Fixed & Recovered) ---
const containerStyle: React.CSSProperties = { width: '100%', height: '100%', display: 'flex', flexDirection: 'column' , margin: '0'};
const headerStyle: React.CSSProperties = { background: '#1e293b', padding: '0px', textAlign: 'center' };
const scrollContainer: React.CSSProperties = { flex: 1, overflowY: 'auto' };
const filterRow: React.CSSProperties = { display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '12px', paddingBottom: '5px' };
const labelStyle: React.CSSProperties = { color: '#FFD700', fontSize: '10px', fontWeight: '900', marginBottom: '5px', textTransform: 'uppercase' };
const pillStyle: React.CSSProperties = { color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '15px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' };
const budgetGrid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '10px' };
const budgetBtn: React.CSSProperties = { border: 'none', padding: '8px', borderRadius: '8px', fontSize: '10px', fontWeight: '900' };
const galleryGridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' };
const productCardStyle: React.CSSProperties = { background: '#fff', borderRadius: '12px', overflow: 'hidden' };
const productImgStyle: React.CSSProperties = { width: '100%', height: '140px', objectFit: 'contain', background: '#f8fafc' };
const discountBadge: React.CSSProperties = { position: 'absolute', top: '5px', right: '5px', background: '#ef4444', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: '900' };
const brandLabelStyle: React.CSSProperties = { fontSize: '9px', color: '#ef4444', fontWeight: '900', textTransform: 'uppercase' };
const modelNameStyle: React.CSSProperties = { fontWeight: '700', fontSize: '12px', color: '#1e293b', height: '32px', overflow: 'hidden' };
const priceContainer: React.CSSProperties = { marginTop: '5px' };
const currentPriceStyle: React.CSSProperties = { color: '#16a34a', fontWeight: '900', fontSize: '15px' };
const modalOverlay: React.CSSProperties = { position: 'absolute', inset: 0, background: '#fff', zIndex: 10000 };
const modalContent: React.CSSProperties = { height: '100%', overflowY: 'auto' };
const sliderSection: React.CSSProperties = { height: '380px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' };
const modalImgStyle: React.CSSProperties = { maxHeight: '85%', maxWidth: '85%', objectFit: 'contain' };
const modalDetails: React.CSSProperties = { padding: '20px', color: '#1e293b' };
const specsBox: React.CSSProperties = { background: '#f1f5f9', padding: '15px', borderRadius: '10px', marginBottom: '20px' };
const specRow: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' };
const whatsappBtn: React.CSSProperties = { width: '100%', padding: '15px', background: '#25D366', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '900' };
const closeBtnStyle: React.CSSProperties = { position: 'absolute', top: '15px', left: '15px', background: '#0f172a', color: '#fff', borderRadius: '50%', width: '35px', height: '35px', border: 'none', zIndex: 101 };
const zoomControlsStyle: React.CSSProperties = { position: 'absolute', bottom: '15px', right: '15px', display: 'flex', gap: '8px' };
const zoomBtnStyle: React.CSSProperties = { width: '35px', height: '35px', borderRadius: '8px', background: '#0f172a', color: '#fff', border: 'none' };