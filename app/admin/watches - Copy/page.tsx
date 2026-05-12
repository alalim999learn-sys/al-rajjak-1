//C:\Users\Shanon\al-rajjak-1\app\admin\watches\page.tsx



"use client";
import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  brand: string;
  sku: string;
  category: string;
  sub_category: string;
  price: number;
  original_price: number | null;
  currency: string;
  movement: string;
  glass_type: string;
  water_resistance: string;
  luminous: string;
  warranty: string;
  case_diameter: string;
  case_thickness: string;
  lug_to_lug: string;
  lug_width: string;
  strap_material: string;
  dial_color: string;
  bezel_type: string;
  stock_status: string;
  images: string[];
}

// furniture.tsx এর সাথে হুবহু মিল রাখা হয়েছে
 const CATEGORY_MAP: Record<string, string[]> = {

  "Luxury": ["Metal", "Leather"],

  "Smartwatch": ["Silicone", "Steel"],

  "Sport": ["Digital", "Analog"],

  "Casual": ["Leather", "Nato Strap"]

}; 

const initialForm: Product = {
  id: '', name: '', brand: 'ADDIESDIVE', sku: '', 
  category: 'Luxury', sub_category: 'Metal',
  price: 0, original_price: null, currency: 'USD',
  movement: '', glass_type: '', water_resistance: 'Yes',
  luminous: '', warranty: '', case_diameter: '',
  case_thickness: '', lug_to_lug: '', lug_width: '', strap_material: '',
  dial_color: '', bezel_type: '', stock_status: 'In Stock', images: []
};

export default function AdminWatchesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(initialForm);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/watches');
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (e) { console.error("Load failed", e); }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCat = e.target.value;
    const availableSubs = CATEGORY_MAP[selectedCat] || [];
    setForm({ ...form, category: selectedCat, sub_category: availableSubs[0] || '' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    const promises = fileArray.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then((base64Images) => {
      setForm(prev => ({ ...prev, images: [...prev.images, ...base64Images] }));
    });
  };

  const removeImage = (index: number) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.images.length === 0) return alert("Please upload at least one image");
    setLoading(true);

    const payload = {
      ...form,
      price: Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : null,
      id: form.id.trim()
    };

    const method = isEditing ? 'PUT' : 'POST';
    try {
      const res = await fetch('/api/admin/watches', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        fetchProducts();
        setForm(initialForm);
        setIsEditing(false);
        alert("Watch Data Saved Successfully!");
      }
    } catch (e) { alert("Action failed"); }
    setLoading(false);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/admin/watches?id=${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontWeight: '900', borderBottom: '3px solid #2563eb', paddingBottom: '10px' }}>WATCH INVENTORY</h1>

      <form onSubmit={handleSubmit} style={formGridStyle}>
        <input placeholder="Product ID (e.g. AD-01)" value={form.id} onChange={e => setForm({...form, id: e.target.value})} required style={inputStyle} disabled={isEditing} />
        <input placeholder="Watch Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={inputStyle} />
        <input placeholder="Brand" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} style={inputStyle} />
        <input placeholder="SKU" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} style={inputStyle} />
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} required style={{...inputStyle, flex: 2}} />
          <select value={form.currency} onChange={e => setForm({...form, currency: e.target.value})} style={{...inputStyle, flex: 1}}>
            <option value="USD">USD</option>
            <option value="BDT">BDT</option>
          </select>
        </div>
        <input type="number" placeholder="Original Price" value={form.original_price || ''} onChange={e => setForm({...form, original_price: e.target.value ? Number(e.target.value) : null})} style={inputStyle} />
        
        <select value={form.category} onChange={handleCategoryChange} style={inputStyle}>
          {Object.keys(CATEGORY_MAP).map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select value={form.sub_category} onChange={e => setForm({...form, sub_category: e.target.value})} style={inputStyle}>
          {CATEGORY_MAP[form.category]?.map(sub => <option key={sub} value={sub}>{sub}</option>)}
        </select>

        {/* Technical Specs */}
        <input placeholder="Movement" value={form.movement} onChange={e => setForm({...form, movement: e.target.value})} style={inputStyle} />
        <input placeholder="Glass Type" value={form.glass_type} onChange={e => setForm({...form, glass_type: e.target.value})} style={inputStyle} />
        
        {/* Water Resistance Dropdown */}
        <select value={form.water_resistance} onChange={e => setForm({...form, water_resistance: e.target.value})} style={inputStyle}>
          <option value="Yes">Water Resistant: Yes</option>
          <option value="No">Water Resistant: No</option>
          <option value="30m">30m / 3 Bar</option>
          <option value="50m">50m / 5 Bar</option>
          <option value="100m">100m / 10 Bar</option>
          <option value="200m">200m / 20 Bar</option>
        </select>

        <input placeholder="Luminous" value={form.luminous} onChange={e => setForm({...form, luminous: e.target.value})} style={inputStyle} />
        <input placeholder="Warranty" value={form.warranty} onChange={e => setForm({...form, warranty: e.target.value})} style={inputStyle} />
        <input placeholder="Diameter (mm)" value={form.case_diameter} onChange={e => setForm({...form, case_diameter: e.target.value})} style={inputStyle} />
        <input placeholder="Thickness (mm)" value={form.case_thickness} onChange={e => setForm({...form, case_thickness: e.target.value})} style={inputStyle} />
        <input placeholder="Lug to Lug" value={form.lug_to_lug} onChange={e => setForm({...form, lug_to_lug: e.target.value})} style={inputStyle} />
        <input placeholder="Lug Width" value={form.lug_width} onChange={e => setForm({...form, lug_width: e.target.value})} style={inputStyle} />
        <input placeholder="Strap Material" value={form.strap_material} onChange={e => setForm({...form, strap_material: e.target.value})} style={inputStyle} />
        <input placeholder="Dial Color" value={form.dial_color} onChange={e => setForm({...form, dial_color: e.target.value})} style={inputStyle} />
        <input placeholder="Bezel Type" value={form.bezel_type} onChange={e => setForm({...form, bezel_type: e.target.value})} style={inputStyle} />
        
        <select value={form.stock_status} onChange={e => setForm({...form, stock_status: e.target.value})} style={inputStyle}>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        <div style={{ gridColumn: '1 / -1', border: '2px dashed #cbd5e1', padding: '15px' }}>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            {form.images.map((img, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <img src={img} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                <button type="button" onClick={() => removeImage(idx)} style={removeImgBtn}>✕</button>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px' }}>
          <button type="submit" style={submitBtnStyle}>{loading ? '...' : 'SAVE WATCH'}</button>
          {isEditing && <button type="button" onClick={() => {setIsEditing(false); setForm(initialForm);}} style={cancelBtnStyle}>CANCEL</button>}
        </div>
      </form>

      <div style={{ marginTop: '30px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#1e293b', color: '#fff' }}>
            <tr>
              <th style={thStyle}>NAME</th>
              <th style={thStyle}>PRICE</th>
              <th style={thStyle}>STOCK</th>
              <th style={thStyle}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={tdStyle}>{p.name}</td>
                <td style={tdStyle}>{p.currency} {p.price}</td>
                <td style={tdStyle}>{p.stock_status}</td>
                <td style={tdStyle}>
                  <button onClick={() => {setForm(p); setIsEditing(true);}} style={editBtnStyle}>Edit</button>
                  <button onClick={() => deleteProduct(p.id)} style={delBtnStyle}>Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const formGridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', background: '#f8fafc', padding: '20px', borderRadius: '12px' };
const inputStyle: React.CSSProperties = { padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' };
const submitBtnStyle: React.CSSProperties = { flex: 1, background: '#2563eb', color: '#fff', padding: '12px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
const cancelBtnStyle: React.CSSProperties = { background: '#64748b', color: '#fff', padding: '12px', border: 'none', borderRadius: '6px' };
const thStyle: React.CSSProperties = { padding: '12px', textAlign: 'left' };
const tdStyle: React.CSSProperties = { padding: '12px' };
const editBtnStyle: React.CSSProperties = { marginRight: '5px', background: '#f59e0b', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px' };
const delBtnStyle: React.CSSProperties = { background: '#ef4444', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px' };
const removeImgBtn: React.CSSProperties = { position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer' };