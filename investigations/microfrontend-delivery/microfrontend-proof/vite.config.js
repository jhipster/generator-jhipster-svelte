import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'node:url';

export default defineConfig({
	plugins: [svelte({ configFile: false })],
	build: {
		outDir: fileURLToPath(new URL('../src/main/webapp/static/microfrontend-proof', import.meta.url)),
		emptyOutDir: false,
		lib: {
			entry: fileURLToPath(new URL('./entry.js', import.meta.url)),
			formats: ['es'],
			fileName: () => 'remote.js',
		},
	},
});
