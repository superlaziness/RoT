const path = require("path");

module.exports = {
	entry: ["./server"],
	output: {
		path: path.join(__dirname, "dist"),
		filename: "server.js",
		publicPath: "/",
	},
	resolve: {
		extenstions: [
			"",
			".js",
			".jsx",
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
				},
				exclude: /node_modules/,
			},
		],
	},
};