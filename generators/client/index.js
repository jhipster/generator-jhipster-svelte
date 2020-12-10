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

		this.hipster = this.getHipster(this.baseName);
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
		return {
			askForClient: undefined,
			askForClientTheme: undefined,
			askForClientThemeVariant: undefined,
		};
	}

	get configuring() {
		const jhipsterDefault = super._configuring();
		return {
			overrideConfigOptions() {
				this.configOptions.clientFramework = this.clientFramework = 'svelte';
				this.configOptions.clientTheme = this.clientTheme = 'none';
				this.configOptions.clientThemeVariant = this.clientThemeVariant = '';
			},
			...jhipsterDefault,
		};
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

			updatePackageJson() {
				const packageTemplate = this.fs.read(this.templatePath('svelte/package.json'));
				this.fs.extendJSON(this.destinationPath('package.json'), JSON.parse(packageTemplate));
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
