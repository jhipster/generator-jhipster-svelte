/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
import { lt } from 'semver';

import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import ClientGenerator from 'generator-jhipster/generators/client';
import { TEMPLATES_WEBAPP_SOURCES_DIR } from 'generator-jhipster';
import { getEnumInfo } from 'generator-jhipster/generators/base-application/support';
import { createNeedleCallback } from 'generator-jhipster/generators/base/support';
import prettierPluginSvelte from 'prettier-plugin-svelte';
import prettierPluginImports from 'prettier-plugin-organize-imports';
import { getPackageJson } from '../util.js';
import command from './command.js';
import svelteFiles from './files.js';
// import { entitySvelteFiles } from './entity-files.js';

// const constants = require('generator-jhipster/generators/generator-constants');
// const writeFiles = require('./files').writeFiles;
// const blueprintPackageJson = require('../../package.json');
// const util = require('../util');
// const { pathFromSvelteBlueprint } = require('../util');

export default class extends ClientGenerator {
	constructor(args, opts, features) {
		super(args, opts, { ...features });
	}

	async beforeQueue() {
		await this.dependsOnJHipster('bootstrap-application');
		const bootstrapGenerator = await this.dependsOnJHipster('bootstrap');
		if (!bootstrapGenerator.prettierExtensions.includes(prettierPluginSvelte)) {
			bootstrapGenerator.prettierExtensions.push('svelte');
		}
		if (!bootstrapGenerator.prettierOptions.plugins.includes(prettierPluginSvelte)) {
			bootstrapGenerator.prettierOptions.plugins.push(prettierPluginSvelte, prettierPluginImports);
		}
	}

	get [BaseApplicationGenerator.INITIALIZING]() {
		return this.asInitializingTaskGroup({
			...super.initializing,
			async initializingTemplateTask() {
				this.parseJHipsterArguments(command.arguments);
				this.parseJHipsterOptions(command.options);
			},
		});
	}

	get [BaseApplicationGenerator.PROMPTING]() {
		return this.asPromptingTaskGroup({
			clientConfigurations() {
				this.clientFramework = this.jhipsterConfig.clientFramework = 'svelte';
				this.jhipsterConfig.clientTheme = this.clientTheme = 'none';
				this.jhipsterConfig.clientThemeVariant = this.clientThemeVariant = '';
				this.jhipsterConfig.withAdminUi = this.askForAdminUi = '';
				this.jhipsterConfig.clientPackageManager = 'npm';
			},
		});
	}

	get [BaseApplicationGenerator.CONFIGURING]() {
		return this.asConfiguringTaskGroup({
			...super.configuring,
		});
	}

	get [BaseApplicationGenerator.COMPOSING]() {
		return this.asComposingTaskGroup({
			async composingTemplateTask() {
				// override
			},
		});
	}

	get [BaseApplicationGenerator.LOADING]() {
		return this.asLoadingTaskGroup({
			async loadingTemplateTask({ application }) {
				application.oldSvelteBlueprintVersion = this.blueprintConfig.version;
				application.svelteBlueprintVersion = this.blueprintConfig.version = getPackageJson().version;
			},
		});
	}

	get [BaseApplicationGenerator.PREPARING]() {
		return this.asPreparingTaskGroup({
			async preparingTemplateTask({ application, source }) {
				if (!application.prettierExtensions.includes(',svelte')) {
					application.prettierExtensions = `${application.prettierExtensions},svelte`;
				}
				source.addEntityToMenu = ({ entityClass, entityRoute, entityName }) => {
					this.editFile(
						`${application.clientSrcDir}/app/lib/entities/entity-menu.svelte`,
						createNeedleCallback({
							needle: 'add-entity-to-menu',
							contentToAdd: `\t\t<MenuItem
 \t\t\ttestId="svl${entityClass}MgmtLink"
 \t\t\tlink="/entities/${entityRoute}"
 \t\t\ton:click="{() => (isOpen = false)}"
 \t\t>
 \t\t\t<Icon classes="sm:mr-1" icon="{faAsterisk}" />
 \t\t\t${entityName}
 \t\t</MenuItem>
 `,
						}),
					);
				};
			},
		});
	}

	get [BaseApplicationGenerator.WRITING]() {
		return this.asWritingTaskGroup({
			async cleanup({ application }) {
				const { oldSvelteBlueprintVersion } = application;
				if (oldSvelteBlueprintVersion && lt(oldSvelteBlueprintVersion, '0.10.0')) {
					this.removeFile(
						`${application.clientSrcDir}app/lib/admin/user-management/user-delete-modal.svelte`,
					);
					this.removeFile(`cypress.json`);
					this.moveFile(
						`${application.clientSrcDir}app/routes/__error.svelte`,
						`${application.clientSrcDir}app/routes/+error.svelte`,
					);
					this.moveFile(
						`${application.clientSrcDir}app/routes/__layout.svelte`,
						`${application.clientSrcDir}app/routes/+layout.svelte`,
					);
					this.moveFile(
						`${application.clientSrcDir}app/routes/index.svelte`,
						`${application.clientSrcDir}app/routes/+page.svelte`,
					);
					this.moveFile(
						`${application.clientSrcDir}app/routes/admin/__layout.svelte`,
						`${application.clientSrcDir}app/routes/admin/+layout.svelte`,
					);

					this.moveFile(
						`${application.clientSrcDir}app/routes/admin/logger.svelte`,
						`${application.clientSrcDir}app/routes/admin/logger/+page.svelte`,
					);

					if (this.swaggerUi) {
						this.moveFile(
							`${application.clientSrcDir}app/routes/admin/docs.svelte`,
							`${application.clientSrcDir}app/routes/admin/docs/+page.svelte`,
						);
					}
					if (this.applicationType === 'gateway') {
						this.moveFile(
							`${application.clientSrcDir}app/routes/admin/gateway.svelte`,
							`${application.clientSrcDir}app/routes/admin/gateway/+page.svelte`,
						);
					}
					if (this.authenticationType !== 'oauth2') {
						this.moveFile(
							`${application.clientSrcDir}app/routes/login.svelte`,
							`${application.clientSrcDir}app/routes/login/+page.svelte`,
						);
					}
					if (!this.skipUserManagement && this.authenticationType !== 'oauth2') {
						this.moveFile(
							`${application.clientSrcDir}app/routes/account/activate.svelte`,
							`${application.clientSrcDir}app/routes/account/activate/+page.svelte`,
						);
						this.moveFile(
							`${application.clientSrcDir}app/routes/account/password.svelte`,
							`${application.clientSrcDir}app/routes/account/password/+page.svelte`,
						);
						this.moveFile(
							`${application.clientSrcDir}app/routes/account/register.svelte`,
							`${application.clientSrcDir}app/routes/account/register/+page.svelte`,
						);
						this.moveFile(
							`${application.clientSrcDir}app/routes/account/settings.svelte`,
							`${application.clientSrcDir}app/routes/account/settings/+page.svelte`,
						);
						this.moveFile(
							`${application.clientSrcDir}app/routes/account/reset/finish.svelte`,
							`${application.clientSrcDir}app/routes/account/reset/finish/+page.svelte`,
						);
						this.moveFile(
							`${application.clientSrcDir}app/routes/account/reset/init.svelte`,
							`${application.clientSrcDir}app/routes/account/reset/init/+page.svelte`,
						);

						this.moveFile(
							`${application.clientSrcDir}app/routes/admin/user-management/index.svelte`,
							`${application.clientSrcDir}app/routes/admin/user-management/+page.svelte`,
						);
						this.moveFile(
							`${application.clientSrcDir}app/routes/admin/user-management/new.svelte`,
							`${application.clientSrcDir}app/routes/admin/user-management/new/+page.svelte`,
						);
						this.moveFile(
							`${application.clientSrcDir}app/routes/admin/user-management/[id]/edit.svelte`,
							`${application.clientSrcDir}app/routes/admin/user-management/[id]/edit/+page.svelte`,
						);
						this.moveFile(
							`${application.clientSrcDir}app/routes/admin/user-management/[id]/view.svelte`,
							`${application.clientSrcDir}app/routes/admin/user-management/[id]/view/+page.svelte`,
						);
					}
				}
			},
			async writingTemplateTask({ application }) {
				await this.writeFiles({
					sections: svelteFiles,
					context: application,
				});
			},
		});
	}

	get [BaseApplicationGenerator.WRITING_ENTITIES]() {
		return this.asWritingEntitiesTaskGroup({
			async cleanup({ application, entities }) {
				const { oldSvelteBlueprintVersion } = application;
				if (oldSvelteBlueprintVersion && lt(oldSvelteBlueprintVersion, '0.10.0')) {
					for (const entity of entities.filter(entity => !entity.skipClient && !entity.builtIn)) {
						this.removeFile(
							`${application.clientSrcDir}app/lib/entities/${entity.entityFolderName}/${entity.entityFileName}-delete-modal.svelte`,
						);
						this.removeFile(
							`${application.clientSrcDir}app/lib/entities/${entity.entityFolderName}/${entity.entityFileName}-list-actions.svelte`,
						);
						this.moveFile(
							`${application.clientSrcDir}app/routes/entities/${entity.entityFolderName}/index.svelte`,
							`${application.clientSrcDir}app/routes/entities/${entity.entityFolderName}/+page.svelte`,
						);
						this.moveFile(
							`${application.clientSrcDir}app/routes/entities/${entity.entityFolderName}/new.svelte`,
							`${application.clientSrcDir}app/routes/entities/${entity.entityFolderName}/new/+page.svelte`,
						);
						this.moveFile(
							`${application.clientSrcDir}app/routes/entities/${entity.entityFolderName}/[id]/view.svelte`,
							`${application.clientSrcDir}app/routes/entities/${entity.entityFolderName}/[id]/view/+page.svelte`,
						);
						this.moveFile(
							`${application.clientSrcDir}app/routes/entities/${entity.entityFolderName}/[id]/edit.svelte`,
							`${application.clientSrcDir}app/routes/entities/${entity.entityFolderName}/[id]/edit/+page.svelte`,
						);
					}
				}
			},
			async writeEntityFiles({ application, entities }) {
				for (const entity of entities.filter(entity => !entity.skipClient && !entity.builtIn)) {
					/* eslint-disable no-await-in-loop */
					/* eslint-disable no-undef */
					await this.writeFiles({
						sections: entitySvelteFiles,
						context: { ...application, ...entity },
					});
				}
			},
			async writeUserService({ application, entities }) {
				if (entities.some(entity => entity.relationships.some(rel => rel.otherEntity.builtInUser))) {
					this.writeFile(
						`${TEMPLATES_WEBAPP_SOURCES_DIR}app/lib/entities/user/user-service.js.ejs`,
						`${application.clientSrcDir}app/lib/entities/user/user-service.js`,
						application,
					);
				}
			},
			writeEnumerations({ application, entities }) {
				for (const entity of entities.filter(entity => !entity.skipClient && !entity.builtIn)) {
					for (const field of entity.fields) {
						if (field.fieldIsEnum === true) {
							const enumInfo = {
								...getEnumInfo(field, application.clientRootFolder),
								frontendAppName: application.frontendAppName,
								packageName: application.packageName,
							};
							this.writeFile(
								`${TEMPLATES_WEBAPP_SOURCES_DIR}app/lib/entities/enums/enum.js.ejs`,
								`${application.clientSrcDir}app/lib/entities/enums/${field.fieldType.toLowerCase()}.js`,
								enumInfo,
							);
						}
					}
				}
			},
		});
	}

	get [BaseApplicationGenerator.POST_WRITING]() {
		return this.asPostWritingTaskGroup({
			updatePackageJson({ application }) {
				this.packageJson.merge({
					devDependencies: {
						'prettier-plugin-svelte': getPackageJson().dependencies['prettier-plugin-svelte'],
					},
				});

				const packageTemplate = JSON.parse(this.readTemplate('package.json'));
				this.packageJson.merge(packageTemplate);

				if (application.swaggerUi) {
					const swaggerPackageJson = JSON.parse(this.readTemplate('swagger/package.json'));
					this.packageJson.merge(swaggerPackageJson);
				}

				const unitFrameworkType = application.jest ? 'jest' : 'vitest';

				const unitPackageJson = JSON.parse(this.readTemplate(`${unitFrameworkType}/package.json`));
				this.packageJson.merge(unitPackageJson);

				const javaPrettierPackageJson = JSON.parse(this.readTemplate(`java-prettier/package.json`));
				this.packageJson.merge(javaPrettierPackageJson);

				this.packageJson.merge({
					devDependencies: {
						'prettier-plugin-java': application.nodeDependencies['prettier-plugin-java'],
					},
				});
			},
		});
	}

	get [BaseApplicationGenerator.POST_WRITING_ENTITIES]() {
		return this.asPostWritingEntitiesTaskGroup({
			async postWritingEntitiesTemplateTask({ entities, source }) {
				for (const entity of entities.filter(entity => !entity.skipClient && !entity.builtIn)) {
					source.addEntityToMenu({
						entityClass: entity.entityAngularName,
						entityRoute: entity.entityFolderName,
						entityName: entity.entityClassHumanized,
					});
				}
			},
		});
	}

	get [BaseApplicationGenerator.END]() {
		return this.asEndTaskGroup({
			async endTemplateTask() {
				// override
			},
		});
	}

	moveFile(source, destination) {
		this.log(`Renaming file - ${source} to ${destination}`);
		this.moveDestination(source, destination, { noGlob: true });
	}
}
