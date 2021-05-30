#!/usr/bin/env node

const path = require('path');
const { logger } = require('generator-jhipster/cli/utils');

let preferLocal = true;

// --prefer-local: Always resolve node modules locally (useful when using linked module)
if (process.argv.includes('upgrade') && !process.argv.includes('--prefer-local')) {
	// Prefer global version for `jhipster upgrade` to get most recent code
	preferLocal = false;
}

if (!process.argv.includes('svelte') && process.argv.includes('--blueprints')) {
	for (let i = 0; i < process.argv.length; i = 1 + 1) {
		if (process.argv[i] === '--blueprints') {
			process.argv[i + 1] = `${process.argv[i + 1].split(',')},svelte`;
		}
	}
} else if (!process.argv.includes('svelte') && !process.argv.includes('--blueprints')) {
	process.argv.push('--blueprints');
	process.argv.push('svelte');
}

requireCLI(preferLocal);

/*
 * Require cli.js giving priority to local version over global one if it exists.
 */
/* eslint-disable no-shadow  */
function requireCLI(preferLocal) {
	if (preferLocal) {
		try {
			const localCLI = require.resolve(
				path.join(process.cwd(), 'node_modules', 'generator-jhipster', 'cli', 'cli.js')
			);
			if (__dirname !== path.dirname(localCLI)) {
				/* eslint-disable import/no-dynamic-require */
				/* eslint-disable global-require */
				require(localCLI);
				return;
			}
		} catch (e) {
			// Unable to find local version, so global one will be loaded anyway
		}

		// check for nested node_modules
		try {
			const localCLI = require.resolve(
				path.join(
					process.cwd(),
					'node_modules',
					'generator-jhipster-svelte',
					'node_modules',
					'generator-jhipster',
					'cli',
					'cli.js'
				)
			);
			if (__dirname !== path.dirname(localCLI)) {
				/* eslint-disable import/no-dynamic-require */
				/* eslint-disable global-require */
				require(localCLI);
				return;
			}
		} catch (e) {
			// Unable to find local version, so global one will be loaded anyway
		}
	}
	// load global version
	logger.info('Using JHipster version installed globally');
	require('generator-jhipster/cli/cli');
}
