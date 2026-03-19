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
                invitation: path.resolve(__dirname, 'wedding/invitation.html'),
                muslim: path.resolve(__dirname, 'wedding/invitation-1.html'),
                homeComing: path.resolve(__dirname, 'Home Coming/HomeCinvitation.html'),
                homeComingMuslim: path.resolve(__dirname, 'Home Coming/HomeCinvitation-1.html'),
            },
        },
        target: 'es2015',
        chunkSizeWarningLimit: 1000,
        cssCodeSplit: true,
    },
});