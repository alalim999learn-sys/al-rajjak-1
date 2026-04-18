//C:\Users\Shanon\al-rajjak-1\app\admin\furniture\page.tsx



"use client";
import { useState } from "react";

export default function FurnitureAdmin() {
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  
  const [form, setForm] = useState({
    // Basic
    id: "PX-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    brand: "PXLOUE",
    title: "",
    category: "beds",
    type: "Upholstered / Futon",
    status: "Fast ausverkauft",
    description: "",
    
    // Pricing
    current_price: "",
    original_price: "",
    
    // Details
    color: "Beige",
    dimensions: "140 x 200 cm",
    frame_material: "Holz, Metall",
    fabric: "Leinen-Stoff",
    max_load: "300",
    
    // Material Info
    fabric_name: "Leinen-Stoff",
    fabric_composition: "100% Polyester",
    fabric_properties: "Atmungsaktiv, Weich, Hautfreundlich",
    cleaning_method: "Mildes Reinigungsmittel, nicht scheuern",
    is_vegan: true,
    fabric_martindale: "25000",
    
    // Frame Info
    wood_type: "Pine",
    wood_origin: "Germany",
    fsc_certified: true,
    
    // Cushion Info
    foam_type: "Standard foam",
    foam_density: "25",
    seat_construction: "Bonell springs",
    seat_hardness: "Medium",
    
    // Dimensions Info
    width_cm: 140,
    depth_cm: 200,
    height_cm: 85,
    seat_height_cm: 48,
    leg_height_cm: 8,
    robot_vacuum_clearance: true,
    
    // Warranty Info
    warranty_years: "2",
    extended_available: true,
    extended_years: "5",
    extended_cost: "29",
    return_days: "14",
    
    // Delivery Info
    delivery_days: "5",
    assembly_available: false,
    assembly_cost: "79",
    
    // Colors
    color_name: "Beige",
    color_code: "#D2B48C",
    
    // Certifications
    oeko_tex: true,
    fsc: false,
    made_in_germany: false,
    fire_resistant: true,
    
    // Load Capacity
    max_weight_kg: "300",
    per_seat_kg: "150",
    daily_use_years: "5",
    
    // Payment
    monthly_payment: "23.33",
    payment_methods: "PayPal, Credit Card, Bank Transfer, Invoice",
    
    // Features
    features: "Gepolstertes Kopfteil, Inklusive Lattenrost, Stabil & Langlebig"
  });

  // মাল্টিপল ইমেজ প্রসেসিং ফাংশন
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
            const size = 1313;
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const minSide = Math.min(img.width, img.height);
            const sx = (img.width - minSide) / 2;
            const sy = (img.height - minSide) / 2;

            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, size, size);
            ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);

            const webpData = canvas.toDataURL("image/webp", 0.8);
            resolve(webpData);
          };
        };
      });
    });

    try {
      const processedImages = await Promise.all(processPromises);
      setImages((prev) => [...prev, ...processedImages]);
    } catch (err) {
      console.error("Image processing failed", err);
    } finally {
      setIsProcessing(false);
      e.target.value = ""; // Input ক্লিয়ার করা যাতে আবার সিলেক্ট করা যায়
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!form.title || images.length === 0 || !form.current_price) {
      return alert("Title, at least one Image and Price are required!");
    }
    setLoading(true);

    const professionalPayload = {
      id: form.id,
      brand: form.brand,
      title: form.title,
      category: form.category,
      type: form.type,
      status: form.status,
      description: form.description,
      
      pricing: {
        original_price: Number(form.original_price),
        current_price: Number(form.current_price),
        currency: "EUR",
        discount_label: form.original_price ? `-${Math.round(((Number(form.original_price) - Number(form.current_price)) / Number(form.original_price)) * 100)}%` : ""
      },
      
      service_info: {
        delivery: `${form.delivery_days} Werktage (Kostenlos)`,
        assembly: form.assembly_available ? "Professionelle Montage verfügbar" : "Selbstmontage mit Anleitung",
        warranty: `${form.warranty_years} Jahre gesetzliche Gewährleistung`
      },
      
      details: {
        color: form.color,
        dimensions: form.dimensions,
        frame_material: form.frame_material,
        fabric: form.fabric,
        max_load: `${form.max_load} kg`
      },
      
      images: images,
      features: form.features.split(",").map(f => f.trim()),
      
      material_info: {
        type: "Fabric",
        fabric_name: form.fabric_name,
        fabric_composition: form.fabric_composition,
        fabric_properties: form.fabric_properties,
        fabric_martindale: form.fabric_martindale,
        cleaning_method: form.cleaning_method,
        cover_washable: false,
        is_vegan: form.is_vegan
      },
      
      frame_info: {
        material: "Wood + Metal",
        wood_type: form.wood_type,
        wood_origin: form.wood_origin,
        fsc_certified: form.fsc_certified,
        construction: "Standard",
        frame_warranty_years: Number(form.warranty_years)
      },
      
      cushion_info: {
        foam_type: form.foam_type,
        foam_density: `${form.foam_density}kg/m³`,
        seat_construction: form.seat_construction,
        seat_hardness: form.seat_hardness,
        back_cushion_filled: "Fiber",
        back_cushion_detachable: false
      },
      
      dimensions_info: {
        width_cm: Number(form.width_cm),
        depth_cm: Number(form.depth_cm),
        height_cm: Number(form.height_cm),
        seat_height_cm: Number(form.seat_height_cm),
        leg_height_cm: Number(form.leg_height_cm),
        robot_vacuum_clearance: form.robot_vacuum_clearance
      },
      
      warranty_info: {
        warranty_years: Number(form.warranty_years),
        extended_available: form.extended_available,
        extended_years: Number(form.extended_years),
        extended_cost_eur: Number(form.extended_cost),
        return_days: Number(form.return_days),
        return_policy: `Free return within ${form.return_days} days`
      },
      
      delivery_info: {
        delivery_days: Number(form.delivery_days),
        delivery_cost_eur: 0,
        assembly_available: form.assembly_available,
        assembly_cost_eur: form.assembly_available ? Number(form.assembly_cost) : 0,
        old_furniture_removal: false
      },
      
      colors_available: [
        { name: form.color_name, code: form.color_code, in_stock: true }
      ],
      
      certifications: {
        oeko_tex: form.oeko_tex,
        fsc: form.fsc,
        made_in_germany: form.made_in_germany,
        made_in_eu: true,
        fire_resistant: form.fire_resistant
      },
      
      load_capacity: {
        max_weight_kg: Number(form.max_weight_kg),
        per_seat_kg: Number(form.per_seat_kg),
        daily_use_years: Number(form.daily_use_years)
      },
      
      payment_info: {
        installment_available: true,
        monthly_payment_eur: Number(form.monthly_payment),
        down_payment_percent: 0,
        payment_methods: form.payment_methods.split(",").map(m => m.trim())
      }
    };

    try {
      const res = await fetch("/api/admin/furniture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(professionalPayload),
      });
      
      if (res.ok) {
        alert("✅ Product Published Successfully!");
        setImages([]);
        setForm({
          ...form,
          id: "PX-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
          title: "",
          current_price: "",
          original_price: "",
          description: ""
        });
      } else {
        alert("❌ Error saving product");
      }
    } catch (err) {
      alert("❌ Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border">
        <h1 className="text-3xl font-black mb-8 text-center text-orange-600">🚀 PROFESSIONAL PRODUCT ADMIN</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Column 1: Core Info */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border">
            <h2 className="font-bold text-lg text-orange-600 border-b pb-2">📋 Core Info</h2>
            <input className="w-full border p-2 rounded-lg" placeholder="Product Title *" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            <input className="w-full border p-2 rounded-lg" placeholder="Brand" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} />
            <select className="w-full border p-2 rounded-lg" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option value="beds">🛏️ Beds</option>
              <option value="sofas">🛋️ Sofas</option>
            </select>
            <textarea className="w-full border p-2 rounded-lg h-24" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>

          {/* Column 2: Pricing & Dimensions */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border">
            <h2 className="font-bold text-lg text-blue-600 border-b pb-2">💰 Pricing & Size</h2>
            <div className="grid grid-cols-2 gap-2">
              <input className="border p-2 rounded-lg" placeholder="Current € *" type="number" value={form.current_price} onChange={e => setForm({...form, current_price: e.target.value})} />
              <input className="border p-2 rounded-lg" placeholder="Original €" type="number" value={form.original_price} onChange={e => setForm({...form, original_price: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input className="border p-2 rounded-lg" placeholder="Width cm" type="number" value={form.width_cm} onChange={e => setForm({...form, width_cm: Number(e.target.value)})} />
              <input className="border p-2 rounded-lg" placeholder="Depth cm" type="number" value={form.depth_cm} onChange={e => setForm({...form, depth_cm: Number(e.target.value)})} />
            </div>
            <input className="border p-2 rounded-lg" placeholder="Dimensions (text)" value={form.dimensions} onChange={e => setForm({...form, dimensions: e.target.value})} />
          </div>

          {/* Column 3: Materials & Checkboxes */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border">
            <h2 className="font-bold text-lg text-green-600 border-b pb-2">🧵 Materials & Specs</h2>
            <div className="flex flex-wrap gap-3 p-2 bg-white rounded-lg border">
              <label className="flex items-center gap-1 text-sm font-medium"><input type="checkbox" checked={form.is_vegan} onChange={e => setForm({...form, is_vegan: e.target.checked})} /> Vegan</label>
              <label className="flex items-center gap-1 text-sm font-medium"><input type="checkbox" checked={form.fsc_certified} onChange={e => setForm({...form, fsc_certified: e.target.checked})} /> FSC</label>
              <label className="flex items-center gap-1 text-sm font-medium"><input type="checkbox" checked={form.oeko_tex} onChange={e => setForm({...form, oeko_tex: e.target.checked})} /> Oeko-Tex</label>
              <label className="flex items-center gap-1 text-sm font-medium"><input type="checkbox" checked={form.robot_vacuum_clearance} onChange={e => setForm({...form, robot_vacuum_clearance: e.target.checked})} /> Robot</label>
            </div>
            <textarea className="w-full border p-2 rounded-lg h-20 text-xs" placeholder="Features (comma separated)" value={form.features} onChange={e => setForm({...form, features: e.target.value})} />
          </div>

          {/* Column 4: Images */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border">
            <h2 className="font-bold text-lg text-purple-600 border-b pb-2">🖼️ Images</h2>
            <div className="relative border-2 border-dashed border-gray-300 p-4 rounded-2xl text-center bg-white hover:bg-purple-50 cursor-pointer min-h-[120px]">
              <input 
                type="file" 
                accept="image/*" 
                multiple 
                onChange={handleImageProcess} 
                className="absolute inset-0 opacity-0 cursor-pointer" 
              />
              {isProcessing ? (
                <p className="text-orange-500 animate-pulse">Processing images...</p>
              ) : (
                <p className="text-gray-400">Click to Upload Multiple Images</p>
              )}
            </div>

            {/* ইমেজ প্রিভিউ গ্রিড */}
            <div className="flex flex-wrap gap-2 mt-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative">
                  <img src={img} className="h-16 w-16 object-cover rounded-lg border shadow-sm" />
                  <button 
                    onClick={() => removeImage(idx)} 
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={handleSubmit} 
          disabled={loading || isProcessing} 
          className={`w-full mt-8 p-5 rounded-2xl font-black text-xl text-white shadow-lg transition-all ${loading || isProcessing ? 'bg-gray-400' : 'bg-black hover:bg-orange-600 hover:scale-[1.01] active:scale-95'}`}
        >
          {loading ? "💾 SAVING TO DATABASE..." : "🚀 PUBLISH PROFESSIONAL PRODUCT"}
        </button>
      </div>
    </div>
  );




  
}