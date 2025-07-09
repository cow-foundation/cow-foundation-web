const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
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
        type: "asset/resource",
        generator: {
          filename: "static/videos/[name].[hash][ext]",
        },
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

module.exports = nextConfig
