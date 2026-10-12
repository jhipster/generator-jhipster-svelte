
import ClientGenerator from 'generator-jhipster/generators/client';
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { entityFiles } from './entity-files.js';
export { default as command } from './command.js';

export default class extends ClientGenerator {
	constructor(args, opts, features) {
		super(args, opts, { ...features, sbsBlueprint: true });
	}

	get [BaseApplicationGenerator.INITIALIZING]() {
		return this.asInitializingTaskGroup({
			...super.initializing,
		});
	}

	get [BaseApplicationGenerator.PROMPTING]() {
		return this.asPromptingTaskGroup({
			...super.prompting,
		});
	}

	get [BaseApplicationGenerator.CONFIGURING]() {
		return this.asConfiguringTaskGroup({
			...super.configuring,
		});
	}

	get [BaseApplicationGenerator.COMPOSING]() {
		return this.asComposingTaskGroup({
			...super.composing,
		});
	}

	get [BaseApplicationGenerator.LOADING]() {
		return this.asLoadingTaskGroup({
			...super.loading,
		});
	}

	get [BaseApplicationGenerator.PREPARING]() {
		return this.asPreparingTaskGroup({
			...super.preparing,
			prepareMicrofrontend({ application }) {
				const { microfrontend } = application;
				if (microfrontend) {
					application.microfrontendEnabled = true;
					this.log.info('Microfrontend support is enabled.');
				} else {
					application.microfrontendEnabled = false;
				}
			},
		});
	}

	get [BaseApplicationGenerator.WRITING]() {
		return this.asWritingTaskGroup({
			...super.writing,
		});
	}

	get [BaseApplicationGenerator.WRITING_ENTITIES]() {
		return this.asWritingEntitiesTaskGroup({
			...super.writingEntities,
		});
	}

	get [BaseApplicationGenerator.POST_WRITING]() {
		return this.asPostWritingTaskGroup({
			...super.postWriting,
			addMicrofrontendDependencies({ application, source }) {
				if (application.microfrontendEnabled) {
					// Add microfrontend-specific package.json dependencies if needed
					this.log.info('Adding microfrontend dependencies...');
				}
			},
		});
	}

	get [BaseApplicationGenerator.INSTALL]() {
		return this.asInstallTaskGroup({
			...super.install,
		});
	}

	get [BaseApplicationGenerator.END]() {
		return this.asEndTaskGroup({
			...super.end,
			microfrontendEndMessage({ application }) {
				if (application.microfrontendEnabled) {
					this.log.info('Microfrontend support has been configured successfully.');
				}
			},
		});
	}
}
