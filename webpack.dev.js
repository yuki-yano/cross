const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")

const common = require("./webpack.common.js")

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "frontend/src"),
    inline: true,
    hot: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(j|t)sx?$/,
        use: "react-hot-loader/webpack",
        include: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [new webpack.NamedModulesPlugin()]
})
