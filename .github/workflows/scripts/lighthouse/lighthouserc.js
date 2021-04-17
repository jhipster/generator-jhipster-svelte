module.exports = {
	ci: {
		assert: {
			preset: 'lighthouse:recommended',
			assertions: {
				'apple-touch-icon': 'off',
				'tap-targets': 'off',
				'unsized-images': 'off',
			},
		},
		collect: {
			url: [
				'http://localhost:8080/',
				'http://localhost:8080/login',
				'http://localhost:8080/account/register',
				'http://localhost:8080/account/reset/init',
			],
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};
