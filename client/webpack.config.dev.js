const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');

const progressHandler = (percentage, message, ...args) => {
  console.info(percentage, message, ...args);
}

module.exports = {
  entry: {
    app: resolve(__dirname, './src/main.ts'),
  },
  output: {
    path: resolve(__dirname, './dist'),
    filename: '[name].js',
    sourceMapFilename: 'sourcemaps/[file].map',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.pcss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          }
        ]
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        }
      }
    ],
  },
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve(__dirname, './src/index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(resolve(__dirname, 'dist')),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /.+/,
          handler: 'networkFirst',
          options: {
            cacheName: 'flora-task-manager-v1',
            networkTimeoutSeconds: 5,
            expiration: {
              maxAgeSeconds: 60 * 60
            }
          }
        }
      ]
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/manifest.json",
        to: "manifest.json"
      }
    ]),
    // new CompressionPlugin(),
    new webpack.ProgressPlugin(progressHandler),
  ],
  optimization: {
    minimize: true
  },
  target: "web",
  devServer: {
    contentBase: resolve(__dirname, './dist'),
    port: 9000,
    hot: true,
    open: true,
    progress: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
}