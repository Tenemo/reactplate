import path from 'path';

import commonConfig from './webpack.common.babel';

const PORT = process.env.PORT || 3000;

export default commonConfig({
    devServer: {
        historyApiFallback: {
            disableDotRule: true,
        },
        stats: `errors-only`,
        port: PORT,
        headers: {
            'Access-Control-Allow-Origin': `*`,
        },
    },
    mode: `development`,
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
    devtool: `cheap-module-eval-source-map`,
    optimization: {
        minimize: false,
        noEmitOnErrors: true,
    },
    performance: {
        hints: false,
    },
    resolve: {
        alias: {
            'react-dom': `@hot-loader/react-dom`,
        },
    },
    plugins: [],
});
