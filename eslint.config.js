import path from 'path';
import { fileURLToPath } from 'url';

// Bugged:
// https://github.com/import-js/eslint-plugin-import/issues/2556
// eslint-disable-next-line import/namespace
import { FlatCompat } from '@eslint/eslintrc';
import eslintJs from '@eslint/js';
// When flat config is supported, those should be used instead of strings:
// import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
// import typescriptPlugin from '@typescript-eslint/eslint-plugin';
// import jestPlugin from 'eslint-plugin-jest';
// import prettierPlugin from 'eslint-plugin-prettier';
// import importPlugin from 'eslint-plugin-import';
// import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
// import htmlPlugin from 'eslint-plugin-html'; // broken with @html-eslint as of 2023-11
// import typescriptParser from '@typescript-eslint/parser';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

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
            'prettier', // adds eslint-plugin-prettier
            'plugin:prettier/recommended',
            'plugin:react/recommended', // adds eslint-plugin-react, supports flat config, but has to be here to avoid plugin declaration conflicts
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

    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mjs'],
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
            'react-hooks': reactHooksPlugin,
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
        // I didn't find a way to apply an ignore pattern to JUST one compat.config spread,
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
    /*  ====== Other rules ====== */
    {
        files: ['*Reducer.ts'],
        rules: {
            'default-param-last': OFF,
        },
    },
    {
        files: ['*.scss.d.ts'],
        rules: {
            'prettier/prettier': OFF,
        },
    },
    {
        files: ['*.spec.tsx'],
        rules: {
            '@typescript-eslint/ban-ts-comment': OFF,
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
