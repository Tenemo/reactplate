import eslint from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import vitestPlugin from '@vitest/eslint-plugin';
import { defineConfig } from 'eslint/config';
import { flatConfigs as importConfigs } from 'eslint-plugin-import-x';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import securityPlugin from 'eslint-plugin-security';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';
import { configs as tsConfigs } from 'typescript-eslint';

// To avoid wasting time with html-eslint in the future, it doesn't work with @typescript-eslint/parser
// https://github.com/yeonjuan/html-eslint/issues/87
// eslint-plugin-html should work when typescript will support flat config, currently it conflicts with parserOptions

const OFF = 0;
const ERROR = 2;

export default defineConfig(
    eslint.configs.recommended,
    ...tsConfigs.strictTypeChecked,
    ...tsConfigs.stylisticTypeChecked,
    importConfigs.recommended,
    importConfigs.typescript,
    importConfigs.react,
    importConfigs.errors,
    importConfigs.warnings,
    eslintReact.configs['recommended-type-checked'],
    prettierPluginRecommended,
    securityPlugin.configs.recommended,
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: {
            perfectionist: perfectionistPlugin,
            prettier: prettierPlugin,
            security: securityPlugin,
            'unused-imports': unusedImportsPlugin,
        },
        settings: {
            'react-x': {
                version: 'detect',
                importSource: 'react',
                polymorphicPropName: 'as',
            },
        },
        languageOptions: {
            parserOptions: {
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 2021,
                projectService: {
                    allowDefaultProject: ['*.js'],
                },
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

            // eslint-react
            '@eslint-react/prefer-destructuring-assignment': ERROR,
            '@eslint-react/no-missing-component-display-name': ERROR,
            '@eslint-react/exhaustive-deps': ERROR,
            '@eslint-react/rules-of-hooks': ERROR,

            // JSX sorting
            'perfectionist/sort-jsx-props': ERROR,

            // eslint-plugin-import
            'import-x/no-extraneous-dependencies': [
                ERROR,
                { devDependencies: true },
            ],
            'import-x/no-rename-default': OFF,
            'import-x/prefer-default-export': OFF,
            'import-x/extensions': [
                ERROR,
                'ignorePackages',
                {
                    js: 'never',
                    jsx: 'never',
                    ts: 'never',
                    tsx: 'never',
                },
            ],
            'import-x/order': [
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
            '@typescript-eslint/explicit-function-return-type': OFF,
            '@typescript-eslint/no-unsafe-assignment': OFF,
            '@typescript-eslint/no-unsafe-argument': OFF,
            '@typescript-eslint/no-unsafe-member-access': OFF,
            '@typescript-eslint/no-unsafe-call': OFF,
            '@typescript-eslint/no-unsafe-return': OFF,
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
            '@eslint-react/component-hook-factories': OFF,
        },
    },
    {
        files: ['src/utils/test-utils.tsx'],
        rules: {
            '@eslint-react/component-hook-factories': OFF,
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
