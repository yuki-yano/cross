const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")
const TerserPlugin = require("terser-webpack-plugin")
const ManifestPlugin = require("webpack-manifest-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

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
    })
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
