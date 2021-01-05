import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { merge } from 'webpack-merge';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { commonConfig } from './webpack.common.babel';
import packageJSON from '../../package.json';

const { ANALYZE } = process.env;

export default merge(commonConfig, {
    mode: `production`,
    entry: {
        [packageJSON.name]: [
            `core-js/stable`,
            `react`,
            `react-dom`,
            path.join(process.cwd(), `src/index`),
        ],
    },
    output: {
        filename: `${packageJSON.name}-${packageJSON.version}.[chunkhash].min.js`,
        path: path.join(process.cwd(), `dist`),
    },
    devtool: false,
    plugins: [
        new HtmlWebpackPlugin({
            title: packageJSON.name,
            template: `src/index.html`,
            inject: true,
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
            filename: `${packageJSON.name}-${packageJSON.version}.[chunkhash].min.css`,
            chunkFilename: `${packageJSON.name}-${packageJSON.version}.[chunkhash].[id].min.css`,
        }),
        ...(ANALYZE ? [new BundleAnalyzerPlugin()] : []),
    ],
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                terserOptions: {
                    sourceMap: false,
                },
            }),
            new CssMinimizerPlugin({ sourceMap: false }),
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
                test: /\.(t|j)sx?$/,
                exclude: [/node_modules/],
                use: `babel-loader`,
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    `style-loader`,
                    {
                        loader: '@teamsupercell/typings-for-css-modules-loader',
                        options: {
                            formatter: 'prettier',
                            banner:
                                '// Automatically generated by @teamsupercell/typings-for-css-modules-loader. \n// Please do not edit this file manually.',
                        },
                    },
                    {
                        loader: `css-loader`,
                        options: {
                            modules: {
                                localIdentName: `[hash:base64]`,
                                auto: (resourcePath: string) =>
                                    !resourcePath.includes('node_modules') &&
                                    !resourcePath.includes('global.'),
                            },
                            sourceMap: false,
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: `postcss-loader`,
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-flexbugs-fixes',
                                    'autoprefixer',
                                ],
                            },
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
                            name: `[name].[hash].[ext]`,
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
                            name: `[name].[hash].[ext]`,
                            outputPath: `images/`,
                        },
                    },
                ],
            },
        ],
    },
});