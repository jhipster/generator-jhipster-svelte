#!/usr/bin/env node

const { dirname } = require('path');
const { version } = require('../package.json');

const packagePath = dirname(__dirname);

(async () => {
	const { runJHipster, done, logger } = await import('generator-jhipster/cli');
	const { getLogo } = await import('./logo.js');
	const blueprint = 'jsvelte';
	runJHipster({
		blueprint,
		executableVersion: version,
		defaultCommand: 'app',
		packagePath,
		blueprints: {
			'generator-jhipster-svelte': version,
		},
		printBlueprintLogo: () => {},
		printLogo: () => {
			console.log(getLogo());
		},
		lookups: [{ packagePaths: [packagePath], lookups: ['generators'] }],
	}).catch(done);

	process.on('unhandledRejection', up => {
		logger.error('Unhandled promise rejection at:');
		logger.fatal(up);
	});
})();
