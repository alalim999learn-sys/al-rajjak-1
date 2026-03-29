


// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
// সরাসরি app ফোল্ডারে থাকায় ইমপোর্ট পাথ আপডেট করা হয়েছে
import Navbar from "./Navbar"; 
import Footer from "./Footer";
import ChatWidget from "@/components/ChatWidget";

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
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-slate-900 antialiased font-sans">
        {/* তোমার সেই সলিড ব্ল্যাক নববার */}
        <Navbar />
        
        <main className="min-h-screen">
          {children}
        </main>

        {/* এআই চ্যাট উইজেট - সব পেজের জন্য */}
        <ChatWidget />

        {/* ফুটার */}
        <Footer />
      </body>
    </html>
  );
}