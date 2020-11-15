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
				'.eslintignore',
				'.eslintrc.json',
				'cypress.json',
				'package.json',
				'postcss.config.js',
				'rollup.config.js',
				'tailwind.config.js',
			],
		},
	],
	e2e: [
		{
			templates: [
				'cypress/integration/home.spec.js',
				'cypress/integration/login.spec.js',
				'cypress/integration/account/register.spec.js',
				'cypress/integration/account/settings.spec.js',
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
			],
		},
	],
	components: [
		{
			path: FRONTEND_COMPONENTS_DIR,
			templates: [
				'account/account-service.js',
				'account/Password.svelte',
				'account/PasswordConfirm.svelte',
				'Alert.svelte',
				'InputControl.svelte',
				'auth/auth-service.js',
				'auth/auth-store.js',
				'layout/AccountMenu.svelte',
				'layout/Footer.svelte',
				'layout/Navbar.svelte',
				'layout/NavItem.svelte',
			],
		},
	],
};

function writeFiles() {
	mkdirp(FRONTEND_SRC_DIR);
	this.writeFilesToDisk(svelteFiles, this, false, `${CLIENT_TEMPLATES_DIR}`);
}
