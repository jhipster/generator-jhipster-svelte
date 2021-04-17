module.exports = {
	ci: {
		// assert: {
		// 	preset: 'lighthouse:recommended',
		// },
		collect: {
			url: [
				'http://localhost:8080/',
				'http://localhost:8080/login',
				'http://localhost:8080/account/register',
				'http://localhost:8080/account/reset/init',
			],
			startServerCommand: 'docker-compose -f src/main/docker/app.yml up -d',
			startServerReadyTimeout: 120000,
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};
