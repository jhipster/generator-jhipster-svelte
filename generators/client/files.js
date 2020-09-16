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
	static: [
		{
			path: FRONTEND_SRC_DIR,
			templates: [
				{ file: 'static/img/jhipster_family_member_0.svg', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_1.svg', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_2.svg', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_3.svg', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_0_head-192.png', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_1_head-192.png', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_2_head-192.png', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_3_head-192.png', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_0_head-256.png', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_1_head-256.png', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_2_head-256.png', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_3_head-256.png', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_0_head-384.png', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_1_head-384.png', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_2_head-384.png', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_3_head-384.png', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_0_head-512.png', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_1_head-512.png', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_2_head-512.png', method: 'copy' },
				{ file: 'static/img/jhipster_family_member_3_head-512.png', method: 'copy' },
				{ file: 'static/img/logo-jhipster.png', method: 'copy' },
				{ file: 'static/favicon.ico', method: 'copy' },
				'static/global.css',
				'static/manifest.json',
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
			],
		},
	],
	routes: [
		{
			path: FRONTEND_ROUTES_DIR,
			templates: ['_error.svelte', '_layout.svelte', 'index.svelte', 'login.svelte'],
		},
	],
	components: [
		{
			path: FRONTEND_COMPONENTS_DIR,
			templates: [
				'Alert.svelte',
				'InputControl.svelte',
				'auth/auth-service.js',
				'auth/auth-store.js',
				'layout/AccountMenu.svelte',
				'layout/Footer.svelte',
				'layout/Navbar.svelte',
				'layout/NavItem.svelte',
				'svg/AppAvatar.svelte',
				'svg/AppLogo.svelte',
			],
		},
	],
};

function writeFiles() {
	mkdirp(FRONTEND_SRC_DIR);
	this.writeFilesToDisk(svelteFiles, this, false, `${CLIENT_TEMPLATES_DIR}`);
}
