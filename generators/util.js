import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

export const getPackageJson = () => {
	return JSON.parse(readFileSync(join(fileURLToPath(import.meta.url), '../../package.json')).toString());
};

export const configureSvelteClient = config => {
	config.clientFramework = 'svelte';
	config.clientTheme = 'none';
	config.clientThemeVariant = '';
	config.withAdminUi = false;
	config.clientPackageManager = 'npm';

	if (config.microfrontend) {
		config.skipClient = false;
	}
};

export const prepareSvelteMicrofrontends = (application, config = {}) => {
	if (config.microfrontend !== undefined) {
		application.microfrontend = config.microfrontend;
	}
	if (config.microfrontends !== undefined) {
		application.microfrontends = config.microfrontends;
	}

	if (application.microfrontends?.length) {
		application.microfrontends = application.microfrontends.map(microfrontend => {
			const baseName = microfrontend.baseName ?? microfrontend;
			const lowercaseBaseName = baseName.toLowerCase();
			return {
				...microfrontend,
				baseName,
				lowercaseBaseName,
				capitalizedBaseName: baseName.charAt(0).toUpperCase() + baseName.slice(1),
				endpointPrefix: `services/${lowercaseBaseName}`,
			};
		});
	}

	application.microfrontend =
		Boolean(application.microfrontend) ||
		(application.applicationTypeMicroservice && !application.skipClient) ||
		(application.applicationTypeGateway && Boolean(application.microfrontends?.length));

	if (application.microfrontend && application.applicationTypeMicroservice && !application.gatewayServerPort) {
		application.gatewayServerPort = 8080;
	}
};

//
// const jhipsterUtils = require('generator-jhipster/generators/utils');
// const constants = require('generator-jhipster/generators/generator-constants');
// const semver = require('semver');
// const path = require('path');
//
// const CLIENT_MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR;
//
// module.exports = {
// 	addEntityToMenu,
// 	isVersionLessThan,
// 	moveFile,
// 	pathFromSvelteBlueprint,
// };
//
// function addEntityToMenu(generator, entityRoute, entityName, entityClass) {
// 	jhipsterUtils.rewriteFile(
// 		{
// 			file: `${CLIENT_MAIN_SRC_DIR}/app/lib/entities/entity-menu.svelte`,
// 			needle: 'jhipster-needle-add-entity-to-menu',
// 			splicable: [
// 				// prettier-ignore
// 				`\t\t<MenuItem
// \t\t\ttestId="svl${entityClass}MgmtLink"
// \t\t\tlink="/entities/${entityRoute}"
// \t\t\ton:click="{() => (isOpen = false)}"
// \t\t>
// \t\t\t<Icon classes="sm:mr-1" icon="{faAsterisk}" />
// \t\t\t${entityName}
// \t\t</MenuItem>`,
// 			],
// 		},
// 		generator
// 	);
// }
//
// function isVersionLessThan(generator, version) {
// 	const oldVersion = generator.jhipsterContext.configOptions.oldSvelteBlueprintVersion;
// 	return oldVersion ? semver.lt(oldVersion, version) : false;
// }
//
// function moveFile(generator, source, destination) {
// 	generator.log(`Renaming file - ${source} to ${destination}`);
// 	generator.fs.move(source, destination, { noGlob: true });
// }
//
// function pathFromSvelteBlueprint(...subpath) {
// 	return path.join(__dirname, ...subpath);
// }
