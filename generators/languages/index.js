/* eslint-disable import/no-unresolved */
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import LanguagesGenerator from 'generator-jhipster/generators/languages';

export default class extends LanguagesGenerator {
	constructor(args, opts, features) {
		super(args, opts, { ...features });
	}

	get [BaseApplicationGenerator.PROMPTING]() {
		return this.asPromptingTaskGroup({
			...super.prompting,
			askI18n: undefined,
			askForLanguages: undefined,
			additionalLanguageConfigurations() {
				this.languagesToApply = [];
				this.enableTranslation = this.jhipsterConfig.enableTranslation = false;
			},
		});
	}

	get [BaseApplicationGenerator.CONFIGURING]() {
		return this.asConfiguringTaskGroup({
			...super.configuring,
		});
	}
}
