const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/bootstrap.js'
    },
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: "[name].js?v=[chunkhash]"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }]
                })
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["assets"], { root: process.cwd(), verbose: false }),
        new ExtractTextWebpackPlugin('css/style.css?[chunkhash]'),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            hash: true,
            filename: '../index.html',
            chunks: ['main'],
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: false,
                removeComments: true
            }
        })
    ]
}