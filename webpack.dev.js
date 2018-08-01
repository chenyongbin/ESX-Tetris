const path = require('path');
const merge = require('webpack-merge');
const webpackBase = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(webpackBase, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(process.cwd(), 'assets')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/template.html',            
            filename: 'index.html'            
        })
    ]
});