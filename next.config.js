/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {}
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    NEXT_PUBLIC_SOCKET_IO_SERVER: "http://localhost:5001",
    NEXT_PUBLIC_API_SERVER: "http://localhost:5000"
  }
}
