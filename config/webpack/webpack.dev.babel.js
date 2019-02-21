import path from 'path';

import commonConfig from './webpack.common.babel';

const PORT = process.env.PORT || 3000;

export default commonConfig({
    devServer: {
        historyApiFallback: {
            disableDotRule: true,
        },
        stats: 'errors-only',
        port: PORT,
        headers: {
            Accept: 'text/xml',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    },
    mode: 'development',
    entry: [
        '@babel/polyfill',
        'react',
        'react-dom',
        'eventsource-polyfill',
        path.join(process.cwd(), 'src/index'),
    ],
    output: {
        filename: '[name].js',
        publicPath: `http://localhost:${PORT}/`,
    },
    devtool: 'cheap-module-eval-source-map',
    optimization: {
        minimize: false,
        noEmitOnErrors: true,
    },
    performance: {
        hints: false,
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    plugins: [],
});
