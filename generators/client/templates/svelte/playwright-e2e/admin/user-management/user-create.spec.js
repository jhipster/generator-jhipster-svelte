import { test, expect } from "@playwright/test";
const { ApiEndPoint } = require('../../api-pom.js');

test.describe('Create user page', () => {
	let apiEndPoint;

    test.beforeEach(async ({ page, context }) => {
		apiEndPoint = new ApiEndPoint(context);
		await apiEndPoint.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
        await page.goto('/admin/user-management/new');
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('should greet with Create user title', async ({ page }) => {
        await expect(page.getByTestId('userMgmtTitle')).toHaveText('Create user account');
    });

    test('should require mandatory fields', async ({ page }) => {
		await expect(page.getByRole('button', { name: 'Create user account' })).toBeDisabled();
    });

    test('should require username', async ({ page }) => {
        await page.getByLabel('Username*').fill('admin');
        await page.getByLabel('Username*').fill(' ');

        await expect(page.getByTestId('username-error')).toHaveText('Username is mandatory');
    });

    test('should require email', async ({ page }) => {
        await page.getByLabel('Email*').fill('admin@localhost.org');
        await page.getByLabel('Email*').fill('');

        await expect(page.getByTestId('email-error')).toHaveText('Email is mandatory');
    });

    test('should require roles', async ({ page }) => {
        await page.getByLabel('Expand select options').click();
		await page.getByText('ROLE_ADMIN').dblclick();
		await page.getByLabel('Expand select options').click();

        await expect(page.getByTestId('roles-error')).toHaveText('Select at least one role');
    });

    test('should navigate back to the user list page', async ({ page }) => {
        await page.getByRole('button', { name: 'Cancel' }).click();

        await expect(page).toHaveURL('/admin/user-management');
        await expect(page.getByTestId('userMgmtTitle').locator('span')).toHaveText('Users');
    });

    test.describe('create account', () => {
        let randomUser;

        test.beforeEach(async ({ page }) => {
            randomUser = 'test' + new Date().getTime();
            await page.goto('admin/user-management/new');
        });
        test.afterEach(async ({ page, context }) => {
			await apiEndPoint.delete(`api/admin/users/${randomUser}`);
            await page.close();
        });

        test('should create a new user account', async ({ page }) => {
            await page.getByLabel('Username*').fill(`${randomUser}`);
            await page.getByLabel('First name').fill('john');
            await page.getByLabel('Last name').fill('doe');
            await page.getByLabel('Email*').fill(`${randomUser}@localhost.org`);
            await page.getByLabel('Expand select options').click();
			await page.getByText('ROLE_ADMIN').click();
			await page.getByLabel('Expand select options').click();


            const createBtn = await page.getByTestId('addUserForm').locator('div').filter({ hasText: 'Create user account' }).nth(1);
            await expect(createBtn).toBeEnabled();
			await createBtn.click();

            await expect(page.getByTestId('toast-success')).toHaveText(`A user is created with identifier ${randomUser}`);

            await expect(page).toHaveURL('/admin/user-management');

			await expect(page.getByTestId('userMgmtTitle')).toBeVisible();
            await expect(page.getByTestId('userMgmtTitle').locator('span')).toHaveText('Users');
        });
    });
});

