const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: resolve(__dirname, './src/main.ts'),
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'bundle.js',
    sourceMapFilename: 'sourcemaps/[file].map'
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
      }
    ]
  },
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve(__dirname, './src/index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(resolve(__dirname, 'dist'))
  ],
  devServer: {
    contentBase: resolve(__dirname, './dist'),
    port: 9000,
    hot: true,
    open: true,
    progress: true,
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}