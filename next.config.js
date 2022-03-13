/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['joeschmoe.io', 'ipfs.io', 'ipfs.infura.io' ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/board',
  //     }
  //   ];
  // },
  webpack: (config) => {
    return config;
  }
}
