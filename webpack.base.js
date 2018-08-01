const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './src/bootstrap.js'
    },
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: "[name].js?v=[chunkhash:7]"
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
    }    
}