const path = require("path");

module.exports = {
	entry: ["server"],
	output: {
		path: path.join(__dirname, "dist"),
		filename: "server.js",
		publicPath: "/",
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
			{
				test: /\.json$/,
				loader: "json-loader",
			}
		],
	},
};