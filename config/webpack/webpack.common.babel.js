import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import packageJSON from '../../package.json';

export default options => ({
    devServer: options.devServer || {},
    mode: options.mode || `production`,
    entry: options.entry,
    output: options.output,
    devtool: options.devtool || false,
    target: `web`,
    optimization: options.optimization || {},
    performance: options.performance || {},
    plugins: options.plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                PORT: JSON.stringify(process.env.PORT),
                ANALYZE: JSON.stringify(process.env.ANALYZE),
            },
        }),
        new HtmlWebpackPlugin({
            title: packageJSON.name,
            template: `src/index.html`,
            inject: `true`,
        }),
    ]),
    resolve: {
        extensions: [`.ts`, `.tsx`, `.js`, `.jsx`],
        ...options.resolve,
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: [/node_modules/],
                use: `babel-loader`,
            },
            {
                test: /(\.css|\.scss|\.sass)$/,
                use: [
                    `style-loader`,
                    {
                        loader: `css-loader`,
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: `postcss-loader`,
                        options: {
                            plugins: () => [postcssFlexbugsFixes, autoprefixer],
                            sourceMap: true,
                        },
                    },
                    {
                        loader: `sass-loader`,
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|svg|ttf|eot)$/,
                use: [
                    {
                        loader: `url-loader`,
                        options: {
                            limit: 8192,
                            name: `[name]-[hash].[ext]`,
                            outputPath: `fonts/`,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/,
                use: [
                    {
                        loader: `url-loader`,
                        options: {
                            limit: 8192,
                            name: `[name]-[hash].[ext]`,
                            outputPath: `images/`,
                        },
                    },
                ],
            },
        ],
    },
});
