/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,

  basePath: isProd ? "/babypleates" : "",
  assetPrefix: isProd ? "/babypleates/" : "",
};

module.exports = nextConfig;