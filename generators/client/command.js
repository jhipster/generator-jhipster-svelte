
const command = {
	configs: {
		microfrontend: {
			description: 'Enable microfrontend support',
			cli: {
				type: Boolean,
			},
			default: false,
			scope: 'storage',
		},
		microfrontendPreview: {
			description: 'Enable microfrontend preview support',
			cli: {
				type: Boolean,
				hide: true,
			},
			default: false,
			scope: 'storage',
		},
	},
	options: {},
};

export default command;
