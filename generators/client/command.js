import { asCommand } from 'generator-jhipster';

export default asCommand({
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
		testFramework: {
			description: 'E2E testing framework to use',
			type: String,
			scope: 'blueprint',
		},
	},
});
