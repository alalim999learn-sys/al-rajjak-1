//C:\Users\Shanon\al-rajjak-1\components\furniture.tsx



"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';

// --- ১. ইমেজ জুম ভিউয়ার কম্পোনেন্ট ---
const ImageZoomViewer = ({ images, initialIndex, onClose }: { images: string[]; initialIndex: number; onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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
            src={images[currentIndex]} alt="Zoom view"
            style={{ ...zoomImageStyle, transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`, transition: isDragging ? 'none' : 'transform 0.1s ease' }}
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
  const images = Array.isArray(item.images) && item.images.length > 0 ? item.images : ["/api/placeholder/400/320"];

  return (
    <>
      <div style={modalOverlayFixedStyle} onClick={onClose}>
        <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
          <div style={imageContainer} onClick={() => setShowZoom(true)}>
            <img src={images[activeImg]} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', cursor: 'pointer' }} />
          </div>
          <div style={{ display: 'flex', gap: '5px', padding: '10px', justifyContent: 'center', overflowX: 'auto' }}>
            {images.map((img: string, idx: number) => (
              <img key={idx} src={img} onClick={() => setActiveImg(idx)} style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer', border: activeImg === idx ? '2px solid #000' : '1px solid #ccc' }} />
            ))}
          </div>
          <div style={{ padding: '15px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#000' }}>{item.title}</h3>
            <p style={{ color: '#e11d48', fontWeight: 'bold', margin: '5px 0' }}>€{item.price}</p>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '15px' }}>{item.description?.substring(0, 100)}...</div>
            <button onClick={() => { onAskAI(item.title); onClose(); }} style={askAiBtnStyle}>🤖 বিস্তারিত জানুন</button>
          </div>
        </div>
      </div>
      {showZoom && <ImageZoomViewer images={images} initialIndex={activeImg} onClose={() => setShowZoom(false)} />}
    </>
  );
};

// --- ৩. মেইন চ্যাট কম্পোনেন্ট ---
export default function FurnitureChat({ clientData }: { clientData: any }) {
  const [activeTab, setActiveTab] = useState<'ai' | 'gallery' | 'message'>('ai');
  const [filter, setFilter] = useState<'all' | 'beds' | 'sofas'>('all');
  const [allProducts, setAllProducts] = useState<any[]>([]); // API থেকে ডাটা এখানে আসবে
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', content: clientData?.welcomeMessage || `স্বাগতম! আমি কিভাবে আপনাকে সাহায্য করতে পারি?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showGalleryZoom, setShowGalleryZoom] = useState(false);
  const [galleryZoomImages, setGalleryZoomImages] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ফিল্টারিং লজিক
  const filteredItems = useMemo(() => {
    if (filter === 'all') return allProducts;
    return allProducts.filter(item => item.category === filter);
  }, [filter, allProducts]);

  // চ্যাটে আসা [SHOW_FRONT:id] ট্যাগ পার্স করা
  const parseAndRenderMessage = (content: string) => {
    if (!content) return null;
    const parts = content.split(/(\[SHOW_FRONT:[^\]]+\])/g);
    return parts.map((part, index) => {
      const match = part.match(/\[SHOW_FRONT:([^\]]+)\]/);
      if (match) {
        const productId = match[1];
        const product = allProducts.find(p => p.id.toString() === productId.toString());
        if (product) {
          return (
            <div key={index} style={productLinkStyle} onClick={() => setSelectedItem(product)}>
              <img src={product.images?.[0] || '/api/placeholder/50/50'} alt={product.title} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '8px' }} />
              <div style={{ fontSize: '11px' }}>
                <div style={{ fontWeight: 'bold' }}>{product.title.substring(0, 20)}...</div>
                <div style={{ color: '#e11d48' }}>€{product.price}</div>
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
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
        if (data.inventory) setAllProducts(data.inventory); // ইনভেন্টরি আপডেট
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
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{clientData?.shopName || 'LemonSKN Furniture'}</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>AI Sales Assistant</div>
          </div>
        </div>

        <div style={tabRowStyle}>
          <button onClick={() => setActiveTab('ai')} style={{...tabButtonStyle, borderBottom: activeTab === 'ai' ? '3px solid #000' : 'none'}}>🤖 Assistant</button>
          <button onClick={() => setActiveTab('gallery')} style={{...tabButtonStyle, borderBottom: activeTab === 'gallery' ? '3px solid #000' : 'none'}}>🖼️ Gallery</button>
          <button onClick={() => setActiveTab('message')} style={{...tabButtonStyle, borderBottom: activeTab === 'message' ? '3px solid #000' : 'none'}}>✉️ Contact</button>
        </div>

        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'ai' && (
            <>
              <div ref={scrollRef} style={chatBodyStyle} className="custom-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '90%', marginBottom: '12px' }}>
                    <div style={{ ...bubbleBase, backgroundColor: m.role === 'user' ? '#000' : '#fff', color: m.role === 'user' ? '#fff' : '#000' }}>
                      {m.role === 'assistant' ? parseAndRenderMessage(m.content) : m.content}
                    </div>
                  </div>
                ))}
                {loading && <div style={{ fontSize: '11px', color: '#94a3b8' }}>🤔 চিন্তা করছি...</div>}
              </div>
              <div style={inputWrapperStyle}>
                <input style={inputFieldStyle} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask anything..." />
                <button onClick={() => handleSend()} style={sendButtonStyle}>🚀</button>
              </div>
            </>
          )}

          {activeTab === 'gallery' && (
            <div style={galleryViewStyle} className="custom-scrollbar">
              <div style={filterBarStyle}>
                <button onClick={() => setFilter('all')} style={getFilterStyle(filter === 'all')}>All</button>
                <button onClick={() => setFilter('beds')} style={getFilterStyle(filter === 'beds')}>Beds</button>
                <button onClick={() => setFilter('sofas')} style={getFilterStyle(filter === 'sofas')}>Sofas</button>
              </div>
              <div style={galleryGridStyle}>
                {filteredItems.map((item: any) => (
                  <div key={item.id} style={galleryItemStyle}>
                    <img src={item.images?.[0] || "/api/placeholder/150/130"} style={gridImgStyle} alt={item.title} onClick={() => { setGalleryZoomImages(item.images); setShowGalleryZoom(true); }} />
                    <div style={{ padding: '8px', fontSize: '12px', fontWeight: 'bold' }}>{item.title.substring(0, 20)}</div>
                    <div style={{ color: '#e11d48', paddingBottom: '8px', fontSize: '12px' }}>€{item.price}</div>
                    <button onClick={() => setSelectedItem(item)} style={viewDetailsBtnStyle}>Details</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedItem && <ProductDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} onAskAI={(name) => { setActiveTab('ai'); handleSend(`Detail info for: ${name}`); }} />}
      {showGalleryZoom && <ImageZoomViewer images={galleryZoomImages} initialIndex={0} onClose={() => setShowGalleryZoom(false)} />}
    </>
  );
}

// --- CSS Styles ---
const containerStyle: React.CSSProperties = { width: '100%', maxWidth: '500px', height: '85vh', maxHeight: '700px', background: '#f8fafc', borderRadius: '20px', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden', margin: '20px auto' };
const headerStyle: React.CSSProperties = { background: '#000', padding: '15px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const tabRowStyle: React.CSSProperties = { display: 'flex', background: '#fff', borderBottom: '1px solid #eee' };
const tabButtonStyle: React.CSSProperties = { flex: 1, padding: '12px 5px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px' };
const filterBarStyle: React.CSSProperties = { display: 'flex', gap: '10px', padding: '10px', justifyContent: 'center', background: '#fff', borderBottom: '1px solid #f1f5f9' };
const getFilterStyle = (active: boolean): React.CSSProperties => ({ padding: '6px 15px', borderRadius: '20px', border: '1px solid #eee', background: active ? '#000' : '#f8fafc', color: active ? '#fff' : '#000', fontSize: '11px', cursor: 'pointer' });
const galleryViewStyle: React.CSSProperties = { flex: 1, overflowY: 'auto', background: '#fff' };
const galleryGridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px', padding: '10px' };
const galleryItemStyle: React.CSSProperties = { border: '1px solid #f1f5f9', borderRadius: '12px', overflow: 'hidden', textAlign: 'center', background: '#fff' };
const gridImgStyle: React.CSSProperties = { width: '100%', height: '120px', objectFit: 'cover', cursor: 'pointer' };
const viewDetailsBtnStyle: React.CSSProperties = { background: '#000', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '20px', marginBottom: '10px', fontSize: '10px', cursor: 'pointer' };
const chatBodyStyle: React.CSSProperties = { flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column' };
const bubbleBase: React.CSSProperties = { padding: '10px 14px', borderRadius: '18px', fontSize: '14px', border: '1px solid #e2e8f0', lineHeight: '1.4' };
const inputWrapperStyle: React.CSSProperties = { padding: '12px', background: '#fff', display: 'flex', gap: '8px', borderTop: '1px solid #eee' };
const inputFieldStyle: React.CSSProperties = { flex: 1, padding: '10px 15px', borderRadius: '25px', border: '1px solid #e2e8f0', outline: 'none' };
const sendButtonStyle: React.CSSProperties = { background: '#000', borderRadius: '50%', width: '38px', height: '38px', border: 'none', color: '#fff', cursor: 'pointer' };
const productLinkStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', padding: '6px 12px', borderRadius: '12px', margin: '8px 0', cursor: 'pointer', border: '1px solid #e2e8f0', width: '100%' };
const askAiBtnStyle: React.CSSProperties = { width: '100%', padding: '12px', background: '#000', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' };

const modalOverlayFixedStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' };
const modalContentStyle: React.CSSProperties = { width: '90%', maxWidth: '380px', background: '#fff', borderRadius: '20px', overflow: 'hidden', position: 'relative' };
const imageContainer: React.CSSProperties = { width: '100%', height: '220px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const closeBtnStyle: React.CSSProperties = { position: 'absolute', top: '10px', right: '10px', background: '#fff', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', zIndex: 100 };

const zoomOverlayStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 20000, display: 'flex', alignItems: 'center', justifyContent: 'center' };
const zoomContainerStyle: React.CSSProperties = { width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' };
const zoomHeaderStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', padding: '15px', zIndex: 10 };
const zoomControlsStyle: React.CSSProperties = { display: 'flex', gap: '10px' };
const zoomBtnStyle: React.CSSProperties = { background: '#333', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' };
const zoomLevelStyle: React.CSSProperties = { color: '#fff' };
const zoomCloseBtnStyle: React.CSSProperties = { background: '#333', color: '#fff', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer' };
const zoomImageContainerStyle: React.CSSProperties = { flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const zoomImageStyle: React.CSSProperties = { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' };
const zoomNavBtnStyle: React.CSSProperties = { position: 'absolute', top: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', width: '40px', height: '60px', fontSize: '30px', cursor: 'pointer' };