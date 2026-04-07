


//C:\C:\Users\Shanon\al-rajjak-1\components\CarCard.tsx
"use client";

import React from 'react';

interface CarCardProps {
  car: {
    id: string;
    name: string;
    price: string;
    image: string;
    description: string;
    specs: {
      engine: string;
      hp: string;
      acceleration: string;
    };
  };
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <div style={cardStyle}>
      {/* গাড়ির ছবি */}
      <div style={imageWrapper}>
        <img src={car.image} alt={car.name} style={imageStyle} />
        <div style={badgeStyle}>PREMIUM</div>
      </div>

      {/* গাড়ির তথ্য */}
      <div style={infoWrapper}>
        <h3 style={titleStyle}>{car.name}</h3>
        <p style={priceStyle}>{car.price}</p>
        
        {/* ছোট স্পেসিফিকেশন গ্রিড */}
        <div style={specGrid}>
          <div style={specItem}>
            <span style={specLabel}>MOTOR</span>
            <span style={specValue}>{car.specs.engine}</span>
          </div>
          <div style={specItem}>
            <span style={specLabel}>LEISTUNG</span>
            <span style={specValue}>{car.specs.hp} PS</span>
          </div>
        </div>

        {/* ডেসক্রিপশন (খুব ছোট করে) */}
        <p style={descStyle}>{car.description.substring(0, 50)}...</p>

        {/* কন্টাক্ট বা ডিটেইল বাটন */}
        <button style={buttonStyle}>
          Details ansehen
        </button>
      </div>
    </div>
  );
}

// --- STYLES ---

const cardStyle: React.CSSProperties = {
  flex: '0 0 240px', // চ্যাটে সাইডওয়াইজ স্ক্রল করার জন্য ফিক্সড উইডথ
  backgroundColor: '#fff',
  borderRadius: '16px',
  overflow: 'hidden',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  display: 'flex',
  flexDirection: 'column',
  marginRight: '12px',
  transition: 'transform 0.2s ease',
};

const imageWrapper: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '130px',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const badgeStyle: React.CSSProperties = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  backgroundColor: '#000',
  color: '#fff',
  fontSize: '9px',
  fontWeight: 'bold',
  padding: '4px 8px',
  borderRadius: '4px',
  letterSpacing: '1px',
};

const infoWrapper: React.CSSProperties = {
  padding: '12px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '800',
  margin: '0 0 4px 0',
  color: '#1a202c',
  textTransform: 'uppercase',
};

const priceStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '900',
  color: '#2563eb', // Blue color for price
  margin: '0 0 10px 0',
};

const specGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
  marginBottom: '10px',
  borderTop: '1px solid #f1f5f9',
  paddingTop: '8px',
};

const specItem: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const specLabel: React.CSSProperties = {
  fontSize: '8px',
  color: '#94a3b8',
  fontWeight: 'bold',
};

const specValue: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 'bold',
  color: '#475569',
};

const descStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#64748b',
  lineHeight: '1.4',
  margin: '0 0 12px 0',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
  textTransform: 'uppercase',
};