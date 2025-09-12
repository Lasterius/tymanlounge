import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Убираем output: "export" для использования middleware
  trailingSlash: true,
  env: {
    STRAPI_URL: process.env.STRAPI_URL,
    API_URL: process.env.API_URL,
  },
  images: {
    // Включаем оптимизацию изображений обратно
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapi-server-a2a6.onrender.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  swcMinify: true,
};

export default withNextIntl(nextConfig);
