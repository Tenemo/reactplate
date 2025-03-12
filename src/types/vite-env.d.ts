/// <reference types="vite/client" />

import type { ImportMetaEnv as OriginalImportMetaEnv } from 'vite';

declare const __BUILD_DATE__: string;

// The documented way of doing this (https://vite.dev/guide/env-and-mode.html#intellisense-for-typescript)
// does not work as of 2025-03-12.
declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface ImportMetaEnv extends OriginalImportMetaEnv {
        readonly VITE_SENTRY_DSN: string;
    }
}
