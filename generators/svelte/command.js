/**
 * @type {import('generator-jhipster').JHipsterCommandDefinition}
 */
const command = {
	options: {},
	configs: {
		jest: {
			cli: {
				description: 'Jest JavaScript unit testing framework',
				type: Boolean,
			},
			scope: 'blueprint',
		},
		swaggerUi: {
			cli: {
				description: 'Generate Swagger UI',
				type: Boolean,
			},
			scope: 'blueprint',
		},
	},
};

export default command;
