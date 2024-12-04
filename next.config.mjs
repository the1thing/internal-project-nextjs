// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enables static export
  basePath: "/internal-project-nextjs", // Set the base path to match your GitHub repository name
  assetPrefix: "/internal-project-nextjs/", // Prefix assets with the base path
};

export default nextConfig;
