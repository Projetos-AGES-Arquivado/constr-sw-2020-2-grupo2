const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader', 'angular2-template-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader']
            },
            {
                test: /\.(html)$/,
                loader: 'raw-loader'
            },
            {
                test: /.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                include: /images/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'images/',
                      publicPath: 'images/'
                    }
                  }
                ]
              }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src/app/'),
            '~': path.resolve(__dirname, 'node_modules/')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            // global app config object
            config: JSON.stringify({
                //apiUrl: 'http://localhost:4000'
                studentApiUrl: 'http://ec2-34-228-52-17.compute-1.amazonaws.com:3000/api',
                evaluationApiUrl: 'http://ec2-52-67-129-68.sa-east-1.compute.amazonaws.com:8000/api/v1'
            })
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: true
    },
    devServer: {
        historyApiFallback: true
    }
};