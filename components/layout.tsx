


//layout.tsx
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react"; // এটি যোগ করুন

// children এর টাইপ বলে দিতে হবে
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <header style={{ padding: "10px", borderBottom: "1px solid #ddd", display: "flex", alignItems: "center" }}>
        <Link href="/">
          {/* আপনার লোগোর সঠিক নাম দিন (যেমন shanon-99.png) */}
          <Image
            src="/shanon-99.png" 
            alt="Logo"
            width={120}
            height={50}
            priority
          />
        </Link>
      </header>

      <main>{children}</main>
    </>
  );
}
/*
git  add . 
git commit -m "HU"
git push origin main 

*/