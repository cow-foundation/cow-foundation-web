const { withNx } = require("@nx/next")

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  nx: {
    svgr: false,
  },
  compiler: {
    styledComponents: true,
  },
  // Custom webpack config for cow.foundation
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
      }
    }

    config.module.rules.push(
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "static/images/[hash][ext][query]",
        },
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/videos/",
            outputPath: "static/videos/",
            name: "[name].[hash].[ext]",
            esModule: false,
          },
        },
      },
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["next/babel"],
              plugins: ["babel-plugin-macros"],
            },
          },
        ],
      }
    )

    return config
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/cow-protocol',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cow-amm',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cow-swap',
        destination: '/',
        permanent: true,
      },
      {
        source: '/widget',
        destination: '/',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tokens',
        destination: '/',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/',
        permanent: true,
      },
      {
        source: '/mev-blocker',
        destination: '/',
        permanent: true,
      },
      {
        source: '/learn/:path*',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = withNx(nextConfig)
