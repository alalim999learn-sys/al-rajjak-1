//C:\Users\Shanon\al-rajjak-1\app\admin\watches\page.tsx



"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import ShopKnowledgeManager from '@/components/admin/ShopKnowledgeManager';

// --- সুপাবেস কনফিগারেশন ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

type TabType = 'products' | 'welcome';

interface Product {
  id: string; name: string; brand: string; category: string;
  sub_category: string; price: number; original_price: number | null;
  movement: string; glass_type: string; water_resistance: string;
  warranty: string; images: string[];
}

const CATEGORY_MAP_ES: Record<string, string[]> = {
  "Lujo": ["Metal", "Cuero"],
  "Reloj Inteligente": ["Silicona", "Acero"],
  "Deportivo": ["Digital", "Analógico"],
  "Casual": ["Cuero", "Correa Nato"]
};

const initialForm: Product = {
  id: '', name: '', brand: '', category: 'Lujo', sub_category: 'Metal',
  price: 0, original_price: null, movement: '', glass_type: '',
  water_resistance: '', warranty: '', images: []
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(initialForm);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // ফিল্টার স্টেট
  const [filterCat, setFilterCat] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/watches');
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (e) { console.error("Error al cargar productos", e); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const files = Array.from(e.target.files);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `watches-images/${fileName}`;

        const { data, error } = await supabase.storage
          .from('watches') 
          .upload(filePath, file);

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
          .from('watches')
          .getPublicUrl(filePath);

        if (publicUrlData) uploadedUrls.push(publicUrlData.publicUrl);
      }

      setForm(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    } catch (error: any) {
      alert("Error al subir a Supabase: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.images.length === 0) {
        alert("¡Debes subir al menos una imagen!");
        return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/admin/watches', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: form.id.toUpperCase() }),
      });
      if (res.ok) {
        await fetchProducts();
        setForm(initialForm);
        setIsEditing(false);
        alert("¡Guardado con éxito!");
      }
    } catch (e) { alert("Error al guardar el producto"); }
    setLoading(false);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;
    await fetch(`/api/admin/watches?id=${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  // ফিল্টার লজিক
  const filteredProducts = products.filter(p => {
    const matchesCat = filterCat === 'All' || p.category === filterCat;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* TABS */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '2px solid #e2e8f0' }}>
        <button onClick={() => setActiveTab('products')} style={activeTab === 'products' ? activeTabStyle : tabStyle}>📦 PRODUCTOS</button>
        <button onClick={() => setActiveTab('welcome')} style={activeTab === 'welcome' ? activeTabStyle : tabStyle}>📢 BIENVENIDA / BANNER</button>
      </div>

      {activeTab === 'products' && (
        <div key="products-tab">
          <h2 style={sectionTitle}>{isEditing ? 'EDITAR PRODUCTO' : 'AGREGAR NUEVO PRODUCTO'}</h2>
          
          {/* FORM - Add/Edit Product */}
          <form onSubmit={handleSubmit} style={formGridStyle}>
             <input placeholder="ID (ej: GD001)" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} required style={inputStyle} disabled={isEditing} />
             <input placeholder="Marca (ej: Guodhu)" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} required style={inputStyle} />
             <input placeholder="Nombre / Modelo" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={{ ...inputStyle, gridColumn: 'span 2' }} />
             
             <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value, sub_category: CATEGORY_MAP_ES[e.target.value][0]})} style={inputStyle}>
                {Object.keys(CATEGORY_MAP_ES).map(cat => <option key={cat} value={cat}>{cat}</option>)}
             </select>
             <select value={form.sub_category} onChange={e => setForm({ ...form, sub_category: e.target.value })} style={inputStyle}>
                {CATEGORY_MAP_ES[form.category]?.map(sub => <option key={sub} value={sub}>{sub}</option>)}
             </select>

             <input type="number" placeholder="Precio Actual (€)" value={form.price || ''} onChange={e => setForm({ ...form, price: Number(e.target.value) })} style={inputStyle} />
             <input type="number" placeholder="Precio Original (€)" value={form.original_price || ''} onChange={e => setForm({ ...form, original_price: Number(e.target.value) })} style={inputStyle} />

             <input placeholder="⚙️ Movimiento" value={form.movement} onChange={e => setForm({ ...form, movement: e.target.value })} style={inputStyle} />
             <input placeholder="💎 Cristal" value={form.glass_type} onChange={e => setForm({ ...form, glass_type: e.target.value })} style={inputStyle} />
             <input placeholder="🌊 Water Res" value={form.water_resistance} onChange={e => setForm({ ...form, water_resistance: e.target.value })} style={inputStyle} />
             <input placeholder="🛡️ Garantía" value={form.warranty} onChange={e => setForm({ ...form, warranty: e.target.value })} style={inputStyle} />

             {/* IMAGE UPLOAD */}
             <div style={{ gridColumn: '1 / -1', background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '2px dashed #2563eb' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#1e293b' }}>📸 SUBIR IMÁGENES A SUPABASE</label>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={uploading} style={{ marginBottom: '10px' }} />
                {uploading && <p style={{ color: '#2563eb', fontWeight: 'bold' }}>Subiendo a Supabase... ⏳</p>}
                
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                    {form.images.map((url, index) => (
                        <div key={index} style={{ position: 'relative', width: '80px', height: '80px' }}>
                            <img src={url} alt="watch" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                            <button type="button" onClick={() => setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))} 
                                style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
                        </div>
                    ))}
                </div>
             </div>
             
             <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px' }}>
                <button type="submit" style={submitBtnStyle} disabled={loading || uploading}>
                  {loading ? 'Procesando...' : isEditing ? 'ACTUALIZAR PRODUCTO' : 'GUARDAR PRODUCTO'}
                </button>
                {isEditing && (
                  <button type="button" onClick={() => { setForm(initialForm); setIsEditing(false); }} style={{ ...submitBtnStyle, background: '#64748b' }}>CANCELAR</button>
                )}
             </div>
          </form>

          {/* --- FILTER SECTION --- */}
          <div style={{ marginTop: '40px', display: 'flex', gap: '15px', alignItems: 'center', background: '#f1f5f9', padding: '15px', borderRadius: '8px' }}>
             <span style={{ fontWeight: 'bold' }}>🔍 FILTRAR:</span>
             <input 
               placeholder="Buscar por nombre, marca o ID..." 
               value={searchTerm} 
               onChange={e => setSearchTerm(e.target.value)} 
               style={{ ...inputStyle, flex: 2 }} 
             />
             <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ ...inputStyle, flex: 1 }}>
                <option value="All">Todas las Categorías</option>
                {Object.keys(CATEGORY_MAP_ES).map(cat => <option key={cat} value={cat}>{cat}</option>)}
             </select>
             <span style={{ fontSize: '14px', color: '#64748b' }}>Total: {filteredProducts.length}</span>
          </div>

          {/* TABLE WITH IMAGES */}
          <div style={tableWrapper}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  <th style={thStyle}>FOTO</th>
                  <th style={thStyle}>ID / CATEGORÍA</th>
                  <th style={thStyle}>MARCA / NOMBRE</th>
                  <th style={thStyle}>PRECIO</th>
                  <th style={thStyle}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? filteredProducts.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={tdStyle}>
                      <img src={p.images[0]} alt="thumb" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
                    </td>
                    <td style={tdStyle}>
                      <b>{p.id}</b><br/>
                      <span style={{ fontSize: '11px', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>{p.category}</span>
                    </td>
                    <td style={tdStyle}><b>{p.brand}</b><br/><span style={{fontSize:'12px', color: '#64748b'}}>{p.name}</span></td>
                    <td style={tdStyle}>
                      <span style={{ color: '#059669', fontWeight: 'bold' }}>€{p.price}</span>
                      {p.original_price && <br/>}
                      {p.original_price && <span style={{ fontSize: '11px', textDecoration: 'line-through', color: '#94a3b8' }}>€{p.original_price}</span>}
                    </td>
                    <td style={tdStyle}>
                      <button onClick={() => { setForm(p); setIsEditing(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={editBtnStyle}>Editar</button>
                      <button onClick={() => deleteProduct(p.id)} style={delBtnStyle}>Borrar</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>No se encontraron productos.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'welcome' && (
        <div className="welcome-only-mode" style={cardStyle}>
          <h2 style={sectionTitle}>📢 CONFIGURACIÓN DE BIENVENIDA</h2>
          <ShopKnowledgeManager />
        </div>
      )}
    </div>
  );
}

// --- CSS STYLES (No changes needed) ---
const baseTab: React.CSSProperties = { padding: '12px 24px', background: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', border: 'none' };
const tabStyle: React.CSSProperties = { ...baseTab, color: '#64748b', borderBottom: '3px solid transparent' };
const activeTabStyle: React.CSSProperties = { ...baseTab, color: '#2563eb', borderBottom: '3px solid #2563eb' };
const sectionTitle: React.CSSProperties = { fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b', borderLeft: '4px solid #2563eb', paddingLeft: '10px' };
const inputStyle: React.CSSProperties = { padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff', width: '100%' };
const formGridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' };
const submitBtnStyle: React.CSSProperties = { width: '100%', background: '#2563eb', color: '#fff', padding: '14px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' };
const editBtnStyle: React.CSSProperties = { background: '#f59e0b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', marginRight: '5px', cursor: 'pointer' };
const delBtnStyle: React.CSSProperties = { background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' };
const tableWrapper: React.CSSProperties = { marginTop: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', background: '#fff' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse' };
const thStyle: React.CSSProperties = { padding: '15px', textAlign: 'left', background: '#f1f5f9', color: '#64748b', fontSize: '12px' };
const tdStyle: React.CSSProperties = { padding: '15px', fontSize: '14px' };
const cardStyle: React.CSSProperties = { background: '#fff', padding: '30px', borderRadius: '15px', border: '1px solid #e2e8f0' };