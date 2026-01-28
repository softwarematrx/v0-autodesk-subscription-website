/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure the app uses the edge runtime for Cloudflare compatibility if needed
  // experimental: { runtime: 'edge' } 
}

export default nextConfig