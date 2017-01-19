const path = require("path");
const webpack = require('webpack');

const GLOBALS = {
  __DEV__: true,
  __BROWSER__: true,
  __NODE__: false,
  __RASPI__: false,
};

module.exports = {
  entry: ["client"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "client.js",
    publicPath: "http://localhost:8080/dist/",
  },
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      "node_modules",
    ],
    extensions: [
      ".js",
      ".jsx",
      ".json",
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["react-hot-loader", "babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
  ]
};