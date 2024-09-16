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
		});
	}

	get [BaseApplicationGenerator.CONFIGURING]() {
		return this.asConfiguringTaskGroup({
			overrideLanguageConfigurations() {
				this.languagesToApply = [];
				this.enableTranslation = this.jhipsterConfig.enableTranslation = false;
			},
			...super.configuring,
		});
	}
}
