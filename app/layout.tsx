


// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar"; 
import Footer from "./Footer";


export const metadata: Metadata = {
  title: "Shanon Khan | Cybersecurity & AI Expert",
  description: "Professional portfolio of Shanon Khan, specializing in Next.js, Flutter, and Custom AI Training for global businesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning যোগ করা হয়েছে যাতে ব্রাউজার এক্সটেনশন (যেমন: Converter) এরর না দেয়
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-white text-slate-900 antialiased font-sans">
        {/* তোমার সেই সলিড ব্ল্যাক নববার */}
        <Navbar />
        
        <main className="min-h-screen">
          {children}
        </main>

        {/* এআই চ্যাট উইজেট - সব পেজের জন্য */}
   

        {/* ফুটার */}
        <Footer />
      </body>
    </html>
  );
}