import { test, expect } from "@playwright/test";


test.describe('Register User', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/account/register');

    });

    test('should greet with Create user title', async ({ page }) => {
		await expect(page.getByTestId('registerTitle')).toHaveText('Create user account');
    });

    test ('should require mandatory fields', async ( { page }) => {
        await expect(page.getByRole('button', { name: 'Create account'})).toBeDisabled();
    });

    test ('should require username', async ({ page }) => {
        await page.getByLabel('Username*').fill('admin');
        await page.getByLabel('Username*').fill('');
		await expect(page.getByTestId('username-error')).toHaveText('Username is mandatory');
    });

    test('should require email', async ({ page }) => {
        await page.getByLabel('Email*').fill('admin@localhost.org');
        await page.getByLabel('Email*').fill('');
		await expect(page.getByTestId('email-error')).toHaveText('Email is mandatory');
    });

    test('should require valid Email*', async ({ page }) => {
        await page.getByLabel('Email*').fill('admin@localhost');
		await expect(page.getByTestId('email-error')).toHaveText('Email address is not valid');
    });

    test('should require password', async ({ page }) => {
        await page.getByLabel('Password*', { exact: true }).fill('password', { log: false });
        await page.getByLabel('Password*', { exact: true }).fill('');
		await expect(page.getByTestId('password-error')).toHaveText('Password is mandatory');
    });

    test('should require confirm password', async ({ page }) => {
        await page.getByLabel('Confirm Password*').fill('password', { log: false });
		await page.getByLabel('Confirm Password*').fill('');
		await expect(page.getByTestId('passwordConfirm-error')).toHaveText('Password and its confirmation do not match');
    });

    test('should require password and confirm password to match', async ({ page }) => {
        await page.getByLabel('Password*', { exact: true }).fill('abcd', { log: false });
        await page.getByLabel('Confirm Password*').fill('defg', { log: false });  // fills confirm password field
		await expect(page.getByTestId('passwordConfirm-error')).toHaveText('Password and its confirmation do not match');
    });

    test('should not allow user account creation with duplicate username', async ({ page }) => {
        await page.getByLabel('Username*').fill('admin');
        await page.getByLabel('Email*').fill('joe@localhost.org');
        await page.getByLabel('Password*', { exact: true }).fill('jondoe', { log: false });
        await page.getByLabel('Confirm Password*').fill('jondoe', { log: false });    // fills confirm password field
        await page.getByRole('button', { name: 'Create account' }).click();

        await expect(page.getByTestId('errorMsg')).toHaveText('Login name already in use. Please choose another one.');
    });

    test('should create a new user account', async ({ page }) => {
        await page.getByLabel('Username*').fill('jon');
        await page.getByLabel('Email*').fill('joe@localhost.org');
        await page.getByLabel('Password*', { exact: true }).fill('jondoe', { log: false });
        await page.getByLabel('Confirm Password*').fill('jondoe', { log: false });    // fills confirm password field
        await page.getByRole('button', { name: 'Create account' }).click();

        await expect(page.getByTestId('successMsg')).toHaveText('User account successfully created. Please check your email for confirmation.');
    });
});
