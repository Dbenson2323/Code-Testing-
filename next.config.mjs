/** @type {import('next').NextConfig} */

// Served from the custom domain (drbenson.xyz) at the root, so no basePath
// is needed — see public/CNAME for the domain configuration.
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
