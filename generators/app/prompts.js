const chalk = require('chalk');

module.exports = {
	askForApplicationType,
	askForTestOpts,
};

async function askForApplicationType() {
	if (this.existingProject) return;

	const applicationTypeChoices = [
		{
			value: 'monolith',
			name: 'Monolithic application (recommended for simple projects)',
		},
		// {
		// 	value: 'microservice',
		// 	name: 'Microservice application',
		// },
		// {
		// 	value: 'gateway',
		// 	name: 'Microservice gateway',
		// },
	];

	const answers = await this.prompt([
		{
			type: 'list',
			name: 'applicationType',
			message: `Which ${chalk.yellow('*type*')} of application would you like to create?`,
			choices: applicationTypeChoices,
			default: 'monolith',
		},
		{
			when: appTypeAnswers => ['gateway', 'monolith', 'microservice'].includes(appTypeAnswers.applicationType),
			type: 'confirm',
			name: 'reactive',
			message: '[Beta] Do you want to make it reactive with Spring WebFlux?',
			default: false,
		},
	]);

	this.applicationType = this.jhipsterConfig.applicationType = answers.applicationType;
	this.reactive = this.jhipsterConfig.reactive = answers.reactive;
}

async function askForTestOpts() {
	if (this.existingProject) return;

	const choices = [];
	const defaultChoice = [];

	if (!this.skipServer) {
		choices.push({ name: 'Gatling', value: 'gatling' }, { name: 'Cucumber', value: 'cucumber' });
	}

	const PROMPT = {
		type: 'checkbox',
		name: 'testFrameworks',
		message: 'Besides Junit, which testing frameworks would you like to use?',
		choices,
		default: defaultChoice,
	};

	const answers = await this.prompt(PROMPT);
	this.testFrameworks = this.jhipsterConfig.testFrameworks = answers.testFrameworks;
}
