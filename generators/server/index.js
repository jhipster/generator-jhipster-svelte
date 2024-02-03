/* eslint-disable import/no-unresolved */
import ServerGenerator from 'generator-jhipster/generators/server';
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

export default class extends ServerGenerator {
	constructor(args, opts, features) {
		super(args, opts, { ...features });
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
		});
	}

	get [BaseApplicationGenerator.POST_PREPARING]() {
		return this.asPostPreparingTaskGroup({
			...super.postPreparing,
		});
	}

	get [BaseApplicationGenerator.DEFAULT]() {
		return this.asDefaultTaskGroup({
			...super.default,
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
			packageJsonBackendScripts: undefined,
			packageJsonE2eScripts: undefined,
		});
	}

	get [BaseApplicationGenerator.END]() {
		return this.asEndTaskGroup({
			...super.end,
		});
	}
}
