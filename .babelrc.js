const fs = require('fs');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const { baseUrl } = JSON.parse(
    fs.readFileSync('./tsconfig.json', 'utf8'),
).compilerOptions;

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                corejs: 3,
            },
        ],
        [
            '@babel/preset-react',
            {
                development: process.env.NODE_ENV === 'development',
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            'module-resolver',
            {
                extensions,
                root: [baseUrl],
            },
        ],
        '@babel/plugin-proposal-class-properties',
    ],
    ignore: ['node_modules'],
};
