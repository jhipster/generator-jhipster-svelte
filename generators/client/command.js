const command = {
	configs: {},
	options: {
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
