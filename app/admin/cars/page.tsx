//C:\Users\Shanon\al-rajjak-1\app\admin\cars\page.tsx



"use client";
import { useState, useEffect } from "react";

export default function AdminPanel() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    brand: "", model: "", name: "", price: "", year: "", 
    engine: "", hp: "", torque: "", mileage: "", 
    condition: "Used", colors: "", tyre: "", tyreSize: "", 
    resaleValue: "", image: ""
  });

  // ডাটা লোড করা
  const fetchCars = async () => {
    try {
      const res = await fetch("/api/admin/cars");
      const data = await res.json();
      setCars(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => { fetchCars(); }, []);

  // --- নতুন ইমেজ কনভার্টার এবং রিডিউসার ফাংশন ---
  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          
          // সর্বোচ্চ প্রস্থ ৮০০ পিক্সেল সেট করা (সাইজ কমানোর জন্য)
          const maxWidth = 1200;
          const scaleSize = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            // সাদা ব্যাকগ্রাউন্ড (JPG এর জন্য ট্রান্সপারেন্সি সাপোর্ট নেই)
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }

          // JPEG ফরম্যাটে কনভার্ট এবং ৭০% কোয়ালিটি (০.৭) সেট করা
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.9);
          resolve(compressedBase64);
        };
      };
    });
  };

  // ইমেজ আপলোড হ্যান্ডলার (আপডেট করা হয়েছে)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // ছবি প্রসেস করে ছোট সাইজের JPG নেওয়া হচ্ছে
        const optimizedImage = await processImage(file);
        setForm({ ...form, image: optimizedImage });
      } catch (error) {
        console.error("Image processing error:", error);
        alert("ছবি প্রসেস করতে সমস্যা হয়েছে!");
      }
    }
  };

  // নতুন গাড়ি সেভ করা
  const handleAdd = async () => {
    if (!form.brand || !form.model || !form.price) {
      return alert("Brand, Model এবং Price অবশ্যই দিতে হবে!");
    }
    
    await fetch("/api/admin/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    
    // ফর্ম ক্লিয়ার করা
    setForm({
      brand: "", model: "", name: "", price: "", year: "", 
      engine: "", hp: "", torque: "", mileage: "", 
      condition: "Used", colors: "", tyre: "", tyreSize: "", 
      resaleValue: "", image: ""
    });
    fetchCars();
  };

  // গাড়ি ডিলিট করা
  const handleDelete = async (id: string) => {
    if (confirm("আপনি কি নিশ্চিতভাবে এই গাড়িটি মুছে ফেলতে চান?")) {
      await fetch("/api/admin/cars", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchCars();
    }
  };

  // প্রাইস ফরম্যাট করার সেফ ফাংশন
  const formatPrice = (price: any) => {
    if (typeof price === "string") {
      if (price.includes("€") || price.includes("$")) return price;
      const num = parseFloat(price.replace(/,/g, ""));
      return isNaN(num) ? price : `€${num.toLocaleString()}`;
    }
    return `€${Number(price).toLocaleString()}`;
  };

  return (
    <div className="p-6 md:p-10 bg-slate-50 min-h-screen text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10 border-b-2 border-blue-100 pb-6">
          <div>
            <h1 className="text-4xl font-black text-slate-800">Premium Dealer <span className="text-blue-600">Admin</span></h1>
            <p className="text-slate-500 mt-1">Manage your inventory and AI knowledge base</p>
          </div>
          <div className="text-right">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">Total Cars: {cars.length}</span>
          </div>
        </header>
        
        {/* ইনপুট ফর্ম */}
        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-blue-100/50 mb-12 border border-white">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="bg-blue-600 text-white p-2 rounded-lg text-sm">Add</span> New Vehicle Specifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Basic Info */}
            <div className="space-y-4">
               <p className="font-bold text-xs uppercase text-slate-400">Basic Info</p>
               <input className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition" placeholder="Brand (Audi)" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} />
               <input className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition" placeholder="Model (RS6)" value={form.model} onChange={e => setForm({...form, model: e.target.value})} />
               <input className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition" placeholder="Car Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
               <input className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition" placeholder="Price (€)" type="text" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
            </div>

            {/* Performance */}
            <div className="space-y-4">
               <p className="font-bold text-xs uppercase text-slate-400">Performance</p>
               <input className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition" placeholder="Engine (e.g. 4.0L V8)" value={form.engine} onChange={e => setForm({...form, engine: e.target.value})} />
               <input className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition" placeholder="Horsepower (HP)" value={form.hp} onChange={e => setForm({...form, hp: e.target.value})} />
               <input className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition" placeholder="Torque (Nm)" value={form.torque} onChange={e => setForm({...form, torque: e.target.value})} />
               <input className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition" placeholder="Year" value={form.year} onChange={e => setForm({...form, year: e.target.value})} />
            </div>

            {/* Wheels & More */}
            <div className="space-y-4">
               <p className="font-bold text-xs uppercase text-slate-400">Wheels & Condition</p>
               <input className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition" placeholder="Tyre Brand" value={form.tyre} onChange={e => setForm({...form, tyre: e.target.value})} />
               <input className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition" placeholder="Tyre Size" value={form.tyreSize} onChange={e => setForm({...form, tyreSize: e.target.value})} />
               <input className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition" placeholder="Mileage (km)" value={form.mileage} onChange={e => setForm({...form, mileage: e.target.value})} />
               <select className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition bg-white" value={form.condition} onChange={e => setForm({...form, condition: e.target.value})}>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Reconditioned">Reconditioned</option>
              </select>
            </div>

            {/* Extras & Image */}
            <div className="space-y-4">
               <p className="font-bold text-xs uppercase text-slate-400">Market & Identity</p>
               <input className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition" placeholder="Colors" value={form.colors} onChange={e => setForm({...form, colors: e.target.value})} />
               <input className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition" placeholder="Resale Value (€)" value={form.resaleValue} onChange={e => setForm({...form, resaleValue: e.target.value})} />
               <div className="flex flex-col gap-1">
                 <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="text-xs border-2 border-dashed border-slate-200 p-2 rounded-xl bg-slate-50 cursor-pointer" 
                />
               </div>
               <button onClick={handleAdd} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-95">
                 SAVE TO INVENTORY 🚀
               </button>
            </div>
          </div>
        </div>

        {/* ইনভেন্টরি ডিসপ্লে */}
        <h2 className="text-2xl font-bold mb-6 text-slate-700">Current Stock</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car: any, index: number) => (
            <div key={car.id || index} className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all group">
              <div className="relative h-56 overflow-hidden">
                {car.image ? (
                  <img src={car.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={`${car.brand} ${car.model}`} />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 italic">No Photo Available</div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">{car.condition}</div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-black text-2xl text-slate-800">{car.brand} {car.model}</h3>
                    <p className="text-slate-400 text-sm font-medium">{car.name || `${car.brand} ${car.model}`}</p>
                  </div>
                  <p className="text-blue-600 font-black text-xl">{formatPrice(car.price)}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-6">
                  <div className="bg-slate-50 p-2 rounded-lg">🗓 Year: <span className="text-slate-800">{car.year}</span></div>
                  <div className="bg-slate-50 p-2 rounded-lg">⚙️ Engine: <span className="text-slate-800">{car.engine}</span></div>
                  <div className="bg-slate-50 p-2 rounded-lg">⚡ HP: <span className="text-slate-800">{car.hp}</span></div>
                  <div className="bg-slate-50 p-2 rounded-lg">🛣 km: <span className="text-slate-800">{car.mileage}</span></div>
                </div>

                <button onClick={() => handleDelete(car.id)} className="w-full py-3 rounded-xl border-2 border-red-50 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all">
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
