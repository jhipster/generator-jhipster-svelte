const chalk = require('chalk');
const os = require('os');
const ServerGenerator = require('generator-jhipster/generators/server');

const { writeFiles } = require('./files');
const blueprintPackageJson = require('../../package.json');

module.exports = class extends ServerGenerator {
	constructor(args, opts) {
		super(args, { ...opts, fromBlueprint: true });

		const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

		if (!jhContext) {
			this.error(
				`This is a JHipster blueprint and should be used like ${chalk.yellow('jhipster --blueprints svelte')} `
			);
		}

		this.blueprintjs = blueprintPackageJson;
		this.skipServer = this.config.get('skipServer') || false;
	}

	get initializing() {
		const phaseFromJHipster = super._initializing();
		return {
			...phaseFromJHipster,
			displayLogo() {
				// don't overwrite logo
			},
			initializeBlueprintOptions() {
				if (this.options.swaggerUi) {
					this.swaggerUi = this.options.swaggerUi;
				} else if (this.blueprintConfig) {
					this.swaggerUi = this.blueprintConfig.swaggerUi;
				} else {
					this.swaggerUi = false;
				}
			},
		};
	}

	// eslint-disable-next-line class-methods-use-this
	get prompting() {
		return super._prompting();
	}

	get configuring() {
		return super._configuring();
	}

	get composing() {
		return super._composing();
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
		const phaseFromJHipster = super._writing();
		if (this.skipServer) {
			return {};
		}
		return {
			...phaseFromJHipster,
			writeAdditionalFile() {
				writeFiles.call(this);
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
				let executable = 'mvnw';
				if (this.buildTool === 'gradle') {
					executable = 'gradlew';
				}

				const logMsgComment =
					os.platform() === 'win32'
						? ` (${chalk.yellow.bold(executable)} if using Windows Command Prompt)`
						: '';

				this.log(
					chalk.green(
						`\nStart backend Spring Boot application with : ${chalk.yellow.bold(
							`./${executable}`
						)}${logMsgComment}`
					)
				);
			},
		};
	}
};
