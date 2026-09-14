/** @type {import('next').NextConfig} */

// When built for GitHub Pages, the site is served from
// https://<user>.github.io/Code-Testing-/ instead of the domain root, so every
// asset/link needs the repo name prefixed. GITHUB_PAGES is set by the
// deploy workflow (.github/workflows/deploy.yml) and left unset for local
// `npm run dev`, so local development still runs at the root path.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "Code-Testing-";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repoName}` : "",
  },
};

export default nextConfig;
