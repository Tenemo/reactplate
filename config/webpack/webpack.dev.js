import webpack from 'webpack';
import path from 'path';

import commonConfig from './webpack.common';

export default commonConfig({
    mode: 'development',
    entry: [
        '@babel/polyfill',
        'react',
        'react-dom',
        'eventsource-polyfill',
        path.join(process.cwd(), 'src/index'),
    ],
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(process.cwd(), 'dist'),
    },
    devtool: 'eval-source-map',
    optimization: {
        minimize: false,
        noEmitOnErrors: true,
    },
    performance: {
        hints: false,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
