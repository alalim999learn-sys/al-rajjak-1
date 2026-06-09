//C:\Users\Shanon\al-rajjak-1\app\one\page.tsx



import { FaEnvelope, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export default function StudentPortfolio() {
  return (
    <main className="min-h-screen bg-slate-50 py-0 md:py-12">
      <div className="min-h-screen md:min-h-0 md:max-w-3xl mx-auto bg-white md:shadow-2xl md:rounded-[2rem] overflow-hidden border-0 md:border border-slate-100">
        
        <div className="h-40 bg-gradient-to-r from-indigo-800 via-purple-700 to-indigo-900"></div>

        <div className="px-6 md:px-8 pb-10">
          {/* Profile Image */}
          <div className="flex justify-center -mt-20">
            <img 
              src="/HUUUU/1775143547615.jpg" 
              alt="Perfil del estudiante" 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover ring-4 ring-amber-400/50"
            />
          </div>

          {/* Name and Identity */}
          <div className="text-center mt-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Martina Rodríguez</h1>
            <p className="text-indigo-600 font-bold text-md md:text-lg mt-2 uppercase tracking-widest">Estudiante de Finanzas en la Universidad de Valladolid | Clase de 2028</p>
          </div>

          {/* Contact Section */}
          <div className="mt-8 flex flex-nowrap justify-center gap-1.5 md:gap-4 px-2">
            <a href="mailto:diego.estudiante@example.com" className="flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition text-[9px] md:text-sm font-medium whitespace-nowrap">
              <FaEnvelope className="text-red-500 shrink-0" /> Email
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" className="flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition text-[9px] md:text-sm font-medium whitespace-nowrap">
              <FaLinkedin className="text-blue-600 shrink-0" /> LinkedIn
            </a>
            <a href="https://wa.me/1234567890" target="_blank" className="flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition text-[9px] md:text-sm font-medium whitespace-nowrap">
              <FaWhatsapp className="text-green-500 shrink-0" /> WhatsApp
            </a>
          </div>

          {/* About Me Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Sobre mí</h2>
            <p className="text-slate-600 text-sm">
              Estudiante de Finanzas motivado en la Universidad de Valladolid. Apasionado por la banca de inversión, 
              modelado financiero y análisis de mercado. Dedicado a aplicar conocimientos académicos 
              en desafíos financieros reales a través de proyectos universitarios y pasantías.
            </p>
          </div>

          {/* Skills Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Habilidades Técnicas</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-slate-600 text-sm">
              <li>✔ Modelado Financiero (DCF, LBO)</li>
              <li>✔ Análisis de Datos (Excel, SQL)</li>
              <li>✔ Investigación de Mercados y Reportes</li>
              <li>✔ Comunicación Empresarial</li>
              <li>✔ Power BI y Visualización de Datos</li>
              <li>✔ Métodos Cuantitativos</li>
            </ul>
          </div>

          {/* Academic Projects Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Proyectos Académicos</h2>
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <strong>Desafío de Mercado Rotman</strong> – Valuación de activos y evaluación de riesgos utilizando modelos DCF.
              </div>
              <div>
                <strong>Sociedad de Consultoría UVa</strong> – Análisis de estrategias de entrada para mercados emergentes.
              </div>
              <div>
                <strong>Fondo Gestionado por Estudiantes</strong> – Contribución activa en investigación de capital y análisis de cartera.
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Experiencia</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-900">Pasante de Analista de Crédito</h3>
                <p className="text-sm text-slate-500">Fondo Gestionado por Estudiantes | 2025 - Presente</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Miembro del Foro de Finanzas</h3>
                <p className="text-sm text-slate-500">Universidad de Valladolid | 2024 - Presente</p>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h2 className="text-lg font-bold text-indigo-900 mb-3">🎓 Educación</h2>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li><strong>Grado en Finanzas</strong><br/>Universidad de Valladolid (2024-2028)</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h2 className="text-lg font-bold text-indigo-900 mb-3">🏆 Certificaciones</h2>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Bloomberg Market Concepts (BMC)</li>
                <li>• Excel para Finanzas (Avanzado)</li>
                <li>• Google Data Analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

 