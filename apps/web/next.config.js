/** @type {import('next').NextConfig} */
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'),
  eslint:{
    ignoreDuringBuilds:true
  },
  images: {
    unoptimized: false,
    domains: [], 
  },
  transpilePackages: [
    "@repo/ui"
  ]};

export default nextConfig;
