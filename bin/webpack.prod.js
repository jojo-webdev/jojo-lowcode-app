const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const Sass = require('sass');
const common = require('./webpack.common')
const {merge} = require('webpack-merge')

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "static/js/[name].[contenthash].js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './public/robots.txt' },
                { from: './public/.htaccess' },
                { from: './node_modules/jojo-lowcode/prod/package.prod.json', to: 'package.json' },
                { from: './node_modules/jojo-lowcode/prod/server.prod.js', to: 'server.js' }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash].css",
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'minify-html-literals-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                include: /\.lit\.css$/,
                loader: 'lit-css-loader',
            },
            {
                test: /\.css$/,
                include: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true, 
                            importLoaders: 1,
                            modules: { localIdentName: 'oos-[hash:base64:10]' },
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: [/\.lit\.css$/, /\.module\.css$/],
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                include: /\.lit\.scss$/,
                loader: 'lit-css-loader',
                options: {
                    transform: (data, { filePath }) => Sass.renderSync({ data, file: filePath }).css.toString(),
                }
            },
            {
                test: /\.scss$/,
                include: /\.module\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true, 
                            importLoaders: 1,
                            modules: { localIdentName: 'oos-[hash:base64:10]' },
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: [/\.lit\.scss$/, /\.module\.scss$/],
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|webp|tiff|woff|eot|woff2|ttf|svg)(\?.*)?$/,
                type : 'asset/resource',
                generator : {
                    filename : 'assets/[name]-[hash][ext][query]',
                }
            }
        ]
    },
    optimization: {
        runtimeChunk: 'single',
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
})