//C:\Users\Shanon\al-rajjak-1\app\three\page.tsx



import { FaEnvelope, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export default function StudentPortfolio() {
  return (
    <main className="min-h-screen bg-slate-950 py-0 md:py-12">
      <div className="min-h-screen md:min-h-0 md:max-w-4xl mx-auto bg-slate-900 md:shadow-2xl md:rounded-[2rem] overflow-hidden border border-slate-800">
        
        {/* Header Section */}
        <div className="bg-slate-800 p-8 md:p-12 border-b border-slate-700 flex flex-col-reverse md:flex-row items-center justify-between gap-8 w-full">
          {/* Text on Left */}
          <div className="text-center md:text-left w-full">
            <h1 className="text-4xl font-extrabold text-white whitespace-nowrap">Martina Rodríguez</h1>
            <p className="text-indigo-400 font-bold mt-1 uppercase tracking-widest text-sm">
              Estudiante del Grado en Finanzas en la Universidad de Valladolid | Clase de 2028
            </p>
            
            {/* Contact Buttons */}
            <div className="mt-6 flex flex-nowrap justify-center md:justify-start gap-1.5 md:gap-3">
              <a href="mailto:diego.estudiante@example.com" className="flex items-center gap-1.5 px-3 md:px-5 py-2 bg-indigo-600 text-white rounded-full text-[10px] md:text-sm font-medium hover:bg-indigo-700 transition whitespace-nowrap">
                <FaEnvelope className="text-white shrink-0" /> Email
              </a>
              <a href="#" className="flex items-center gap-1.5 px-3 md:px-5 py-2 bg-slate-700 text-slate-200 rounded-full text-[10px] md:text-sm font-medium hover:bg-slate-800 hover:text-blue-400 transition whitespace-nowrap">
                <FaLinkedin className="text-blue-500 shrink-0" /> LinkedIn
              </a>
              <a href="#" className="flex items-center gap-1.5 px-3 md:px-5 py-2 bg-slate-700 text-slate-200 rounded-full text-[10px] md:text-sm font-medium hover:bg-slate-800 hover:text-green-400 transition whitespace-nowrap">
                <FaWhatsapp className="text-green-500 shrink-0" /> WhatsApp
              </a>
            </div>
          </div>
          
          {/* Image on Right */}
          <img 
            src="/HUUUU/1775143547615.jpg" 
            
            className="w-36 h-36 rounded-full object-cover border-4 border-slate-700 shadow-xl shrink-0"
          />
        </div>

        {/* Rest of the content */}
        <div className="px-6 md:px-12 pb-12 mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Sobre mí</h2>
              <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-indigo-500 pl-4">
                Estudiante de Finanzas motivado en la Universidad de Valladolid. Apasionado por la valoración de activos, 
                banca de inversión y análisis financiero. Dedicado a la excelencia académica y a la 
                participación activa en el Fondo Gestionado por Estudiantes.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Habilidades</h2>
              <div className="flex flex-wrap gap-2">
                {['Modelado Financiero', 'Análisis de Datos', 'Excel', 'Investigación de Mercados', 'Python'].map((s) => (
                  <span key={s} className="bg-indigo-950/50 text-indigo-300 px-3 py-1 rounded text-[10px] font-bold border border-indigo-900/50 uppercase">{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Experiencia y Actividades</h2>
            <div className="space-y-6">
              {[
                { title: "Analista de Renta Variable", company: "Fondo Gestionado por Estudiantes", date: "2025 - Presente" },
                { title: "Miembro del Foro de Finanzas", company: "Universidad de Valladolid", date: "2024 - Presente" },
                { title: "Desafío de Mercado Rotman", company: "Participante", date: "Marzo 2026" }
              ].map((item, i) => (
                <div key={i} className="group relative pl-6 border-l border-slate-700 hover:border-indigo-500 transition-colors">
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-700 group-hover:bg-indigo-500"></div>
                  <h3 className="text-white font-bold">{item.title}</h3>
                  <p className="text-slate-500 text-xs">{item.company} • {item.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h2 className="text-white font-bold mb-2">Educación</h2>
            <p className="text-slate-400 text-xs">Grado en Finanzas, Universidad de Valladolid (2024-2028)</p>
          </div>
        </div>
      </div>
    </main>
  );
}