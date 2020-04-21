module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'plugin:jest/recommended',
        'plugin:jsx-a11y/recommended',
        'airbnb',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    plugins: [
        'import',
        '@typescript-eslint',
        'html',
        'react',
        'jsx-a11y',
        'jest',
        'react-hooks',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
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
        quotes: ['error', 'backtick'],
        'prettier/prettier': [
            'error',
            {
                useTabs: false,
                semi: true,
                singleQuote: true,
                jsxSingleQuote: false,
                trailingComma: 'all',
                arrowParens: 'avoid',
            },
        ],
        // @typescript-eslint/no-unused-vars replaces this rule
        'no-unused-vars': 'off',
        'arrow-parens': ['error', 'as-needed', { requireForBlockBody: false }],

        'react/prop-types': 'off',
        'react/prefer-stateless-function': 'off',
        'react/destructuring-assignment': ['error', 'always'],
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: ['.jsx', '.tsx'],
            },
        ],
        'react/jsx-sort-props': 'error',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-one-expression-per-line': [
            'error',
            { allow: 'single-child' },
        ],

        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',

        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        'import/prefer-default-export': 'off',

        '@typescript-eslint/explicit-function-return-type': [
            'warn',
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: true,
            },
        ],

        'jsx-a11y/label-has-for': ['error', { required: { every: ['id'] } }],
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': [
                    'warn',
                    {
                        allowExpressions: true,
                        allowTypedFunctionExpressions: true,
                    },
                ],
            },
        },
    ],
};
