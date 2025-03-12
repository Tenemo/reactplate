import { readdirSync } from 'fs';
import path from 'path';

import { Schema, ValidateEnv } from '@julr/vite-plugin-validate-env';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import { patchCssModules } from 'vite-css-modules';
import tsconfigPaths from 'vite-tsconfig-paths';

// Automatically pick up all directories in the src/ directory and add them as aliases later
const absolutePathAliases: Record<string, string> = {};
const srcPath = path.resolve('./src/');
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map(
    (direct) => direct.name.replace(/(\.ts){1}(x?)/, ''),
);
srcRootContent.forEach((directory) => {
    // eslint-disable-next-line security/detect-object-injection
    absolutePathAliases[directory] = path.join(srcPath, directory);
});

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const analyze = env.ANALYZE === 'true';
    return {
        base: './',
        plugins: [
            react(),
            tsconfigPaths(),
            ValidateEnv({
                VITE_SENTRY_DSN: Schema.string(),
            }),
            patchCssModules(),
            analyze &&
                visualizer({
                    open: true,
                    filename: 'dist/stats.html',
                }),
        ],
        define: {
            __BUILD_DATE__: JSON.stringify(
                new Date().toISOString().split('T')[0],
            ),
        },
        css: {
            devSourcemap: true,
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
            modules: {
                localsConvention: 'camelCase',
                generateScopedName:
                    mode === 'development' ? '[path]_[local]' : '[hash:base64]',
            },
        },
        resolve: {
            alias: {
                ...absolutePathAliases,
            },
        },
        server: {
            port: 3000,
            strictPort: true,
            historyApiFallback: true,
            open: true,
        },
        build: {
            sourcemap: false,
            outDir: 'dist',
            cssCodeSplit: true,
        },
    };
});
