const path = require('path');
const merge = require('webpack-merge');
const webpackBase = require('./webpack.base');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(webpackBase, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(process.cwd(), 'assets')
    },
    plugins: [
        new ExtractTextWebpackPlugin('css/style.css?[chunkhash:7]'),
        new HtmlWebpackPlugin({
            template: 'src/template.html',            
            filename: '../index.html'            
        })
    ]
});