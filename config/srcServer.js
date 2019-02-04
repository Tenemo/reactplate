import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack/webpack.dev.babel';

const bundler = webpack(config);
const server = new WebpackDevServer(bundler, {
    hot: true,
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
    }
})
server.listen(9000);