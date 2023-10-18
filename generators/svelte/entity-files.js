import { clientSrcTemplatesBlock } from 'generator-jhipster/generators/client/support';

export const entitySvelteFiles = {
	entityRoutes: [
		clientSrcTemplatesBlock({
			relativePath: 'app/routes/entities/',
			renameTo: (_data, filepath) => filepath.replace('.svelte', '/+page.svelte').replace('index/', ''),
			templates: [
				'_entityFolder_/index.svelte',
				'_entityFolder_/new.svelte',
				'_entityFolder_/[id]/view.svelte',
				'_entityFolder_/[id]/edit.svelte',
			],
		}),
	],
	entityLib: [
		clientSrcTemplatesBlock({
			relativePath: 'app/lib/entities/',
			templates: [
				'_entityFolder_/_entityFile_-table.svelte',
				'_entityFolder_/_entityFile_-table.spec.js',
				'_entityFolder_/_entityFile_-form.svelte',
				'_entityFolder_/_entityFile_-service.js',
			],
		}),
	],
	entityE2eTests: [
		{
			renameTo: (data, filepath) =>
				filepath.replaceAll('_entityFile_', data.entityFileName).replaceAll('_entityFolder_', data.entityFolderName),
			templates: [
				'cypress/integration/entities/_entityFolder_/_entityFile_-delete.spec.js',
				'cypress/integration/entities/_entityFolder_/_entityFile_-list.spec.js',
				'cypress/integration/entities/_entityFolder_/_entityFile_-view.spec.js',
				'cypress/integration/entities/_entityFolder_/_entityFile_-create.spec.js',
				'cypress/integration/entities/_entityFolder_/_entityFile_-update.spec.js',
				'cypress/support/entities/_entityFile_-util.js',
			],
		},
	],
};
