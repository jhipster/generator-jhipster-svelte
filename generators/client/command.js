const command = {
	configs: {},
	options: {
		playwright: {
			description: 'Generate Playwright end-to-end tests alongside Cypress',
			type: Boolean,
			scope: 'blueprint',
		},
		jest: {
			description: 'Jest JavaScript unit testing framework',
			type: Boolean,
			scope: 'blueprint',
		},
		swaggerUi: {
			description: 'Generate Swagger UI',
			type: Boolean,
			scope: 'blueprint',
		},
	},
};

export default command;
