import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
      {
        protocol: "https",
        hostname: "postimg.cc",
      },
      {
        protocol: "https",
        hostname: "i.postimg.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "greetely-images.s3.us-east-2.amazonaws.com",
      },
      // ✅ ADD THIS ONE
      {
        protocol: "https",
        hostname: "getyourwatch-assets-prod.s3.eu-north-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "greetely-dev-images.s3.us-east-1.amazonaws.com",
      },

      {
        protocol: "https",
        hostname:
          "wildfire-949501733658-eu-west-2-an.s3.eu-west-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
