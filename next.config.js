/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["joeschmoe.io", "ipfs.io", "ipfs.infura.io", "storage.googleapis.com", "arweave.net"],
  },
  async redirects() {
    return [
      {
        source: '/intro',
        destination: 'https://vess.id/',
        permanent: true,
      },
    ]
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
