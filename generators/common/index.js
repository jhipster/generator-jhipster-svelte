/**
 * Copyright 2013-2020 the original author or authors from the JHipster project.
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
const CommonGenerator = require('generator-jhipster/generators/common');
const { writeFiles, writeMainGeneratorFiles, prettierConfigFiles } = require('./files');

module.exports = class extends CommonGenerator {
	constructor(args, opts) {
		super(args, { ...opts, fromBlueprint: true });
	}

	get initializing() {
		// Here we are not overriding this phase and hence its being handled by JHipster
		return super._initializing();
	}

	// eslint-disable-next-line class-methods-use-this
	get default() {
		return {
			writePrettierConfig() {
				// Prettier configuration needs to be the first written files - all subgenerators considered - for prettier transform to work
				this.writeFilesToDisk(prettierConfigFiles, this, false);
			},
		};
	}

	// eslint-disable-next-line class-methods-use-this
	get writing() {
		return {
			getSharedConfigOptions() {
				this.jhipsterVersion = this.config.get('jhipsterVersion');
				this.applicationType = this.config.get('applicationType') || this.configOptions.applicationType;
				this.enableSwaggerCodegen = this.configOptions.enableSwaggerCodegen;
				this.serverPort = this.configOptions.serverPort;
				this.clientFramework = this.configOptions.clientFramework;
				this.protractorTests = this.testFrameworks.includes('protractor');
				this.gatlingTests = this.testFrameworks.includes('gatling');
			},
			writeAdditionalFile() {
				writeMainGeneratorFiles.call(this);
				writeFiles.call(this);
			},
		};
	}
};
