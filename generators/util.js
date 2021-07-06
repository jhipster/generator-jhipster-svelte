const jhipsterUtils = require('generator-jhipster/generators/utils');
const constants = require('generator-jhipster/generators/generator-constants');

const CLIENT_MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR;

module.exports = {
	addEntityToMenu,
};

function addEntityToMenu(generator, entityRoute, entityName, entityClass) {
	jhipsterUtils.rewriteFile(
		{
			file: `${CLIENT_MAIN_SRC_DIR}/app/lib/layout/EntityMenu.svelte`,
			needle: 'jhipster-needle-add-entity-to-menu',
			splicable: [
				// prettier-ignore
				`\t\t<MenuItem
\t\t\ttestId="svl${entityClass}MgmtLink"
\t\t\tlink="/entities/${entityRoute}"
\t\t\ton:click="{() => (isOpen = false)}"
\t\t>
\t\t\t<Icon classes="sm:mr-1" icon="{faAsterisk}" />
\t\t\t${entityName}
\t\t</MenuItem>`,
			],
		},
		generator
	);
}
