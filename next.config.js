/** @type {import('next').NextConfig} */
const nextConfig = {
  // creating a variable image and then passing remote patterns inside it
  images: {
    //The array contains image config from sanity,github and google
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        // default pathname
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        // default pathname
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        // default pathname
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
