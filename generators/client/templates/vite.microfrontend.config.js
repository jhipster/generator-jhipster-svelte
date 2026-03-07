import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { federation } from '@originjs/vite-plugin-federation';

export default defineConfig({
	plugins: [
		svelte(),
		federation({
			name: '<%= remoteName || "remote-app" %>',
			filename: 'remoteEntry.js',
			exposes: {
				'./RemoteComponent': './src/app/lib/microfrontend/RemoteComponent.svelte',
			},
			shared: ['svelte', 'svelte/store', 'svelte/motion', 'svelte/transition', 'svelte/easing'],
		}),
	],
	build: {
		target: 'esnext',
		minify: false,
		cssTarget: 'esnext',
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext',
		},
	},
	server: {
		port: 5001,
	},
});
