const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ResourceManifestPlugin = require("./webpack.fxmanifest.plugin");
const CopyPlugin = require('copy-webpack-plugin')

module.exports = require("./webpack.common")({
  // Prod spec
  mode: "production",

  // In production, we skip all hot-reloading stuff
  entry: [path.join(process.cwd(), "src/index.tsx")],

  // Copy static media folder to new build
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(process.cwd(), "public", "media"), to: path.join('..', 'html', 'media') }
      ]
    }),
    // Minify to reduce bundle size for prod.
    new HtmlWebpackPlugin({
      template: "public/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new ResourceManifestPlugin(),
  ],
  // Provide performance warnings on certain assets.
  performance: {
    assetFilter: (assetFilename) =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
