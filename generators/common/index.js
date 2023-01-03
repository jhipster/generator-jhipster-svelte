/**
 * Copyright 2020-2023 the original author or authors from the JHipster project.
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
const chalk = require('chalk');
const CommonGenerator = require('generator-jhipster/generators/common');
const { writeFiles, writeMainGeneratorFiles, prettierConfigFiles } = require('./files');
const blueprintPackageJson = require('../../package.json');
const { pathFromSvelteBlueprint } = require('../util');

module.exports = class extends CommonGenerator {
	constructor(args, opts) {
		super(args, { ...opts, fromBlueprint: true });
		const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

		if (!jhContext) {
			this.error(
				`This is a JHipster blueprint and should be used like ${chalk.yellow('jhipster --blueprints svelte')}`
			);
		}

		this.blueprintjs = blueprintPackageJson;
		this.skipServer = this.config.get('skipServer') || false;
		this.javaPrettier = false;
	}

	_initializing() {
		return super._initializing();
	}

	get initializing() {
		return this._initializing();
	}

	_loading() {
		const defaultPhaseFromJHipster = super._loading();
		return {
			...defaultPhaseFromJHipster,
			loadPackageJson() {
				// override as the dependencies are differently managed
			},
		};
	}

	get loading() {
		return this._loading();
	}

	_preparing() {
		return super._preparing();
	}

	get preparing() {
		return this._preparing();
	}

	_default() {
		return super._default();
	}

	get default() {
		return this._default();
	}

	// eslint-disable-next-line class-methods-use-this
	_writing() {
		return {
			configurePrettier() {
				this.javaPrettier = true;
				this.prettier = true;
			},
			writePrettierConfig() {
				if (this.prettier) {
					// Prettier configuration needs to be the first written files - all subgenerators considered - for prettier transform to work
					this.writeFilesToDisk(
						prettierConfigFiles,
						this,
						false,
						pathFromSvelteBlueprint(`common/templates`)
					);
				}
			},
			writeAdditionalFile() {
				writeMainGeneratorFiles.call(this);
				writeFiles.call(this);
			},
		};
	}

	get writing() {
		return this._writing();
	}
};
