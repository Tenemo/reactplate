import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import merge from 'webpack-merge';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';

import commonConfig from './webpack.common.babel';
import packageJSON from '../../package.json';

const { ANALYZE } = process.env;

export default merge.smart(commonConfig, {
    mode: `production`,
    entry: [
        `core-js/stable`,
        `react`,
        `react-dom`,
        path.join(process.cwd(), `src/index`),
    ],
    output: {
        filename: `${packageJSON.name}-${packageJSON.version}.[hash].min.js`,
        path: path.join(process.cwd(), `dist`),
    },
    devtool: false,
    plugins: [
        new HtmlWebpackPlugin({
            title: packageJSON.name,
            template: `src/index.html`,
            inject: `true`,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: `${packageJSON.name}-${packageJSON.version}.[hash].min.css`,
            chunkFilename: `${packageJSON.name}-${packageJSON.version}.[hash].[id].min.css`,
        }),
        ...(ANALYZE ? [new BundleAnalyzerPlugin()] : []),
    ],
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                sourceMap: false,
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: { sourcemap: false },
            }),
        ],
        sideEffects: true,
        concatenateModules: true,
        nodeEnv: `production`,
        splitChunks: {
            chunks: `all`,
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
                                localIdentName: `[hash:base64]`,
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
                            sourceMap: false,
                            importLoader: 2,
                        },
                    },
                    {
                        loader: `postcss-loader`,
                        options: {
                            plugins: () => [postcssFlexbugsFixes, autoprefixer],
                            sourceMap: false,
                        },
                    },
                    {
                        loader: `sass-loader`,
                        options: {
                            sourceMap: false,
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
                            name: `fonts/[name].[hash].[ext]`,
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
                            name: `images/[name].[hash].[ext]`,
                            outputPath: `images/`,
                        },
                    },
                ],
            },
        ],
    },
});
