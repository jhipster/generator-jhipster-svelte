const microfrontendsToPromptValue = answer =>
	Array.isArray(answer) ? answer.map(({ baseName }) => baseName).join(',') : answer;

const promptValueToMicrofrontends = answer =>
	answer
		? answer
				.split(',')
				.map(baseName => baseName.trim())
				.filter(Boolean)
				.map(baseName => ({ baseName }))
		: [];

const command = {
	configs: {
		microfrontend: {
			description: 'Enable microfrontend support',
			cli: {
				type: Boolean,
			},
			prompt: ({ jhipsterConfigWithDefaults: config }) => ({
				type: 'confirm',
				when: answers => (answers.applicationType ?? config.applicationType) === 'gateway',
				message: 'Do you want to enable microfrontends?',
				default: false,
			}),
			scope: 'storage',
		},
		microfrontends: {
			description: 'Microfrontends to load',
			cli: {
				type: promptValueToMicrofrontends,
			},
			prompt: ({ jhipsterConfigWithDefaults: config }) => ({
				when: answers => {
					const askForMicrofrontends = Boolean(
						(answers.microfrontend ?? config.microfrontend) &&
							(answers.applicationType ?? config.applicationType) === 'gateway',
					);
					if (askForMicrofrontends && answers.microfrontends) {
						answers.microfrontends = microfrontendsToPromptValue(answers.microfrontends);
					} else {
						answers.microfrontends = [];
					}
					return askForMicrofrontends;
				},
				type: 'input',
				message: 'Comma separated microfrontend app names.',
				filter: promptValueToMicrofrontends,
				transformer: microfrontendsToPromptValue,
			}),
			scope: 'storage',
		},
	},
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
