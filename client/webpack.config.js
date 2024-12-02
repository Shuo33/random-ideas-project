const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        //allow us to use the absolute file path
        // __dirname means current directory
        path: path.resolve(__dirname, '../public'),
        filename: 'bundle.js',
    },
    // configure the webpack server
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../public')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,

        // if you hit /api, then look at localhost:5001, since that's where our API actually exists
        proxy: {
            '/api': 'http://localhost:5001',
        },
    },
    // definir the rules of the loader
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }, 
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            }
        ]
    },
    // have the instance of the plugins inside the array, like an instance of HtmlWebpackPlugin for exemple 
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin(),
    ]
};