import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                invitation: path.resolve(__dirname, 'invitation.html'),
            },
        },
        target: 'es2015',
        chunkSizeWarningLimit: 1000,
        cssCodeSplit: true,
    },
});