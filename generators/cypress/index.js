/* eslint-disable class-methods-use-this */
const chalk = require('chalk');
const CypressGenerator = require('generator-jhipster/generators/cypress');

const blueprintPackageJson = require('../../package.json');

module.exports = class extends CypressGenerator {
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
		this.cypressCoverage = this.config.get('cypressCoverage') || false;
	}

	get initializing() {
		return {};
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
		return {};
	}

	get loading() {
		return {};
	}

	get preparing() {
		return {};
	}

	get default() {
		return {};
	}

	get writing() {
		return {};
	}

	get postWriting() {
		return {};
	}
};
