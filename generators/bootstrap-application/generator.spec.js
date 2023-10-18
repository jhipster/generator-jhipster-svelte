import { beforeAll, describe, expect, it } from 'vitest';

import { defaultHelpers as helpers, result } from 'generator-jhipster/testing';

const SUB_GENERATOR = 'bootstrap-application';
const BLUEPRINT_NAMESPACE = `jhipster:${SUB_GENERATOR}`;

describe('SubGenerator bootstrap-application of svelte JHipster blueprint', () => {
	describe('run', () => {
		beforeAll(async function () {
			await helpers
				.run(BLUEPRINT_NAMESPACE)
				.withJHipsterConfig()
				.withOptions({
					ignoreNeedlesError: true,
					blueprint: 'svelte',
				})
				.withJHipsterLookup()
				.withParentBlueprintLookup();
		});

		it('should succeed', () => {
			expect(result.getStateSnapshot()).toMatchSnapshot();
		});
	});
});
