import { test, expect } from "@playwright/test";

test.describe('User Management list page', () => {

    test.beforeEach(async ({ page }) => {
        /*
        *
        * LOGIN API FUNCTION TO BE HERE
        *
        */
        await page.goto('/admin/user-management');
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('should greet with users page title', async ({ page }) => {
        const title = await page.locator('[data-testid=userMgmtTitle]').innerText();
        expect(title).toContain('Users');
    });

    test('should display users table', async ({ page }) => {
        expect(await page.locator('[data-testid=userMgmtTable] th')).toHaveCount(7);

        expect(await page.getByRole('columnheader').nth(0).innerText()).toContain('ID');
        expect(await page.getByRole('columnheader').nth(1).innerText()).toContain('Login');
        expect(await page.getByRole('columnheader').nth(2).innerText()).toContain('Email');
        expect(await page.getByRole('columnheader').nth(3).innerText()).toContain('Roles');
        expect(await page.getByRole('columnheader').nth(4).innerText()).toContain('Created At');
        expect(await page.getByRole('columnheader').nth(5).innerText()).toContain('Modified By');
        expect(await page.getByRole('columnheader').nth(6).innerText()).toContain('Modified At');
    });

    test('should display "user" user record in the table', async ({ page }) => {
        expect(await page.locator('[data-testid=userMgmtTable] tbody').filter({ has: page.locator('td') }).innerText()).toContain('user@localhost');
        expect(await page.locator('[data-testid=userMgmtTable] tbody').filter({ has: page.locator('td') }).innerText()).toContain('user');
        expect(await page.locator('[data-testid=userMgmtTable] tbody').filter({ has: page.locator('td') }).innerText()).toContain('ROLE_USER');
        //expect(await page.locator('[data-testid=userMgmtTable] tbody').filter({ has: page.locator('td') }).innerText()).toContain('system');
    });

    test('should not allow actions on the current logged-in user', async ({ page }) => {
        await page.getByRole('cell', { name: 'admin@localhost' }).hover();

        expect(await page.getByRole('button', { name: 'toggleUserAccBtn' })).toBeDisabled();
        expect(await page.getByRole('button', { name: 'viewBtn' })).toBeEnabled();
        expect(await page.getByRole('button', { name: 'editBtn' })).toBeDisabled();
        expect(await page.getByRole('button', { name: 'deleteBtn' })).toBeDisabled();
    });

    test('should allow deactivation of "user" account record', async ({ page }) => {
        await page.getByRole('cell', { name: 'user@localhost' }).hover();
        
        expect(await page.getByRole('button', { name: 'toggleUserAccBtn' })).toBeEnabled();
    });

    test('should validate the pagination controls', async ({ page }) => {
        const pageCtrl = await page.locator('[data-testid=pageCtrl]');
        const pageInfo = await pageCtrl.locator('div').nth(0).innerText();
        expect(pageInfo).toMatch(/1-\d+ of \d+/);

        const prevPageCtrl = await pageCtrl.locator('[data-testid=prevPageCtrl]').nth(0);
        expect(await prevPageCtrl.isEnabled()).toBe(false);

        const nextPageCtrl = await pageCtrl.locator('[data-testid=nextPageCtrl]').nth(1);
        expect(await nextPageCtrl.isEnabled()).toBe(false);
    });

    test('should sort the records by login field', async ({ page }) => {
        const loginValueBefore = await page.locator('[data-testid=userMgmtTable] tbody tr:first-child td:nth-child(2)').innerText();

        await page.locator('[data-testid=userMgmtTable] th:nth-child(2) button').click();

        await page.waitForTimeout(100);

        const loginValueAfter = await page.locator('[data-testid=userMgmtTable] tbody tr:first-child td:nth-child(2)').innerText();

        expect(loginValueAfter).not.toEqual(loginValueBefore);
    });
});

