import { beforeAll, describe, expect, it } from 'vitest';

import { defaultHelpers as helpers, result } from 'generator-jhipster/testing';

const SUB_GENERATOR = 'svelte';
const SUB_GENERATOR_NAMESPACE = `jhipster-svelte:${SUB_GENERATOR}`;

const entitySimple = {
	name: 'Simple',
	changelogDate: '20220129000100',
	jpaMetamodelFiltering: true,
	fields: [{ fieldName: 'simpleName', fieldType: 'String' }],
};

const entityAnotherSimple = {
	name: 'AnotherSimple',
	changelogDate: '20220129000200',
	fields: [{ fieldName: 'simpleName', fieldType: 'String' }],
	dto: 'mapstruct',
	service: 'serviceImpl',
	pagination: 'pagination',
	clientRootFolder: 'test-root',
};

const entitySkipClient = {
	name: 'SkipClient',
	changelogDate: '20220129000400',
	skipClient: true,
	fields: [{ fieldName: 'skipClientName', fieldType: 'String' }],
};

const entityWithEnum = {
	name: 'SkipClient',
	changelogDate: '20220129000400',
	skipClient: true,
	fields: [{ fieldName: 'skipClientName', fieldType: 'MyEnum', fieldValues: 'FRENCH,ENGLISH' }],
};

describe('SubGenerator svelte of svelte JHipster blueprint', () => {
	describe('run', () => {
		beforeAll(async function () {
			await helpers
				.run(SUB_GENERATOR_NAMESPACE)
				.withJHipsterConfig({}, [entitySimple, entityAnotherSimple, entitySkipClient, entityWithEnum])
				.withOptions({
					ignoreNeedlesError: true,
					blueprints: 'svelte',
				})
				.withJHipsterLookup()
				.withParentBlueprintLookup();
		});

		it('should succeed', () => {
			expect(result.getStateSnapshot()).toMatchSnapshot();
		});
	});
});
