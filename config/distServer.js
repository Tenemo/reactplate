import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { chalkProcessing } from './chalkConfig';

const PORT = process.env.PORT || 9001;
const bundler = webpack({});
const server = new WebpackDevServer(bundler, {
    contentBase: './dist',
    compress: true,
    hot: true,
    historyApiFallback: {
        disableDotRule: true,
    },
    inline: true,
    stats: 'errors-only',
});

server.listen(PORT);
/* eslint-disable-next-line no-console */
console.log(`${chalkProcessing('Production')} build served on port ${PORT}`);
