import { Schema, ValidateEnv } from '@julr/vite-plugin-validate-env';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const analyze = env.ANALYZE === 'true';
    return {
        plugins: [
            react(),
            tsconfigPaths(),
            ValidateEnv({
                VITE_SENTRY_DSN: Schema.string(),
            }),
            analyze &&
                visualizer({
                    open: true,
                    filename: 'dist/stats.html',
                }),
        ],
        define: {
            'process.env.NODE_ENV': JSON.stringify(mode),
            'process.env.BUILD_DATE': JSON.stringify(
                new Date().toISOString().split('T')[0],
            ),
        },
        css: {
            modules: {
                localsConvention: 'camelCase',
                generateScopedName:
                    mode === 'development' ? '[path]_[local]' : '[hash:base64]',
            },
        },
        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        build: {
            sourcemap: false,
            outDir: 'dist',
        },
    };
});
