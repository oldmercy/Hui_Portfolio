/** @type {import('next').NextConfig} */
const nextConfig = {
  // allow @chenglou/pretext (ESM) to be bundled properly
  transpilePackages: ["@chenglou/pretext"],
};

export default nextConfig;
