const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // js, jsx 파일
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/, // css 파일
                use: ['style-loader', 'css-loader'], // 오른쪽부터 순서대로 적용: css-loader -> style-loader
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        static: './dist',
        hot: true,
        open: true,
    },
};
