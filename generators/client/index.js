const chalk = require('chalk');
const ClientGenerator = require('generator-jhipster/generators/client');
const writeFiles = require('./files').writeFiles;
const blueprintPackageJson = require('../../package.json');

module.exports = class extends ClientGenerator {
	constructor(args, opts) {
		super(args, { ...opts, fromBlueprint: true });

		const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

		if (!jhContext) {
			this.error(
				`This is a JHipster blueprint and should be used only like ${chalk.yellow(
					'jhipster --blueprints svelte'
				)}`
			);
		}

		this.configOptions = jhContext.configOptions || {};
		this.blueprintjs = blueprintPackageJson;
		this.clientTheme = this.config.get('clientTheme') || 'none';
		this.clientThemeVariant = this.config.get('clientThemeVariant') || '';

		// This sets up options for this sub generator and is being reused from JHipster
		jhContext.setupClientOptions(this, jhContext);
	}

	get initializing() {
		return super._initializing();
	}

	// eslint-disable-next-line class-methods-use-this
	get prompting() {
		this.jhipsterConfig.clientFramework = this.configOptions.clientFramework = this.clientFramework = 'svelte';
		this.jhipsterConfig.clientTheme = this.configOptions.clientTheme = this.clientTheme;
		this.jhipsterConfig.clientThemeVariant = this.configOptions.clientThemeVariant = this.clientThemeVariant;
		return {
			askForClient: undefined,
			askForClientTheme: undefined,
			askForClientThemeVariant: undefined,
		};
	}

	get configuring() {
		return super._configuring();
	}

	get default() {
		return super._default();
	}

	// eslint-disable-next-line class-methods-use-this
	get writing() {
		return {
			writeAdditionalFile() {
				writeFiles.call(this);
			},
		};
	}

	get install() {
		return super._install();
	}

	get end() {
		return super._end();
	}
};
