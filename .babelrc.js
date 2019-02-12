const fs = require('fs');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const { baseUrl } = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf8')).compilerOptions;

module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    plugins: [
        'react-hot-loader/babel',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-chaining',
        [
            'module-resolver',
            {
                extensions,
                root: [baseUrl],
            },
        ],
    ],
    ignore: ['node_modules'],
};