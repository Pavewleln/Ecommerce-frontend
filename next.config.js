/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        SERVER_URL: "http://localhost:4000/"
        //https://ecommerce-backend-770q.onrender.com/
        //http://localhost:4000/
    }
};

module.exports = nextConfig;
