const path = require('path');
const merge = require('webpack-merge');
const webpackBase = require('./webpack.base');

module.exports = merge(webpackBase, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(process.cwd(), 'assets')
    }    
});