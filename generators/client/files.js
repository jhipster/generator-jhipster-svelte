const constants = require('generator-jhipster/generators/generator-constants');
const { pathFromSvelteBlueprint } = require('../util');

const FRONTEND_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR;
const FRONTEND_APP_DIR = constants.ANGULAR_DIR;
const FRONTEND_ROUTES_DIR = `${FRONTEND_APP_DIR}/routes/`;
const FRONTEND_COMPONENTS_DIR = `${FRONTEND_APP_DIR}/lib/`;
const CLIENT_TEMPLATES_DIR = 'svelte';

const svelteFiles = {
	base: [
		{
			templates: [
				'.eslintignore',
				'.eslintrc.json',
				'.npmrc',
				'cypress.config.cjs',
				{
					file: generator => `package-template.json`,
					renameTo: () => `package.json`,
				},
				'jest.config.cjs',
				'jsconfig.json',
				'postcss.config.cjs',
				'svelte.config.js',
				'tailwind.config.cjs',
				'vite.config.js',
			],
		},
	],
	e2e: [
		{
			templates: [
				{
					file: generator => `${FRONTEND_SRC_DIR}static/img/${generator.hipster}_head-192.png`,
					renameTo: () => `cypress/fixtures/integration-test.png`,
					method: 'copy',
				},
				'cypress/integration/footer.spec.js',
				'cypress/integration/home.spec.js',
				'cypress/integration/navbar.spec.js',
				'cypress/integration/routes.spec.js',
				'cypress/integration/admin/logger.spec.js',
				'cypress/plugins/index.cjs',
				'cypress/support/index.js',
				'cypress/support/commands.js',
			],
		},
	],
	e2eGateway: [
		{
			condition: generator => generator.applicationType === 'gateway',
			templates: ['cypress/integration/admin/gateway.spec.js'],
		},
	],
	e2eLogin: [
		{
			condition: generator => generator.authenticationType !== 'oauth2',
			templates: ['cypress/integration/login.spec.js'],
		},
	],
	e2eUserManagement: [
		{
			condition: generator => !generator.skipUserManagement && generator.authenticationType !== 'oauth2',
			templates: [
				'cypress/integration/account/change-password.spec.js',
				'cypress/integration/account/register.spec.js',
				'cypress/integration/account/settings.spec.js',
				'cypress/integration/account/reset/init-password.spec.js',
				'cypress/integration/admin/user-management/user-create.spec.js',
				'cypress/integration/admin/user-management/user-delete.spec.js',
				'cypress/integration/admin/user-management/user-list.spec.js',
				'cypress/integration/admin/user-management/user-update.spec.js',
				'cypress/integration/admin/user-management/user-view.spec.js',
			],
		},
	],
	swagger: [
		{
			condition: generator => generator.blueprintConfig.swaggerUi,
			path: FRONTEND_SRC_DIR,
			templates: ['swagger-ui/index.html'],
		},
	],
	static: [
		{
			path: FRONTEND_SRC_DIR,
			templates: [
				{
					file: generator => `static/img/${generator.hipster}_head-192.png`,
					renameTo: () => `static/img/hipster-192.png`,
					method: 'copy',
				},
				{
					file: generator => `static/img/${generator.hipster}_head-512.png`,
					renameTo: () => `static/img/hipster-512.png`,
					method: 'copy',
				},
				{ file: 'static/favicon.ico', method: 'copy' },
				'static/web-manifest.json',
				{
					file: generator => `static/img/${generator.hipster}.svg`,
					renameTo: () => `app/lib/svg/app-avatar.svg`,
					method: 'copy',
				},
				{
					file: generator => `static/img/logo-jhipster-long.svg`,
					renameTo: () => `app/lib/svg/app-logo.svg`,
					method: 'copy',
				},
				{ file: 'static/img/logo-jhipster.png', method: 'copy' },
			],
		},
	],
	app: [
		{
			path: FRONTEND_APP_DIR,
			templates: ['app.html', 'global.css', 'service-worker.js', 'tailwind.css'],
		},
	],
	routes: [
		{
			path: FRONTEND_ROUTES_DIR,
			templates: [
				{ file: () => `__error.svelte`, renameTo: () => `+error.svelte` },
				{ file: () => `__layout.svelte`, renameTo: () => `+layout.svelte` },
				{ file: () => `index.svelte`, renameTo: () => `+page.svelte` },
				{ file: () => `admin/__layout.svelte`, renameTo: () => `admin/+layout.svelte` },
				{ file: () => `admin/logger.svelte`, renameTo: () => `admin/logger/+page.svelte` },
			],
		},
	],
	swaggerRoute: [
		{
			condition: generator => generator.blueprintConfig.swaggerUi,
			path: FRONTEND_ROUTES_DIR,
			templates: [{ file: () => `admin/docs.svelte`, renameTo: () => `admin/docs/+page.svelte` }],
		},
	],
	gatewayRoute: [
		{
			condition: generator => generator.applicationType === 'gateway',
			path: FRONTEND_ROUTES_DIR,
			templates: [{ file: () => `admin/gateway.svelte`, renameTo: () => `admin/gateway/+page.svelte` }],
		},
	],
	loginRoutes: [
		{
			condition: generator => generator.authenticationType !== 'oauth2',
			path: FRONTEND_ROUTES_DIR,
			templates: [{ file: () => `login.svelte`, renameTo: () => `login/+page.svelte` }],
		},
	],
	routesUserManagement: [
		{
			condition: generator => !generator.skipUserManagement && generator.authenticationType !== 'oauth2',
			path: FRONTEND_ROUTES_DIR,
			templates: [
				{ file: () => `account/activate.svelte`, renameTo: () => `account/activate/+page.svelte` },
				{ file: () => `account/password.svelte`, renameTo: () => `account/password/+page.svelte` },
				{ file: () => `account/register.svelte`, renameTo: () => `account/register/+page.svelte` },
				{ file: () => `account/settings.svelte`, renameTo: () => `account/settings/+page.svelte` },
				{ file: () => `account/reset/finish.svelte`, renameTo: () => `account/reset/finish/+page.svelte` },
				{ file: () => `account/reset/init.svelte`, renameTo: () => `account/reset/init/+page.svelte` },
				{
					file: () => `admin/user-management/index.svelte`,
					renameTo: () => `admin/user-management/+page.svelte`,
				},
				{
					file: () => `admin/user-management/new.svelte`,
					renameTo: () => `admin/user-management/new/+page.svelte`,
				},
				{
					file: () => `admin/user-management/[id]/edit.svelte`,
					renameTo: () => `admin/user-management/[id]/edit/+page.svelte`,
				},
				{
					file: () => `admin/user-management/[id]/view.svelte`,
					renameTo: () => `admin/user-management/[id]/view/+page.svelte`,
				},
			],
		},
	],
	lib: [
		{
			path: FRONTEND_COMPONENTS_DIR,
			templates: [
				'admin/logger/logger-service.js',
				'admin/logger/logger-table.svelte',
				'admin/logger/logger-table.spec.js',
				'auth/auth-service.js',
				'auth/auth-store.js',
				'auth/auth-guard.svelte',
				'auth/role-guard.svelte',
				'account/account-menu.svelte',
				'admin/admin-menu.svelte',
				'entities/entity-menu.svelte',
				'layout/footer.svelte',
				'layout/navbar.svelte',
				'utils/env.js',
			],
		},
	],
	libGateway: [
		{
			path: FRONTEND_COMPONENTS_DIR,
			condition: generator => generator.applicationType === 'gateway',
			templates: [
				'admin/gateway/gateway-service.js',
				'admin/gateway/gateway-table.svelte',
				'admin/gateway/service-instance-table.svelte',
			],
		},
	],
	libUserManagement: [
		{
			path: FRONTEND_COMPONENTS_DIR,
			condition: generator => !generator.skipUserManagement && generator.authenticationType !== 'oauth2',
			templates: [
				'account/account-service.js',
				'account/change-password-form.svelte',
				'account/forgot-password-form.svelte',
				'account/register-user-form.svelte',
				'account/reset-password-form.svelte',
				'account/user-settings-form.svelte',
				'admin/user-management/user-form.svelte',
				'admin/user-management/user-list-actions.spec.js',
				'admin/user-management/user-list-actions.svelte',
				'admin/user-management/user-table.spec.js',
				'admin/user-management/user-table.svelte',
				'admin/user-management/user-service.js',
			],
		},
	],
};

function writeFiles() {
	this.writeFilesToDisk(
		svelteFiles,
		this,
		false,
		pathFromSvelteBlueprint(`client/templates/${CLIENT_TEMPLATES_DIR}`)
	);
}

module.exports = {
	writeFiles,
};
