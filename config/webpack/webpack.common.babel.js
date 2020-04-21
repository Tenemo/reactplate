import webpack from 'webpack';

export default {
    target: `web`,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                PORT: JSON.stringify(process.env.PORT),
                ANALYZE: JSON.stringify(process.env.ANALYZE),
            },
        }),
    ],
    resolve: {
        extensions: [`.ts`, `.tsx`, `.js`, `.jsx`, `.css`, `.scss`],
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: [/node_modules/],
                use: `babel-loader`,
            },
        ],
    },
};
