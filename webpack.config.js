const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: glob.sync("./src/js/*.js"),
  mode: "development",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
}