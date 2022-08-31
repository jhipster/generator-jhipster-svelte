const chalk = require('chalk');
const ClientGenerator = require('generator-jhipster/generators/client');
const constants = require('generator-jhipster/generators/generator-constants');
const writeFiles = require('./files').writeFiles;
const blueprintPackageJson = require('../../package.json');
const util = require('../util');

module.exports = class extends ClientGenerator {
	constructor(args, opts) {
		super(args, { ...opts, fromBlueprint: true });

		const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

		if (!jhContext) {
			this.error(
				`This is a JHipster blueprint and should be used like ${chalk.yellow('jhipster --blueprints svelte')}`
			);
		}

		this.blueprintjs = blueprintPackageJson;

		this.skipServer = this.config.get('skipServer') || false;
		this.skipClient = this.config.get('skipClient') || false;
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
			cleanup() {
				if (util.isVersionLessThan(this, '0.10.0')) {
					this.removeFile(`${constants.ANGULAR_DIR}/lib/admin/user-management/user-delete-modal.svelte`);
					this.removeFile(`cypress.json`);
					util.moveFile(
						this,
						`${constants.ANGULAR_DIR}/routes/__error.svelte`,
						`${constants.ANGULAR_DIR}/routes/+error.svelte`
					);
					util.moveFile(
						this,
						`${constants.ANGULAR_DIR}/routes/__layout.svelte`,
						`${constants.ANGULAR_DIR}/routes/+layout.svelte`
					);
					util.moveFile(
						this,
						`${constants.ANGULAR_DIR}/routes/index.svelte`,
						`${constants.ANGULAR_DIR}/routes/+page.svelte`
					);
					util.moveFile(
						this,
						`${constants.ANGULAR_DIR}/routes/admin/__layout.svelte`,
						`${constants.ANGULAR_DIR}/routes/admin/+layout.svelte`
					);

					util.moveFile(
						this,
						`${constants.ANGULAR_DIR}/routes/admin/logger.svelte`,
						`${constants.ANGULAR_DIR}/routes/admin/logger/+page.svelte`
					);

					if (this.blueprintConfig.swaggerUi) {
						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/admin/docs.svelte`,
							`${constants.ANGULAR_DIR}/routes/admin/docs/+page.svelte`
						);
					}
					if (this.applicationType === 'gateway') {
						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/admin/gateway.svelte`,
							`${constants.ANGULAR_DIR}/routes/admin/gateway/+page.svelte`
						);
					}
					if (this.authenticationType !== 'oauth2') {
						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/login.svelte`,
							`${constants.ANGULAR_DIR}/routes/login/+page.svelte`
						);
					}
					if (!this.skipUserManagement && this.authenticationType !== 'oauth2') {
						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/account/activate.svelte`,
							`${constants.ANGULAR_DIR}/routes/account/activate/+page.svelte`
						);
						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/account/password.svelte`,
							`${constants.ANGULAR_DIR}/routes/account/password/+page.svelte`
						);
						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/account/register.svelte`,
							`${constants.ANGULAR_DIR}/routes/account/register/+page.svelte`
						);
						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/account/settings.svelte`,
							`${constants.ANGULAR_DIR}/routes/account/settings/+page.svelte`
						);
						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/account/reset/finish.svelte`,
							`${constants.ANGULAR_DIR}/routes/account/reset/finish/+page.svelte`
						);
						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/account/reset/init.svelte`,
							`${constants.ANGULAR_DIR}/routes/account/reset/init/+page.svelte`
						);

						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/admin/user-management/index.svelte`,
							`${constants.ANGULAR_DIR}/routes/admin/user-management/+page.svelte`
						);
						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/admin/user-management/new.svelte`,
							`${constants.ANGULAR_DIR}/routes/admin/user-management/new/+page.svelte`
						);
						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/admin/user-management/[id]/edit.svelte`,
							`${constants.ANGULAR_DIR}/routes/admin/user-management/[id]/edit/+page.svelte`
						);
						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/admin/user-management/[id]/view.svelte`,
							`${constants.ANGULAR_DIR}/routes/admin/user-management/[id]/view/+page.svelte`
						);
					}
				}
			},
			writeAdditionalFile() {
				writeFiles.call(this);
			},

			updatePackageJson() {
				const packageTemplate = this.fs.read(this.templatePath('svelte/package.json'));
				this.fs.extendJSON(this.destinationPath('package.json'), JSON.parse(packageTemplate));

				if (!this.skipServer) {
					// include swagger dependency
					const swaggerPackageTemplate = this.fs.read(this.templatePath('svelte/swagger-package.json'));
					this.fs.extendJSON(this.destinationPath('package.json'), JSON.parse(swaggerPackageTemplate));
				}
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
