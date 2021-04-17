module.exports = {
	ci: {
		// assert: {
		// 	preset: 'lighthouse:recommended',
		// },
		collect: {
			url: [
				'http://localhost:8080/',
				'http://localhost:8080/admin/user-management',
				'http://localhost:8080/admin/user-management/new',
				'http://localhost:8080/admin/user-management/admin/view',
				'http://localhost:8080/account/password',
				'http://localhost:8080/account/settings',
			],
			// startServerCommand: 'docker-compose -f src/main/docker/app.yml up -d',
			// startServerReadyTimeout: 120000,
			puppeteerScript: './puppeteer-auth.js',
			puppeteerLaunchOptions: {
				defaultViewport: null,
				args: ['--disable-gpu --window-size=1920,1080', '--no-sandbox'],
				headless: true,
			},
			isSinglePageApplication: true,
			settings: {
				disableStorageReset: true,
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};
