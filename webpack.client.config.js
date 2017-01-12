const path = require("path");
const webpack = require('webpack');

const GLOBALS = {
  __DEV__: true,
  __BROWSER__: true,
};

module.exports = {
  entry: ["client"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "client.js",
    publicPath: "http://localhost:8080/dist/",
  },
  resolve: {
    moduleDirectories: ['node_modules'],
    root: path.join(__dirname, "src"),
    extensions: [
      "",
      ".js",
      ".jsx",
      ".json",
    ],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
  ]
};