//C:\Users\Shanon\al-rajjak-1\app\one\page.tsx

 
 
// app/one/page.tsx
import { FaEnvelope, FaLinkedin, FaWhatsapp, FaUser, FaGavel, FaDownload, FaAward, FaSearch } from 'react-icons/fa';

export default function LawStudentPortfolio() {
  const experiences = [
    { title: "Legal Intern", org: "Ballymun Community Law Centre", date: "2026", img: "/HUUUU/ballymun.jpg", details: "Assisting in landlord-tenant disputes & community legal outreach.", zoom: true },
    { title: "Volunteer Advocate", org: "Amnesty International", date: "2026", img: "/HUUUU/amnesty.png", details: "Campaigning for human rights policy reform and public awareness.", zoom: false },
    { title: "Active Member", org: "Maynooth Law Society", date: "2025", img: "/HUUUU/law.jpg", details: "Organizing networking events and law career workshops.", zoom: true },
    { title: "Bachelor of Laws (LLB)", org: "Maynooth University", date: "2023 - 2027", img: "/HUUUU/maynooth.jpg", details: "Core focus on Constitutional, Civil, and Contract Law.", zoom: false },
  ];

  return (
    <main className="min-h-screen bg-[#f8f7ff] py-8 md:py-16 px-2 md:px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-[#e0d7ff]">
        
        {/* Banner */}
        <div className="h-48 bg-gradient-to-br from-[#43008a] to-[#7b2cbf] relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        <div className="px-6 md:px-12 pb-16 relative">
          
          {/* Profile Section */}
          <div className="-mt-20 mb-8 flex flex-col items-center">
            <img src="/HUUUU/try1.png" alt="Caoimhe Byrne" className="w-40 h-40 rounded-3xl border-4 border-white shadow-xl object-cover"/>
            <div className="text-center mt-4">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Caoimhe Byrne</h1>
              <p className="text-[#43008a] font-bold mt-1 text-md uppercase tracking-widest">
                LLB Law Student • Stage 3 of 4 • Maynooth University
              </p>
            </div>
          </div>

          {/* Social Pills */}
          <div className="flex justify-center flex-wrap gap-3 mb-10">
            <a href="mailto:email@example.com" className="flex items-center gap-2 px-6 py-2 bg-white text-[#EA4335] rounded-full font-bold hover:bg-[#EA4335] hover:text-white transition-all text-sm border border-[#EA4335]">
              <FaEnvelope /> Email
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-2 bg-white text-[#0077B5] rounded-full font-bold hover:bg-[#0077B5] hover:text-white transition-all text-sm border border-[#0077B5]">
              <FaLinkedin /> LinkedIn
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-2 bg-white text-[#25D366] rounded-full font-bold hover:bg-[#25D366] hover:text-white transition-all text-sm border border-[#25D366]">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>

          {/* About Me & Skills */}
          <div className="grid md:grid-cols-2 gap-8 my-10">
            <div className="bg-[#f8f7ff] p-8 rounded-3xl border border-[#e0d7ff]">
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <FaUser className="text-[#43008a]"/> About Me
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Dedicated Law student at Maynooth University. Passionate about Irish constitutional law, civil advocacy, and human rights. Committed to excellence in legal research and community service.
              </p>
            </div>
            <div className="bg-[#f8f7ff] p-8 rounded-3xl border border-[#e0d7ff]">
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <FaGavel className="text-[#43008a]"/> Legal Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {['Legal Research', 'Drafting', 'Mooting', 'Contract Law', 'Public Speaking'].map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-white border border-[#43008a]/20 text-[#43008a] rounded-lg text-sm font-bold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Academic & Interests Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Academic Highlights */}
            <div className="p-8 bg-gradient-to-br from-[#43008a] to-[#7b2cbf] rounded-3xl text-white shadow-xl">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2 border-b border-purple-400/30 pb-4">
                <FaAward className="text-yellow-400" /> Academic Highlights
              </h2>
              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <span className="text-xl pt-1">🎓</span>
                  <div>
                    <p className="font-bold">Dean’s List - 2025</p>
                    <p className="text-xs text-purple-200">Top 5% of class</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-xl pt-1">⚖️</span>
                  <div>
                    <p className="font-bold">Mooting Competition Winner</p>
                    <p className="text-xs text-purple-200">Maynooth Internal Law</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-xl pt-1">⭐</span>
                  <div>
                    <p className="font-bold">GPA: 3.8/4.0</p>
                    <p className="text-xs text-purple-200">Constitutional & Tort Law</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Legal Interests */}
            <div className="p-8 bg-white border-2 border-[#43008a] rounded-3xl shadow-lg">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <FaSearch className="text-[#43008a]" /> Core Legal Interests
              </h2>
              <div className="flex flex-wrap gap-3">
                {['Human Rights Law', 'Corporate Compliance', 'Data Protection', 'Family Law'].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-[#f8f7ff] text-[#43008a] font-bold rounded-full text-xs hover:bg-[#43008a] hover:text-white transition-colors cursor-default border border-[#43008a]/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-900 mb-10 text-center">My Professional Journey</h2>
            <div className="space-y-6">
              {experiences.map((item, index) => (
                <div key={index} className="flex items-start gap-6 p-6 bg-[#f8f7ff] rounded-3xl border border-[#e0d7ff] hover:shadow-lg transition-all">
                    <div className="w-24 h-24 rounded-2xl bg-white shadow-md flex-shrink-0 flex items-center justify-center border border-[#e0d7ff] overflow-hidden">
                        <img src={item.img} alt={item.org} className={`w-full h-full ${item.zoom ? "object-cover" : "object-contain p-2"}`} />
                    </div>
                    <div className="flex-grow">
                        <h3 className="font-black text-slate-900 text-xl">{item.title}</h3>
                        <p className="text-[#43008a] font-bold text-lg">{item.org}</p>
                        <p className="text-sm text-slate-600 mt-2 italic">"{item.details}"</p>
                        <span className="inline-block mt-3 text-[10px] font-black uppercase tracking-wider text-[#43008a] bg-white px-3 py-1 rounded-full shadow-sm">{item.date}</span>
                    </div>
                </div>
              ))}
            </div>
          </section>

          {/* Download CV */}
          <div className="flex justify-center mt-16">
            <a href="/my-cv.pdf" target="_blank" className="px-10 py-4 bg-[#43008a] text-white font-bold rounded-full hover:bg-[#5e17a3] transition-all shadow-lg flex items-center gap-2">
              <FaDownload /> Download Full CV
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}