//C:\Users\Shanon\al-rajjak-1\next.config.ts



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ১. সুপাবেস থেকে ইমেজ লোড করার পারমিশন
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ibeqeoxnafefmvotwrkr.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

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
};

export default nextConfig;