/** @type {import('next').NextConfig} */
const API_KEY = process.env.API_KEY;
const API_BASE_URL = process.env.API_BASE_URL;
const apiKeyQuery = `?api_key=${API_KEY}`;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"],
  },
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/form",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `${API_BASE_URL}/movie/popular${apiKeyQuery}`,
      },
      {
        source: "/api/movies/:id",
        destination: `${API_BASE_URL}/movie/:id${apiKeyQuery}`,
      },
    ];
  },
};

module.exports = nextConfig;
