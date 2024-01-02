import { test, expect } from "@playwright/test";
const { ApiEndPoint } = require('../../api-pom.js');

test.describe('User Management list page', () => {

    test.beforeEach(async ({ page, context }) => {
        const apiEndPoint = new ApiEndPoint(context);
		await apiEndPoint.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
        await page.goto('/admin/user-management');
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('should greet with users page title', async ({ page }) => {
        await expect(page.getByTestId('userMgmtTitle').locator('span')).toHaveText('Users');
    });

    test('should display users table', async ({ page }) => {
        await expect(page.locator('[data-testid=userMgmtTable] th')).toHaveCount(7);

        await expect(page.getByRole('columnheader').nth(0)).toHaveText('ID');
        await expect(page.getByRole('columnheader').nth(1)).toHaveText('Login');
        await expect(page.getByRole('columnheader').nth(2)).toHaveText('Email');
        await expect(page.getByRole('columnheader').nth(3)).toHaveText('Roles');
        await expect(page.getByRole('columnheader').nth(4)).toHaveText('Created At');
        await expect(page.getByRole('columnheader').nth(5)).toHaveText('Modified By');
        await expect(page.getByRole('columnheader').nth(6)).toHaveText('Modified At');
    });

    test('should display "user" user record in the table', async ({ page }) => {
        await expect(page.locator('[data-testid=userMgmtTable] tbody').filter({ has: page.locator('td') }).nth(0)).toContain('user@localhost.com');
        await expect(page.locator('[data-testid=userMgmtTable] tbody').filter({ has: page.locator('td') }).nth(0)).toContain('user');
        await expect(page.locator('[data-testid=userMgmtTable] tbody').filter({ has: page.locator('td') }).nth(0)).toContain('ROLE_USER');
        //await expect(page.locator('[data-testid=userMgmtTable] tbody').filter({ has: page.locator('td') }).nth(0)).toHaveText('system');
    });

    test('should not allow actions on the current logged-in user', async ({ page }) => {
        await page.getByRole('cell', { name: 'admin@localhost' }).click();

        await expect(page.getByRole('button', { name: 'toggleActivation' })).toBeDisabled();
        await expect(page.getByRole('button', { name: 'view' })).toBeEnabled();
        await expect(page.getByRole('button', { name: 'edit' })).toBeDisabled();
        await expect(page.getByRole('button', { name: 'delete' })).toBeDisabled();
    });

    test('should allow deactivation of "user" account record', async ({ page }) => {
        await page.getByRole('cell', { name: 'user@localhost.com' }).click();

        await expect(page.getByRole('button', { name: 'toggleActivation' })).toBeEnabled();
    });

    test('should validate the pagination controls', async ({ page }) => {
        const pageCtrl = await page.getByTestId('pageCtrl');
        const pageInfo = await pageCtrl.locator('div').nth(0).innerText();
        await expect(pageInfo).toMatch(/1-\d+ of \d+/);

        const prevPageCtrl = await pageCtrl.getByTestId('prevPageCtrl').nth(0);
        await expect(prevPageCtrl).toBeDisabled();

        const nextPageCtrl = await pageCtrl.getByTestId('nextPageCtrl').nth(1);
        await expect(nextPageCtrl).toBeDisabled();
    });

    test('should sort the records by login field', async ({ page }) => {
        const loginValueBefore = await page.locator('[data-testid=userMgmtTable] tbody tr:first-child td:nth-child(2)').innerText();

        await page.locator('[data-testid=userMgmtTable] th:nth-child(2) button').click();

        await page.waitForTimeout(100);

        const loginValueAfter = await page.locator('[data-testid=userMgmtTable] tbody tr:first-child td:nth-child(2)').innerText();

        await expect(loginValueAfter).not.toEqual(loginValueBefore);
    });
});

