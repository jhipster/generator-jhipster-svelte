import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cli = join(root, 'cli/jsvelte.cjs');
const temporary = join(root, 'test/temp');
mkdirSync(temporary, { recursive: true });

function generate(authenticationType, options = []) {
	const cwd = mkdtempSync(join(temporary, 'playwright-'));
	const jdl = readFileSync(join(root, '.github/workflows/scripts/monolithic-session-maven.jdl'), 'utf8');
	writeFileSync(
		join(cwd, 'app.jdl'),
		jdl.replace('authenticationType session', `authenticationType ${authenticationType}`),
	);
	run(cwd, ['import-jdl', 'app.jdl', ...options]);
	return cwd;
}

function run(cwd, args) {
	try {
		execFileSync(
			process.execPath,
			[cli, ...args, '--skip-install', '--skip-git', '--skip-checks', '--no-insight', '--force'],
			{
				cwd,
				timeout: 120000,
				maxBuffer: 10 * 1024 * 1024,
				stdio: 'pipe',
			},
		);
	} catch (error) {
		throw new Error(`${error.stdout}\n${error.stderr}`, { cause: error });
	}
}

const json = (cwd, file) => JSON.parse(readFileSync(join(cwd, file), 'utf8'));

test('Cypress remains the default without a Playwright dependency or tests', () => {
	const cwd = generate('session');
	const pkg = json(cwd, 'package.json');
	assert.equal(pkg.scripts['e2e:ci'], 'cypress run --browser chrome');
	assert.equal(pkg.devDependencies['@playwright/test'], undefined);
	assert.equal(existsSync(join(cwd, 'playwright.config.js')), false);
	assert.equal(existsSync(join(cwd, 'cypress/integration/login.spec.js')), true);
});

test('Playwright selection persists when the application and entities are regenerated', () => {
	const cwd = generate('jwt', ['--playwright']);
	run(cwd, []);
	assert.equal(json(cwd, '.yo-rc.json')['generator-jhipster-svelte'].playwright, true);
	const pkg = json(cwd, 'package.json');
	assert.equal(pkg.scripts['e2e:playwright'], 'playwright test');
	assert.equal(pkg.devDependencies['@playwright/test'], '1.62.1');
	assert.equal(existsSync(join(cwd, 'playwright/entities/sample-blob-entity.spec.js')), true);
	assert.match(readFileSync(join(cwd, 'playwright/support/auth.js'), 'utf8'), /sessionStorage.getItem/);
	assert.match(readFileSync(join(cwd, 'vite.config.js'), 'utf8'), /configDefaults\.exclude, 'playwright\/\*\*'/);
	assert.equal(existsSync(join(cwd, 'cypress/integration/login.spec.js')), true);
});

test('session and Jest generate CSRF-aware Playwright tests', () => {
	const cwd = generate('session', ['--playwright', '--jest']);
	assert.equal(existsSync(join(cwd, 'playwright/account.spec.js')), true);
	assert.equal(existsSync(join(cwd, 'jest.config.cjs')), true);
	assert.match(readFileSync(join(cwd, 'playwright/support/auth.js'), 'utf8'), /X-XSRF-TOKEN/);
});

test('OAuth2 omits local login and account management tests', () => {
	const cwd = generate('oauth2', ['--playwright']);
	assert.equal(existsSync(join(cwd, 'playwright/home.spec.js')), true);
	assert.equal(existsSync(join(cwd, 'playwright/login.spec.js')), false);
	assert.equal(existsSync(join(cwd, 'playwright/account.spec.js')), false);
	assert.equal(existsSync(join(cwd, 'playwright/users.spec.js')), false);
	assert.match(readFileSync(join(cwd, 'playwright/support/auth.js'), 'utf8'), /Keycloak/);
});
