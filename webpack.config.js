const path = require('path');

const MinifyPlugin = require("babel-minify-webpack-plugin");

/**
 * Docs:
 *  - mode: https://webpack.js.org/concepts/mode/
 */

const config = {
	entry: {
		darkmode: './index.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].min.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					presets: ["minify"]
				}

			},
			{
				test: /\.css$/,
				loader: 'raw-loader'
			}
		]
	},

	plugins: [
		new MinifyPlugin()
	]
};


module.exports = config;
