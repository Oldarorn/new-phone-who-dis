const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ResourceManifestPlugin = require('./webpack.fxmanifest.plugin');
const CopyPlugin = require('copy-webpack-plugin');

// This webpack config was made for getting the debug
// build process as smooth as possible. It concentrates
// on preserving source maps as well as injecting the standalone
// 'react-devtools' into NUI.

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  performance: {
    assetFilter: (assetFilename) =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
  entry: ['react-devtools', path.join(process.cwd(), 'src/index.tsx')],
  output: {
    path: path.resolve(process.cwd(), '../resources/html'),
    filename: '[name].js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(process.cwd(), 'public', 'media'),
          to: path.join('..', 'html', 'media'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: {
        removeComments: false,
        collapseWhitespace: false,
        removeRedundantAttributes: false,
        useShortDoctype: false,
        removeEmptyAttributes: false,
        removeStyleLinkTypeAttributes: false,
        keepClosingSlash: false,
        minifyJS: false,
        minifyCSS: false,
        minifyURLs: false,
      },
    }),
    new ResourceManifestPlugin(),
  ],
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.react.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: `ifdef-loader`,
            options: {
              DEBUG: true,
              version: 3,
              'ifdef-verbose': true, // add this for verbose output
              'ifdef-triple-slash': true, // add this to use double slash comment instead of default triple slash
            },
          },
        ],
      },
    ],
  },
};
