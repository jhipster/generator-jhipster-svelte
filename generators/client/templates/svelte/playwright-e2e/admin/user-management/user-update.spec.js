import { test, expect } from "@playwright/test";
const { ApiEndPoint } = require('../../api-pom.js');

test.describe('Update user page', () => {
    let randomUser;
	let apiEndPoint;

    test.beforeEach(async ({ page, context }) => {
        randomUser = 'test' + new Date().getTime();
		apiEndPoint = new ApiEndPoint(context);
		await apiEndPoint.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);

        const res = await apiEndPoint.save('api/admin/users', {
			login: randomUser,
			firstName: 'john',
			lastName: 'doe',
			email: `${randomUser}@localhost.org`,
			activated: true,
			authorities: ['ROLE_USER'],
		});

		await page.goto(`admin/user-management/${res.login}/edit`);
    });

    test.afterEach(async ({ page }) => {
        await apiEndPoint.delete(`api/admin/users/${randomUser}`);
    });

    test('should greet with update user title', async ({ page }) => {
        await expect(page.getByTestId('userMgmtTitle')).toHaveText('Update user account');
    });

    test('should be populated and have a valid state', async ({ page }) => {
        await expect(page.getByLabel('Username*')).toHaveValue(`${randomUser}`);
        await expect(page.getByLabel('First Name')).toHaveValue('john');
        await expect(page.getByLabel('Last Name')).toHaveValue('doe');
        await expect(page.getByLabel('Email*')).toHaveValue(`${randomUser}@localhost.org`);
        await expect(page.getByLabel('ROLE_USER')).toBeChecked();
		await page.keyboard.press('PageDown');
        await expect(page.getByRole('button', { name: 'Update user account' })).toBeEnabled();
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
		await page.getByText('ROLE_USER').click();
		await page.getByLabel('Expand select options').click();

        await expect(page.getByTestId('roles-error')).toHaveText('Select at least one role');
    });

    test('should navigate back to the user list page', async ({ page }) => {
        await page.getByRole('button', { name: 'Cancel'}).click();
        await expect(page).toHaveURL('/admin/user-management');
        await expect(page.getByTestId('userMgmtTitle').locator('span')).toHaveText('Users');
    });

    test('should update user account details', async ({ page }) => {
        await page.getByLabel('Username*').fill(`${randomUser}`);
        await page.getByLabel('First Name').fill('john');
        await page.getByLabel('Last Name').fill('doe');
        await page.getByLabel('Email*').fill(`${randomUser}@localhost.org`);
		await page.getByLabel('Expand select options').click();
		await page.getByText('ROLE_USER').dblclick();
		await page.getByLabel('Expand select options').click();

        await expect(page.getByRole('button', { name: 'Update user account' })).toBeEnabled();
        await page.getByRole('button', { name: 'Update user account' }).click();

        await expect(page.getByTestId('toast-success')).toHaveText(`A user is updated with identifier ${randomUser}`);
        await expect(page).toHaveURL('/admin/user-management');
        await expect(page.getByTestId('userMgmtTitle').locator('span')).toHaveText('Users');
    });
});

