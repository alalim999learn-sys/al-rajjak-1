//C:\Users\Shanon\al-rajjak-1\app\admin\furniture\page.tsx



"use client";
import { useState, useEffect } from "react";

export default function FurnitureAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "", category: "", price: "", material: "", 
    dimensions: "", stock: "In Stock", color: "", 
    condition: "New", description: "", image: ""
  });

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/furniture");
      const data = await res.json();
      setItems(data);
    } catch (error) { console.error("Fetch error:", error); }
  };

  useEffect(() => { fetchItems(); }, []);

  // ইমেজ প্রসেসর (আপনার আগের কোড অনুযায়ী)
  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 1200;
          const scaleSize = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
          resolve(canvas.toDataURL("image/jpeg", 0.9));
        };
      };
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const optimizedImage = await processImage(file);
      setForm({ ...form, image: optimizedImage });
    }
  };

  const handleAdd = async () => {
    if (!form.name || !form.price) return alert("Name and Price are required!");
    await fetch("/api/admin/furniture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", category: "", price: "", material: "", dimensions: "", stock: "In Stock", color: "", condition: "New", description: "", image: "" });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await fetch("/api/admin/furniture", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchItems();
    }
  };

  return (
    <div className="p-6 md:p-10 bg-slate-50 min-h-screen text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10 border-b-2 border-orange-100 pb-6">
          <div>
            <h1 className="text-4xl font-black text-slate-800">Furniture <span className="text-orange-600">Admin</span></h1>
            <p className="text-slate-500 mt-1">Manage your shop inventory</p>
          </div>
          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold">Items: {items.length}</span>
        </header>

        {/* Input Form */}
        <div className="bg-white p-8 rounded-[2rem] shadow-xl mb-12 border border-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="space-y-4">
              <p className="font-bold text-xs uppercase text-slate-400">Basic Info</p>
              <input className="w-full border-2 border-slate-100 p-3 rounded-xl outline-none" placeholder="Product Name (e.g. Sofa)" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input className="w-full border-2 border-slate-100 p-3 rounded-xl outline-none" placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
              <input className="w-full border-2 border-slate-100 p-3 rounded-xl outline-none" placeholder="Price (€)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
            </div>
            <div className="space-y-4">
              <p className="font-bold text-xs uppercase text-slate-400">Details</p>
              <input className="w-full border-2 border-slate-100 p-3 rounded-xl outline-none" placeholder="Material (Oak, Velvet)" value={form.material} onChange={e => setForm({...form, material: e.target.value})} />
              <input className="w-full border-2 border-slate-100 p-3 rounded-xl outline-none" placeholder="Dimensions" value={form.dimensions} onChange={e => setForm({...form, dimensions: e.target.value})} />
              <input className="w-full border-2 border-slate-100 p-3 rounded-xl outline-none" placeholder="Color" value={form.color} onChange={e => setForm({...form, color: e.target.value})} />
            </div>
            <div className="space-y-4">
              <p className="font-bold text-xs uppercase text-slate-400">Status</p>
              <select className="w-full border-2 border-slate-100 p-3 rounded-xl outline-none bg-white" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})}>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="On Order">On Order</option>
              </select>
              <select className="w-full border-2 border-slate-100 p-3 rounded-xl outline-none bg-white" value={form.condition} onChange={e => setForm({...form, condition: e.target.value})}>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <div className="space-y-4">
              <p className="font-bold text-xs uppercase text-slate-400">Media</p>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="text-xs border-2 border-dashed border-slate-200 p-2 rounded-xl w-full" />
              <button onClick={handleAdd} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-95">
                SAVE PRODUCT 🛋️
              </button>
            </div>
          </div>
        </div>

        {/* Inventory Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: any, index: number) => (
            <div key={item.id || index} className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 group">
              <div className="relative h-56 overflow-hidden">
                <img src={item.image || "/no-photo.png"} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={item.name} />
                <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">{item.stock}</div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-black text-2xl text-slate-800">{item.name}</h3>
                  <p className="text-orange-600 font-black text-xl">€{item.price}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[11px] font-bold text-slate-500 uppercase mb-6">
                  <div className="bg-slate-50 p-2 rounded-lg">🪵 {item.material}</div>
                  <div className="bg-slate-50 p-2 rounded-lg">📏 {item.dimensions}</div>
                </div>
                <button onClick={() => handleDelete(item.id)} className="w-full py-3 rounded-xl border-2 border-red-50 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all">
                  REMOVE STOCK
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}