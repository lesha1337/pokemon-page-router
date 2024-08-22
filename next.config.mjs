/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "jp", "ru"],
    defaultLocale: "en",
    localeDetection: true,
  },
  images: {
    remotePatterns: [{ hostname: "raw.githubusercontent.com" }],
  },
};

export default nextConfig;
