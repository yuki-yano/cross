const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./frontend/src/index.tsx",
  output: {
    path: path.join(__dirname, "frontend/dist"),
    filename: "bundle.js"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "frontend/src"),
    inline: true,
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [path.join(__dirname, "src"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }, { loader: "tslint-loader" }],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        SLACK_USER_CLIENT_ID: JSON.stringify(process.env.SLACK_USER_CLIENT_ID),
        SLACK_SCOPES: JSON.stringify(process.env.SLACK_SCOPES),
        API_HOST: JSON.stringify(process.env.API_HOST)
      }
    }),
    new HtmlWebpackPlugin({ template: "./frontend/src/index.html" })
  ]
}
