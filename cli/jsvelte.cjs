#!/usr/bin/env node

const { dirname } = require('path');
const { version } = require('../package.json');

const packagePath = dirname(__dirname);

(async () => {
	/* eslint-disable import/no-unresolved */
	const { runJHipster, done, logger } = await import('generator-jhipster/cli');
	/* eslint-disable import/extensions */
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
			/* eslint-disable no-console */
			console.log(getLogo());
		},
		lookups: [{ packagePaths: [packagePath], lookups: ['generators'] }],
	}).catch(done);

	process.on('unhandledRejection', up => {
		logger.error('Unhandled promise rejection at:');
		logger.fatal(up);
	});
})();
