import { TEMPLATES_WEBAPP_SOURCES_DIR } from 'generator-jhipster';

const FRONTEND_APP_DIR = `${TEMPLATES_WEBAPP_SOURCES_DIR}/app/`;
const FRONTEND_ROUTES_DIR = `${FRONTEND_APP_DIR}/routes/`;
const FRONTEND_COMPONENTS_DIR = `${FRONTEND_APP_DIR}/lib/entities/`;
const entityRoute = generator => generator.svelteEntityRoute ?? `entities/${generator.entityFolderName}`;

export default {
	entityRoutes: [
		{
			path: FRONTEND_ROUTES_DIR,
			templates: [
				{
					file: 'entities/entity/index.svelte',
					renameTo: generator => `${entityRoute(generator)}/+page.svelte`,
				},
				{
					file: 'entities/entity/new.svelte',
					renameTo: generator => `${entityRoute(generator)}/new/+page.svelte`,
				},
				{
					file: 'entities/entity/[id]/view.svelte',
					renameTo: generator => `${entityRoute(generator)}/[id]/view/+page.svelte`,
				},
				{
					file: 'entities/entity/[id]/edit.svelte',
					renameTo: generator => `${entityRoute(generator)}/[id]/edit/+page.svelte`,
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
