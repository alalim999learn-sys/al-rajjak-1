//C:\Users\Shanon\al-rajjak-1\components\furniture.tsx



"use client";
import React, { useState, useEffect, useRef } from 'react';

type TabType = 'faq' | 'collection';

interface Product {
  id: string; 
  name: string; 
  brand: string | null;
  sku: string | null;
  category: string; 
  sub_category: string;
  price: number; 
  original_price: number | null;
  currency: string;
  movement: string | null;
  glass_type: string | null;
  water_resistance: string | null;
  luminous: string | null;
  warranty: string | null;
  case_diameter: string | null;
  case_thickness: string | null;
  lug_to_lug: string | null;
  lug_width: string | null;
  strap_material: string | null;
  dial_color: string | null;
  bezel_type: string | null;
  stock_status: string; 
  images: string[]; 
}

// Updated CATEGORY_MAP as per your request
 const CATEGORY_MAP: Record<string, string[]> = {

  "Luxury": ["Metal", "Leather"],

  "Smartwatch": ["Silicone", "Steel"],

  "Sport": ["Digital", "Analog"],

  "Casual": ["Leather", "Nato Strap"]

}; 

export default function GlobalSmartShop() {
  const [activeTab, setActiveTab] = useState<TabType>('collection');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [touristId, setTouristId] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const mainCategories = ['All', ...Object.keys(CATEGORY_MAP)];

  useEffect(() => {
    let id = localStorage.getItem('tourist_uuid') || 'TR-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    localStorage.setItem('tourist_uuid', id);
    setTouristId(id);
    
    const loadProducts = async () => {
      try {
        const res = await fetch('/api/admin/watches'); 
        const data = await res.json();
        if (data.success) setProducts(data.data || []);
      } catch (e) { console.error("Error loading data", e); }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSub = selectedSubCategory === 'All' || p.sub_category === selectedSubCategory;
    return matchCat && matchSub;
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomScale <= 1) return;
    setPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };

  const getDiscount = (price: number, original: number | null) => {
    if (!original || original <= price) return null;
    return Math.round(((original - price) / original) * 100);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '1px' }}>WATCH VAULT</div>
        <div style={{ fontSize: '9px', opacity: 0.6 }}>SESSION: {touristId}</div>
      </div>

      <div style={tabRowStyle}>
        <button onClick={() => setActiveTab('faq')} style={{...tabButtonStyle, color: activeTab==='faq'?'#2563eb':'#64748b', borderBottom: activeTab==='faq'?'3px solid #2563eb':'none'}}>🤖 CHAT</button>
        <button onClick={() => setActiveTab('collection')} style={{...tabButtonStyle, color: activeTab==='collection'?'#2563eb':'#64748b', borderBottom: activeTab==='collection'?'3px solid #2563eb':'none'}}>🖼️ COLLECTION</button>
      </div>

      {activeTab === 'collection' && (
        <div style={galleryViewStyle}>
          {/* Main Categories */}
          <div style={categoryBarContainer}>
            {mainCategories.map(cat => (
              <button key={cat} onClick={() => {setSelectedCategory(cat); setSelectedSubCategory('All');}}
                style={{ ...categoryPillStyle, backgroundColor: selectedCategory === cat ? '#000' : '#fff', color: selectedCategory === cat ? '#fff' : '#64748b', borderColor: selectedCategory === cat ? '#000' : '#e2e8f0' }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Sub Categories */}
          {selectedCategory !== 'All' && CATEGORY_MAP[selectedCategory] && (
            <div style={{ ...categoryBarContainer, marginTop: '8px' }}>
              <button onClick={() => setSelectedSubCategory('All')}
                style={{ ...subCategoryPillStyle, backgroundColor: selectedSubCategory === 'All' ? '#3b82f6' : '#fff', color: selectedSubCategory === 'All' ? '#fff' : '#64748b', border: '1px solid #e2e8f0' }}>
                All {selectedCategory}
              </button>
              {CATEGORY_MAP[selectedCategory].map(sub => (
                <button key={sub} onClick={() => setSelectedSubCategory(sub)}
                  style={{ ...subCategoryPillStyle, backgroundColor: selectedSubCategory === sub ? '#3b82f6' : '#fff', color: selectedSubCategory === sub ? '#fff' : '#64748b', border: '1px solid #e2e8f0' }}>
                  {sub}
                </button>
              ))}
            </div>
          )}

          <div style={{...galleryGridStyle, marginTop: '15px'}}>
            {filteredProducts.map(item => (
              <div key={item.id} style={productCardStyle} onClick={() => { setSelectedProduct(item); setCurrentImgIndex(0); setZoomScale(1); setPosition({x:0,y:0}); }}>
                <div style={{ position: 'relative' }}>
                  <img src={item.images?.[0] || 'https://via.placeholder.com/300'} alt={item.name} style={productImgStyle} />
                  {item.stock_status === 'Out of Stock' && <div style={soldOutBadge}>SOLD OUT</div>}
                </div>
                <div style={{ padding: '10px' }}>
                  <div style={{ fontSize: '8px', color: '#3b82f6', fontWeight: '800' }}>{item.brand || 'ADDIESDIVE'}</div>
                  <div style={{ fontWeight: '700', fontSize: '11px', lineHeight: '1.2', height: '26px', overflow: 'hidden' }}>{item.name}</div>
                  
                  <div style={{ fontSize: '8px', color: '#64748b', marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    <span style={badgeStyle}>⚙️ {item.movement || 'Automatic'}</span>
                    <span style={badgeStyle}>🔗 {item.strap_material || 'Steel'}</span>
                  </div>

                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: '#000', fontWeight: '900', fontSize: '13px' }}>{item.currency} {item.price}</span>
                    {item.original_price && (
                      <span style={{ color: '#94a3b8', fontSize: '10px', textDecoration: 'line-through' }}>{item.currency} {item.original_price}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedProduct && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <button onClick={() => setSelectedProduct(null)} style={closeBtnStyle}>✕</button>

            {/* A. Image Section */}
            <div style={modalImageSection} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={() => setIsDragging(false)} onMouseLeave={() => setIsDragging(false)}>
              <div style={zoomControlStyle}>
                <button onClick={() => {setZoomScale(1); setPosition({x:0,y:0});}} style={zoomBtnStyle}>↺</button>
                <button onClick={() => setZoomScale(s => Math.min(s + 0.5, 3))} style={zoomBtnStyle}>+</button>
              </div>

              {selectedProduct.images.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); setCurrentImgIndex(i => (i > 0 ? i - 1 : selectedProduct.images.length - 1)); setZoomScale(1); }} style={prevBtnStyle}>◀</button>
                  <button onClick={(e) => { e.stopPropagation(); setCurrentImgIndex(i => (i < selectedProduct.images.length - 1 ? i + 1 : 0)); setZoomScale(1); }} style={nextBtnStyle}>▶</button>
                </>
              )}

              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: zoomScale > 1 ? 'move' : 'default' }}>
                <img src={selectedProduct.images[currentImgIndex]} style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain', transform: `translate(${position.x}px, ${position.y}px) scale(${zoomScale})`, transition: isDragging ? 'none' : 'transform 0.3s' }} draggable={false} />
              </div>
            </div>

            <div style={modalDetailsSection}>
              {/* B. Main Info Section */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '16px', fontWeight: '900', textTransform: 'uppercase' }}>{selectedProduct.name}</h2>
                  <p style={{ fontSize: '10px', color: '#3b82f6', fontWeight: '800' }}>{selectedProduct.brand} • SKU: {selectedProduct.sku || 'N/A'}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '18px', fontWeight: '900' }}>{selectedProduct.currency} {selectedProduct.price}</div>
                  {getDiscount(selectedProduct.price, selectedProduct.original_price) && (
                    <div style={{ fontSize: '10px', color: '#ef4444', fontWeight: '700' }}>SAVE {getDiscount(selectedProduct.price, selectedProduct.original_price)}%</div>
                  )}
                  <div style={{ fontSize: '9px', fontWeight: '800', color: selectedProduct.stock_status === 'In Stock' ? '#22c55e' : '#ef4444', marginTop: '2px' }}>{selectedProduct.stock_status.toUpperCase()}</div>
                </div>
              </div>

              {/* C. Technical Specs */}
              <div style={techScrollArea}>
                <p style={sectionTitle}>১. ইঞ্জিনিয়ারিং (INTERNAL)</p>
                <div style={techGridStyle}>
                  <div style={techItemStyle}><div style={techLabel}>MOVEMENT</div><div style={techValue}>{selectedProduct.movement || '---'}</div></div>
                  {/* Water Resistance displayed simply */}
                  <div style={techItemStyle}>
                    <div style={techLabel}>WATER RESIST</div>
                    <div style={techValue}>{selectedProduct.water_resistance || 'No'}</div>
                  </div>
                  <div style={techItemStyle}><div style={techLabel}>LUMINOUS</div><div style={techValue}>{selectedProduct.luminous || '---'}</div></div>
                  <div style={techItemStyle}><div style={techLabel}>GLASS TYPE</div><div style={techValue}>{selectedProduct.glass_type || '---'}</div></div>
                </div>

                <p style={{ ...sectionTitle, marginTop: '15px' }}>২. ডিজাইন ও মাপ (EXTERNAL)</p>
                <div style={techGridStyle}>
                  <div style={techItemStyle}><div style={techLabel}>DIAMETER</div><div style={techValue}>{selectedProduct.case_diameter}mm</div></div>
                  <div style={techItemStyle}><div style={techLabel}>THICKNESS</div><div style={techValue}>{selectedProduct.case_thickness}mm</div></div>
                  <div style={techItemStyle}><div style={techLabel}>LUG TO LUG</div><div style={techValue}>{selectedProduct.lug_to_lug}mm</div></div>
                  <div style={techItemStyle}><div style={techLabel}>LUG WIDTH</div><div style={techValue}>{selectedProduct.lug_width}mm</div></div>
                  <div style={techItemStyle}><div style={techLabel}>STRAP</div><div style={techValue}>{selectedProduct.strap_material || '---'}</div></div>
                  <div style={techItemStyle}><div style={techLabel}>DIAL COLOR</div><div style={techValue}>{selectedProduct.dial_color || '---'}</div></div>
                  <div style={techItemStyle}><div style={techLabel}>BEZEL TYPE</div><div style={techValue}>{selectedProduct.bezel_type || '---'}</div></div>
                  <div style={techItemStyle}><div style={techLabel}>WARRANTY</div><div style={techValue}>{selectedProduct.warranty || '---'}</div></div>
                </div>
              </div>

              <button style={wishlistBtnStyle}>WISHLIST PRODUCT</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Styles ---
const containerStyle: React.CSSProperties = { width: '100%', maxWidth: '420px', height: '85vh', background: '#fff', borderRadius: '35px', border: '10px solid #1e293b', margin: '10px auto', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' };
const headerStyle: React.CSSProperties = { background: '#1e293b', padding: '15px', color: '#fff', textAlign: 'center' };
const tabRowStyle: React.CSSProperties = { display: 'flex', borderBottom: '1px solid #f1f5f9' };
const tabButtonStyle: React.CSSProperties = { flex: 1, padding: '15px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '10px', fontWeight: '900' };
const galleryViewStyle: React.CSSProperties = { flex: 1, overflowY: 'auto', padding: '15px', backgroundColor: '#f8fafc' };
const galleryGridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' };
const productCardStyle: React.CSSProperties = { background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', cursor: 'pointer' };
const productImgStyle: React.CSSProperties = { width: '100%', height: '140px', objectFit: 'cover' };
const badgeStyle: React.CSSProperties = { background: '#f1f5f9', padding: '2px 5px', borderRadius: '4px', border: '1px solid #e2e8f0' };
const categoryBarContainer: React.CSSProperties = { display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px', scrollbarWidth: 'none' };
const categoryPillStyle: React.CSSProperties = { padding: '8px 14px', borderRadius: '12px', fontSize: '10px', fontWeight: '800', border: '1px solid', whiteSpace: 'nowrap', cursor: 'pointer' };
const subCategoryPillStyle: React.CSSProperties = { padding: '6px 12px', borderRadius: '20px', fontSize: '9px', fontWeight: '700', whiteSpace: 'nowrap', cursor: 'pointer' };
const soldOutBadge: React.CSSProperties = { position: 'absolute', top: '8px', right: '8px', background: '#fff', color: '#ef4444', padding: '2px 6px', borderRadius: '4px', fontSize: '8px', fontWeight: '900', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };
const modalOverlay: React.CSSProperties = { position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.9)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' };
const modalContent: React.CSSProperties = { backgroundColor: '#fff', width: '100%', borderRadius: '30px', overflow: 'hidden', position: 'relative', maxHeight: '95%', display: 'flex', flexDirection: 'column' };
const closeBtnStyle: React.CSSProperties = { position: 'absolute', top: '15px', right: '15px', zIndex: 110, background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', fontWeight: 'bold', cursor: 'pointer' };
const modalImageSection: React.CSSProperties = { position: 'relative', minHeight: '220px', backgroundColor: '#f8fafc', overflow: 'hidden' };
const zoomControlStyle: React.CSSProperties = { position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '6px', zIndex: 105 };
const zoomBtnStyle: React.CSSProperties = { border: 'none', background: '#fff', width: '28px', height: '28px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' };
const prevBtnStyle: React.CSSProperties = { position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', zIndex: 105, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' };
const nextBtnStyle: React.CSSProperties = { position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', zIndex: 105, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' };
const modalDetailsSection: React.CSSProperties = { padding: '15px 20px 20px', flex: 1, overflowY: 'hidden', display: 'flex', flexDirection: 'column' };
const techScrollArea: React.CSSProperties = { flex: 1, overflowY: 'auto', margin: '15px 0', paddingRight: '5px' };
const sectionTitle: React.CSSProperties = { fontSize: '9px', fontWeight: '900', color: '#3b82f6', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' };
const techGridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' };
const techItemStyle: React.CSSProperties = { background: '#f8fafc', padding: '8px', borderRadius: '10px', border: '1px solid #f1f5f9' };
const techLabel: React.CSSProperties = { fontSize: '7px', color: '#94a3b8', fontWeight: '900' };
const techValue: React.CSSProperties = { fontSize: '10px', fontWeight: '800', color: '#1e293b' };
const wishlistBtnStyle: React.CSSProperties = { width: '100%', padding: '14px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '900', fontSize: '12px' };



