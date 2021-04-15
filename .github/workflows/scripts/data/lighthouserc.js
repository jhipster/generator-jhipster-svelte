module.exports = {
	ci: {
		// assert: {
		// 	preset: 'lighthouse:recommended',
		// },
		collect: {
			url: ['http://localhost:8080/'],
			startServerCommand: 'docker-compose -f src/main/docker/app.yml up -d',
			startServerReadyTimeout: 120000,
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};
