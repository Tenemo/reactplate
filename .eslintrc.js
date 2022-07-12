const OFF = 0;
const ERROR = 2;

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'plugin:jest/recommended',
        'plugin:jsx-a11y/strict',
        'airbnb',
        'airbnb/hooks',
        'prettier',
        'plugin:prettier/recommended',
    ],
    plugins: [
        '@typescript-eslint',
        'import',
        'prettier',
        'html',
        'react',
        'react-hooks',
        'jest',
        'jsx-a11y',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
            jsx: true,
        },
        extraFileExtensions: ['.html', '.cjs'],
    },
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true,
    },
    settings: {
        'import/resolver': {
            'babel-module': {},
            typescript: {},
        },
        react: {
            version: 'detect',
        },
    },
    rules: {
        quotes: OFF,
        'prettier/prettier': [
            ERROR,
            {
                useTabs: false,
                semi: true,
                singleQuote: true,
                jsxSingleQuote: false,
                trailingComma: 'all',
                arrowParens: 'always',
            },
        ],

        'no-unused-vars': OFF, // @typescript-eslint/no-unused-vars replaces this rule
        'arrow-parens': [ERROR, 'always', { requireForBlockBody: false }],
        'no-use-before-define': OFF, // @typescript-eslint/no-use-before-define replaces this rule
        'no-restricted-exports': OFF,
        'no-shadow': OFF, // https://github.com/typescript-eslint/tslint-to-eslint-config/issues/856

        'react/prop-types': OFF,
        'react/prefer-stateless-function': OFF,
        'react/destructuring-assignment': [ERROR, 'always'],
        'react/jsx-filename-extension': [
            ERROR,
            {
                extensions: ['.jsx', '.tsx'],
            },
        ],
        'react/jsx-sort-props': ERROR,
        'react/jsx-props-no-spreading': OFF,
        'react/jsx-one-expression-per-line': OFF,
        'react/static-property-placement': [ERROR, 'static public field'],
        'react/state-in-constructor': [ERROR, 'never'],
        'react/display-name': [
            ERROR,
            {
                ignoreTranspilerName: false,
            },
        ],
        'react/function-component-definition': [
            ERROR,
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],

        'react-hooks/rules-of-hooks': ERROR,
        'react-hooks/exhaustive-deps': ERROR,

        'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
        'import/prefer-default-export': OFF,
        'import/extensions': [
            ERROR,
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],

        'jsx-a11y/label-has-for': [ERROR, { required: { every: ['id'] } }],

        '@typescript-eslint/explicit-function-return-type': [
            ERROR,
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: true,
            },
        ],
        '@typescript-eslint/explicit-module-boundary-types': ERROR,
        '@typescript-eslint/no-unused-vars': ERROR,
        '@typescript-eslint/no-use-before-define': ERROR,
        '@typescript-eslint/unbound-method': ERROR,
        '@typescript-eslint/no-shadow': [ERROR],

        'jest/no-commented-out-tests': ERROR,
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': OFF,
            },
        },
        {
            files: '*Reducer.ts',
            rules: {
                'default-param-last': OFF,
            },
        },
        {
            files: '*.scss.d.ts',
            rules: {
                'prettier/prettier': OFF,
            },
        },
        {
            files: '*.spec.tsx',
            rules: {
                '@typescript-eslint/ban-ts-comment': OFF,
            },
        },
    ],
};
