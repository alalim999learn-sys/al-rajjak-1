//C:\Users\Shanon\al-rajjak-1\components\GallerySlider.tsx



"use client";
import React from 'react';

// প্রোডাক্টের ডাটা স্ট্রাকচার ডিফাইন করা
interface Product {
  id: string;
  title: string;
  images: string[];
  pricing: {
    current_price: number;
    currency: string;
  };
}

interface GallerySliderProps {
  items: Product[];
  onAskAI: (productName: string) => void;
  onOpenModal: (item: any) => void;
}

export default function GallerySlider({ items, onAskAI, onOpenModal }: GallerySliderProps) {
  if (!items || items.length === 0) return null;

  return (
    <div style={sliderWrapper}>
      <div style={scrollContainer} className="custom-scrollbar-hidden">
        {items.map((item) => (
          <div key={item.id} style={cardStyle}>
            {/* ইমেজ সেকশন: ক্লিক করলে মডাল খুলবে */}
            <div 
              onClick={() => onOpenModal(item)} 
              style={{ cursor: 'pointer', backgroundColor: '#f1f5f9' }}
            >
              <img 
                src={item.images?.[0] || "/no-photo.png"} 
                alt={item.title} 
                style={imageStyle} 
              />
            </div>
            
            {/* কন্টেন্ট সেকশন */}
            <div style={contentStyle}>
              <h4 style={titleStyle} title={item.title}>
                {item.title}
              </h4>
              <p style={priceStyle}>
                {item.pricing.current_price} {item.pricing.currency || 'EUR'}
              </p>
              
              {/* ইন্টারেক্টিভ বাটন */}
              <button 
                onClick={() => onAskAI(item.title)}
                style={askBtnStyle}
                onMouseOver={(e) => e.currentTarget.style.background = '#e2e8f0'}
                onMouseOut={(e) => e.currentTarget.style.background = '#f1f5f9'}
              >
                🤖 Ask about this
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- স্টাইলস (CSS-in-JS) ---

const sliderWrapper: React.CSSProperties = {
  width: '100%',
  marginTop: '12px',
  marginBottom: '4px',
  overflow: 'hidden',
};

const scrollContainer: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  overflowX: 'auto',
  paddingBottom: '12px',
  scrollSnapType: 'x mandatory',
  WebkitOverflowScrolling: 'touch', // iOS এর জন্য স্মুথ স্ক্রলিং
};

const cardStyle: React.CSSProperties = {
  minWidth: '160px',
  maxWidth: '160px',
  background: '#fff',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  overflow: 'hidden',
  scrollSnapAlign: 'start',
  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
  display: 'flex',
  flexDirection: 'column',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '100px',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
};

const contentStyle: React.CSSProperties = {
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1,
};

const titleStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 'bold',
  color: '#1e293b',
  margin: '0 0 4px 0',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const priceStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#e11d48', // প্রাইস কালার হাইলাইট
  fontWeight: 'bold',
  margin: '0',
};

const askBtnStyle: React.CSSProperties = {
  width: '100%',
  marginTop: '8px',
  padding: '6px 4px',
  background: '#f1f5f9',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '10px',
  fontWeight: '600',
  cursor: 'pointer',
  color: '#475569',
  transition: 'all 0.2s ease',
};