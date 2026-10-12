import { sveltekit } from '@sveltejs/kit/vite';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				changeOrigin: true,
			},
			'/management': {
				target: 'http://localhost:8080',
				changeOrigin: true,
			},
		},
	},
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['jhipster-svelte-library'],
	},
	test: {
		alias: [
			{
				find: /^svelte$/,
				replacement: fileURLToPath(new URL('./node_modules/svelte/src/runtime/index.js', import.meta.url)),
			},
		],
		globals: true,
		environment: 'jsdom',
		setupFiles: './vitest-setup.js',
		css: true,
		reporters: ['verbose', 'vitest-sonar-reporter'],
		outputFile: 'target/test-results/js/sonar-report.xml',
		sonarReporterOptions: { silent: true },
		coverage: {
			reporter: ['text', 'html', 'lcov'],
			reportsDirectory: 'target/test-results/js/',
			exclude: ['target/'],
		},
	},
});
