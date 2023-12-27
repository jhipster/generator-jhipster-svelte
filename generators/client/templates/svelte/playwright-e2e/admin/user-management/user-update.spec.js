import { test, expect } from "@playwright/test";

test.describe('Update user page', () => {
    let randomUser;

    test.beforeEach(async ({ page }) => {
        randomUser = 'test' + new Date().getTime();

        /*
        *
        * LOGIN API FUNCTION TO BE HERE
        *
        */

        /*
        *
        * SAVE USER FUNCTION TO BE HERE
        *
        */
    });

    test.afterEach(async ({ page }) => {
        /*
        *
        * DELETE USER FUNCTION TO BE HERE
        *
        */
    });

    test('should greet with update user title', async ({ page }) => {
        await expect(page.getByTestId('userMgmtTitle')).toHaveText('Update user account');
    });

    test('should be populated and have a valid state', async ({ page }) => {
        await expect(page.getByLabel('Username*')).toHaveValue(`${randomUser}`);
        await expect(page.getByLabel('First Name')).toHaveValue('john');
        await expect(page.getByLabel('Last Name')).toHaveValue('doe');
        await expect(page.getByLabel('Email*')).toHaveValue(`${randomUser}@localhost.org`);
        await expect(page.getByRole('USER_ROLE')).toBeChecked();
        await expect(page.locator('[data-testid=roles-options] input[type=checkbox]').nth(1)).toBeChecked();
        await expect(page.getByRole('button', { name: 'Update new account' })).toBeEnabled();
    });

    test('should require username', async ({ page }) => {
        await page.getByLabel('Username*').fill('');

        await expect(page.getByTestId('username-error')).toHaveText('Username is mandatory');
    });

    test('should require email', async ({ page }) => {
        await page.getByLabel('Email*').fill('');

        await expect(page.getByTestId('email-error')).toHaveText('Email is mandatory');
    });

    test('should require roles', async ({ page }) => {
		await page.getByLabel('Expand select options').click();
		await page.getByText('ROLE_USER').dblclick();
		await page.getByLabel('Expand select options').click();

        await expect(page.getByTestId('roles-error')).toHaveText('Select at least one role');
    });

    test('should navigate back to the user list page', async ({ page }) => {
        await page.getByRole('button', { name: 'Cancel'}).click();
        await expect(page).toHaveURL('/admin/user-management');
        await expect(page.getByTestId('userMgmtTitle')).toHaveText('Users');
    });

    test('should update user account details', async ({ page }) => {
        await page.getByLabel('Username*').fill(`${randomUser}`);
        await page.getByLabel('First Name').fill('john');
        await page.getByLabel('Last Name').fill('doe');
        await page.getByLabel('Email*').fill(`${randomUser}@localhost.org`);
		await page.getByLabel('Expand select options').click();
		await page.getByText('ROLE_USER').click();
		await page.getByLabel('Expand select options').click();

        await expect(page.getByRole('button', { name: 'Update user account' })).toBeEnabled();
        await page.getByRole('button', { name: 'Update user account' }).click();

        await expect(page.getByTestId('toast-success')).toHaveText('A user is updated with identifier');
        await expect(page).toHaveURL('/admin/user-management');
        await expect(page.getByTestId('userMgmtTitle')).toHaveText('Users');
    });
});

