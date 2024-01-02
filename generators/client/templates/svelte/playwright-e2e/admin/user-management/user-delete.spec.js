import { test, expect } from "@playwright/test";
const { ApiEndPoint } = require('../../api-pom.js');

test.describe('User delete dialog page', () => {
    let randomUser;
	let apiEndPoint;

    test.beforeEach(async ({ page, context }) => {
        apiEndPoint = new ApiEndPoint(context);
		await apiEndPoint.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);

        randomUser = 'test' + new Date().getTime();
        await await apiEndPoint.save('api/admin/users', {
			login: randomUser,
			firstName: '',
			lastName: '',
			email: `${randomUser}@localhost.org`,
			activated: true,
			authorities: ['ROLE_USER'],
		});

        await page.goto('admin/user-management');

		//HOVER AND CLICK DELETE BUTTON
		await page.getByRole('cell', { name: `${randomUser}`, exact: true }).click();
		await page.getByRole('button', { name: 'delete' }).click();
    });

    test.afterEach(async ({ page }) => {
        await apiEndPoint.delete(`api/admin/users/${randomUser}`);
    });

    test('should display delete user dialog', async ({ page }) => {
        await expect(page.getByTestId('svlModal').locator('h1')).toHaveText('Confirm delete operation');
        await expect(page.getByTestId('svlModal').locator('p')).toHaveText('Are you sure you want to delete the user?');

		await expect(page.getByTestId('svlModal').locator('h1')).toBeVisible();
		await expect(page.getByTestId('svlModal').locator('p')).toBeVisible();

        await expect(page.getByRole('button', { name: 'Cancel' })).toBeEnabled();
        await expect(page.getByRole('button', { name: 'Delete' })).toBeEnabled();
    });

    test('should close the dialog without deleting user', async ({ page }) => {
        await page.getByRole('button', { name: 'Cancel' }).click();
        await expect(page.getByTestId('userMgmtTitle').locator('span')).toHaveText('Users');
    });

    test('should delete the user', async ({ page }) => {
		await page.getByRole('button', { name: 'Delete' }).click();
        await expect(page.getByTestId('toast-success')).toHaveText(`A user is deleted with identifier ${randomUser}`);

        await expect(page.getByTestId('userMgmtTitle').locator('span')).toHaveText('Users');
    });
});

