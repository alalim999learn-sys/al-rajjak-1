//C:\Users\Shanon\al-rajjak-1\app\admin\furniture\page.tsx



 
"use client";
import { useState, useEffect } from "react";

// ইমেজ মোডাল কম্পোনেন্ট (আগের মতো)
const ImageModal = ({ images, currentIndex, onClose, onNext, onPrev }: { 
  images: string[], 
  currentIndex: number, 
  onClose: () => void, 
  onNext: () => void, 
  onPrev: () => void 
}) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 z-10">✕</button>
        <div className="flex items-center justify-center">
          <img src={images[currentIndex]} alt={`Product image ${currentIndex + 1}`} className="max-w-full max-h-[80vh] object-contain" />
        </div>
        {images.length > 1 && (
          <>
            <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-3 transition">◀</button>
            <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-3 transition">▶</button>
          </>
        )}
        {images.length > 1 && (
          <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-2">
            {images.map((img, idx) => (
              <div key={idx} className={`w-12 h-12 rounded-lg overflow-hidden cursor-pointer border-2 transition ${currentIndex === idx ? 'border-orange-500' : 'border-white/50'}`}>
                <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
              </div>
            ))}
          </div>
        )}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default function FurnitureAdmin() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "beds",
    type: "",
    price: "",
    // ম্যাটেরিয়াল ইনফো
    material_type: "Fabric",
    fabric_name: "",
    fabric_properties: "",
    cleaning_method: "",
    is_vegan: true,
    // ফ্রেম ইনফো
    frame_material: "Solid Wood",
    wood_type: "",
    wood_origin: "",
    fsc_certified: false,
    frame_warranty_years: 5,
    // কুশন ইনফো
    foam_type: "HR foam",
    foam_density: "",
    seat_construction: "Pocket springs",
    seat_hardness: "Medium",
    // ডাইমেনশন ইনফো
    width_cm: "",
    depth_cm: "",
    height_cm: "",
    seat_height_cm: "",
    seat_depth_cm: "",
    armrest_height_cm: "",
    leg_height_cm: "",
    robot_vacuum_clearance: false,
    // ওয়ারেন্টি ইনফো
    warranty_years: 2,
    extended_available: false,
    extended_years: 5,
    extended_cost_eur: 49,
    return_days: 14,
    // ডেলিভারি ইনফো
    delivery_days: 5,
    delivery_cost_eur: 0,
    assembly_available: false,
    assembly_cost_eur: 79,
    old_removal: false,
    // কালার
    color: "",
    colors_available: "",
    // সার্টিফিকেশন
    oeko_tex: false,
    fire_resistant: true,
    // লোড ক্যাপাসিটি
    max_load_kg: 150,
    // পেমেন্ট
    installment_available: false,
    monthly_payment_eur: 0,
    // বিবরণ
    description: "",
    image: ""
  });
  const [preview, setPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchItems = async () => {
    const res = await fetch("/api/admin/furniture");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => { fetchItems(); }, []);

  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const SIZE = 1200;
          canvas.width = SIZE;
          canvas.height = SIZE;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, SIZE, SIZE);
            const scale = Math.min(SIZE / img.width, SIZE / img.height);
            const x = (SIZE - img.width * scale) / 2;
            const y = (SIZE - img.height * scale) / 2;
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          }
          resolve(canvas.toDataURL("image/webp", 0.85));
        };
      };
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const optimized = await processImage(file);
        setForm({ ...form, image: optimized });
        setPreview(optimized);
      } catch (error) {
        alert("ছবি প্রসেসিং এ সমস্যা হয়েছে।");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const openModal = (images: string[], index: number = 0) => {
    setModalImages(images);
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImages([]);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % modalImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  };

  const resetForm = () => {
    setForm({
      id: "", name: "", category: "beds", type: "", price: "",
      material_type: "Fabric", fabric_name: "", fabric_properties: "", cleaning_method: "", is_vegan: true,
      frame_material: "Solid Wood", wood_type: "", wood_origin: "", fsc_certified: false, frame_warranty_years: 5,
      foam_type: "HR foam", foam_density: "", seat_construction: "Pocket springs", seat_hardness: "Medium",
      width_cm: "", depth_cm: "", height_cm: "", seat_height_cm: "", seat_depth_cm: "", armrest_height_cm: "", leg_height_cm: "", robot_vacuum_clearance: false,
      warranty_years: 2, extended_available: false, extended_years: 5, extended_cost_eur: 49, return_days: 14,
      delivery_days: 5, delivery_cost_eur: 0, assembly_available: false, assembly_cost_eur: 79, old_removal: false,
      color: "", colors_available: "", oeko_tex: false, fire_resistant: true, max_load_kg: 150,
      installment_available: false, monthly_payment_eur: 0, description: "", image: ""
    });
    setPreview("");
    setEditingItem(null);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setForm({
      id: item.id,
      name: item.title,
      category: item.category,
      type: item.type || "",
      price: item.pricing?.current_price.toString(),
      material_type: item.material_info?.type || "Fabric",
      fabric_name: item.material_info?.fabric_name || "",
      fabric_properties: item.material_info?.fabric_properties || "",
      cleaning_method: item.material_info?.cleaning_method || "",
      is_vegan: item.material_info?.is_vegan || true,
      frame_material: item.frame_info?.material || "Solid Wood",
      wood_type: item.frame_info?.wood_type || "",
      wood_origin: item.frame_info?.wood_origin || "",
      fsc_certified: item.frame_info?.fsc_certified || false,
      frame_warranty_years: item.frame_info?.frame_warranty_years || 5,
      foam_type: item.cushion_info?.foam_type || "HR foam",
      foam_density: item.cushion_info?.foam_density || "",
      seat_construction: item.cushion_info?.seat_construction || "Pocket springs",
      seat_hardness: item.cushion_info?.seat_hardness || "Medium",
      width_cm: item.dimensions_info?.width_cm?.toString() || "",
      depth_cm: item.dimensions_info?.depth_cm?.toString() || "",
      height_cm: item.dimensions_info?.height_cm?.toString() || "",
      seat_height_cm: item.dimensions_info?.seat_height_cm?.toString() || "",
      seat_depth_cm: item.dimensions_info?.seat_depth_cm?.toString() || "",
      armrest_height_cm: item.dimensions_info?.armrest_height_cm?.toString() || "",
      leg_height_cm: item.dimensions_info?.leg_height_cm?.toString() || "",
      robot_vacuum_clearance: item.dimensions_info?.robot_vacuum_clearance || false,
      warranty_years: item.warranty_info?.warranty_years || 2,
      extended_available: item.warranty_info?.extended_available || false,
      extended_years: item.warranty_info?.extended_years || 5,
      extended_cost_eur: item.warranty_info?.extended_cost_eur || 49,
      return_days: item.warranty_info?.return_days || 14,
      delivery_days: item.delivery_info?.delivery_days || 5,
      delivery_cost_eur: item.delivery_info?.delivery_cost_eur || 0,
      assembly_available: item.delivery_info?.assembly_available || false,
      assembly_cost_eur: item.delivery_info?.assembly_cost_eur || 79,
      old_removal: item.delivery_info?.old_furniture_removal || false,
      color: item.details?.color || "",
      colors_available: item.colors_available?.map((c: any) => c.name).join(", ") || "",
      oeko_tex: item.certifications?.oeko_tex || false,
      fire_resistant: item.certifications?.fire_resistant || true,
      max_load_kg: item.load_capacity?.max_weight_kg || 150,
      installment_available: item.payment_info?.installment_available || false,
      monthly_payment_eur: item.payment_info?.monthly_payment_eur || 0,
      description: item.description || "",
      image: ""
    });
    setPreview(item.images?.[0] || "");
  };

  const handleDelete = async (id: string, category: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    await fetch(`/api/admin/furniture?id=${id}&category=${category}`, { method: "DELETE" });
    fetchItems();
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price) return alert("Name and Price are required!");
    
    const url = "/api/admin/furniture";
    const method = editingItem ? "PUT" : "POST";
    
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    
    if (res.ok) {
      resetForm();
      fetchItems();
      alert(editingItem ? "Product updated!" : "Product added!");
    } else {
      alert("Failed to save product");
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-black mb-6">
        Furniture Admin <span className="text-orange-600">{editingItem ? "✏️ Edit Mode" : "📦 Add New"}</span>
      </h1>
      
      {/* Input Form - 3 Columns */}
      <div className="bg-white p-6 rounded-3xl shadow-lg mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Basic Info */}
          <input className="border p-3 rounded-xl" placeholder="Product Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <select className="border p-3 rounded-xl" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
            <option value="beds">🛏️ Bed (খাট)</option>
            <option value="sofas">🛋️ Sofa (সোফা)</option>
          </select>
          <input className="border p-3 rounded-xl" placeholder="Type (e.g., Polsterbett, Ecksofa)" value={form.type} onChange={e => setForm({...form, type: e.target.value})} />
          <input className="border p-3 rounded-xl" placeholder="Price (€) *" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
          
          {/* Material Info */}
          <select className="border p-3 rounded-xl" value={form.material_type} onChange={e => setForm({...form, material_type: e.target.value})}>
            <option value="Fabric">Fabric (ফেব্রিক)</option>
            <option value="Leather">Leather (লেদার)</option>
            <option value="Wood">Wood (কাঠ)</option>
            <option value="Metal">Metal (ধাতু)</option>
          </select>
          <input className="border p-3 rounded-xl" placeholder="Fabric Name (e.g., Cord, Velvet)" value={form.fabric_name} onChange={e => setForm({...form, fabric_name: e.target.value})} />
          <input className="border p-3 rounded-xl" placeholder="Fabric Properties (e.g., Pet-friendly)" value={form.fabric_properties} onChange={e => setForm({...form, fabric_properties: e.target.value})} />
          <input className="border p-3 rounded-xl" placeholder="Cleaning Method" value={form.cleaning_method} onChange={e => setForm({...form, cleaning_method: e.target.value})} />
          
          {/* Frame Info */}
          <input className="border p-3 rounded-xl" placeholder="Frame Material (e.g., Solid Wood)" value={form.frame_material} onChange={e => setForm({...form, frame_material: e.target.value})} />
          <input className="border p-3 rounded-xl" placeholder="Wood Type (e.g., Beech, Pine)" value={form.wood_type} onChange={e => setForm({...form, wood_type: e.target.value})} />
          <input className="border p-3 rounded-xl" placeholder="Wood Origin (e.g., Germany)" value={form.wood_origin} onChange={e => setForm({...form, wood_origin: e.target.value})} />
          <input className="border p-3 rounded-xl" type="number" placeholder="Frame Warranty (Years)" value={form.frame_warranty_years} onChange={e => setForm({...form, frame_warranty_years: parseInt(e.target.value)})} />
          
          {/* Dimensions */}
          <input className="border p-3 rounded-xl" placeholder="Width (cm)" value={form.width_cm} onChange={e => setForm({...form, width_cm: e.target.value})} />
          <input className="border p-3 rounded-xl" placeholder="Depth (cm)" value={form.depth_cm} onChange={e => setForm({...form, depth_cm: e.target.value})} />
          <input className="border p-3 rounded-xl" placeholder="Height (cm)" value={form.height_cm} onChange={e => setForm({...form, height_cm: e.target.value})} />
          <input className="border p-3 rounded-xl" placeholder="Seat Height (cm)" value={form.seat_height_cm} onChange={e => setForm({...form, seat_height_cm: e.target.value})} />
          <input className="border p-3 rounded-xl" placeholder="Leg Height (cm)" value={form.leg_height_cm} onChange={e => setForm({...form, leg_height_cm: e.target.value})} />
          
          {/* Warranty & Delivery */}
          <input className="border p-3 rounded-xl" type="number" placeholder="Warranty Years" value={form.warranty_years} onChange={e => setForm({...form, warranty_years: parseInt(e.target.value)})} />
          <input className="border p-3 rounded-xl" type="number" placeholder="Return Days" value={form.return_days} onChange={e => setForm({...form, return_days: parseInt(e.target.value)})} />
          <input className="border p-3 rounded-xl" type="number" placeholder="Delivery Days" value={form.delivery_days} onChange={e => setForm({...form, delivery_days: parseInt(e.target.value)})} />
          
          {/* Color & Load */}
          <input className="border p-3 rounded-xl" placeholder="Color" value={form.color} onChange={e => setForm({...form, color: e.target.value})} />
          <input className="border p-3 rounded-xl" placeholder="Colors Available (comma separated)" value={form.colors_available} onChange={e => setForm({...form, colors_available: e.target.value})} />
          <input className="border p-3 rounded-xl" type="number" placeholder="Max Load (kg)" value={form.max_load_kg} onChange={e => setForm({...form, max_load_kg: parseInt(e.target.value)})} />
          
          {/* Payment */}
          <input className="border p-3 rounded-xl" type="number" placeholder="Monthly Payment (€)" value={form.monthly_payment_eur} onChange={e => setForm({...form, monthly_payment_eur: parseFloat(e.target.value)})} />
          
          {/* Checkboxes */}
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_vegan} onChange={e => setForm({...form, is_vegan: e.target.checked})} /> Vegan</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.fsc_certified} onChange={e => setForm({...form, fsc_certified: e.target.checked})} /> FSC Certified</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.robot_vacuum_clearance} onChange={e => setForm({...form, robot_vacuum_clearance: e.target.checked})} /> Robot Vacuum Friendly</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.extended_available} onChange={e => setForm({...form, extended_available: e.target.checked})} /> Extended Warranty Available</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.assembly_available} onChange={e => setForm({...form, assembly_available: e.target.checked})} /> Assembly Service Available</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.old_removal} onChange={e => setForm({...form, old_removal: e.target.checked})} /> Old Furniture Removal</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.oeko_tex} onChange={e => setForm({...form, oeko_tex: e.target.checked})} /> OEKO-TEX Certified</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.fire_resistant} onChange={e => setForm({...form, fire_resistant: e.target.checked})} /> Fire Resistant</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.installment_available} onChange={e => setForm({...form, installment_available: e.target.checked})} /> Installment Available</label>
          
          {/* Description & Image */}
          <textarea className="border p-3 rounded-xl col-span-2" rows={3} placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          
          <div className="flex items-center gap-3">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 rounded-xl flex-1" disabled={isUploading} />
            {isUploading && <span className="text-sm text-gray-500">⏳ প্রসেসিং...</span>}
            {preview && !isUploading && (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border cursor-pointer" onClick={() => openModal([preview], 0)}>
                <img src={preview} className="w-full h-full object-contain" alt="preview" />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-3 mt-4">
          <button onClick={handleSubmit} className="bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 p-3 flex-1" disabled={isUploading}>
            {editingItem ? "✏️ UPDATE PRODUCT" : "🚀 SAVE PRODUCT"}
          </button>
          {editingItem && <button onClick={resetForm} className="bg-gray-500 text-white font-bold rounded-xl hover:bg-gray-600 p-3 px-6">Cancel</button>}
        </div>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item: any) => {
          const productImages = item.images || ["/furn/no-photo.png"];
          return (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-md border hover:shadow-xl transition relative group">
              <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 cursor-pointer" onClick={() => openModal(productImages, 0)}>
                <img src={productImages[0] || "/furn/no-photo.png"} className="max-w-full max-h-full object-contain" alt={item.title} />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-orange-600 font-bold">€{item.pricing?.current_price}</p>
                <p className="text-sm text-gray-500">{item.details?.dimensions}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${item.category === 'beds' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                  {item.category === 'beds' ? '🛏️ Bed' : '🛋️ Sofa'}
                </span>
              </div>
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white p-2 rounded-full">✏️</button>
                <button onClick={() => handleDelete(item.id, item.category)} className="bg-red-500 text-white p-2 rounded-full">🗑️</button>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && <ImageModal images={modalImages} currentIndex={currentImageIndex} onClose={closeModal} onNext={nextImage} onPrev={prevImage} />}
    </div>
  );
}