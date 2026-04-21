//C:\Users\Shanon\al-rajjak-1\app\admin\furniture\page.tsx



"use client";
import { useState, useEffect } from "react";

export default function FurnitureAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const initialForm = {
    id: "PX-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    brand: "PXLOUE",
    title: "",
    type: "Boxspring",
    status: "Trend-Design",
    description: "",
    original_price: "",
    current_price: "",
    currency: "EUR",
    discount_label: "",
    dimensions: "",
    color_primary: "",
    fabric_type: "",
    
    // JSONB Fields
    service_info: { assembly: "Available", return_policy: "30 Days" },
    material_info: { fabric_name: "Polyester", fabric_properties: "Weich, Atmungsaktiv", is_vegan: false },
    frame_info: { material: "Solid Wood", wood_type: "Pine", construction: "Standard" },
    cushion_info: { foam_type: "HR Foam", foam_density: "35kg/m³", seat_hardness: "Medium" },
    dimensions_detailed: { width_cm: "", depth_cm: "", height_cm: "", leg_height_cm: "", robot_vacuum_clearance: false },
    warranty_info: { warranty_years: "2", extended_available: false, extended_cost_eur: "", return_days: "14" },
    delivery_info: { delivery_days: "7", delivery_cost_eur: "0", assembly_available: false },
    certifications: { oeko_tex: true, made_in_germany: false, fire_resistant: true },
    load_capacity: { max_weight_kg: "250", per_seat_kg: "125" },
    colors_available: [{ name: "Beige", code: "#D2B48C", in_stock: true }],
    payment_info: { installment_available: true, monthly_payment_eur: "", payment_methods: ["PayPal", "Credit Card"] }
  };

  const [form, setForm] = useState(initialForm);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/furniture");
      const result = await res.json();
      if (result.success) setProducts(result.data);
    } catch (err) { console.error("Fetch Error", err); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleImageProcess = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const processPromises = Array.from(files).map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target?.result as string;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 1313; canvas.height = 1313;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              const minSide = Math.min(img.width, img.height);
              const sx = (img.width - minSide) / 2;
              const sy = (img.height - minSide) / 2;
              ctx.fillStyle = "white";
              ctx.fillRect(0, 0, 1313, 1313);
              ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, 1313, 1313);
              resolve(canvas.toDataURL("image/webp", 0.8));
            }
          };
        };
      });
    });
    const results = await Promise.all(processPromises);
    setImages((prev) => [...prev, ...results]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = { ...form, images: images };

    const res = await fetch("/api/admin/furniture", {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (result.success) {
      alert("✅ Product saved successfully!");
      closeForm();
      fetchProducts();
    } else {
      alert("❌ Error: " + result.error);
    }
    setLoading(false);
  };

  const openForm = (product: any = null) => {
    if (product) {
      setForm(product);
      setImages(product.images || []);
      setIsEditing(true);
    } else {
      setForm({ ...initialForm, id: "PX-" + Math.random().toString(36).substr(2, 9).toUpperCase() });
      setImages([]);
      setIsEditing(false);
    }
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
  };

  return (
    <div className="p-6 pt-16 bg-slate-100 min-h-screen font-sans">
      <div className="max-w-full mx-auto">
        
        {/* Header Section */}
        <header className="flex justify-between items-center mb-10 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
           <div>
              <h1 className="text-3xl font-black tracking-tighter">PX <span className="text-orange-500 italic">INVENTORY</span></h1>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Furniture Management System</p>
           </div>
           <button 
             onClick={() => openForm()}
             className="bg-black text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-orange-600 transition-all shadow-lg active:scale-95"
           >
             + UPLOAD NEW
           </button>
        </header>

        {/* Modal Form Overlay */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeForm}></div>
            
            <div className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl border-t-8 border-orange-500 animate-in fade-in zoom-in duration-300">
              <div className="p-8 md:p-12">
                <header className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black tracking-tight uppercase">
                    {isEditing ? "✏️ Edit Product" : "➕ New Furniture Entry"}
                  </h2>
                  <button onClick={closeForm} className="bg-gray-100 p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Column 1: Basic Info */}
                  <div className="space-y-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <p className="text-[10px] font-black text-orange-500 uppercase">📋 1. Basic Details</p>
                    <input className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-orange-400" placeholder="Product Title *" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} />
                    <input className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="Brand" value={form.brand} onChange={(e)=>setForm({...form, brand:e.target.value})} />
                    <input className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="Type (e.g., Boxspring, Eckcouch)" value={form.type} onChange={(e)=>setForm({...form, type:e.target.value})} />
                    <select className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none" value={form.status} onChange={(e)=>setForm({...form, status:e.target.value})}>
                      <option>Trend-Design</option>
                      <option>TOPSELLER!</option>
                      <option>Fast ausverkauft</option>
                      <option>Neu</option>
                    </select>
                    <textarea className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none h-24" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} />
                  </div>

                  {/* Column 2: Price & Dimensions */}
                  <div className="space-y-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <p className="text-[10px] font-black text-orange-500 uppercase">💰 2. Price & Dimensions</p>
                    <div className="grid grid-cols-2 gap-3">
                      <input className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 font-bold text-orange-600 outline-none" placeholder="Current Price € *" type="number" value={form.current_price} onChange={(e)=>setForm({...form, current_price:e.target.value})} />
                      <input className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="Original Price €" type="number" value={form.original_price} onChange={(e)=>setForm({...form, original_price:e.target.value})} />
                    </div>
                    <input className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="Dimensions (e.g., 140 x 200 cm)" value={form.dimensions} onChange={(e)=>setForm({...form, dimensions:e.target.value})} />
                    <div className="grid grid-cols-3 gap-2">
                      <input className="p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none text-sm" placeholder="Width cm" type="number" value={form.dimensions_detailed.width_cm} onChange={(e)=>setForm({...form, dimensions_detailed:{...form.dimensions_detailed, width_cm:e.target.value}})} />
                      <input className="p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none text-sm" placeholder="Depth cm" type="number" value={form.dimensions_detailed.depth_cm} onChange={(e)=>setForm({...form, dimensions_detailed:{...form.dimensions_detailed, depth_cm:e.target.value}})} />
                      <input className="p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none text-sm" placeholder="Height cm" type="number" value={form.dimensions_detailed.height_cm} onChange={(e)=>setForm({...form, dimensions_detailed:{...form.dimensions_detailed, height_cm:e.target.value}})} />
                    </div>
                    <input className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="Color" value={form.color_primary} onChange={(e)=>setForm({...form, color_primary:e.target.value})} />
                    <input className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="Fabric Type" value={form.fabric_type} onChange={(e)=>setForm({...form, fabric_type:e.target.value})} />
                  </div>

                  {/* Column 3: Material & Warranty */}
                  <div className="space-y-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <p className="text-[10px] font-black text-orange-500 uppercase">🧵 3. Material & Warranty</p>
                    <input className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="Material Fabric Name" value={form.material_info.fabric_name} onChange={(e)=>setForm({...form, material_info:{...form.material_info, fabric_name:e.target.value}})} />
                    <input className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="Frame Material" value={form.frame_info.material} onChange={(e)=>setForm({...form, frame_info:{...form.frame_info, material:e.target.value}})} />
                    <div className="flex gap-4 items-center">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={form.material_info.is_vegan} onChange={(e)=>setForm({...form, material_info:{...form.material_info, is_vegan:e.target.checked}})} /> 
                        Vegan
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={form.certifications.oeko_tex} onChange={(e)=>setForm({...form, certifications:{...form.certifications, oeko_tex:e.target.checked}})} /> 
                        Oeko-Tex
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input className="p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="Warranty Years" value={form.warranty_info.warranty_years} onChange={(e)=>setForm({...form, warranty_info:{...form.warranty_info, warranty_years:e.target.value}})} />
                      <input className="p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="Return Days" value={form.warranty_info.return_days} onChange={(e)=>setForm({...form, warranty_info:{...form.warranty_info, return_days:e.target.value}})} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input className="p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="Delivery Days" value={form.delivery_info.delivery_days} onChange={(e)=>setForm({...form, delivery_info:{...form.delivery_info, delivery_days:e.target.value}})} />
                      <input className="p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none" placeholder="Monthly Payment €" value={form.payment_info.monthly_payment_eur} onChange={(e)=>setForm({...form, payment_info:{...form.payment_info, monthly_payment_eur:e.target.value}})} />
                    </div>
                  </div>

                  {/* Column 4: Images & Submit */}
                  <div className="space-y-4 bg-gray-50 p-6 rounded-3xl border border-gray-100 lg:col-span-3">
                    <p className="text-[10px] font-black text-orange-500 uppercase">🖼️ 4. Media Upload</p>
                    <div className="border-2 border-dashed border-gray-200 p-6 rounded-2xl text-center bg-white cursor-pointer hover:border-orange-400 transition-all">
                      <input type="file" multiple accept="image/*" onChange={handleImageProcess} className="w-full text-sm" />
                      <div className="flex gap-3 mt-4 flex-wrap">
                        {images.map((img, i) => (
                          <div key={i} className="relative">
                            <img src={img} className="w-20 h-20 rounded-xl shadow-sm border object-cover" />
                            <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={handleSubmit} 
                      disabled={loading} 
                      className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-orange-600 transition-all shadow-xl disabled:bg-gray-400"
                    >
                      {loading ? "⏳ PROCESSING..." : isEditing ? "✏️ UPDATE DATA" : "🚀 PUBLISH TO DB"}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] uppercase font-black text-gray-400 tracking-widest border-b">
              <tr>
                <th className="p-8">Visual</th>
                <th>Product Info</th>
                <th>Pricing</th>
                <th>Specs</th>
                <th>Dimensions</th>
                <th className="text-right p-8">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map(p => (
                <tr key={p.id} className="group hover:bg-slate-50/80 transition-all">
                  <td className="p-8">
                    <img 
                      src={p.images?.[0] || "https://via.placeholder.com/150"} 
                      className="w-20 h-20 rounded-3xl object-cover shadow-md group-hover:scale-105 transition-transform" 
                      alt={p.title}
                    />
                  </td>
                  <td>
                    <p className="font-black text-gray-900">{p.title}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter mt-1">{p.brand} | {p.id}</p>
                  </td>
                  <td>
                    <p className="font-black text-orange-600 text-lg">€{p.current_price}</p>
                    {p.original_price && <p className="text-xs text-gray-300 line-through font-bold">€{p.original_price}</p>}
                  </td>
                  <td>
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-blue-50 text-blue-500 px-3 py-1 rounded-full text-[9px] font-black uppercase">{p.type}</span>
                      <span className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-[9px] font-black uppercase">{p.status}</span>
                      <span className="bg-green-50 text-green-500 px-3 py-1 rounded-full text-[9px] font-black uppercase">{p.fabric_type}</span>
                    </div>
                  </td>
                  <td className="text-sm text-gray-600">{p.dimensions}</td>
                  <td className="p-8 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => openForm(p)} className="p-3 bg-black text-white rounded-2xl hover:bg-orange-500 transition-all shadow-md">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button onClick={async () => { if(confirm("Delete this product?")) { await fetch(`/api/admin/furniture?id=${p.id}`, {method:'DELETE'}); fetchProducts();} }} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}