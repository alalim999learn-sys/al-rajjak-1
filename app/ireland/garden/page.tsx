//C:\Users\Shanon\al-rajjak-1\app\ireland\garden\page.tsx



import React from 'react';

export default function FenelonGardenPage() {
  const services = [
    { title: "Grass Cutting & Lawn Care", desc: "Lawn Care takes pleasure in being familiar with each client's property and individual requirements.", img: "/images/grass-cutting.jpg" },
    { title: "Hedge Trimming & Cutting", desc: "Professional hedge trimming, reduction, and removal services are what we offer for various shapes and sizes.", img: "/images/hedge-trimming.jpg" },
    { title: "Planting & Potting", desc: "We provide excellent planting & potting services depending on your budget, style, or situation.", img: "/images/planting-potting.jpg" },
    { title: "Overgrown Garden", desc: "It is possible to trim back and eliminate waste from weeds, brambles, tall grass, trees, and bushes.", img: "/images/overgrown-garden.jpg" },
    { title: "Redesign Of Beds", desc: "We will redesign your flower bed to improve soil fertility and drainage to look its best.", img: "/images/redesign-beds.jpg" },
    { title: "Weeding", desc: "Let Fenelon garden maintenance free your home of invasive weeds and get your flower beds back.", img: "/images/weeding.jpg" },
    { title: "Pruning", desc: "Correct pruning is an investment in your plants' long-term health and property appearance.", img: "/images/pruning.jpg" },
  ];

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Header */}
      <nav className="flex justify-between p-6 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-xl font-bold text-green-700">Fenelon Garden Maintenance</h1>
        <div className="space-x-4 font-semibold">
          <a href="#home">Home</a> <a href="#services">Services</a> <a href="#about">About</a> <a href="#contact">Contact</a>
        </div>
        <a href="tel:0833624865" className="bg-green-600 text-white px-4 py-2 rounded">083 362 4865</a>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-[60vh] flex items-center justify-center text-white text-center"
               style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/hero-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div>
          <h2 className="text-5xl font-bold mb-4">The Best Care For Your Beautiful Garden</h2>
          <button className="bg-green-600 text-white px-8 py-3 rounded font-bold hover:bg-green-700">Request a Callback</button>
        </div>
      </section>

      {/* About Us & Contact Section */}
      <section id="about" className="py-20 text-white text-center px-6" 
               style={{ backgroundImage: "linear-gradient(rgba(30, 65, 30, 0.85), rgba(30, 65, 30, 0.85)), url('/images/about-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">About Us</h2>
          <p className="text-xl mb-8">We want to transform the way you think about and use your outdoor area by constructing a living landscape.</p>
          <a href="#contact" className="bg-white text-green-800 px-8 py-3 rounded font-bold hover:bg-gray-100">Contact Us</a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
              <img src={s.img} alt={s.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-green-800">{s.title}</h3>
                <p className="text-gray-600 mb-4">{s.desc}</p>
                <a href="#contact" className="text-green-600 font-bold border-b border-green-600">Get a Quote</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white p-10 text-center">
        <p className="text-lg">Contact: 083 362 4865 | info@fenelongardenmaintenance.ie</p>
        <p className="mt-4">The Yard, Marino Avenue East</p>
      </footer>
    </div>
  );
}