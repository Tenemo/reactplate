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
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2018,
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
    plugins: [
        'import',
        '@typescript-eslint',
        'react',
        'jsx-a11y',
        'jsdoc',
        'jest',
        'react-hooks',
        'prettier'
    ],
    settings: {
        'import/resolver': {
            typescript: {},
        },
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
        'prettier/prettier': [
            1,
            {
                printWidth: 100,
                useTabs: false,
                semi: true,
                singleQuote: true,
                trailingComma: 'all',
            },
        ],

        // @typescript-eslint/no-unused-vars replaces this rule
        'no-unused-vars': 'off',

        'react/jsx-filename-extension': [
            2,
            {
                extensions: ['.jsx', '.tsx'],
            },
        ],
        'react/prop-types': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react/prefer-stateless-function': 'off',

        'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    },
};
