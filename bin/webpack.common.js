const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        public: "jojo-lowcode/public",
        app: "./app/main.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico",
        }),
        // new CopyPlugin({
        //     patterns: [
        //         { from: './resources/assets', to: 'assets' }
        //     ]
        // }),
    ]
}