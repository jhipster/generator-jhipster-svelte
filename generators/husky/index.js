/**
 * Copyright 2020-2025 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import HuskyGenerator from 'generator-jhipster/generators/javascript/generators/husky';
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
export { default as command } from './command.js';

export default class extends HuskyGenerator {
	constructor(args, opts, features) {
		super(args, opts, { ...features });
	}

	async beforeQueue() {
		await this.dependsOnJHipster('git');
	}

	get [BaseApplicationGenerator.CONFIGURING]() {
		return this.asConfiguringTaskGroup({
			...super.configuring,
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
			addCommitHookDependencies: undefined,
		});
	}
}
