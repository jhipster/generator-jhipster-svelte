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
        const title = await page.locator('[data-test-id=userMgmtTitle]').innerText();
        expect(title).toContain('Update user account');
    });

    test('should be populated and have a valid state', async ({ page }) => {
        expect(await page.getByLabel('Username*')).toHaveValue(`${randomUser}`);
        expect(await page.getByLabel('First Name')).toHaveValue('john');
        expect(await page.getByLabel('Last Name')).toHaveValue('doe');
        expect(await page.getByLabel('Email*')).toHaveValue(`${randomUser}@localhost.org`);
        expect(await page.getByRole('USER_ROLE')).toBeChecked();
        expect(await page.locator('[data-testid=roles-options] input[type=checkbox]').nth(1)).toBeChecked();
        expect(await page.getByRole('button', { name: 'Update new account' })).toBeEnabled();
    });

    test('should require username', async ({ page }) => {
        await page.getByLabel('Username*').fill('');

        const usernameError = await page.locator('[data-testid=username-error]').innerText();
        expect(usernameError).toContain('Username is mandatory');
    });

    test('should require email', async ({ page }) => {
        await page.getByLabel('Email*').fill('');

        const emailError = await page.locator('[data-testid=email-error]').innerText();
        expect(emailError).toContain('Email is mandatory');
    });

    test('should require roles', async ({ page }) => {
        const rolesCheckBox = page.locator('[name=roles]');

        await rolesCheckBox.click();
        await page.locator('[data-testid=roles-options] input[input=checkbox]').nth(1).click();
        await rolesCheckBox.click();

        const rolesError = await page.locator('[data-testid=roles-error]').innerText();
        expect(rolesError).toContain('Select at least one role');
    });

    test('should navigate back to the user list page', async ({ page }) => {
        await page.locator('[name=cancelBtn]').click();

        const pathname = await page.evaluate(() => window.location.pathname);
        expect(pathname).toBe('/admin/user-management');

        const title = await page.locator('[data-testid=userMgmtTitle]').innerText();
        expect(title).toContain('Users');

    });

    test('should update user account details', async ({ page }) => {
        const rolesCheckBox = await page.locator('[name=roles]');

        await page.getByLabel('Username*').fill(`${randomUser}`);
        await page.getByLabel('First Name').fill('john');
        await page.getByLabel('Last Name').fill('doe');
        await page.getByLabel('Email*').fill(`${randomUser}@localhost.org`);
        await rolesCheckBox.click();
        await page.locator('[data-testid=roles-options] input[type=checkbox]').nth(1).click();
        await rolesCheckBox.click();

        expect(page.getByRole('button', { name: 'Update user account' })).toBeEnabled();
        await page.getByRole('button', { name: 'Update user account' }).click();

        const successToast = await page.locator('[data-testid=toast-success]').innerText();
        expect(successToast).toContain('A user is updated with identifier');

        const pathname = await page.evaluate(() => window.location.pathname);
        expect(pathname).toBe('/admin/user-management');

        const title = await page.locator('[data-testid=userMgmtTitle]').innerText();
        expect(title).toContain('Users');
    });
});

