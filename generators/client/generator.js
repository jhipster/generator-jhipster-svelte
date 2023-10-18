import ClientGenerator from 'generator-jhipster/generators/client';

/**
 * Noop generator to import svelte sub-generator options and compose with it.
 */
export default class extends ClientGenerator {
	constructor(args, opts, features) {
		super(args, opts, {
			...features,
			checkBlueprint: true,
			// Dropped it once migration is done.
			jhipster7Migration: true,
		});
	}

	get [ClientGenerator.CONFIGURING]() {
		return this.asConfiguringTaskGroup({
			async configuringTemplateTask() {
				this.jhipsterConfig.clientFramework = this.jhipsterConfig.applicationType === 'microservice' ? 'no' : 'svelte';
				if (this.jhipsterConfig.clientFramework === 'no') {
					this.jhipsterConfig.skipClient = true;
				}
			},
		});
	}
	get [ClientGenerator.COMPOSING]() {
		return this.asComposingTaskGroup({
			async composingTemplateTask() {
				if (this.jhipsterConfig.clientFramework === 'svelte') {
					await this.composeWithJHipster('jhipster-svelte:svelte');
				}
			},
		});
	}
}
