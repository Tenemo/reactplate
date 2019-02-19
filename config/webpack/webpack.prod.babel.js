import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import commonConfig from './webpack.common.babel';
import packageJSON from '../../package.json';

export default commonConfig({
    mode: 'production',
    entry: ['@babel/polyfill', 'react', 'react-dom', path.join(process.cwd(), 'src/index')],
    optimization: {
        minimize: true,
        sideEffects: true,
        concatenateModules: true,
    },
    plugins: [...(process.env.ANALYZE && new BundleAnalyzerPlugin())],
    output: {
        filename: `${packageJSON.name}-${packageJSON.version}-[hash].min.js`,
        path: path.join(process.cwd(), 'dist'),
    },
});
