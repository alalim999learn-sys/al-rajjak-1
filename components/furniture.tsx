//C:\Users\Shanon\al-rajjak-1\components\furniture.tsx



"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';

// --- ১. হেল্পার ফাংশন (ইমেজ হ্যান্ডলিং) ---
const getValidImg = (item: any) => {
  if (!item) return "/api/placeholder/400/320";
  if (item.cover_image) return item.cover_image;
  if (Array.isArray(item.images) && item.images.length > 0) return item.images[0];
  if (typeof item.images === 'string' && item.images !== "") return item.images;
  return "/api/placeholder/400/320";
};

// --- ২. ইমেজ জুম ভিউয়ার কম্পোনেন্ট ---
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
            src={currentImg} alt="Zoom"
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

// --- ৩. প্রোডাক্ট ডিটেইল মোডাল ---
const ProductDetailModal = ({ item, onClose, onAskAI }: { item: any; onClose: () => void; onAskAI: (name: string) => void }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  
  if (!item) return null;
  
  const productImages = useMemo(() => {
    let imgs: string[] = [];
    if (item.cover_image) imgs.push(item.cover_image);
    if (Array.isArray(item.images)) imgs = [...imgs, ...item.images];
    const uniqueImgs = Array.from(new Set(imgs)).filter(src => src && src !== "");
    return uniqueImgs.length > 0 ? uniqueImgs : ["/api/placeholder/400/320"];
  }, [item]);

  return (
    <>
      <div style={modalOverlayFixedStyle} onClick={onClose}>
        <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
          <div style={imageContainer} onClick={() => setShowZoom(true)}>
            <img src={productImages[activeImg]} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', cursor: 'pointer' }}
              onError={(e) => { e.currentTarget.src = "/api/placeholder/400/320"; }} />
          </div>
          {productImages.length > 1 && (
            <div style={{display:'flex', gap:'5px', padding:'10px', overflowX:'auto', background:'#f8fafc', borderBottom:'1px solid #eee'}}>
                {productImages.map((img, idx) => (
                    <img key={idx} src={img} onClick={() => setActiveImg(idx)} style={{width:'50px', height:'50px', objectFit:'cover', borderRadius:'5px', cursor:'pointer', border: activeImg === idx ? '2px solid #000' : 'none'}} />
                ))}
            </div>
          )}
          <div style={{ padding: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: '#000', fontWeight: '800' }}>{item.title}</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '10px 0' }}>
                <span style={{ color: '#e11d48', fontWeight: '900', fontSize: '20px' }}>€{item.current_price}</span>
                {item.original_price && <span style={{ color: '#94a3b8', textDecoration: 'line-through', fontSize: '14px' }}>€{item.original_price}</span>}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', background:'#f8fafc', padding:'10px', borderRadius:'8px'}}>
                    <div>📏 {item.width_cm}x{item.depth_cm}x{item.height_cm}</div>
                    <div>🧵 {item.fabric_type || 'N/A'}</div>
                    <div>🎨 {item.color_primary || 'N/A'}</div>
                    <div>🛡️ {item.warranty_years}Y Warranty</div>
                </div>
                <p style={{marginTop:'10px'}}>{item.description?.substring(0, 150)}...</p>
            </div>
            <button onClick={() => { onAskAI(item.title); onClose(); }} style={askAiBtnStyle}>🤖 বিস্তারিত জানুন</button>
          </div>
        </div>
      </div>
      {showZoom && <ImageZoomViewer images={productImages} initialIndex={activeImg} onClose={() => setShowZoom(false)} />}
    </>
  );
};

// --- ৪. মেইন চ্যাট কম্পোনেন্ট ---
export default function FurnitureChat({ clientData }: { clientData: any }) {
  const [activeTab, setActiveTab] = useState<'ai' | 'gallery' | 'message'>('ai');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', content: `স্বাগতম! LemonSKN ফার্নিচারে আপনাকে সাহায্য করতে আমি প্রস্তুত। আপনি কি ধরণের ফার্নিচার খুঁজছেন?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const res = await fetch('/api/furniture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'INITIAL_LOAD_REQ' }] })
        });
        const data = await res.json();
        if (data.success && data.inventory) setAllProducts(data.inventory);
      } catch (err) { console.error("Fetch Error:", err); }
      finally { setIsInitialLoading(false); }
    };
    fetchInitial();
  }, []);

  const filteredItems = useMemo(() => {
    if (categoryFilter === 'all') return allProducts;
    // Database schema uses lowercase, ensuring matching here
    return allProducts.filter(item => item.category?.toLowerCase() === categoryFilter.toLowerCase());
  }, [categoryFilter, allProducts]);

  const parseAndRenderMessage = (content: string) => {
    const parts = content.split(/(\[SHOW_FRONT:[^\]]+\])/g);
    return parts.map((part, index) => {
      const match = part.match(/\[SHOW_FRONT:([^\]]+)\]/);
      if (match) {
        const productId = match[1].trim();
        // Safe string comparison for UUIDs
        const product = allProducts.find(p => String(p.id).toLowerCase() === productId.toLowerCase());
        if (product) {
          return (
            <div key={index} style={productLinkStyle} onClick={() => setSelectedItem(product)}>
              <img src={getValidImg(product)} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '8px' }} />
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontWeight: 'bold', fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</div>
                <div style={{ color: '#e11d48', fontWeight:'bold', fontSize: '12px' }}>€{product.current_price}</div>
              </div>
            </div>
          );
        }
      }
      return <span key={index}>{part}</span>;
    });
  };

  useEffect(() => { scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight); }, [messages, loading]);

  const handleSend = async (forcedInput?: string) => {
    const text = forcedInput || input;
    if (!text.trim() || loading) return;

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/furniture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      const data = await res.json();
      if (data.success) {
        if (data.inventory) {
          setAllProducts(prev => {
            const existingIds = new Set(prev.map(p => String(p.id)));
            const uniqueNew = data.inventory.filter((p:any) => !existingIds.has(String(p.id)));
            return [...prev, ...uniqueNew];
          });
        }
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '900' }}>LemonSKN Furniture</div>
          <div style={{ fontSize: '10px', opacity: 0.8 }}>AI SALES ASSISTANT • ONLINE</div>
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
            <div ref={scrollRef} style={chatBodyStyle}>
              {messages.map((m, i) => (
                <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', marginBottom: '15px' }}>
                  <div style={{ ...bubbleBase, backgroundColor: m.role === 'user' ? '#000' : '#fff', color: m.role === 'user' ? '#fff' : '#000' }}>
                    {m.role === 'assistant' ? parseAndRenderMessage(m.content) : m.content}
                  </div>
                </div>
              ))}
              {loading && <div style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '10px' }}>AI ভাবছে...</div>}
            </div>
            <div style={inputWrapperStyle}>
              <input style={inputFieldStyle} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="সোফা বা বেড সম্পর্কে জিজ্ঞাসা করুন..." />
              <button onClick={() => handleSend()} style={sendButtonStyle}>🚀</button>
            </div>
          </>
        )}

        {activeTab === 'gallery' && (
          <div style={galleryViewStyle}>
            <div style={filterBarStyle}>
              {['all', 'sofa', 'bed', 'chair', 'table'].map(cat => (
                <button key={cat} onClick={() => setCategoryFilter(cat)} style={getFilterStyle(categoryFilter === cat)}>{cat.toUpperCase()}</button>
              ))}
            </div>
            {isInitialLoading ? (
              <div style={{textAlign:'center', padding:'50px', color:'#94a3b8'}}>লোড হচ্ছে...</div>
            ) : (
              <div style={galleryGridStyle}>
                {filteredItems.map((item) => (
                    <div key={item.id} style={galleryItemStyle}>
                      <img src={getValidImg(item)} style={gridImgStyle} onClick={() => setSelectedItem(item)} onError={(e) => { e.currentTarget.src = "/api/placeholder/150/130"; }} />
                      <div style={{ padding: '8px', fontSize: '11px', fontWeight: '800', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{item.title}</div>
                      <div style={{ color: '#e11d48', fontWeight:'900', fontSize:'13px', paddingBottom:'5px' }}>€{item.current_price}</div>
                      <button onClick={() => setSelectedItem(item)} style={viewDetailsBtnStyle}>View Details</button>
                    </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'message' && (
          <div style={{ padding: '20px', background: '#fff', height: '100%' }}>
            <h3>সরাসরি যোগাযোগ করুন</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop:'15px' }}>
              <input style={formInputStyle} placeholder="নাম" />
              <input style={formInputStyle} placeholder="ফোন নাম্বার" />
              <textarea style={{...formInputStyle, height:'100px'}} placeholder="আপনার মেসেজ..." />
              <button style={askAiBtnStyle}>মেসেজ পাঠান</button>
            </div>
          </div>
        )}
      </div>

      {selectedItem && <ProductDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} onAskAI={(name) => { setActiveTab('ai'); handleSend(`আমি ${name} সম্পর্কে আরও জানতে চাই`); }} />}
    </div>
  );
}

// --- CSS Styles (Same as before, ensuring consistency) ---
const containerStyle: React.CSSProperties = { width: '100%', maxWidth: '450px', height: '90vh', background: '#f8fafc', borderRadius: '24px', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', overflow: 'hidden', margin: '10px auto', position:'relative' };
const headerStyle: React.CSSProperties = { background: '#000', padding: '15px 20px', color: '#fff' };
const tabRowStyle: React.CSSProperties = { display: 'flex', background: '#fff', borderBottom: '1px solid #f1f5f9' };
const tabButtonStyle: React.CSSProperties = { flex: 1, padding: '15px 5px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', fontWeight:'bold' };
const chatBodyStyle: React.CSSProperties = { flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column' };
const bubbleBase: React.CSSProperties = { padding: '12px 16px', borderRadius: '18px', fontSize: '14px', lineHeight: '1.4' };
const inputWrapperStyle: React.CSSProperties = { padding: '15px', background: '#fff', display: 'flex', gap: '8px', borderTop: '1px solid #f1f5f9' };
const inputFieldStyle: React.CSSProperties = { flex: 1, padding: '10px 15px', borderRadius: '25px', border: '1px solid #e2e8f0', outline: 'none' };
const sendButtonStyle: React.CSSProperties = { background: '#000', borderRadius: '50%', width: '40px', height: '40px', border: 'none', color: '#fff', cursor: 'pointer' };
const galleryViewStyle: React.CSSProperties = { flex: 1, overflowY: 'auto', background: '#fff' };
const filterBarStyle: React.CSSProperties = { display: 'flex', gap: '5px', padding: '10px', overflowX:'auto' };
const getFilterStyle = (active: boolean): React.CSSProperties => ({ padding: '6px 12px', borderRadius: '20px', border: 'none', background: active ? '#000' : '#f1f5f9', color: active ? '#fff' : '#64748b', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' });
const galleryGridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '10px' };
const galleryItemStyle: React.CSSProperties = { border: '1px solid #f1f5f9', borderRadius: '15px', overflow: 'hidden', textAlign: 'center' };
const gridImgStyle: React.CSSProperties = { width: '100%', height: '110px', objectFit: 'cover', cursor: 'pointer' };
const viewDetailsBtnStyle: React.CSSProperties = { width: '90%', background: '#f1f5f9', border: 'none', padding: '5px', borderRadius: '8px', marginBottom: '8px', fontSize: '10px', fontWeight: 'bold' };
const productLinkStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '10px', background: '#f0f9ff', padding: '8px', borderRadius: '12px', marginTop: '10px', border: '1px solid #bae6fd', cursor: 'pointer', color: '#000' };
const askAiBtnStyle: React.CSSProperties = { width: '100%', padding: '12px', background: '#000', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' };
const formInputStyle: React.CSSProperties = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' };
const modalOverlayFixedStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' };
const modalContentStyle: React.CSSProperties = { width: '90%', maxWidth: '380px', background: '#fff', borderRadius: '20px', overflow: 'hidden', position: 'relative' };
const imageContainer: React.CSSProperties = { width: '100%', height: '200px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const closeBtnStyle: React.CSSProperties = { position: 'absolute', top: '10px', right: '10px', background: '#fff', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer', zIndex: 10 };
const zoomOverlayStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#000', zIndex: 1000, display: 'flex', flexDirection: 'column' };
const zoomContainerStyle: React.CSSProperties = { flex:1, position:'relative', display:'flex', flexDirection:'column' };
const zoomHeaderStyle: React.CSSProperties = { padding:'15px', display:'flex', justifyContent:'space-between', alignItems:'center' };
const zoomControlsStyle: React.CSSProperties = { display:'flex', gap:'8px' };
const zoomBtnStyle: React.CSSProperties = { background:'#333', color:'#fff', border:'none', padding:'4px 10px', borderRadius:'4px' };
const zoomLevelStyle: React.CSSProperties = { color:'#fff', fontSize:'11px' };
const zoomCloseBtnStyle: React.CSSProperties = { background:'#e11d48', color:'#fff', border:'none', width:'28px', height:'28px', borderRadius:'50%' };
const zoomImageContainerStyle: React.CSSProperties = { flex:1, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' };
const zoomImageStyle: React.CSSProperties = { maxWidth:'100%', maxHeight:'100%', objectFit:'contain' };

const zoomNavBtnStyle: React.CSSProperties = { position:'absolute', top:'50%', background:'rgba(255,255,255,0.1)', color:'#fff', border:'none', padding:'15px 8px', fontSize:'24px', cursor:'pointer' };