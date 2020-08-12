const { resolve } = require('path')
const CopyFilePlugin = require('copy-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
module.exports = {
  async rewrites() {
    return [
      // For Only SSR.
      // https://github.com/vercel/next.js/issues/9051#issuecomment-556824393
      {
        source: '/rss.xml',
        destination: '/api/rss',
      },
    ]
  },
  webpack(config, { dev, isServer }) {
    // https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
    if (!isServer) {
      config.node = {
        fs: 'empty',
      }
    }
    if (dev) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.[tj]sx?/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
              failOnWarning: false,
            },
          },
        ],
      })
    }

    config.plugins.push(
      new CopyFilePlugin({
        patterns: [
          {
            context: '_posts',
            from: '**/*.{jpg,png}',
            to: resolve(__dirname, 'public/posts'),
            // The `content` argument is a [`Buffer`](https://nodejs.org/api/buffer.html) object, it could be converted to a `String` to be processed using `content.toString()`
            // The `absoluteFrom` argument is a `String`, it is absolute path from where the file is being copied
            // transform(content, absoluteFrom) {
            //   return optimize(content);
            // },
          },
        ],
      }),
      new WriteFilePlugin()
    )
    return config
  },
}
