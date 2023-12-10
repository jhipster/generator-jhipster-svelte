import { test, expect } from '@playwright/test';

test.describe('Change User Password', () => {
    test.beforeEach(async({ page }) => {
        /*
        *
        * API LOGIC TO BE HERE
        *
        *
        *
        */
        await page.goto('/account/password');
        await page.getByLabel('username').fill('admin', { log: false });
        await page.getByLabel('password').fill('admin', { log: false });
        await page.getByRole('button', { name: 'Sign in' }).click();
    });

    test('should greet with Change password title', async ({ page }) => {
        const titleText = expect(await page.locator('[data-testid="passwordTitle"]').innerText()).toContain('Change password');
    });

    test('should require mandatory fields to be filled', async ({ page }) => {
        const updateButton = await page.locator('[data-testid="passwordForm"] button[type="submit"]');
        expect(await updateButton.isDisabled()).toBe(true);
    });

    /*test('should require current password', async ({ page }) => {
        await page.locator('data-testid=passwordForm [name=currentPassword]').nth(0).type('admin', { log: false });
        await page.locator('data-testid=passwordForm [name=currentPassword]').type('', {log: false });
        //await page.getByLabel('password').nth(0).fill('admin', { log: false });
        //await page.getByLabel('password').nth(0).fill('', { log: false });   //fill current password field

        //expect(await page.locator('[data-testid="currentPassword-error"]').innerText()).toContain('Password is mandatory');
    });*/

    test('should require new password', async ({ page }) => {
        await page.getByLabel('password').nth(1).fill('admin', { log: false });
        await page.getByLabel('password').nth(1).fill('', { log: false });   //fill new password field

        await page.locator('[data-testid="newPassword-error"]').textContent().then((text) => {
            expect(text).toContain('Password is mandatory');
        });
    });

    test('should require to confirm new password', async ({ page }) => {
        await page.getByLabel('password').nth(2).fill('admin', { log: false });
        await page.getByLabel('password').nth(2).fill('', { log: false });   //fill new password confirm field

        await page.locator('[data-testid="newPasswordConfirm-error"]').textContent().then((text) => {
            expect(text).toContain('Password is mandatory');
        });
    });

    test('should require new and confirm passwords to match', async ({ page }) => {
        await page.getByLabel('password').nth(1).fill('abcd', { log: false });   //fill new password field
        await page.getByLabel('password').nth(2).fill('defg', { log: false });   //fill new password confirm field

        await page.locator('[data-testid="newPasswordConfirm-error"]').textContent().then((text) => {
            expect(text).toContain('Password and its confirmation do not match');
        });
    });

    test('should update user password', async ({ page }) => {
        await page.locator('[data-testid=passwordForm] [name=currentPassword]').type('admin', { log: false });
        //await page.getByLabel('password').nth(0).fill('admin', { log: false });     //fill password field
        await page.getByLabel('password').nth(1).fill('admin', { log: false });     //fill new password field
        await page.getByLabel('password').nth(2).fill('admin', { log: false });     //fill new password confirm field

        await page.getByRole('button', { name: 'Update password' }).isEnabled();
        await page.getByRole('button', { name: 'Update password' }).click();
        expect(await page.locator('[data-testid="successMsg"]').innerText()).toContain('Password changed!');
    });

});

