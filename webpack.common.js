const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    main: ["./frontend/src/index.tsx"]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [path.join(__dirname, "src"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-loader"
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
