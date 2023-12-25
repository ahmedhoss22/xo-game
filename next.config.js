/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {};
const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    NEXT_PUBLIC_SOCKET_IO_SERVER: "http://localhost:5001",
    NEXT_PUBLIC_API_SERVER: "http://localhost:5000",
  },
  webpack: (config, { isServer }) => {
    // Add rules to handle MP3 and WAV files
    config.module.rules.push(
      {
        test: /\.(mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: `/_next/static/assets/sound/`,
              outputPath: `${isServer ? '../' : ''}static/assets/sound/`,
            },
          },
        ],
      },
      {
        test: /\.(wav)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: `/_next/static/assets/sound/`,
              outputPath: `${isServer ? '../' : ''}static/assets/sound/`,
            },
          },
        ],
      }
    );

    return config;
  },
};
