//C:\Users\Shanon\al-rajjak-1\app\watches\page.tsx



// app/watches/page.tsx
import GlobalSmartShop from "@/components/furniture"; // তোর কম্পোনেন্টের পাথ ঠিক থাকলে এটা কাজ করবে

export default function WatchPage() {
  return (
    <main className="min-h-screen bg-slate-900 py-10">
      <GlobalSmartShop />
    </main>
  );
}