import BaseGenerator from 'generator-jhipster/generators/base';

export default class extends BaseGenerator {
	constructor(args, opts, features) {
		super(args, opts, features);
	}

	get [BaseGenerator.WRITING]() {
		return {
			writePlaywrightConfig() {
				this.writeDestinationTemplate({
					sourceFile: 'playwright.config.js',
					destinationFile: 'playwright.config.js',
				});
			},
			writePlaywrightTests() {
				this.writeDestinationTemplate({
					sourceFile: 'e2e/example.spec.js',
					destinationFile: 'e2e/example.spec.js',
				});
			},
		};
	}

	get [BaseGenerator.POST_WRITING]() {
		return {
			updatePackageJson() {
				this.packageJson.merge({
					devDependencies: {
						'@playwright/test': '^1.40.0',
					},
					scripts: {
						'e2e': 'playwright test',
						'e2e:ui': 'playwright test --ui',
					},
				});
			},
		};
	}
}
