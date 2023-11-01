import path from 'path';
import { fileURLToPath } from 'url';

// Bugged:
// https://github.com/import-js/eslint-plugin-import/issues/2556
// eslint-disable-next-line import/namespace
import { FlatCompat } from '@eslint/eslintrc';
import eslintJs from '@eslint/js';
import htmlParser from '@html-eslint/parser';
import typescriptParser from '@typescript-eslint/parser';
// When flat config is supported, those should be used instead of strings:
// import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
// import typescriptPlugin from '@typescript-eslint/eslint-plugin';
// import jestPlugin from 'eslint-plugin-jest';
// import prettierPlugin from 'eslint-plugin-prettier';
// import importPlugin from 'eslint-plugin-import';
// import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import htmlPlugin from 'eslint-plugin-html';
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
    /*  ====== HTML ====== */
    {
        files: ['*.html'],
        parser: htmlParser,
        parserOptions: {
            extraFileExtensions: ['.html'],
        },
        rules: {
            'no-console': ERROR,
        },
    },
    /*  ====== JavaScript && TypeScript ====== */
    ...compat.config({
        extends: [
            // airbnb config can be considered to be added back later, when properly supporting flat config
            // currently it results in conflicts
            'plugin:import/errors',
            'plugin:import/warnings',
            'plugin:jest/recommended',
            'plugin:jsx-a11y/strict',
            'prettier',
            'plugin:prettier/recommended',
            'plugin:react/recommended', // supports flat config, but has to be here to avoid erroring out on double plugin declaration
        ],
        parser: '@typescript-eslint/parser',
        parserOptions: {
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true,
            },
            project: './tsconfig.json',
            ecmaVersion: 2021,
            extraFileExtensions: ['.html'],
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {}, // eslint-import-resolver-typescript
            },
        },
        plugins: ['@html-eslint'],
        rules: {
            'no-console': ERROR,
        },
        overrides: [
            {
                files: ['*.html'],
                parser: '@html-eslint/parser',
                parserOptions: {
                    extraFileExtensions: ['.html'],
                },
                extends: ['plugin:@html-eslint/recommended'],
            },
        ],
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
                    extensions: [
                        // '.jsx', All components are expected to be TS-based
                        '.tsx',
                    ],
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
            html: htmlPlugin,
        },
        // jsx-a11y already added by plugin:jsx-a11y/strict extend
        // prettier already added by prettier extend
        // jest already added by plugin:jest/recommended extend
        // import already added by plugin:import extend
        // react already added by eslint-plugin-react/configs/recommended extend

        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        languageOptions: {
            // Why does it need to be a duplicate of what's already in compat.config? I would like to know as well.
            // For the time being, the same parser needs to be configured in both places.
            // Once everything switches to flat config, of course, this will stop being a problem.
            parser: typescriptParser,
            parserOptions: {
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                project: './tsconfig.json',
                ecmaVersion: 2021,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
                ...globals.commonjs,
                ...globals.jest,
            },
        },
    },

    /*  ====== TypeScript only ====== */
    // {
    // files: ['**/*.ts', '**/*.tsx'],
    // plugins: {},
    // "@typescript-eslint": typescriptPlugin already added by @typescript-eslint/recommended-requiring-type-checking
    // },
    ...compat.config({
        extends: [
            'plugin:@typescript-eslint/recommended-requiring-type-checking',
            'plugin:@typescript-eslint/stylistic-type-checked',
            'plugin:import/typescript',
        ],
        // parserOptions: {
        //     sourceType: 'module',
        //     ecmaFeatures: {
        //         jsx: true,
        //     },
        //     project: './tsconfig.json',
        //     ecmaVersion: 2021,
        // },
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
            // {
            //     files: ['*.html'],
            //     parser: '@html-eslint/parser',
            //     extends: ['plugin:@html-eslint/recommended'],
            //     rules: {
            //         'no-console': ERROR,
            //     },
            // },
        ],
    }),

    /*  ====== JavaScript only ====== */
    // {
    //     files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
    // },

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
        ignores: ['node_modules/*', '.tmp/*', 'coverage/*', 'dist/*'],
    },
];
