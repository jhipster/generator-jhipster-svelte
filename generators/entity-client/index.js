const chalk = require('chalk');
const EntityClientGenerator = require('generator-jhipster/generators/entity-client');
const constants = require('generator-jhipster/generators/generator-constants');
const writeFiles = require('./files').writeFiles;
const blueprintPackageJson = require('../../package.json');

module.exports = class extends EntityClientGenerator {
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
		return {
			cleanup() {
				this.removeFile(
					`${constants.ANGULAR_DIR}/lib/entities/${this.entityFolderName}/${this.entityFileName}-delete-modal.svelte`
				);
				this.removeFile(
					`${constants.ANGULAR_DIR}/lib/entities/${this.entityFolderName}/${this.entityFileName}-list-actions.svelte`
				);
				this.gitMove(
					`${constants.ANGULAR_DIR}/routes/entities/${this.entityFolderName}/index.svelte`,
					`${constants.ANGULAR_DIR}/routes/entities/${this.entityFolderName}/+page.svelte`
				);
				this.gitMove(
					`${constants.ANGULAR_DIR}/routes/entities/${this.entityFolderName}/new.svelte`,
					`${constants.ANGULAR_DIR}/routes/entities/${this.entityFolderName}/new/+page.svelte`
				);
				this.gitMove(
					`${constants.ANGULAR_DIR}/routes/entities/${this.entityFolderName}/[id]/view.svelte`,
					`${constants.ANGULAR_DIR}/routes/entities/${this.entityFolderName}/[id]/view/+page.svelte`
				);
				this.gitMove(
					`${constants.ANGULAR_DIR}/routes/entities/${this.entityFolderName}/[id]/edit.svelte`,
					`${constants.ANGULAR_DIR}/routes/entities/${this.entityFolderName}/[id]/edit/+page.svelte`
				);
			},
			writeAdditionalFile() {
				writeFiles.call(this);
			},
		};
	}

	// eslint-disable-next-line class-methods-use-this
	get postWriting() {
		// TODO: add menu option changes
		return {};
	}

	get end() {
		return super._end();
	}
};
