const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    // output: {
    //     filename: 'main.js',
    //     path: path.resolve(__dirname, 'dist')
    // },
    devServer: {
        port: 3000,
        hot: true,
        historyApiFallback: true,
        inline: true,
        publicPath: '/'
    },
    module: {
        rules: [
            {
               test: /\.tsx?$/,
               loader: 'awesome-typescript-loader' 
            }
        ]
    },
    resolve: {
        extensions: ['.js','.jsx','.ts','.tsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
        }),
    ],
};
// css 파일을 처리 못 했는데 css-loader를 추가 해줌으로써 오류 해결!!
