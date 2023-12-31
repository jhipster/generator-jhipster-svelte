import { test, expect } from '@playwright/test';
const { ApiEndPoint } = require('../api-pom.js');

test.describe('Change User Password', () => {
    test.beforeEach(async({ page, context }) => {
        const apiEndPoint = new ApiEndPoint(context);
		await apiEndPoint.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
        await page.goto('/account/password');
    });

    test('should greet with Change password title', async ({ page }) => {
		await expect(page.getByTestId('passwordTitle')).toHaveText('Change password');
    });

    test('should require mandatory fields to be filled', async ({ page }) => {
		await expect(page.getByTestId('passwordForm').getByRole('button')).toHaveText('Update password');
		await expect(page.getByTestId('passwordForm').getByRole('button')).toBeDisabled();
    });

    test('should require current password', async ({ page }) => {
        await page.getByLabel('Current Password*').fill('admin', { log: false });
        await page.getByLabel('Current Password*').fill('', {log: false });

        await expect(page.getByTestId('currentPassword-error')).toHaveText('Password is mandatory');
    });

    test('should require new password', async ({ page }) => {
        await page.getByLabel('New Password*', { exact: true }).fill('admin', { log: false });
        await page.getByLabel('New Password*', { exact: true }).fill('', { log: false });

        await expect(page.getByTestId('newPassword-error')).toHaveText('Password is mandatory');
    });

    test('should require to confirm new password', async ({ page }) => {
        await page.getByLabel('Confirm New Password*').fill('admin', { log: false });
        await page.getByLabel('Confirm New Password*').fill('', { log: false });

        await expect(page.getByTestId('newPasswordConfirm-error')).toHaveText('Password is mandatory');
    });

    test('should require new and confirm passwords to match', async ({ page }) => {
        await page.getByLabel('New Password*', { exact: true }).fill('abcd', { log: false });
        await page.getByLabel('Confirm New Password*').fill('defg', { log: false })

        await expect(page.getByTestId('newPasswordConfirm-error')).toHaveText('Password and its confirmation do not match');
    });

    test('should update user password', async ({ page }) => {
        await page.getByLabel('Current Password*').fill('admin', { log: false });
        await page.getByLabel('New Password*', { exact: true }).fill('admin', { log: false });
        await page.getByLabel('Confirm New Password*').fill('admin', { log: false });

        await expect(page.getByRole('button', { name: 'Update password' })).toBeEnabled()
		await page.getByRole('button', { name: 'Update password' }).click();
        await expect(page.getByTestId('successMsg')).toHaveText('Password changed!');
    });

});

