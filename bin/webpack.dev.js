const path = require('path')
const Sass = require('sass');
const common = require('./webpack.common')
const {merge} = require('webpack-merge')

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "static/[name].js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: /\.lit\.css$/,
                loader: 'lit-css-loader',
            },
            {
                test: /\.css$/,
                include: /\.module\.css$/,
                use: [
                    'style-loader',
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
                use: ['style-loader', 'css-loader']
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
                    'style-loader',
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
                use: ['style-loader', 'css-loader', 'sass-loader']
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
    },
    devServer: {
        port: 3000,
        open: true,
        historyApiFallback: true,
    }
})