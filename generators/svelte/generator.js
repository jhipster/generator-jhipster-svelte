import { lt } from 'semver';
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { getEnumInfo } from 'generator-jhipster/generators/base-application/support';
import { createNeedleCallback } from 'generator-jhipster/generators/base/support';
import prettierPluginSvelte from 'prettier-plugin-svelte';
import prettierPluginImports from 'prettier-plugin-organize-imports';
import command from './command.js';
import { svelteFiles } from './files.js';
import { entitySvelteFiles } from './entity-files.js';
import { TEMPLATES_WEBAPP_SOURCES_DIR } from 'generator-jhipster';
import { getPackageJson } from '../util.js';

export default class extends BaseApplicationGenerator {
	constructor(args, opts, features) {
		super(args, opts, {
			...features,
			// Dropped it once migration is done.
			// jhipster7Migration: true,
		});
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
			async initializingTemplateTask() {
				this.parseJHipsterArguments(command.arguments);
				this.parseJHipsterOptions(command.options);
			},
		});
	}

	get [BaseApplicationGenerator.PROMPTING]() {
		return this.asPromptingTaskGroup({
			async promptingTemplateTask() {},
		});
	}

	get [BaseApplicationGenerator.CONFIGURING]() {
		return this.asConfiguringTaskGroup({
			async configuringTemplateTask() {},
		});
	}

	get [BaseApplicationGenerator.COMPOSING]() {
		return this.asComposingTaskGroup({
			async composingTemplateTask() {},
		});
	}

	get [BaseApplicationGenerator.LOADING]() {
		return this.asLoadingTaskGroup({
			async loadingTemplateTask({ application }) {
				application.oldSvelteBlueprintVersion = this.blueprintConfig.version;
				this.blueprintConfig.version = getPackageJson().version;
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

				const packageTemplate = JSON.parse(this.readTemplate('../dependabot/svelte/package.json'));
				this.packageJson.merge(packageTemplate);

				if (application.swaggerUi) {
					const swaggerPackageJson = JSON.parse(this.readTemplate('../dependabot/swagger/package.json'));
					this.packageJson.merge(swaggerPackageJson);
				}

				if (application.jestTest) {
					const jestPackageJson = JSON.parse(this.readTemplate('../dependabot/jest/package.json'));
					this.packageJson.merge(jestPackageJson);
				}

				if (application.javaPrettier) {
					this.packageJson.merge({
						devDependencies: {
							'prettier-plugin-java': application.nodeDependencies['prettier-plugin-java'],
						},
					});
				}
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
			async endTemplateTask() {},
		});
	}

	moveFile(source, destination) {
		this.log(`Renaming file - ${source} to ${destination}`);
		this.moveDestination(source, destination, { noGlob: true });
	}
}
