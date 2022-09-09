/* eslint-disable class-methods-use-this */
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

	_initializing() {
		return super._initializing();
	}

	get initializing() {
		return this._initializing();
	}

	_prompting() {
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

	get prompting() {
		return this._prompting();
	}

	_configuring() {
		return super._configuring();
	}

	get configuring() {
		return this._configuring();
	}

	_loading() {
		return super._loading();
	}

	get loading() {
		return this._loading();
	}

	_preparing() {
		return super._preparing();
	}

	get preparing() {
		return this._preparing();
	}

	_default() {
		return super._default();
	}

	get default() {
		return this._default();
	}

	_writing() {
		return {};
	}

	get writing() {
		return this._writing();
	}

	_postWriting() {
		return {};
	}

	get postWriting() {
		return this._postWriting();
	}
};
