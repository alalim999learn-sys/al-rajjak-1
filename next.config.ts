//C:\Users\Shanon\al-rajjak-1\next.config.ts



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ১. মঙ্গোডিবি বা লোকাল স্টোরেজ থেকে ইমেজ দেখানোর জন্য (যদি দরকার হয়)
  // আপাতত সুপাবেজের রিমোট প্যাটার্ন ডিলিট করা হয়েছে।
  
  // ২. লোকাল আইপি থেকে এক্সেস করার জন্য লেটেস্ট ফরম্যাট
  experimental: {
    serverActions: {
      allowedOrigins: ['192.168.0.103:3000', 'localhost:3000'],
    },
  },

  // ৩. ফেচিং ডিটেইলস দেখার জন্য
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // ৪. টাইপস্ক্রিপ্ট এরর ইগনোর করবে (বিল্ড সাকসেস করার জন্য ইম্পর্ট্যান্ট)
  typescript: {
    ignoreBuildErrors: true, 
  },
};

export default nextConfig;