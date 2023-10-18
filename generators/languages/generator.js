import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import command from './command.js';

/**
 * Svelte blueprint doesn't support translations.
 * Override options and convert to noop.
 */
export default class extends BaseApplicationGenerator {
	constructor(args, opts, features) {
		super(args, opts, { ...features });
	}

	get [BaseApplicationGenerator.INITIALIZING]() {
		return this.asInitializingTaskGroup({
			async initializingTemplateTask() {
				this.parseJHipsterArguments(command.arguments);
				this.parseJHipsterOptions(command.options);
			},
		});
	}
}
