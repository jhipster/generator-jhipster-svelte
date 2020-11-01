const chalk = require('chalk');
const AppGenerator = require('generator-jhipster/generators/app');

const prompts = require('./prompts');
const blueprintPackageJson = require('../../package.json');

module.exports = class extends AppGenerator {
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
		this.enableTranslation = this.config.get('enableTranslation') || false;
	}

	get initializing() {
		const initPhaseFromJHipster = this._initializing();

		const jhipsterInitAppPhaseSteps = {
			displayLogo() {
				/* eslint-disable prettier/prettier */

				this.log('\n');
				this.log(
					`${chalk.green('        ██╗ ██╗   ██╗ ████████╗ ███████╗ ')}${chalk.keyword('orange')(
						'  ██████╗ '
					)}${chalk.green('████████╗ ████████╗ ███████╗')}`
				);
				this.log(
					`${chalk.green('        ██║ ██║   ██║ ╚══██╔══╝ ██╔═══██╗')}${chalk.keyword('orange')(
						' ██╔════╝ '
					)}${chalk.green('╚══██╔══╝ ██╔═════╝ ██╔═══██╗')}`
				);
				this.log(
					`${chalk.green('        ██║ ████████║    ██║    ███████╔╝')}${chalk.keyword('orange')(
						' ╚█████╗  '
					)}${chalk.green('   ██║    ██████╗   ███████╔╝')}`
				);
				this.log(
					`${chalk.green('  ██╗   ██║ ██╔═══██║    ██║    ██╔════╝ ')}${chalk.keyword('orange')(
						'  ╚═══██╗ '
					)}${chalk.green('   ██║    ██╔═══╝   ██╔══██║')}`
				);
				this.log(
					`${chalk.green('  ╚██████╔╝ ██║   ██║ ████████╗ ██║      ')}${chalk.keyword('orange')(
						' ██████╔╝ '
					)}${chalk.green('   ██║    ████████╗ ██║  ╚██╗')}`
				);
				this.log(
					`${chalk.green('   ╚═════╝  ╚═╝   ╚═╝ ╚═══════╝ ╚═╝      ')}${chalk.keyword('orange')(
						' ╚═════╝  '
					)}${chalk.green('   ╚═╝    ╚═══════╝ ╚═╝   ╚═╝')}\n`
				);
				this.log(chalk.white.bold('                            https://www.jhipster.tech\n'));
				this.log(chalk.white('Welcome to Svelte Hipster ') + chalk.yellow(`v${this.blueprintjs.version}`));
				this.log(chalk.white(`Application files will be generated in folder: ${chalk.yellow(process.cwd())}`));
				this.log(
					chalk.keyword('orange')(
						' _______________________________________________________________________________________________________________\n'
					)
				);
				this.log(
					chalk.white(`  If you find Svelte Hipster useful, consider sponsoring the project at
				${chalk.yellow('https://opencollective.com/generator-jhipster-svelte')}`)
				);
				this.log(
					chalk.green(
						' _______________________________________________________________________________________________________________\n'
					)
				);
			},
		};

		return Object.assign(initPhaseFromJHipster, jhipsterInitAppPhaseSteps);
	}

	get prompting() {
		const defaultPhaseFromJHipster = super._prompting();
		return {
			...defaultPhaseFromJHipster,
			askForApplicationType: prompts.askForApplicationType,
		};
	}

	get configuring() {
		const jhipsterDefault = super._configuring();

		return {
			setConfigOptions() {
				this.configOptions.enableTranslation = false;
			},
			...jhipsterDefault,
			askFori18n: undefined,
		};
	}

	get default() {
		const jhipsterDefault = super._default();
		return {
			overrideAppOptions() {
				this.enableTranslation = false;
			},
			...jhipsterDefault,
			askForTestOpts: prompts.askForTestOpts,
		};
	}

	get writing() {
		return super._writing();
	}

	get end() {
		return super._end();
	}
};
