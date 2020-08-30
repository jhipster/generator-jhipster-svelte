const mkdirp = require('mkdirp');
const constants = require('generator-jhipster/generators/generator-constants');

const FRONTEND_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR;
const FRONTEND_APP_DIR = constants.ANGULAR_DIR;
const CLIENT_TEMPLATES_DIR = 'svelte';

module.exports = {
	writeFiles,
};

const svelteFiles = {
	base: [
		{
			templates: [
				'rollup.config.js',
				'README.md',
				'package.json',
				'cypress.json',
				'.prettierrc.json',
				'.prettierignore',
				'.huskyrc.json',
				'.gitignore',
				'.eslintrc.json',
				'.eslintignore',
				'.editorconfig',
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
				'template.html',
				'service-worker.js',
				'server.js',
				'client.js',
				'routes/_error.svelte',
				'routes/_layout.svelte',
				'routes/about.svelte',
				'routes/index.svelte',
				'components/Nav.svelte',
			],
		},
	],
};

function writeFiles() {
	mkdirp(FRONTEND_SRC_DIR);
	this.writeFilesToDisk(svelteFiles, this, false, `${CLIENT_TEMPLATES_DIR}`);
}
