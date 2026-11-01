const command = {
	configs: {},
	options: {
		h2Console: {
			description: 'Enable H2 database web console in development profile',
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
