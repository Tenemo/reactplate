import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { chalkProcessing } from './chalkConfig';

const PORT = process.env.PORT || 9001;
const bundler = webpack({});
const server = new WebpackDevServer(bundler, {
    contentBase: './dist',
    hot: false,
    historyApiFallback: {
        disableDotRule: true,
    },
    inline: true,
    stats: {
        hash: false,
        version: false,
        timings: false,
        assets: false,
        colors: true,
        chunks: false,
        chunkModules: false,
        entrypoints: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: false,
        warnings: true,
        publicPath: false,
    },
});

server.listen(PORT);
/* eslint-disable-next-line no-console */
console.log(`${chalkProcessing('Production')} build served on port ${PORT}`);
