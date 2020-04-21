import path from 'path';
import merge from 'webpack-merge';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';

import commonConfig from './webpack.common.babel';
import packageJSON from '../../package.json';

const PORT = process.env.PORT || 3000;

export default merge.smart(commonConfig, {
    mode: `development`,
    devServer: {
        historyApiFallback: true,
        stats: `errors-only`,
        port: PORT,
        headers: {
            'Access-Control-Allow-Origin': `*`,
        },
    },
    entry: [
        `core-js/stable`,
        `react`,
        `react-dom`,
        `eventsource-polyfill`,
        path.join(process.cwd(), `src/index`),
    ],
    output: {
        filename: `[name].js`,
        publicPath: `http://localhost:${PORT}/`,
    },
    devtool: `eval-source-map`,
    plugins: [
        new HtmlWebpackPlugin({
            title: packageJSON.name,
            template: `src/index.html`,
            inject: `true`,
        }),
        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            failOnError: false,
        }),
    ],
    optimization: {
        minimize: false,
        noEmitOnErrors: true,
    },
    resolve: {
        alias: {
            'react-dom': `@hot-loader/react-dom`,
        },
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    `style-loader`,
                    {
                        loader: `css-loader`,
                        options: {
                            modules: {
                                localIdentName: `[path]__[local]`,
                                getLocalIdent: (
                                    loaderContext,
                                    localIdentName,
                                    localName,
                                ) =>
                                    loaderContext.resourcePath.includes(
                                        `node_modules`,
                                    ) ||
                                    loaderContext.resourcePath.includes(
                                        `global.`,
                                    )
                                        ? localName
                                        : false,
                            },
                            sourceMap: true,
                            importLoader: 2,
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
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/,
                use: [
                    {
                        loader: `url-loader`,
                    },
                ],
            },
        ],
    },
});
