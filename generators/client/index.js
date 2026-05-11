import { lt } from 'semver';

import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import ClientGenerator from 'generator-jhipster/generators/client';
import { TEMPLATES_WEBAPP_SOURCES_DIR } from 'generator-jhipster';
import { getEnumInfo } from 'generator-jhipster/generators/base-application/support';
import { createNeedleCallback } from 'generator-jhipster/generators/base/support';
import { configureSvelteClient, getPackageJson, prepareSvelteMicrofrontends } from '../util.js';
import svelteFiles from './files.js';
import entitySvelteFiles from './entity-files.js';

export { default as command } from './command.js';

const isRemoteMicrofrontendEntity = (application, entity) =>
	application.applicationTypeGateway &&
	application.microfrontend &&
	entity.microserviceName &&
	application.microfrontends?.some(
		({ baseName }) => baseName.toLowerCase() === entity.microserviceName.toLowerCase(),
	);

const shouldWriteEntityClient = (application, entity) =>
	!entity.skipClient && !entity.builtIn && !isRemoteMicrofrontendEntity(application, entity);

export default class extends ClientGenerator {
	constructor(args, opts, features) {
		super(args, opts, { ...features });
	}

	async beforeQueue() {
		await this.dependsOnJHipster('bootstrap-application');
		await this.dependsOnJHipster('common');
		const bootstrapGenerator = await this.dependsOnJHipster('bootstrap');
		bootstrapGenerator.prettierExtensions.push('svelte');
		bootstrapGenerator.prettierOptions.plugins.push(import.meta.resolve('prettier-plugin-svelte', import.meta.url));
		bootstrapGenerator.prettierOptions.plugins.push(
			import.meta.resolve('prettier-plugin-organize-imports', import.meta.url),
		);
	}

	get [BaseApplicationGenerator.INITIALIZING]() {
		return this.asInitializingTaskGroup({
			async parseCommand() {
				await this.parseCurrentJHipsterCommand();
			},
		});
	}

	get [BaseApplicationGenerator.PROMPTING]() {
		return this.asPromptingTaskGroup({
			clientConfigurations() {
				configureSvelteClient(this.jhipsterConfig);
				this.clientFramework = this.jhipsterConfig.clientFramework;
				this.clientTheme = this.jhipsterConfig.clientTheme;
				this.clientThemeVariant = this.jhipsterConfig.clientThemeVariant;
				this.askForAdminUi = this.jhipsterConfig.withAdminUi;
			},
		});
	}

	get [BaseApplicationGenerator.CONFIGURING]() {
		return this.asConfiguringTaskGroup({
			configureSvelteClient() {
				configureSvelteClient(this.jhipsterConfig);
			},
			...super.configuring,
			setDefaultBlueprintConfig() {
				if (this.blueprintConfig) {
					if (this.blueprintConfig.swaggerUi === undefined) {
						this.blueprintConfig.swaggerUi = false;
					}
					if (this.blueprintConfig.jest === undefined) {
						this.blueprintConfig.jest = false;
					}
				}
			},
			setLocalCommandOptions() {
				this.jest = this.blueprintConfig.jest;
				this.swaggerUi = this.blueprintConfig.swaggerUi;
			},
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
				prepareSvelteMicrofrontends(application, this.jhipsterConfigWithDefaults);
				if (!application.prettierExtensions.includes(',svelte')) {
					application.prettierExtensions = `${application.prettierExtensions},svelte`;
				}
				const entityMenuItem = ({ entityClass, entityRoute, entityName, closeAction }) => `\t\t<MenuItem
\t\t\ttestId="svl${entityClass}MgmtLink"
\t\t\tlink="/${entityRoute}"
\t\t\ton:click="{${closeAction}}"
\t\t>
\t\t\t<Icon classes="sm:mr-1" icon="{faAsterisk}" />
\t\t\t${entityName}
\t\t</MenuItem>
`;
				source.addEntityToMenu = ({ entityClass, entityRoute, entityName }) => {
					this.editFile(
						`${application.clientSrcDir}/app/lib/entities/entity-menu.svelte`,
						createNeedleCallback({
							needle: 'add-entity-to-menu',
							contentToAdd: entityMenuItem({
								entityClass,
								entityRoute,
								entityName,
								closeAction: '() => (isOpen = false)',
							}),
						}),
					);

					if (application.applicationTypeMicroservice && application.microfrontend) {
						this.editFile(
							`${application.clientSrcDir}/app/lib/microfrontends/entities-menu.svelte`,
							createNeedleCallback({
								needle: 'add-entity-to-microfrontend-menu',
								contentToAdd: entityMenuItem({
									entityClass,
									entityRoute,
									entityName,
									closeAction: 'closeMenu',
								}),
							}),
						);
					}
				};
				source.addEntityToMicrofrontendRoutes = ({ entityRoute }) => {
					if (!application.applicationTypeMicroservice || !application.microfrontend) {
						return;
					}

					this.editFile(
						`${application.clientSrcDir}/app/lib/microfrontends/entities-routes.js`,
						createNeedleCallback({
							needle: 'add-microfrontend-entity-route',
							contentToCheck: `path: '${entityRoute}'`,
							contentToAdd: `\t{
\t\tpath: '${entityRoute}',
\t\tload: () => import('../../routes/${entityRoute}/+page.svelte'),
\t},
\t{
\t\tpath: '${entityRoute}/new',
\t\tload: () => import('../../routes/${entityRoute}/new/+page.svelte'),
\t},
\t{
\t\tpath: '${entityRoute}/:id/view',
\t\tload: () => import('../../routes/${entityRoute}/[id]/view/+page.svelte'),
\t},
\t{
\t\tpath: '${entityRoute}/:id/edit',
\t\tload: () => import('../../routes/${entityRoute}/[id]/edit/+page.svelte'),
\t},
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
				if (oldSvelteBlueprintVersion && lt(oldSvelteBlueprintVersion, '1.2.0')) {
					this.removeFile(`.eslintrc.json`);
					this.removeFile(`.eslintignore`);
				}
			},
			async writingTemplateTask({ application }) {
				await this.writeFiles({
					sections: svelteFiles,
					context: { ...application, swaggerUi: this.swaggerUi, jest: this.jest },
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
				for (const entity of entities.filter(entity => shouldWriteEntityClient(application, entity))) {
					await this.writeFiles({
						sections: entitySvelteFiles,
						context: { ...application, ...entity, swaggerUi: this.swaggerUi, jest: this.jest },
					});
				}
			},
			async writeUserService({ application, entities }) {
				if (
					entities
						.filter(entity => shouldWriteEntityClient(application, entity))
						.some(entity => entity.relationships.some(rel => rel.otherEntity.builtInUser))
				) {
					this.writeFile(
						`${TEMPLATES_WEBAPP_SOURCES_DIR}app/lib/entities/user/user-service.js.ejs`,
						`${application.clientSrcDir}app/lib/entities/user/user-service.js`,
						application,
					);
				}
			},
			writeEnumerations({ application, entities }) {
				for (const entity of entities.filter(entity => shouldWriteEntityClient(application, entity))) {
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

				if (this.swaggerUi) {
					const swaggerPackageJson = JSON.parse(this.readTemplate('swagger/package.json'));
					this.packageJson.merge(swaggerPackageJson);
				}

				const unitFrameworkType = this.jest ? 'jest' : 'vitest';

				const unitPackageJson = JSON.parse(this.readTemplate(`${unitFrameworkType}/package.json`));
				this.packageJson.merge(unitPackageJson);

				const javaPrettierPackageJson = JSON.parse(this.readTemplate(`java-prettier/package.json`));
				this.packageJson.merge(javaPrettierPackageJson);

				this.packageJson.merge({
					devDependencies: {
						'prettier-plugin-java': application.nodeDependencies['prettier-plugin-java'],
					},
				});

				if (application.microfrontend) {
					this.packageJson.merge({
						devDependencies: {
							'@module-federation/vite': '1.15.4',
						},
					});
				}
			},
		});
	}

	get [BaseApplicationGenerator.POST_WRITING_ENTITIES]() {
		return this.asPostWritingEntitiesTaskGroup({
			async postWritingEntitiesTemplateTask({ application, entities, source }) {
				for (const entity of entities.filter(entity => shouldWriteEntityClient(application, entity))) {
					const entityRoute =
						application.applicationTypeMicroservice && application.microfrontend
							? entity.entityPage
							: `entities/${entity.entityFolderName}`;
					source.addEntityToMenu({
						entityClass: entity.entityAngularName,
						entityRoute,
						entityName: entity.entityClassHumanized,
					});
					source.addEntityToMicrofrontendRoutes({
						entityRoute,
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
