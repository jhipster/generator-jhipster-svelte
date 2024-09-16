import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

export default class extends BaseApplicationGenerator {
	constructor(args, opts, features) {
		super(args, opts, { ...features });
	}

	get [BaseApplicationGenerator.INITIALIZING]() {
		return this.asInitializingTaskGroup({});
	}
}
