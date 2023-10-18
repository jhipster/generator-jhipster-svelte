import BootstrapApplicationGenerator from 'generator-jhipster/generators/bootstrap-application';
import { getPackageJson } from '../util.js';

export default class extends BootstrapApplicationGenerator {
	constructor(args, opts, features) {
		super(args, opts, {
			...features,
			sbsBlueprint: true,
		});
	}

	async beforeQueue() {
		await super.beforeQueue();
	}

	get [BootstrapApplicationGenerator.LOADING]() {
		return this.asLoadingTaskGroup({
			async loadingTemplateTask({ application }) {
				application.enableTranslation = false;
				application.javaPrettier = this.blueprintConfig.javaPrettier ?? true;
				application.swaggerUi = this.blueprintConfig.swaggerUi ?? true;
				application.svelteBlueprintVersion = getPackageJson().version;
				application.jestTest = this.blueprintConfig.jest ?? true;
			},
		});
	}
}
