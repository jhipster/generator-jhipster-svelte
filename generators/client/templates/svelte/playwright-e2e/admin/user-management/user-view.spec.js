import { test, expect } from "@playwright/test";

test.describe('User view details page', () => {
    let randomUser;

    test.beforeEach(async ({ page }) => {

        /*
        *
        * LOGIN API TO BE HERE
        *
        */

        randomUser = 'test' + new Date().getTime();
        /*
        *
        * SAVE USER FUNCTION TO BE HERE
        *
        */
        await page.goto(`/admin/user-management/${res.login}/view`);
    });

    test.afterEach(async ({ page }) => {
        /*
        *
        * DELETE USER FUNCTION TO BE HERE
        *
        */
        await page.close();
    });

    test('should display user account details', async ({ page }) => { 
        expect(await page.locator('span').filter({ hasText: `${randomUser}` })).toBeTruthy();
        expect(await page.locator('span').filter({ hasText: /^john$/ }).first()).toBeTruthy();
        expect(await page.locator('span').filter({ hasText: 'doe' }).first()).toBeTruthy();
        expect(await page.locator('span').filter({ hasText: `${randomUser}@localhost.org` }).first()).toBeTruthy();
        expect(await page.locator('span').filter({ hasText: /^admin$/ }).nth(1)).toBeTruthy()
        //expect(await page.locator('span').filter({ hasText: '12/13/2023 19:38' }).first()).toBeTruthy();
        expect(await page.locator('span').filter({ hasText: /^admin$/ }).nth(3)).toBeTruthy();
        //expect(await page.locator('span').filter({ hasText: '12/13/2023 19:38' }).nth(2)).toBeTruthy();
        expect(await page.locator('span').filter({ hasText: 'ROLE_USER' }).first()).toBeTruthy();

    });

    test('should navigate back to the user list page', async ({ page }) => {
        await page.getByRole('button', { name: 'Back' }).click();

        const pathname = await page.evaluate(() => window.location.pathname);
        expect(pathname).toBe('/admin/user-management');

        const title = await page.locator('[data-testid=userMgmtTitle]').innerText();
        expect(title).toContain('Users');

    });
});

