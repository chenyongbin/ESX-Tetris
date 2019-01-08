const path = require('path');
const merge = require('webpack-merge');
const webpackBase = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(webpackBase, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		// host: '172.30.66.66',
		contentBase: path.resolve(process.cwd(), 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/html/template.html',
			filename: 'index.html'
		})
	]
});
