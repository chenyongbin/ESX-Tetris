const merge = require('webpack-merge');
const webpackBase = require('./webpack.base');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(webpackBase, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(["assets"], { root: process.cwd(), verbose: false }),
        new ExtractTextWebpackPlugin('css/style.css?v=[chunkhash:7]'),
        new HtmlWebpackPlugin({
            template: 'src/template.html',            
            filename: '../index.html',            
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ]
});