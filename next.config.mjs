/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // We intentionally do NOT use `output: 'export'` here.
  // All marketing pages are fully static-renderable (no server data fetching),
  // so they are pre-rendered at build time. The ONLY server-side code is the
  // contact form Route Handler (app/api/contact/route.ts), which deploys as a
  // serverless function on Vercel. `output: 'export'` would strip API routes,
  // breaking the contact form. See README for a pure-static fallback.
  poweredByHeader: false,
  images: {
    // No remote images are used; everything ships from /public.
    unoptimized: true,
  },
};

export default nextConfig;
