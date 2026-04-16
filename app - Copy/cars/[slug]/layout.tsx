


//C:\Users\Shanon\al-rajjak-1\app\cars\[slug]\layout.tsx
import Image from 'next/image';

export default function CarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      
      {/* ১. ব্যাকগ্রাউন্ড ইমেজ (পিক্সেলস থেকে নামানো ছবি) */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/BARIO.jpg" // নিশ্চিত করুন public ফোল্ডারে এই নামে ছবি আছে
          alt="Luxury Car Background"
          fill
          priority
          className="object-cover opacity-80"
        />
      </div>

      {/* ২. ডার্ক ওভারলে এবং ব্লার (যাতে চ্যাটবট ফুটে ওঠে) */}
      <div className="absolute inset-0 z-10 bg-black/70 backdrop-blur-[3px]" />

      {/* ৩. মেইন কন্টেন্ট (আপনার চ্যাটবট এখানে লোড হবে) */}
      <div className="relative z-20 w-full min-h-screen">
        {children}
      </div>

    </div>
  );
}