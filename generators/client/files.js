const mkdirp = require('mkdirp');
const constants = require('generator-jhipster/generators/generator-constants');

const FRONTEND_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR;
const FRONTEND_APP_DIR = constants.ANGULAR_DIR;
const FRONTEND_ROUTES_DIR = `${FRONTEND_APP_DIR}/routes/`;
const FRONTEND_COMPONENTS_DIR = `${FRONTEND_APP_DIR}/components/`;
const CLIENT_TEMPLATES_DIR = 'svelte';

module.exports = {
	writeFiles,
};

const svelteFiles = {
	base: [
		{
			templates: [
				'.babelrc.json',
				'.eslintignore',
				'.eslintrc.json',
				'cypress.json',
				{
					file: generator => `package-template.json`,
					renameTo: () => `package.json`,
				},
				'jest.config.js',
				'postcss.config.js',
				'rollup.config.js',
				'tailwind.config.js',
			],
		},
	],
	e2e: [
		{
			templates: [
				'cypress/integration/footer.spec.js',
				'cypress/integration/home.spec.js',
				'cypress/integration/login.spec.js',
				'cypress/integration/navbar.spec.js',
				'cypress/integration/routes.spec.js',
				'cypress/integration/account/change-password.spec.js',
				'cypress/integration/account/register.spec.js',
				'cypress/integration/account/settings.spec.js',
				'cypress/integration/account/reset/init-password.spec.js',
				'cypress/integration/admin/user-management/user-create.spec.js',
				'cypress/integration/admin/user-management/user-delete.spec.js',
				'cypress/integration/admin/user-management/user-list.spec.js',
				'cypress/integration/admin/user-management/user-update.spec.js',
				'cypress/integration/admin/user-management/user-view.spec.js',
				'cypress/plugins/index.js',
				'cypress/support/index.js',
				'cypress/support/commands.js',
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
				{ file: 'static/img/logo-jhipster.png', method: 'copy' },
				{ file: 'static/favicon.ico', method: 'copy' },
				'static/global.css',
				'static/manifest.json',
				{
					file: generator => `static/img/${generator.hipster}.svg`,
					renameTo: () => `app/components/svg/AppAvatar.svelte`,
					method: 'copy',
				},
				{
					file: generator => `static/img/logo-jhipster-long.svg`,
					renameTo: () => `app/components/svg/AppLogo.svelte`,
					method: 'copy',
				},
			],
		},
	],
	app: [
		{
			path: FRONTEND_APP_DIR,
			templates: [
				'client.js',
				'server.js',
				'service-worker.js',
				'tailwind.css',
				'template.html',
				'utils/date.js',
				'utils/env.js',
				'utils/request.js',
				'utils/validator.js',
			],
		},
	],
	routes: [
		{
			path: FRONTEND_ROUTES_DIR,
			templates: [
				'_error.svelte',
				'_layout.svelte',
				'index.svelte',
				'login.svelte',
				'account/activate.svelte',
				'account/password.svelte',
				'account/register.svelte',
				'account/settings.svelte',
				'account/reset/finish.svelte',
				'account/reset/init.svelte',
				'admin/_layout.svelte',
				'admin/user-management/index.svelte',
				'admin/user-management/new.svelte',
				'admin/user-management/[id]/edit.svelte',
				'admin/user-management/[id]/view.svelte',
			],
		},
	],
	components: [
		{
			path: FRONTEND_COMPONENTS_DIR,
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
				'admin/user-management/UserListActions.svelte',
				'admin/user-management/UserTable.svelte',
				'admin/user-management/__tests__/user-list-actions.spec.js',
				'admin/user-management/__tests__/user-table.spec.js',
				'page/Page.svelte',
				'page/PageHeader.svelte',
				'page/Form.svelte',
				'page/Record.svelte',
				'Alert.svelte',
				'Button.svelte',
				'CheckboxControl.svelte',
				'InputControl.svelte',
				'Modal.svelte',
				'SelectControl.svelte',
				'auth/auth-service.js',
				'auth/auth-store.js',
				'auth/AuthGuard.svelte',
				'auth/RoleGuard.svelte',
				'layout/AccountMenu.svelte',
				'layout/AdminMenu.svelte',
				'layout/Footer.svelte',
				'layout/MenuItem.svelte',
				'layout/Navbar.svelte',
				'layout/NavItem.svelte',
				'layout/ThemeToggle.svelte',
				'table/Pagination.svelte',
				'table/Sort.svelte',
				'table/Table.svelte',
				'table/TableData.svelte',
				'table/TableHeader.svelte',
				'table/TableRow.svelte',
				'user/user-service.js',
			],
		},
	],
};

function writeFiles() {
	mkdirp(FRONTEND_SRC_DIR);
	this.writeFilesToDisk(svelteFiles, this, false, `${CLIENT_TEMPLATES_DIR}`);
}
