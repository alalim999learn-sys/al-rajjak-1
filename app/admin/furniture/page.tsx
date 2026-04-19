//C:\Users\Shanon\al-rajjak-1\app\admin\furniture\page.tsx



"use client";
import { useState } from "react";

export default function FurnitureAdmin() {
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  
  const [form, setForm] = useState({
    id: "PX-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    brand: "PXLOUE",
    title: "",
    category: "beds", // beds or sofas
    status: "Trend-Design",
    description: "",
    
    // Pricing
    current_price: "",
    original_price: "",
    
    // Material Info
    fabric_name: "Cord / Velours",
    fabric_composition: "100% Polyester",
    fabric_properties: "Stain-resistant, Pet-friendly",
    cleaning_method: "Vacuum or wipe with damp cloth",
    is_vegan: true,
    fabric_martindale: "100000",
    
    // Dimensions
    width_cm: "",
    depth_cm: "",
    height_cm: "",
    robot_vacuum_clearance: true,

    // Category Specific (Dynamic)
    seats: "6 Personen", // For Sofas
    bed_size: "140 x 200 cm", // For Beds
    
    // Delivery & Service
    delivery_days: "7",
    assembly_available: true,
    warranty_years: "2",
    
    // Features (Comma Separated)
    features: "Moderner Cord-Bezug, L-Form, Stabil & Bequem"
  });

  // Image processing logic remains same as yours...
  const handleImageProcess = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsProcessing(true);
    const processPromises = Array.from(files).map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target?.result as string;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const size = 1000;
            canvas.width = size; canvas.height = size;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const minSide = Math.min(img.width, img.height);
            const sx = (img.width - minSide) / 2;
            const sy = (img.height - minSide) / 2;
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, size, size);
            ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);
            resolve(canvas.toDataURL("image/webp", 0.7));
          };
        };
      });
    });
    try {
      const processedImages = await Promise.all(processPromises);
      setImages((prev) => [...prev, ...processedImages] as string[]);
    } catch (err) { console.error(err); } finally { setIsProcessing(false); e.target.value = ""; }
  };

  const handleSubmit = async () => {
    if (!form.title || images.length === 0 || !form.current_price) {
      return alert("Title, Price and at least one image are mandatory!");
    }
    setLoading(true);

    // তোর API route-এর সাথে ম্যাচ করা পূর্ণাঙ্গ পেলোড
    const payload = {
      id: form.id,
      brand: form.brand,
      title: form.title,
      category: form.category,
      status: form.status,
      description: form.description,
      images: images,
      features: form.features.split(",").map(f => f.trim()),
      
      pricing: {
        original_price: Number(form.original_price) || null,
        current_price: Number(form.current_price),
        currency: "EUR",
        discount_label: form.original_price ? `-${Math.round(((Number(form.original_price) - Number(form.current_price)) / Number(form.original_price)) * 100)}%` : ""
      },
      
      material_info: {
        fabric_name: form.fabric_name,
        composition: form.fabric_composition,
        properties: form.fabric_properties,
        is_vegan: form.is_vegan,
        martindale: form.fabric_martindale
      },
      
      dimensions_info: {
        width_cm: Number(form.width_cm),
        depth_cm: Number(form.depth_cm),
        height_cm: Number(form.height_cm),
        robot_vacuum_clearance: form.robot_vacuum_clearance,
        // ক্যাটাগরি অনুযায়ী এক্সট্রা ডাটা
        seats: form.category === "sofas" ? form.seats : null,
        bed_size: form.category === "beds" ? form.bed_size : null
      },
      
      delivery_info: {
        delivery_days: Number(form.delivery_days),
        assembly_available: form.assembly_available
      }
    };

    try {
      const res = await fetch("/api/admin/furniture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        alert("✅ Product Published Successfully!");
        setImages([]);
        // Reset ID for next product
        setForm(prev => ({...prev, id: "PX-" + Math.random().toString(36).substr(2, 9).toUpperCase()}));
      } else { alert("❌ Error: " + result.error); }
    } catch (err) { alert("❌ Connection Error"); } finally { setLoading(false); }
  };

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto bg-white p-6 md:p-10 rounded-[3rem] shadow-2xl border border-gray-100">
        <header className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-black tracking-tighter text-gray-900">
                <span className="text-orange-500">PX</span> ADMIN <span className="text-gray-400 font-light">PRO</span>
            </h1>
            <div className="text-[10px] font-bold bg-black text-white px-4 py-1 rounded-full uppercase tracking-widest">
                Real-time Sync
            </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Essential Info */}
            <section className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">1. Basic Information</h3>
                <input className="w-full bg-gray-50 border-none p-5 rounded-2xl text-lg focus:ring-2 ring-orange-100 outline-none" placeholder="Product Title *" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                <textarea className="w-full bg-gray-50 border-none p-5 rounded-2xl h-32 focus:ring-2 ring-orange-100 outline-none" placeholder="Description..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            </section>

            <section className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold ml-2 text-gray-400 uppercase">Category</label>
                    <select className="w-full bg-gray-100 border-none p-4 rounded-2xl outline-none" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                        <option value="beds">Beds (বেড)</option>
                        <option value="sofas">Sofas (সোফা)</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold ml-2 text-gray-400 uppercase">Brand</label>
                    <input className="w-full bg-gray-100 border-none p-4 rounded-2xl outline-none" placeholder="Brand" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} />
                </div>
            </section>

            {/* Dynamic Section based on Category */}
            <section className="p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">2. Category Specs</h3>
                {form.category === "sofas" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <input className="bg-white p-4 rounded-xl outline-none" placeholder="Seats (e.g. 6 Personen)" value={form.seats} onChange={e => setForm({...form, seats: e.target.value})} />
                    <input className="bg-white p-4 rounded-xl outline-none" placeholder="Shape (e.g. L-Form)" value={form.status} onChange={e => setForm({...form, status: e.target.value})} />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <input className="bg-white p-4 rounded-xl outline-none" placeholder="Bed Size (e.g. 180x200)" value={form.bed_size} onChange={e => setForm({...form, bed_size: e.target.value})} />
                    <input className="bg-white p-4 rounded-xl outline-none" placeholder="Type (e.g. Boxspring)" value={form.status} onChange={e => setForm({...form, status: e.target.value})} />
                  </div>
                )}
            </section>

            {/* Pricing */}
            <section className="grid grid-cols-2 gap-4 bg-orange-50 p-6 rounded-[2rem] border border-orange-100">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-orange-600 uppercase">Current Price (€) *</label>
                    <input className="w-full bg-white border-none p-4 rounded-xl outline-none font-bold text-xl" type="number" value={form.current_price} onChange={e => setForm({...form, current_price: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-orange-300 uppercase">Original Price</label>
                    <input className="w-full bg-white/50 border-none p-4 rounded-xl outline-none" type="number" value={form.original_price} onChange={e => setForm({...form, original_price: e.target.value})} />
                </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Image Gallery */}
            <section className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Media Gallery</h3>
                <div className="relative border-2 border-dashed border-gray-200 p-8 rounded-[2rem] text-center hover:border-orange-300 transition-all bg-white">
                    <input type="file" accept="image/*" multiple onChange={handleImageProcess} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <p className="text-2xl">📤</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase mt-2">Drop Images Here</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border group">
                            <img src={img} className="w-full h-full object-cover" />
                            <button onClick={() => setImages(images.filter((_, i) => i !== idx))} className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 text-white font-bold transition-all">REMOVE</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tech Specs Summary */}
            <section className="bg-gray-900 p-8 rounded-[2.5rem] text-white space-y-5 shadow-xl">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Fast Actions</h3>
                <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-sm font-medium text-gray-400 group-hover:text-white">Vegan Product</span>
                        <input type="checkbox" className="w-5 h-5 rounded-full border-none bg-gray-800 text-orange-500 focus:ring-0" checked={form.is_vegan} onChange={e => setForm({...form, is_vegan: e.target.checked})} />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-sm font-medium text-gray-400 group-hover:text-white">Robot Vacuum Safe</span>
                        <input type="checkbox" className="w-5 h-5 rounded-full border-none bg-gray-800 text-orange-500 focus:ring-0" checked={form.robot_vacuum_clearance} onChange={e => setForm({...form, robot_vacuum_clearance: e.target.checked})} />
                    </label>
                </div>
                
                <button 
                    onClick={handleSubmit} 
                    disabled={loading || isProcessing}
                    className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${loading ? 'bg-gray-700 animate-pulse' : 'bg-orange-500 hover:bg-orange-400 shadow-lg shadow-orange-900/20'}`}
                >
                    {loading ? "Publishing..." : "Publish Live"}
                </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}