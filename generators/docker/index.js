import DockerGenerator from 'generator-jhipster/generators/docker';
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

export default class extends DockerGenerator {
	constructor(args, opts, features) {
		super(args, opts, { ...features });
	}

	get [BaseApplicationGenerator.LOADING]() {
		return this.asLoadingTaskGroup({
			...super.loading,
			loadPackageJson: undefined,
		});
	}

	get [BaseApplicationGenerator.PREPARING]() {
		return this.asPreparingTaskGroup({
			...super.preparing,
		});
	}

	get [BaseApplicationGenerator.WRITING]() {
		return this.asWritingTaskGroup({
			...super.writing,
		});
	}

	get [BaseApplicationGenerator.POST_WRITING]() {
		return this.asPostWritingTaskGroup({
			...super.postWriting,
			packageJsonScripts: undefined,
		});
	}
}
