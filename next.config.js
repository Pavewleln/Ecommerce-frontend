/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: 'http://localhost:4000/'
  }
}

module.exports = nextConfig
