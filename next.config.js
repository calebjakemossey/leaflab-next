/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.com",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
