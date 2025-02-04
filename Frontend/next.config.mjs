import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    STRAPI_URL: process.env.STRAPI_URL,
    API_URL: process.env.API_URL,
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "http",
  //       hostname: "localhost",
  //       port: "1337",
  //       pathname: "/uploads/**",
  //     },
  //   ],
  // },
  images: {
    domains: ["https://strapi-server-a2a6.onrender.com"],
    // path: `${process.env.STRAPI_URL}/uploads/`,
  },
};

export default withNextIntl(nextConfig);
