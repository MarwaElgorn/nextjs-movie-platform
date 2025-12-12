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
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      }
    ],
  },
};

export default nextConfig;
