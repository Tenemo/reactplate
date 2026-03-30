import { Schema, ValidateEnv } from '@julr/vite-plugin-validate-env';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import { patchCssModules } from 'vite-css-modules';

const manualChunks = (id: string): string | null => {
    if (id.includes('node_modules')) {
        return 'vendor';
    }

    return null;
};

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const analyze = env.ANALYZE === 'true';
    return {
        base: './',
        plugins: [
            ValidateEnv({
                VITE_SENTRY_DSN: Schema.string.optional(),
            }),
            patchCssModules({
                generateSourceTypes: true,
            }),
            analyze &&
                visualizer({
                    open: true,
                    filename: 'dist/stats.html',
                }),
        ],
        css: {
            devSourcemap: true,
            preprocessorOptions: {
                scss: {},
            },
            modules: {
                localsConvention: 'camelCase',
                generateScopedName:
                    mode === 'development' ? '[path]_[local]' : '[hash:base64]',
            },
        },
        resolve: {
            tsconfigPaths: true,
        },
        server: {
            port: 3000,
            strictPort: true,
            open: true,
        },
        build: {
            sourcemap: false,
            outDir: 'dist',
            cssCodeSplit: true,
            target: browserslistToEsbuild(),
            rollupOptions: {
                output: {
                    manualChunks,
                },
            },
        },
    };
});
