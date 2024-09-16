import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: ['**/coverage', 'generators/**/templates', '**/node_modules', '**/travis', '**/docs'],
	},
	...compat.extends('plugin:prettier/recommended'),
	{
		languageOptions: {
			globals: {
				...globals.node,
			},

			ecmaVersion: 'latest',
			sourceType: 'module',
		},

		rules: {
			'prettier/prettier': 'error',
			'no-use-before-define': [2, 'nofunc'],

			'no-unused-vars': [
				2,
				{
					vars: 'local',
					args: 'none',
				},
			],

			'no-underscore-dangle': 'off',
			'prefer-destructuring': 'off',
			'no-multi-assign': 'off',
		},
	},
];
