import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import commonConfig from './webpack.common.babel';
import packageJSON from '../../package.json';

export default commonConfig({
    mode: 'development',
    entry: ['@babel/polyfill', 'eventsource-polyfill', path.join(process.cwd(), 'src/index')],
    output: {
        filename: '[name].js',
        publicPath: '/',
    },
    devtool: 'eval-source-map',
    optimization: {
        minimize: false,
        noEmitOnErrors: true,
    },
    performance: {
        hints: false,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: packageJSON.name,
            template: 'src/index.html',
            inject: 'true',
        }),
    ],
});
