import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <header style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
        <Link href="/">
          <Image
            src="/logo-99.png"   // public folder এ logo রাখবে
            alt="Logo"
            width={120}
            height={50}
          />
        </Link>
      </header>

      <main>{children}</main>
    </>
  );
}