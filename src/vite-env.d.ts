/// <reference types="vite/client" />
declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

interface ImportMetaEnv {
    readonly VITE_ACCOUNTS_API_URL: string
    readonly VITE_PRODUCTS_API_URL: string

    readonly VITE_ACCOUNTS_DASHBOARD_URL: string
    readonly VITE_PRODUCTS_DASHBOARD_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}