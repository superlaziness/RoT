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

module.exports = {
	entry: ["server"],
	output: {
		path: path.join(__dirname, "dist"),
		filename: "server.js",
		publicPath: path.join(__dirname, "/"),
	},
	target: "node",
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
		noParse: ['ws'],
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
	node: {
    console: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  externals: nodeModules,
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
  ]
};