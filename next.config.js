/** @type {import('next').NextConfig} */
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["joeschmoe.io", "ipfs.io", "ipfs.infura.io", "storage.googleapis.com", "arweave.net"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

// module.exports = withBundleAnalyzer({
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     domains: ["joeschmoe.io", "ipfs.io", "ipfs.infura.io", "storage.googleapis.com", "arweave.net"],
//   },
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.svg$/i,
//       issuer: /\.[jt]sx?$/,
//       use: ["@svgr/webpack"],
//     });
//     return config;
//   },
// });
