const chalk = require('chalk');
const AppGenerator = require('generator-jhipster/generators/app');

const prompts = require('./prompts');
const blueprintPackageJson = require('../../package.json');

module.exports = class extends AppGenerator {
	constructor(args, opts) {
		super(args, { ...opts, fromBlueprint: true });

		this.blueprintjs = blueprintPackageJson;
		this.skipServer = this.config.get('skipServer') || false;

		this.option('swagger-ui', {
			desc: 'Generate Swagger UI',
			type: Boolean,
			defaults: false,
		});

		if (!this.blueprintConfig) {
			this.blueprintConfig = {};
		}

		if (this.options.swaggerUi) {
			this.blueprintConfig.swaggerUi = this.options.swaggerUi;
		} else {
			this.blueprintConfig.swaggerUi = false;
		}
	}

	_initializing() {
		const initPhaseFromJHipster = super._initializing();

		return {
			...initPhaseFromJHipster,
			// prettier-ignore
			displayLogo() {
				/* eslint-disable prettier/prettier */
				this.log('\n');

				this.log(`  ${chalk.cyan('      .d88888b.                     .d88888b.')}`);
				this.log(`  ${chalk.cyan('    d888888888888b.             .d888888888888d')}`);
				this.log(`  ${chalk.cyan('   888888888888888888.       .888888888888888888')}`);
				this.log(`  ${chalk.cyan('  8888888888888888888888   8888888888888888888888')}`);
				this.log(`  ${chalk.cyan('  88888888888888888888888888888888888888888888888')}`);
				this.log(`  ${chalk.cyan('  8888888888888888888888   8888888888888888888888')}`);
				this.log(`  ${chalk.cyan('   888888888888888888"       "888888888888888888')}`);
				this.log(`  ${chalk.cyan('    Y8888888888888P"            "d888888888888P')}`);
				this.log(`  ${chalk.cyan('      "Y888P8P"                     "Y888P8P"')}\n`);

				this.log(chalk.white.bold('             https://www.jhipster.tech\n'));
				this.log(chalk.white('Welcome to JHipster Svelte ') + chalk.yellow(`v${this.blueprintjs.version}`));
				this.log(chalk.white(`Application files will be generated in folder: ${chalk.yellow(process.cwd())}`));
				this.log(
					chalk.keyword('orange')(
						' _________________________________________________________________________________________________________________________\n'
					)
				);
				this.log(
					chalk.white(
						`  If you find JHipster Svelte useful, support with a star and follow ${chalk.yellow(
							'https://github.com/jhipster/generator-jhipster-svelte'
						)}`
					)
				);
				this.log(
					chalk.green(
						' _________________________________________________________________________________________________________________________\n'
					)
				);
			},
		};
	}

	get initializing() {
		return this._initializing();
	}

	_prompting() {
		const defaultPhaseFromJHipster = super._prompting();
		return {
			...defaultPhaseFromJHipster,
			askForApplicationType: prompts.askForApplicationType,
		};
	}

	get prompting() {
		return this._prompting();
	}

	_configuring() {
		return {
			...super._configuring(),
			config() {
				this.jhipsterContext.configOptions.oldSvelteBlueprintVersion = this.blueprintConfig.version;
				this.blueprintConfig.version = this.blueprintjs.version;
			},
		};
	}

	get configuring() {
		return this._configuring();
	}

	_composing() {
		const jhipsterDefault = super._composing();
		return {
			...jhipsterDefault,
			askForTestOpts: prompts.askForTestOpts,
		};
	}

	get composing() {
		return this._composing();
	}

	_default() {
		return super._default();
	}

	get default() {
		return this._default();
	}

	_writing() {
		return super._writing();
	}

	get writing() {
		return this._writing();
	}

	_install() {
		return super._install();
	}

	get install() {
		return this._install();
	}

	_end() {
		return super._end();
	}

	get end() {
		return this._end();
	}
};
