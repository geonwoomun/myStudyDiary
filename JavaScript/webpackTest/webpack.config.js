const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 9000,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
    ],
};
// css 파일을 처리 못 했는데 css-loader를 추가 해줌으로써 오류 해결!!
