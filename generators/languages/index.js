const chalk = require('chalk');
const LanguagesGenerator = require('generator-jhipster/generators/languages');

const blueprintPackageJson = require('../../package.json');

module.exports = class extends LanguagesGenerator {
	constructor(args, opts) {
		super(args, { ...opts, fromBlueprint: true });

		const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

		if (!jhContext) {
			this.error(
				`This is a JHipster blueprint and should be used only like ${chalk.yellow(
					'jhipster --blueprints svelte'
				)} or using cli ${chalk.yellow('shipster')}`
			);
		}

		this.blueprintjs = blueprintPackageJson;
		this.enableTranslation = this.config.get('enableTranslation') || false;
	}

	get initializing() {
		return super._initializing();
	}

	get prompting() {
		const defaultPhaseFromJHipster = super._prompting();
		return {
			...defaultPhaseFromJHipster,
			askI18n: undefined,
			askForLanguages: undefined,
			overrideConfigOptions() {
				this.enableTranslation = this.jhipsterConfig.enableTranslation = false;
				this.languages = this.jhipsterConfig.languages = ['en'];
			},
		};
	}

	get configuring() {
		return super._configuring();
	}

	get loading() {
		return super._loading();
	}

	get preparing() {
		return super._preparing();
	}

	get default() {
		return super._default();
	}

	// eslint-disable-next-line class-methods-use-this
	get writing() {
		// we don't yet support i18n
		return {};
	}
};
