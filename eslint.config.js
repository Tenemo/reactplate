import eslint from '@eslint/js';
import vitestPlugin from '@vitest/eslint-plugin';
import { flatConfigs as importConfigs } from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import errorOnlyPlugin from 'eslint-plugin-only-error';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import securityPlugin from 'eslint-plugin-security';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint, { configs as tsConfigs } from 'typescript-eslint';

// To avoid wasting time with html-eslint in the future, it doesn't work with @typescript-eslint/parser
// https://github.com/yeonjuan/html-eslint/issues/87
// eslint-plugin-html should work when typescript will support flat config, currently it conflicts with parserOptions

const OFF = 0;
const ERROR = 2;

export default tseslint.config(
    eslint.configs.recommended,
    ...tsConfigs.strictTypeChecked,
    ...tsConfigs.stylisticTypeChecked,
    importConfigs.recommended,
    importConfigs.typescript,
    importConfigs.react,
    importConfigs.errors,
    importConfigs.warnings,
    prettierPluginRecommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    securityPlugin.configs.recommended,
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        ...reactHooksPlugin.configs['recommended-latest'],
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': jsxA11yPlugin,
            'only-error': errorOnlyPlugin,
            prettier: prettierPlugin,
            security: securityPlugin,
            'unused-imports': unusedImportsPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {}, // eslint-import-resolver-typescript
            },
        },
        languageOptions: {
            parserOptions: {
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                project: './tsconfig.json',
                ecmaVersion: 2021,
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
                ...globals.commonjs,
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        rules: {
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
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
            'arrow-parens': [ERROR, 'always', { requireForBlockBody: false }],
            'no-restricted-exports': OFF,
            'no-shadow': OFF, // duplicated by @typescript-eslint/no-shadow

            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
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
            // RTK Query suggests to use that
            // https://redux-toolkit.js.org/rtk-query/usage-with-typescript#typing-query-and-mutation-endpoints
            // https://stackoverflow.com/questions/74698932/rtk-query-eslint-gives-errors-typescript-eslint-no-invalid-void-type-if-query
            '@typescript-eslint/no-invalid-void-type': OFF,

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

            // eslint-plugin-unused-imports
            '@typescript-eslint/no-unused-vars': OFF,
            'unused-imports/no-unused-imports': ERROR,
            'unused-imports/no-unused-vars': [
                ERROR,
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
    {
        files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
        rules: {
            '@typescript-eslint/no-unsafe-assignment': OFF,
            '@typescript-eslint/no-unsafe-argument': OFF,
            '@typescript-eslint/no-unsafe-member-access': OFF,
            '@typescript-eslint/no-unsafe-call': OFF,
        },
    },
    {
        files: ['**/*.scss.d.ts'],
        rules: {
            'prettier/prettier': OFF,
            '@typescript-eslint/consistent-type-definitions': OFF,
            '@typescript-eslint/no-empty-object-type': OFF,
        },
    },
    {
        files: [
            '**/*.spec.tsx',
            '**/*.spec.js',
            '**/*.test.tsx',
            '**/*.test.js',
        ],
        plugins: {
            vitest: vitestPlugin,
        },
        rules: {
            ...vitestPlugin.configs.recommended.rules,
            'vitest/max-nested-describe': ['error', { max: 3 }],
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
);
