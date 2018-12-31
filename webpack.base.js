const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/bootstrap.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js?v=[chunkhash:7]"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader"
      }
    ]
  }
};
