import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit(), tailwindcss()],
    server: {
        hmr: {
            overlay: true,
            clientPort: undefined
        },
        watch: {
            usePolling: false,
            ignored: ['**/node_modules/**', '**/.git/**']
        }
    },
    optimizeDeps: {
        exclude: ['@tailwindcss/vite']
    }
});