import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from './webpack/webpack.dev';
import { chalkProcessing } from './chalkConfig';

const PORT = process.env.PORT || 9000;
const options = {
    contentBase: './dist',
    hot: true,
    host: 'localhost',
    historyApiFallback: {
        disableDotRule: true,
    },
    inline: true,
    stats: 'errors-only',
};
WebpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, options);

server.listen(PORT, 'localhost', () => {
    /* eslint-disable-next-line no-console */
    console.log(`${chalkProcessing('Development')} server hosted on port ${PORT}`);
});
