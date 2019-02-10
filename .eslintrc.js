const fs = require('fs');

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/react',
        'plugin:react/recommended',
        'plugin:jest/recommended',
        'plugin:jsdoc/recommended',
        'plugin:jsx-a11y/recommended',
        'airbnb',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true,
    },
    globals: {
        shallow: true,
        render: true,
        mount: true,
    },
    plugins: ['@typescript-eslint', 'react', 'prettier', 'jsx-a11y', 'jsdoc', 'jest'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
    rules: {
        'prettier/prettier': [1, prettierOptions],

        'no-unused-vars': 1,

        // redundant with no-unused-vars https://github.com/typescript-eslint/typescript-eslint/issues/122
        '@typescript-eslint/no-unused-vars': 0,

        'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],

        'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    },
};
