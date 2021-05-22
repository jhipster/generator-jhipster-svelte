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
				`This is a JHipster blueprint and should be used like ${chalk.yellow('jhipster --blueprints svelte')}`
			);
		}

		this.configOptions = jhContext.configOptions || {};
		this.blueprintjs = blueprintPackageJson;
	}

	get initializing() {
		return super._initializing();
	}

	// eslint-disable-next-line class-methods-use-this
	get prompting() {
		return {
			askForModuleName: undefined,
			askForClient: undefined,
			askForAdminUi: undefined,
			askForClientTheme: undefined,
			askForClientThemeVariant: undefined,
			overrideConfigOptions() {
				this.configOptions.clientFramework =
					this.jhipsterConfig.clientFramework =
					this.clientFramework =
						'svelte';
				this.configOptions.clientTheme = this.clientTheme = 'none';
				this.configOptions.clientThemeVariant = this.clientThemeVariant = '';
				this.configOptions.withAdminUi = this.askForAdminUi = '';
			},
		};
	}

	get configuring() {
		return super._configuring();
	}

	get composing() {
		return super._composing();
	}

	get loading() {
		const jhipsterDefault = super._loading();
		return {
			...jhipsterDefault,
			loadPackageJson() {
				// use different strategy to update dependabot packages
			},
		};
	}

	get preparing() {
		return super._preparing();
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

	// eslint-disable-next-line class-methods-use-this
	get postWriting() {
		// override to not include package scripts
		return {};
	}

	get end() {
		const jhipsterDefault = super._end();
		return {
			...jhipsterDefault,
			end() {
				const logMsg = `Start frontend development server with: ${chalk.yellow.bold(
					`${this.clientPackageManager} start`
				)}\n`;

				this.log(chalk.green(logMsg));
				if (!this.options.skipInstall) {
					this.spawnCommandSync(this.clientPackageManager, ['run', 'cleanup']);
				}
			},
		};
	}
};
