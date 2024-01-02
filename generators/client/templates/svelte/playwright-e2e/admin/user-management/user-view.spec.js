import { test, expect } from "@playwright/test";
const { ApiEndPoint } = require('../../api-pom.js');

test.describe('User view details page', () => {
    let randomUser;
	let apiEndPoint;

    test.beforeEach(async ({ page, context }) => {
		apiEndPoint = new ApiEndPoint(context);
		await apiEndPoint.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);

        randomUser = 'test' + new Date().getTime();
        const res = await apiEndPoint.save('api/admin/users', {
			login: randomUser,
			firstName: 'John',
			lastName: 'Doe',
			email: `${randomUser}@localhost.org`,
			activated: true,
			authorities: ['ROLE_USER'],
		});
        await page.goto(`/admin/user-management/${res.login}/view`);
    });

    test.afterEach(async ({ page }) => {
        await apiEndPoint.delete(`api/admin/users/${randomUser}`);
        await page.close();
    });

    test('should display user account details', async ({ page }) => {
        await expect(page.locator('span').filter({ hasText: `${randomUser}` })).toBeTruthy();
        await expect(page.locator('span').filter({ hasText: /^john$/ }).first()).toBeTruthy();
        await expect(page.locator('span').filter({ hasText: 'doe' }).first()).toBeTruthy();
        await expect(page.locator('span').filter({ hasText: `${randomUser}@localhost.org` }).first()).toBeTruthy();
        await expect(page.locator('span').filter({ hasText: /^admin$/ }).nth(1)).toBeTruthy()
        await expect(page.locator('span').filter({ hasText: '12/13/2023 19:38' }).first()).toBeTruthy();
        await expect(page.locator('span').filter({ hasText: /^admin$/ }).nth(3)).toBeTruthy();
        await expect(page.locator('span').filter({ hasText: '12/13/2023 19:38' }).nth(2)).toBeTruthy();
        await expect(page.locator('span').filter({ hasText: 'ROLE_USER' }).first()).toBeTruthy();

    });

    test('should navigate back to the user list page', async ({ page }) => {
        await page.getByRole('button', { name: 'Back' }).click();
        await expect(page).toHaveURL('/admin/user-management');
        await expect(page.getByTestId('userMgmtTitle').locator('span')).toHaveText('Users');
    });
});

