const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")
const TerserPlugin = require("terser-webpack-plugin")
const ManifestPlugin = require("webpack-manifest-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

const common = require("./webpack.common.js")

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.join(__dirname, "frontend/dist"),
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: "[name].[contenthash].[id].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new ManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new BundleAnalyzerPlugin({ analyzerMode: "static", logLevel: "silent" })
  ],
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
    runtimeChunk: {
      name: "manifest"
    },
    minimize: true,
    splitChunks: {
      minSize: 100000,
      maxSize: 1500000,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "all",
          enforce: true
        }
      }
    }
  }
})
