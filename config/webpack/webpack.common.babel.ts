import path from 'path';

import { DefinePlugin, Configuration } from 'webpack';

import packageJSON from '../../package.json';

export const commonConfig: Configuration = {
    entry: {
        [packageJSON.name]: [
            `core-js/stable`,
            `react`,
            `react-dom`,
            path.join(process.cwd(), `src/main`),
        ],
    },
    target: `web`,
    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                PORT: JSON.stringify(process.env.PORT),
                ANALYZE: JSON.stringify(process.env.ANALYZE),
                BUILD_DATE: JSON.stringify(
                    new Date().toISOString().split('T')[0],
                ),
            },
        }),
    ],
    resolve: {
        extensions: [`.ts`, `.tsx`, `.js`, `.jsx`, `.css`, `.scss`],
    },
    performance: {
        hints: false,
    },
};
