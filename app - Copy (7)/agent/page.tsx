//C:\Users\Shanon\al-rajjak-1\app\agent\page.tsx



"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';

export default function AgentDashboard() {
  const [phone, setPhone] = useState(''); // এখানে শুধু ইউজার ইনপুট থাকবে
  const [activeNumber, setActiveNumber] = useState('Cargando...');

  const loadNumber = async () => {
    const { data } = await supabase.from('active_shop').select('phone_number').eq('id', 1).maybeSingle();
    if (data) setActiveNumber(data.phone_number);
    else setActiveNumber('Ninguno');
  };

  useEffect(() => { loadNumber(); }, []);

  const handleUpdate = async () => {
    if (!phone) return alert("Por favor, introduce el número.");

    // অটোমেটিক স্পেনের কোড (34) যোগ করা হচ্ছে
    const fullNumber = `34${phone.replace(/\s/g, '')}`; // স্পেস থাকলে রিমুভ করে দেবে

    const { error } = await supabase
      .from('active_shop')
      .upsert({ 
        id: 1, 
        phone_number: fullNumber, 
        updated_at: new Date().toISOString() 
      }, { onConflict: 'id' });

    if (!error) {
      alert(`¡Éxito! Tienda activada con el número: +${fullNumber}`);
      setPhone('');
      loadNumber();
    }
  };

  return (
    <div style={dashStyle}>
      <div style={{maxWidth: '400px', margin: '0 auto'}}>
        <h1 style={{fontSize: '26px', fontWeight: '900'}}>CONTROL DE AGENTE</h1>
        
        <div style={cardStyle}>
          <p style={{fontSize: '11px', color: '#94a3b8'}}>NÚMERO ACTIVO:</p>
          <h2 style={{fontSize: '34px', color: '#25D366', margin: '10px 0'}}>
            {activeNumber !== 'Ninguno' ? `+${activeNumber}` : 'Ninguno'}
          </h2>
        </div>

        <div style={{marginTop: '40px', textAlign: 'left'}}>
          <label style={labelStyle}>INTRODUCE EL NÚMERO (SIN EL 34):</label>
          
          {/* UI Wrapper for Country Code Visual */}
          <div style={inputWrapper}>
            <span style={countryCodeBadge}>+34</span>
            <input 
              type="tel"
              value={phone} 
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} // শুধু সংখ্যা অ্যালাউ করবে
              placeholder="600 000 000"
              style={inputStyle}
            />
          </div>

          <button onClick={handleUpdate} style={addBtn}>
            ACTIVAR TIENDA (SPAIN)
          </button>
          
          <p style={{fontSize: '10px', color: '#64748b', marginTop: '10px', textAlign: 'center'}}>
            * El código +34 se añade automáticamente.
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Styles আপডেট করা হয়েছে ---
const dashStyle: React.CSSProperties = { padding: '60px 20px', background: '#0f172a', minHeight: '100vh', color: '#fff', textAlign: 'center' };
const cardStyle: React.CSSProperties = { background: '#1e293b', padding: '30px 20px', borderRadius: '28px', border: '1px solid #334155' };

const inputWrapper: React.CSSProperties = { 
  display: 'flex', 
  alignItems: 'center', 
  background: '#fff', 
  borderRadius: '16px', 
  overflow: 'hidden', 
  border: '4px solid #334155',
  marginBottom: '15px'
};

const countryCodeBadge: React.CSSProperties = { 
  padding: '0 15px', 
  background: '#f1f5f9', 
  color: '#475569', 
  fontWeight: '900', 
  fontSize: '20px',
  borderRight: '2px solid #e2e8f0',
  height: '60px',
  display: 'flex',
  alignItems: 'center'
};

const inputStyle: React.CSSProperties = { 
  flex: 1, 
  padding: '15px', 
  border: 'none', 
  color: '#000', 
  fontWeight: 'bold', 
  fontSize: '22px', 
  outline: 'none',
  width: '100%'
};

const addBtn: React.CSSProperties = { width: '100%', padding: '18px', background: '#25D366', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '900', fontSize: '16px', cursor: 'pointer' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '11px', marginBottom: '8px', color: '#94a3b8', fontWeight: '900', paddingLeft: '5px' };