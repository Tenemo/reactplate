import path from 'path';
import { fileURLToPath } from 'url';

// Bugged: https://github.com/import-js/eslint-plugin-import/issues/2556
// eslint-disable-next-line import/namespace
import { FlatCompat } from '@eslint/eslintrc';
import eslintJs from '@eslint/js';
// When flat config is supported, actual imports should be used instead of strings:
// import typescriptPlugin from '@typescript-eslint/eslint-plugin'; // as of 2024-02-11 no flat config support but very close! v.7, almost out for release, supports it https://github.com/typescript-eslint/typescript-eslint/issues/8420
// import typescriptParser from '@typescript-eslint/parser'; // ^ same as above
// import jestPlugin from 'eslint-plugin-jest'; // as of 2024-02-11 no flat config support https://github.com/jest-community/eslint-plugin-jest/issues/1408
// import importPlugin from 'eslint-plugin-import'; // as of 2024-02-11 no flat config support https://github.com/import-js/eslint-plugin-import/issues/2556
// import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'; // as of 2024-02-11 no flat config support https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/pull/891
import errorOnlyPlugin from 'eslint-plugin-only-error';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
// Doesn't work otherwise
// eslint-disable-next-line import/extensions
import reactPluginRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import securityPlugin from 'eslint-plugin-security';
import globals from 'globals';

// To avoid wasting time with html-eslint in the future, it doesn't work with @typescript-eslint/parser
// https://github.com/yeonjuan/html-eslint/issues/87
// eslint-plugin-html should work when typescript will support flat config, currently it conflicts with parserOptions

const OFF = 0;
const ERROR = 2;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default [
    ...compat.config({
        extends: [
            'plugin:import/errors', // adds eslint-plugin-import
            'plugin:import/warnings',
            'plugin:jest/recommended', // adds eslint-plugin-jest
            'plugin:jsx-a11y/strict', // adds eslint-plugin-jsx-a11y
        ],
        parser: '@typescript-eslint/parser',
        parserOptions: {
            parser: '@typescript-eslint/parser',
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true,
            },
            project: './tsconfig.json',
            ecmaVersion: 2021,
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {}, // eslint-import-resolver-typescript
            },
        },
    }),
    securityPlugin.configs.recommended,
    prettierPluginRecommended,
    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mjs'],
        ...reactPluginRecommended,
        rules: {
            ...eslintJs.configs.recommended.rules,
            'arrow-parens': [ERROR, 'always', { requireForBlockBody: false }],
            'no-restricted-exports': OFF,
            'no-shadow': OFF, // duplicated by @typescript-eslint/no-shadow

            // @typescript-eslint/eslint-plugin
            '@typescript-eslint/no-use-before-define': ERROR,
            '@typescript-eslint/no-shadow': ERROR,
            '@typescript-eslint/explicit-module-boundary-types': ERROR,
            '@typescript-eslint/unbound-method': ERROR,
            '@typescript-eslint/explicit-function-return-type': [
                ERROR,
                {
                    allowExpressions: true,
                    allowTypedFunctionExpressions: true,
                },
            ],
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

            // eslint-plugin-prettier
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

            // eslint-plugin-react
            'react/destructuring-assignment': [ERROR, 'always'],
            'react/jsx-filename-extension': [
                ERROR,
                {
                    extensions: ['.tsx'],
                },
            ],
            'react/jsx-sort-props': ERROR,
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

            // eslint-plugin-react-hooks
            'react-hooks/rules-of-hooks': ERROR,
            'react-hooks/exhaustive-deps': ERROR,

            // eslint-plugin-jsx-a11y
            'jsx-a11y/label-has-for': [ERROR, { required: { every: ['id'] } }],

            // eslint-plugin-import
            'import/no-extraneous-dependencies': [
                ERROR,
                { devDependencies: true },
            ],
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
            'import/order': [
                'error',
                {
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                    pathGroupsExcludedImportTypes: ['builtin'],
                },
            ],

            // eslint-plugin-jest
            'jest/no-commented-out-tests': ERROR,
        },
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'only-error': errorOnlyPlugin,
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
                ...globals.commonjs,
                ...globals.jest,
            },
        },
    },
    ...compat.config({
        extends: [
            'plugin:@typescript-eslint/recommended-requiring-type-checking', // adds @typescript-eslint plugin
            'plugin:@typescript-eslint/stylistic-type-checked',
            'plugin:import/typescript',
        ],
        // I haven't found a way to apply an ignore pattern to JUST one compat.config spread,
        // ignorePatterns: ["**/*.mjs", "**/*.js"] makes it global
        // so I'm just disabling rules that don't work with .mjs and .js files
        overrides: [
            {
                files: ['**/*.mjs', '**/*.js', '**/*.jsx', 'eslint.config.mjs'],
                rules: {
                    '@typescript-eslint/no-unsafe-assignment': OFF,
                    '@typescript-eslint/no-unsafe-member-access': OFF,
                    '@typescript-eslint/no-unsafe-call': OFF,
                },
            },
        ],
    }),
    {
        files: ['**/*.scss.d.ts'],
        rules: {
            'prettier/prettier': OFF,
        },
    },
    {
        files: ['**/*.spec.tsx'],
        rules: {
            '@typescript-eslint/ban-ts-comment': OFF,
            '@typescript-eslint/no-unsafe-return': OFF,
        },
    },
    {
        ignores: [
            'node_modules/*',
            '.tmp/*',
            'coverage/*',
            'dist/*',
            '**/*.html',
        ],
    },
];
