/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['joeschmoe.io', 'ipfs.io', 'ipfs.infura.io' ],
  },
  webpack: (config) => {
    return config;
  }
}
