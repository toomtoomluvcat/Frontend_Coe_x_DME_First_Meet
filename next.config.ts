/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'imageproxy.ifunny.co',
      'lh3.googleusercontent.com', // Google Photos
      'drive.google.com',          // Google Drive share link
      'drive.usercontent.google.com' // Google Drive direct download
    ],
  },
};

module.exports = nextConfig;
