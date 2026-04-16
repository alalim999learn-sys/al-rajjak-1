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

  // ২. লোকাল নেটওয়ার্ক বা আইপি (192.168.0.103) থেকে এক্সেস করার পারমিশন
  experimental: {
    allowedDevOrigins: ['192.168.0.103', 'localhost:3000'],
  },

  // ৩. ফেচিং ডিটেইলস দেখার জন্য
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;