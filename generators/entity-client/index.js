/* eslint-disable class-methods-use-this */

const chalk = require('chalk');
const EntityClientGenerator = require('generator-jhipster/generators/entity-client');
const constants = require('generator-jhipster/generators/generator-constants');
const writeFiles = require('./files').writeFiles;
const blueprintPackageJson = require('../../package.json');
const util = require('../util');

module.exports = class extends EntityClientGenerator {
	constructor(args, opts) {
		super(args, { ...opts, fromBlueprint: true });

		const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

		if (!jhContext) {
			this.error(
				`This is a JHipster blueprint and should be used like ${chalk.yellow('jhipster --blueprints svelte')}`,
			);
		}

		this.blueprintjs = blueprintPackageJson;
		this.skipServer = this.config.get('skipServer') || false;
		this.skipClient = this.config.get('skipClient') || false;
	}

	_initializing() {
		return super._initializing();
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
		return {
			cleanup() {
				if (!this.skipClient) {
					if (util.isVersionLessThan(this, '0.10.0')) {
						this.removeFile(
							`${constants.ANGULAR_DIR}/lib/entities/${this.entityFolderName}/${this.entityFileName}-delete-modal.svelte`,
						);
						this.removeFile(
							`${constants.ANGULAR_DIR}/lib/entities/${this.entityFolderName}/${this.entityFileName}-list-actions.svelte`,
						);
						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/entities/${this.entityFolderName}/index.svelte`,
							`${constants.ANGULAR_DIR}/routes/entities/${this.entityFolderName}/+page.svelte`,
						);
						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/entities/${this.entityFolderName}/new.svelte`,
							`${constants.ANGULAR_DIR}/routes/entities/${this.entityFolderName}/new/+page.svelte`,
						);
						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/entities/${this.entityFolderName}/[id]/view.svelte`,
							`${constants.ANGULAR_DIR}/routes/entities/${this.entityFolderName}/[id]/view/+page.svelte`,
						);
						util.moveFile(
							this,
							`${constants.ANGULAR_DIR}/routes/entities/${this.entityFolderName}/[id]/edit.svelte`,
							`${constants.ANGULAR_DIR}/routes/entities/${this.entityFolderName}/[id]/edit/+page.svelte`,
						);
					}
				}
			},
			writeAdditionalFile() {
				if (!this.skipClient) {
					writeFiles.call(this);
				}
			},
		};
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

	_end() {
		return super._end();
	}

	get end() {
		return this._end();
	}
};
