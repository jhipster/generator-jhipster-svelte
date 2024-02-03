const constants = require('generator-jhipster/generators/generator-constants');
const generatorUtils = require('generator-jhipster/generators/utils');
const { pathFromSvelteBlueprint, addEntityToMenu } = require('../util');

const FRONTEND_APP_DIR = constants.ANGULAR_DIR;
const FRONTEND_ROUTES_DIR = `${FRONTEND_APP_DIR}/routes/entities/`;
const FRONTEND_COMPONENTS_DIR = `${FRONTEND_APP_DIR}/lib/entities/`;
const CLIENT_TEMPLATES_DIR = 'svelte';

module.exports = {
	writeFiles,
};

const svelteFiles = {
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

function addEnumerationFiles(generator) {
	generator.fields.forEach(field => {
		if (field.fieldIsEnum === true) {
			const enumInfo = {
				...generatorUtils.getEnumInfo(field, generator.clientRootFolder),
				frontendAppName: generator.frontendAppName,
				packageName: generator.packageName,
			};
			const destinationFile = generator.destinationPath(
				`${FRONTEND_COMPONENTS_DIR}enums/${field.fieldType.toLowerCase()}.js`,
			);
			generator.template(
				pathFromSvelteBlueprint(`entity-client/templates/${FRONTEND_COMPONENTS_DIR}enums/enum.js.ejs`),
				destinationFile,
				generator,
				{},
				enumInfo,
			);
		}
	});
}

function addUserServiceFile(generator) {
	const containsUserRelationshipField = generator.relationships.filter(
		relationship => relationship.otherEntityName === 'user',
	);
	if (containsUserRelationshipField) {
		generator.template(
			pathFromSvelteBlueprint(
				`entity-client/templates/${FRONTEND_COMPONENTS_DIR}user/user-service.js.ejs`,
			),
			generator.destinationPath(`${FRONTEND_COMPONENTS_DIR}user/user-service.js`),
			generator,
		);
	}
}

function writeFiles() {
	if (this.skipClient) {
		return;
	}
	addEnumerationFiles(this);
	addUserServiceFile(this);
	this.writeFilesToDisk(
		svelteFiles,
		this,
		false,
		pathFromSvelteBlueprint(`entity-client/templates/${CLIENT_TEMPLATES_DIR}`),
	);
	addEntityToMenu(this, this.entityFolderName, this.entityClassHumanized, this.entityAngularName);
}
