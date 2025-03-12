/// <reference types="vite/client" />

declare const __BUILD_DATE__: string;

type ImportMetaEnv = {
    readonly VITE_SENTRY_DSN: string;
};

type ImportMeta = {
    readonly env: ImportMetaEnv;
};
