const command = {
	configs: {
		prettierConfigFile: {
			description: 'Prettier configuration file',
			cli: {
				type: Boolean,
				hide: true,
			},
			configure: gen => {
				gen.prettierConfigFile = '.prettierrc';
			},
			scope: 'generator',
		},
		prettierTabWidth: {
			description: 'Default tab width for prettier',
			cli: {
				type: Number,
			},
			default: 4,
			scope: 'storage',
		},
	},
	options: {},
};

export default command;
