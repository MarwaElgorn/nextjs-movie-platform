/** @type {import('next').NextConfig} */
const nextConfig = {
  turbo: {
    enabled: false, 
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default nextConfig;
