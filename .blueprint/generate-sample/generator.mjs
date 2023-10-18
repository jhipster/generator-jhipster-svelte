import { readdir } from 'node:fs/promises';
import { statSync } from 'node:fs';
import { extname } from 'node:path';
import BaseGenerator from 'generator-jhipster/generators/base';
import command from './command.mjs';

export default class extends BaseGenerator {
	sampleName;
	listSamples;

	get [BaseGenerator.INITIALIZING]() {
		return this.asInitializingTaskGroup({
			async initializeOptions() {
				this.parseJHipsterArguments(command.arguments);
				if (this.sampleName && !extname(this.sampleName)) {
					this.sampleName += '.jdl';
				}
				this.parseJHipsterOptions(command.options);

				if (this.listSamples) {
					console.log(await this.getSamples());
					this.cancelCancellableTasks();
				}
			},
		});
	}

	get [BaseGenerator.PROMPTING]() {
		return this.asPromptingTaskGroup({
			async askForSample() {
				if (!this.sampleName) {
					const answers = await this.prompt({
						type: 'list',
						name: 'sampleName',
						message: 'which sample do you want to generate?',
						choices: async () => this.getSamples(),
					});
					this.sampleName = answers.sampleName;
				}
			},
		});
	}

	get [BaseGenerator.WRITING]() {
		return this.asWritingTaskGroup({
			async copySample() {
				this.copyTemplate(`samples/${this.sampleName}`, this.sampleName, { noGlob: true });
			},
		});
	}

	get [BaseGenerator.END]() {
		return this.asEndTaskGroup({
			async generateSample() {
				if (this.sampleName.endsWith('.json')) {
					const yoRcFile = this.readTemplate(`samples/${this.sampleName}`);
					this.mergeDestinationJson('.yo-rc.json', JSON.parse(yoRcFile));
					await this.composeWithJHipster('app', {
						generatorOptions: {
							skipJhipsterDependencies: true,
							insight: false,
							skipChecks: true,
							skipInstall: true,
						},
					});
				} else {
					let additionalConfig;
					if (this.sampleName.includes('microservices')) {
						additionalConfig = {
							workspaces: false,
						};
					}
					await this.composeWithJHipster('jdl', {
						generatorArgs: [this.sampleName],
						generatorOptions: {
							skipJhipsterDependencies: true,
							insight: false,
							skipChecks: true,
							skipInstall: true,
							...additionalConfig,
						},
					});
				}
			},
			async jhipsterInfo() {
				await this.composeWithJHipster('info');
			},
		});
	}

	async getSamples() {
		const samples = await readdir(this.templatePath('samples'));
		return samples.filter(sample => statSync(this.templatePath('samples', sample)).isFile());
	}
}
