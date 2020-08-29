const chalk = require('chalk');
const ClientGenerator = require('generator-jhipster/generators/client');

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
		this.clientTheme = this.config.get('clientTheme') || 'none';
		this.clientThemeVariant = this.config.get('clientThemeVariant') || '';
		// This sets up options for this sub generator and is being reused from JHipster
		jhContext.setupClientOptions(this, jhContext);
	}

	get initializing() {
		return super._initializing();
	}

	get prompting() {
		return super._prompting();
	}

	get configuring() {
		return super._configuring();
	}

	get default() {
		return super._default();
	}

	get writing() {
		return super._writing();
	}

	get install() {
		return super._install();
	}

	get end() {
		return super._end();
	}
};
