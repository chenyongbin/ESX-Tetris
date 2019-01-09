const merge = require('webpack-merge');
const webpackBase = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(webpackBase, {
    mode: 'production',
    // devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/html/template.html',
            filename: '../index.html'
        })
    ]
});