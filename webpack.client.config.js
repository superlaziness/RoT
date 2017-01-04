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
    publicPath: "/",
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
        loader: "babel-loader",
        query: {
          presets: [
            'babel-preset-es2015',
            'babel-preset-stage-1',
            'babel-preset-react',
          ].map(require.resolve),
          plugins: ['babel-plugin-transform-decorators-legacy'].map(require.resolve),
        },
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