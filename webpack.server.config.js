const path = require("path");
const webpack = require('webpack');
const fs = require('fs');

const GLOBALS = {
  __DEV__: true,
  __BROWSER__: false,
  __NODE__: true,
  __RASPI__: process.arch === 'arm',
};

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

delete nodeModules['react-dom'];

console.log('nodeModules', nodeModules);

module.exports = {
	entry: ["server"],
	output: {
		path: path.join(__dirname, "dist"),
		filename: "server.js",
		publicPath: path.join(__dirname, "/"),
	},
	target: "async-node",
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
		noParse: /ws/,
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
		],
	},
	node: {
    console: false,
    fs: false,
    net: false,
    tls: false,
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
  ]
};