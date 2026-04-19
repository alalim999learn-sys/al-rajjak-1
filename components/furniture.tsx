//C:\Users\Shanon\al-rajjak-1\components\furniture.tsx



"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';

// --- ১. ইমেজ জুম ভিউয়ার কম্পোনেন্ট ---
const ImageZoomViewer = ({ images, initialIndex, onClose }: { images: string[]; initialIndex: number; onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); // Fixed: Initialized with 0

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 1));
  const resetZoom = () => { setZoomLevel(1); setPosition({ x: 0, y: 0 }); };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const currentImg = images[currentIndex] || "/api/placeholder/400/320";

  return (
    <div style={zoomOverlayStyle} onClick={onClose}>
      <div style={zoomContainerStyle} onClick={(e) => e.stopPropagation()}>
        <div style={zoomHeaderStyle}>
          <div style={zoomControlsStyle}>
            <button onClick={zoomOut} style={zoomBtnStyle}>−</button>
            <span style={zoomLevelStyle}>{Math.round(zoomLevel * 100)}%</span>
            <button onClick={zoomIn} style={zoomBtnStyle}>+</button>
            <button onClick={resetZoom} style={zoomBtnStyle}>⟳</button>
          </div>
          <button onClick={onClose} style={zoomCloseBtnStyle}>✕</button>
        </div>
        <div 
          style={{ ...zoomImageContainerStyle, cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
          onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={() => setIsDragging(false)} onMouseLeave={() => setIsDragging(false)}
        >
          <img
            src={currentImg} alt="Zoom view"
            style={{ 
              ...zoomImageStyle, 
              transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`, 
              transition: isDragging ? 'none' : 'transform 0.1s ease' 
            }}
            draggable={false}
          />
        </div>
        {images.length > 1 && (
          <>
            <button onClick={() => { setCurrentIndex(prev => (prev - 1 + images.length) % images.length); resetZoom(); }} style={{...zoomNavBtnStyle, left: '10px'}}>‹</button>
            <button onClick={() => { setCurrentIndex(prev => (prev + 1) % images.length); resetZoom(); }} style={{...zoomNavBtnStyle, right: '10px'}}>›</button>
          </>
        )}
      </div>
    </div>
  );
};

// --- ২. প্রোডাক্ট ডিটেইল মোডাল ---
const ProductDetailModal = ({ item, onClose, onAskAI }: { item: any; onClose: () => void; onAskAI: (name: string) => void }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  
  if (!item) return null;
  
  const productImages = useMemo(() => {
    if (Array.isArray(item.images) && item.images.length > 0) return item.images;
    if (item.image) return [item.image];
    return ["/api/placeholder/400/320"];
  }, [item]);

  const price = item.current_price || item.pricing?.current_price || item.price || "N/A";

  return (
    <>
      <div style={modalOverlayFixedStyle} onClick={onClose}>
        <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
          <div style={imageContainer} onClick={() => setShowZoom(true)}>
            <img src={productImages[activeImg]} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', cursor: 'pointer' }} />
          </div>
          <div style={{ padding: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: '#000', fontWeight: '800' }}>{item.title}</h3>
            <p style={{ color: '#e11d48', fontWeight: '900', fontSize: '20px', margin: '10px 0' }}>€{price}</p>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px', lineHeight: '1.5' }}>
                {item.category && <span style={{display:'block', marginBottom:'5px'}}>Category: <b>{item.category}</b></span>}
                {item.description || "High-quality luxury furniture by LemonSKN."}
                {item.details && (
                  <div style={{marginTop: '10px', padding: '10px', background: '#f8fafc', borderRadius: '8px'}}>
                    <div>🎨 Color: {item.details.color}</div>
                    <div>📏 Dimensions: {item.details.dimensions}</div>
                    <div>🧵 Fabric: {item.details.fabric}</div>
                  </div>
                )}
            </div>
            <button onClick={() => { onAskAI(item.title); onClose(); }} style={askAiBtnStyle}>🤖 বিস্তারিত জানুন</button>
          </div>
        </div>
      </div>
      {showZoom && <ImageZoomViewer images={productImages} initialIndex={activeImg} onClose={() => setShowZoom(false)} />}
    </>
  );
};

// --- ৩. মেইন চ্যাট কম্পোনেন্ট ---
export default function FurnitureChat({ clientData }: { clientData: any }) {
  const [activeTab, setActiveTab] = useState<'ai' | 'gallery' | 'message'>('ai');
  const [filter, setFilter] = useState<'all' | 'beds' | 'sofas'>('all');
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', content: clientData?.welcomeMessage || `স্বাগতম! আমি কিভাবে আপনাকে সাহায্য করতে পারি?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showGalleryZoom, setShowGalleryZoom] = useState(false);
  const [galleryZoomImages, setGalleryZoomImages] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch('/api/furniture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'INITIAL_LOAD_REQ' }] })
        });
        const data = await res.json();
        if (data.success && data.inventory) {
          setAllProducts(data.inventory);
        }
      } catch (err) {
        console.error("Inventory Fetch Error:", err);
      }
    };
    fetchInventory();
  }, []);

  const filteredItems = useMemo(() => {
    if (filter === 'all') return allProducts;
    return allProducts.filter(item => item.category?.toLowerCase() === filter.toLowerCase());
  }, [filter, allProducts]);

  const parseAndRenderMessage = (content: string) => {
    if (!content) return null;
    const parts = content.split(/(\[SHOW_FRONT:[^\]]+\])/g);
    return parts.map((part, index) => {
      const match = part.match(/\[SHOW_FRONT:([^\]]+)\]/);
      if (match) {
        const productId = match[1].trim();
        const product = allProducts.find(p => (p.id?.toString() === productId || p._id?.toString() === productId));
        if (product) {
          const thumb = product.image || (product.images && product.images[0]) || "/api/placeholder/50/50";
          const price = product.current_price || product.pricing?.current_price || product.price || "N/A";
          return (
            <div key={index} style={productLinkStyle} onClick={() => setSelectedItem(product)}>
              <img src={thumb} alt={product.title} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '8px' }} />
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontWeight: 'bold', fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</div>
                <div style={{ color: '#e11d48', fontWeight:'bold', fontSize: '12px' }}>€{price}</div>
              </div>
            </div>
          );
        }
      }
      return <span key={index} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>;
    });
  };

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, loading]);

  const handleSend = async (forcedInput?: string) => {
    const textToSend = forcedInput || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (!forcedInput) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/furniture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      const data = await res.json();
      if (data.success) {
        if (data.inventory && Array.isArray(data.inventory)) {
          setAllProducts(prev => {
            const existingIds = new Set(prev.map(p => (p.id || p._id).toString()));
            const newUnique = data.inventory.filter((p: any) => !existingIds.has((p.id || p._id).toString()));
            return [...prev, ...newUnique];
          });
        }
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '900', letterSpacing: '1px' }}>{clientData?.shopName || 'LemonSKN Furniture'}</div>
            <div style={{ fontSize: '10px', opacity: 0.8, textTransform: 'uppercase' }}>AI Sales Assistant • Online</div>
          </div>
        </div>

        <div style={tabRowStyle}>
          <button onClick={() => setActiveTab('ai')} style={{...tabButtonStyle, borderBottom: activeTab === 'ai' ? '3px solid #000' : 'none', fontWeight: activeTab === 'ai' ? 'bold' : 'normal'}}>🤖 Assistant</button>
          <button onClick={() => setActiveTab('gallery')} style={{...tabButtonStyle, borderBottom: activeTab === 'gallery' ? '3px solid #000' : 'none', fontWeight: activeTab === 'gallery' ? 'bold' : 'normal'}}>🖼️ Gallery</button>
          <button onClick={() => setActiveTab('message')} style={{...tabButtonStyle, borderBottom: activeTab === 'message' ? '3px solid #000' : 'none', fontWeight: activeTab === 'message' ? 'bold' : 'normal'}}>✉️ Contact</button>
        </div>

        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'ai' && (
            <>
              <div ref={scrollRef} style={chatBodyStyle}>
                {messages.map((m, i) => (
                  <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', marginBottom: '15px' }}>
                    <div style={{ ...bubbleBase, backgroundColor: m.role === 'user' ? '#000' : '#fff', color: m.role === 'user' ? '#fff' : '#000', boxShadow: m.role === 'user' ? '0 4px 10px rgba(0,0,0,0.2)' : '0 2px 5px rgba(0,0,0,0.05)' }}>
                      {m.role === 'assistant' ? parseAndRenderMessage(m.content) : m.content}
                    </div>
                  </div>
                ))}
                {loading && <div style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', paddingLeft: '5px' }}>🤔 LemonSKN Assistant is typing...</div>}
              </div>
              <div style={inputWrapperStyle}>
                <input style={inputFieldStyle} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about beds, sofas, or pricing..." />
                <button onClick={() => handleSend()} style={sendButtonStyle}>🚀</button>
              </div>
            </>
          )}

          {activeTab === 'gallery' && (
            <div style={galleryViewStyle}>
              <div style={filterBarStyle}>
                <button onClick={() => setFilter('all')} style={getFilterStyle(filter === 'all')}>All</button>
                <button onClick={() => setFilter('beds')} style={getFilterStyle(filter === 'beds')}>Beds</button>
                <button onClick={() => setFilter('sofas')} style={getFilterStyle(filter === 'sofas')}>Sofas</button>
              </div>
              <div style={galleryGridStyle}>
                {filteredItems.length === 0 ? (
                    <div style={{gridColumn:'1/-1', textAlign:'center', padding:'40px', color:'#94a3b8'}}>No products found.</div>
                ) : (
                    filteredItems.map((item: any) => {
                        const thumb = item.image || (item.images && item.images[0]) || "/api/placeholder/150/130";
                        const price = item.current_price || item.pricing?.current_price || item.price || "N/A";
                        return (
                          <div key={item.id || item._id} style={galleryItemStyle}>
                            <img src={thumb} style={gridImgStyle} alt={item.title} onClick={() => { setGalleryZoomImages([thumb]); setShowGalleryZoom(true); }} />
                            <div style={{ padding: '10px 8px 5px 8px', fontSize: '13px', fontWeight: '800', color:'#1e293b' }}>{item.title}</div>
                            <div style={{ color: '#e11d48', paddingBottom: '10px', fontSize: '14px', fontWeight:'900' }}>€{price}</div>
                            <button onClick={() => setSelectedItem(item)} style={viewDetailsBtnStyle}>View Details</button>
                          </div>
                        );
                    })
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedItem && <ProductDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} onAskAI={(name) => { setActiveTab('ai'); handleSend(`I want to know more about: ${name}`); }} />}
      {showGalleryZoom && <ImageZoomViewer images={galleryZoomImages} initialIndex={0} onClose={() => setShowGalleryZoom(false)} />}
    </>
  );
}

// --- CSS Styles ---
const containerStyle: React.CSSProperties = { width: '100%', maxWidth: '450px', height: '90vh', maxHeight: '750px', background: '#f8fafc', borderRadius: '24px', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', overflow: 'hidden', margin: '10px auto' };
const headerStyle: React.CSSProperties = { background: '#000', padding: '20px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const tabRowStyle: React.CSSProperties = { display: 'flex', background: '#fff', borderBottom: '1px solid #f1f5f9' };
const tabButtonStyle: React.CSSProperties = { flex: 1, padding: '15px 5px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s' };
const filterBarStyle: React.CSSProperties = { display: 'flex', gap: '8px', padding: '12px', justifyContent: 'center', background: '#fff', position: 'sticky', top: 0, zIndex: 5 };
const getFilterStyle = (active: boolean): React.CSSProperties => ({ padding: '8px 18px', borderRadius: '25px', border: active ? 'none' : '1px solid #e2e8f0', background: active ? '#000' : '#fff', color: active ? '#fff' : '#64748b', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' });
const galleryViewStyle: React.CSSProperties = { flex: 1, overflowY: 'auto', background: '#fff' };
const galleryGridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', padding: '15px' };
const galleryItemStyle: React.CSSProperties = { border: '1px solid #f1f5f9', borderRadius: '16px', overflow: 'hidden', textAlign: 'center', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition:'transform 0.2s' };
const gridImgStyle: React.CSSProperties = { width: '100%', height: '140px', objectFit: 'cover', cursor: 'pointer' };
const viewDetailsBtnStyle: React.CSSProperties = { width: '85%', background: '#f1f5f9', color: '#1e293b', border: 'none', padding: '8px', borderRadius: '10px', marginBottom: '12px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' };
const chatBodyStyle: React.CSSProperties = { flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column' };
const bubbleBase: React.CSSProperties = { padding: '12px 16px', borderRadius: '20px', fontSize: '14px', lineHeight: '1.5' };
const inputWrapperStyle: React.CSSProperties = { padding: '15px', background: '#fff', display: 'flex', gap: '10px', borderTop: '1px solid #f1f5f9' };
const inputFieldStyle: React.CSSProperties = { flex: 1, padding: '12px 20px', borderRadius: '30px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px' };
const sendButtonStyle: React.CSSProperties = { background: '#000', borderRadius: '50%', width: '45px', height: '45px', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' };
const productLinkStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '10px', borderRadius: '15px', margin: '10px 0', cursor: 'pointer', border: '1px solid #e2e8f0', transition: 'background 0.2s' };
const askAiBtnStyle: React.CSSProperties = { width: '100%', padding: '15px', background: '#000', color: '#fff', border: 'none', borderRadius: '15px', cursor: 'pointer', fontWeight: '900', fontSize: '14px', letterSpacing: '0.5px' };
const modalOverlayFixedStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' };
const modalContentStyle: React.CSSProperties = { width: '92%', maxWidth: '400px', background: '#fff', borderRadius: '28px', overflow: 'hidden', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' };
const imageContainer: React.CSSProperties = { width: '100%', height: '250px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const closeBtnStyle: React.CSSProperties = { position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer', zIndex: 100, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' };
const zoomOverlayStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 20000, display: 'flex', alignItems: 'center', justifyContent: 'center' };
const zoomContainerStyle: React.CSSProperties = { width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' };
const zoomHeaderStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', padding: '20px', zIndex: 10 };
const zoomControlsStyle: React.CSSProperties = { display: 'flex', gap: '15px' };
const zoomBtnStyle: React.CSSProperties = { background: '#222', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' };
const zoomLevelStyle: React.CSSProperties = { color: '#fff', fontSize: '14px', alignSelf: 'center' };
const zoomCloseBtnStyle: React.CSSProperties = { background: '#f00', color: '#fff', border: 'none', width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold' };
const zoomImageContainerStyle: React.CSSProperties = { flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const zoomImageStyle: React.CSSProperties = { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' };
const zoomNavBtnStyle: React.CSSProperties = { position: 'absolute', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', width: '50px', height: '80px', fontSize: '40px', cursor: 'pointer', backdropFilter: 'blur(2px)' };