import { TEMPLATES_WEBAPP_SOURCES_DIR } from 'generator-jhipster';

const FRONTEND_APP_DIR = `${TEMPLATES_WEBAPP_SOURCES_DIR}/app/`;
const FRONTEND_ROUTES_DIR = `${FRONTEND_APP_DIR}/routes/entities/`;
const FRONTEND_COMPONENTS_DIR = `${FRONTEND_APP_DIR}/lib/entities/`;

export default {
	entityRoutes: [
		{
			path: FRONTEND_ROUTES_DIR,
			templates: [
				{
					file: 'entity/index.svelte',
					renameTo: generator => `${generator.entityFolderName}/+page.svelte`,
				},
				{
					file: 'entity/new.svelte',
					renameTo: generator => `${generator.entityFolderName}/new/+page.svelte`,
				},
				{
					file: 'entity/[id]/view.svelte',
					renameTo: generator => `${generator.entityFolderName}/[id]/view/+page.svelte`,
				},
				{
					file: 'entity/[id]/edit.svelte',
					renameTo: generator => `${generator.entityFolderName}/[id]/edit/+page.svelte`,
				},
			],
		},
	],
	entityLib: [
		{
			path: FRONTEND_COMPONENTS_DIR,
			templates: [
				{
					file: 'entity/entity-table.svelte',
					renameTo: generator => `${generator.entityFolderName}/${generator.entityFileName}-table.svelte`,
				},
				{
					file: 'entity/entity-table.spec.js',
					renameTo: generator => `${generator.entityFolderName}/${generator.entityFileName}-table.spec.js`,
				},
				{
					file: 'entity/entity-form.svelte',
					renameTo: generator => `${generator.entityFolderName}/${generator.entityFileName}-form.svelte`,
				},
				{
					file: 'entity/entity-service.js',
					renameTo: generator => `${generator.entityFolderName}/${generator.entityFileName}-service.js`,
				},
			],
		},
	],
	entityE2eTests: [
		{
			templates: [
				{
					file: 'cypress/integration/entities/entity/entity-delete.spec.js',
					renameTo: generator =>
						`cypress/integration/entities/${generator.entityFolderName}/${generator.entityFileName}-delete.spec.js`,
				},
				{
					file: 'cypress/integration/entities/entity/entity-list.spec.js',
					renameTo: generator =>
						`cypress/integration/entities/${generator.entityFolderName}/${generator.entityFileName}-list.spec.js`,
				},
				{
					file: 'cypress/integration/entities/entity/entity-view.spec.js',
					renameTo: generator =>
						`cypress/integration/entities/${generator.entityFolderName}/${generator.entityFileName}-view.spec.js`,
				},
				{
					file: 'cypress/integration/entities/entity/entity-create.spec.js',
					renameTo: generator =>
						`cypress/integration/entities/${generator.entityFolderName}/${generator.entityFileName}-create.spec.js`,
				},
				{
					file: 'cypress/integration/entities/entity/entity-update.spec.js',
					renameTo: generator =>
						`cypress/integration/entities/${generator.entityFolderName}/${generator.entityFileName}-update.spec.js`,
				},
				{
					file: 'cypress/support/entities/entity-util.js',
					renameTo: generator => `cypress/support/entities/${generator.entityFileName}-util.js`,
				},
			],
		},
	],
};
