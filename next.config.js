/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    appDir: true,
  },
  typescript: {
    // Skip TypeScript type checking during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip ESLint during build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 