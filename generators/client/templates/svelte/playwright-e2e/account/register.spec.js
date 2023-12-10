import { test, expect } from "@playwright/test";


test.describe('Register User', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/account/register');

    });

    test('should greet with Create user title', async ({ page }) => {
        await page.locator('[data-testid="registerTitle"]').textContent().then((text) => {
            expect(text).toContain('Create user account');
        });
    });

    test ('should require mandatory fields', async ( { page }) => {
        await expect(page.getByRole('button', { name: 'Create account'})).toBeDisabled();
    });

    test ('should require username', async ({ page }) => {
        await page.getByLabel('username').fill('admin');
        await page.getByLabel('username').fill('');

        await page.locator('[data-testid="username-error"]').textContent().then((text) => {
            expect(text).toContain('Username is mandatory');
        });
    });

    test('should require email', async ({ page }) => {
        await page.getByLabel('email').fill('admin@localhost.org');
        await page.getByLabel('email').fill('');

        await page.locator('[data-testid="email-error"]').textContent().then((text) => {
            expect(text).toContain('Email is mandatory');
        });
    });
    
    test('should require valid email', async ({ page }) => {
        await page.getByLabel('email').fill('admin@localhost');

        await page.locator('[data-testid="email-error"]').textContent().then((text) => {
            expect(text).toContain('Email address is not valid');
        });
    });

    test('should require password', async ({ page }) => {
        await page.getByLabel('password').nth(0).fill('password', { log: false });
        await page.getByLabel('password').nth(0).fill('');

        await page.locator('[data-testid="password-error"]').textContent().then((text) => {
            expect(text).toContain('Password is mandatory');
        });
    });

    test('should require confirm password', async ({ page }) => {
        await page.getByLabel('password').nth(1).fill('password', { log: false });

        await page.locator('[data-testid="passwordConfirm-error"]').textContent().then((text) => {
            expect(text).toContain('Password and its confirmation do not match');
        });
    });

    test('should require password and confirm password to match', async ({ page }) => {
        await page.getByLabel('password').nth(0).fill('abcd', { log: false });
        await page.getByLabel('password').nth(1).fill('defg', { log: false });  // fills confirm password field

        await page.locator('[data-testid="passwordConfirm-error"]').textContent().then((text) => {
            expect(text).toContain('Password and its confirmation do not match');
        });
    });
/*
    test('should not allow user account creation with duplicate username', async ({ page }) => {
        await page.getByLabel('username').fill('admin');
        await page.getByLabel('email').fill('joe@localhost.org');
        await page.getByLabel('password').nth(0).fill('jondoe', { log: false });
        await page.getByLabel('password').nth(1).fill('jondoe', { log: false });    // fills confirm password field
        await page.getByRole('button', { name: 'Create account' }).click();

        expect(await page.locator('[data-testid="errorMsg"]').innerText()).toContain('Login name already in use. Please choose another one.');
    });
*/
    test('should create a new user account', async ({ page }) => {
        await page.getByLabel('username').fill('jon');
        await page.getByLabel('email').fill('joe@localhost.org');
        await page.getByLabel('password').nth(0).fill('jondoe', { log: false });
        await page.getByLabel('password').nth(1).fill('jondoe', { log: false });    // fills confirm password field
        await page.getByRole('button', { name: 'Create account' }).click();

        expect(await page.locator('[data-testid="successMsg"]').innerText()).toContain('User account successfully created. Please check your email for confirmation.');
    });
});
