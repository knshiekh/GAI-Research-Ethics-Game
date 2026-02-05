/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/GAI-Research-Ethics' : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
