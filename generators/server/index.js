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

	_initializing() {
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

	get initializing() {
		return this._initializing();
	}

	_prompting() {
		return super._prompting();
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

	_composing() {
		return super._composing();
	}

	get composing() {
		return this._composing();
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
		const phaseFromJHipster = super._writing();
		return {
			...phaseFromJHipster,
			writeAdditionalFile() {
				if (!this.skipServer) {
					writeFiles.call(this);
				}
			},
			updatePackageJson() {
				if (!this.skipServer) {
					const packageTemplate = this.fs.read(this.templatePath('package.json'));
					this.fs.extendJSON(this.destinationPath('package.json'), JSON.parse(packageTemplate));
				}
			},
		};
	}

	// eslint-disable-next-line class-methods-use-this
	get writing() {
		return this._writing();
	}

	_postWriting() {
		// override to not include package scripts
		return {
			packageJsonScripts() {
				const packageJsonConfigStorage = this.packageJson.createStorage('config').createProxy();
				packageJsonConfigStorage.backend_port = this.gatewayServerPort || this.serverPort;
				packageJsonConfigStorage.packaging = this.defaultPackaging;
				packageJsonConfigStorage.default_environment = this.defaultEnvironment;
			},
		};
	}

	// eslint-disable-next-line class-methods-use-this
	get postWriting() {
		return this._postWriting();
	}

	_end() {
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

	get end() {
		return this._end();
	}
};
