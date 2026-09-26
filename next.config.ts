import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
        hostname: "elara-images.s3.us-east-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "getyourwatch-assets-prod.s3.eu-north-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "elara-dev-images.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "wildfire-949501733658-eu-west-2-an.s3.eu-west-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
