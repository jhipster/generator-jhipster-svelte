const constants = require('generator-jhipster/generators/generator-constants');

const FRONTEND_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR;
const FRONTEND_APP_DIR = constants.ANGULAR_DIR;
const FRONTEND_ROUTES_DIR = `${FRONTEND_APP_DIR}/routes/`;
const FRONTEND_COMPONENTS_DIR = `${FRONTEND_APP_DIR}/lib/`;
const CLIENT_TEMPLATES_DIR = 'svelte';

module.exports = {
	writeFiles,
};

const svelteFiles = {
	base: [
		{
			templates: [
				'.eslintignore',
				'.eslintrc.json',
				'cypress.json',
				{
					file: generator => `package-template.json`,
					renameTo: () => `package.json`,
				},
				'jest.config.cjs',
				'jsconfig.json',
				'postcss.config.cjs',
				'svelte.config.js',
				'tailwind.config.cjs',
			],
		},
	],
	e2e: [
		{
			templates: [
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
				'static/manifest.json',
				{
					file: generator => `static/img/${generator.hipster}.svg`,
					renameTo: () => `app/lib/svg/appAvatar.svg`,
					method: 'copy',
				},
				{
					file: generator => `static/img/logo-jhipster-long.svg`,
					renameTo: () => `app/lib/svg/appLogo.svg`,
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
				'__error.svelte',
				'__layout.svelte',
				'index.svelte',
				'admin/__layout.svelte',
				'admin/logger.svelte',
			],
		},
	],
	loginRoutes: [
		{
			condition: generator => generator.authenticationType !== 'oauth2',
			path: FRONTEND_ROUTES_DIR,
			templates: ['login.svelte'],
		},
	],
	routesUserManagement: [
		{
			condition: generator => !generator.skipUserManagement && generator.authenticationType !== 'oauth2',
			path: FRONTEND_ROUTES_DIR,
			templates: [
				'account/activate.svelte',
				'account/password.svelte',
				'account/register.svelte',
				'account/settings.svelte',
				'account/reset/finish.svelte',
				'account/reset/init.svelte',
				'admin/user-management/index.svelte',
				'admin/user-management/new.svelte',
				'admin/user-management/[id]/edit.svelte',
				'admin/user-management/[id]/view.svelte',
			],
		},
	],
	lib: [
		{
			path: FRONTEND_COMPONENTS_DIR,
			templates: [
				'admin/logger/logger-service.js',
				'admin/logger/LoggerTable.svelte',
				'admin/logger/LoggerTable.spec.js',
				'page/BinaryRecord.svelte',
				'page/Page.svelte',
				'page/PageHeader.svelte',
				'page/Form.svelte',
				'page/SearchForm.svelte',
				'page/Record.svelte',
				'Alert.svelte',
				'Button.svelte',
				'CheckboxControl.svelte',
				'Icon.svelte',
				'InputControl.svelte',
				'Modal.svelte',
				'SearchControl.svelte',
				'SelectControl.svelte',
				'auth/auth-service.js',
				'auth/auth-store.js',
				'auth/AuthGuard.svelte',
				'auth/RoleGuard.svelte',
				'layout/AccountMenu.svelte',
				'layout/AdminMenu.svelte',
				'layout/EntityMenu.svelte',
				'layout/Footer.svelte',
				'layout/MenuItem.svelte',
				'layout/Navbar.svelte',
				'layout/NavItem.svelte',
				'layout/ThemeModeToggle.svelte',
				'notification/notification-store.js',
				'notification/Notification.svelte',
				'notification/Toast.svelte',
				'table/PaginatedTable.svelte',
				'table/Pagination.svelte',
				'table/Sort.svelte',
				'table/Table.svelte',
				'table/TableData.svelte',
				'table/TableHeader.svelte',
				'table/TableRow.svelte',
				'utils/date.js',
				'utils/data-util.js',
				'utils/env.js',
				'utils/request.js',
				'utils/validator.js',
			],
		},
	],
	libUserManagement: [
		{
			path: FRONTEND_COMPONENTS_DIR,
			condition: generator => !generator.skipUserManagement && generator.authenticationType !== 'oauth2',
			templates: [
				'account/account-service.js',
				'account/ChangePasswordForm.svelte',
				'account/ForgotPasswordForm.svelte',
				'account/Password.svelte',
				'account/PasswordConfirm.svelte',
				'account/RegisterUserForm.svelte',
				'account/ResetPasswordForm.svelte',
				'account/UserSettingsForm.svelte',
				'admin/user-management/UserDeleteModal.svelte',
				'admin/user-management/UserForm.svelte',
				'admin/user-management/UserListActions.spec.js',
				'admin/user-management/UserListActions.svelte',
				'admin/user-management/UserTable.spec.js',
				'admin/user-management/UserTable.svelte',
				'admin/user-management/user-service.js',
			],
		},
	],
};

function writeFiles() {
	this.writeFilesToDisk(svelteFiles, this, false, `${CLIENT_TEMPLATES_DIR}`);
}
