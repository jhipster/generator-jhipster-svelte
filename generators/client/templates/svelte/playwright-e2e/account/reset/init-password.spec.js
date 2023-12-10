const { test, expect } = require('@playwright/test');

test.describe('Forgot password', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/account/reset/init');
    });

    test('should greets with forgot password title', async ({ page }) => {
        await expect(page.locator('[data-testid=forgotPwdTitle]')).toHaveText('Reset your password');
    });

    test('should verify instructions to reset password', async ({ page }) => {
        await expect(page.locator('[data-testid=warningMsg]')).toHaveText("Enter your user account's verified email address.");
    });

    test('should require mandatory fields', async ({ page }) => {
        await expect(page.locator('[data-testid=forgotPwdForm] button')).toBeDisabled();
    });

    test('should require email', async ({ page }) => {
        await page.locator('[data-testid=forgotPwdForm] [name=email]').type('admin');
        await expect(page.locator('[data-testid=email-error]')).toHaveText('Email address is not valid');
    });

    test('should reset user password', async ({ page }) => {
        await page.locator('[data-testid=forgotPwdForm] [name=email]').type('admin@localhost.org');
        await page.locator('[data-testid=forgotPwdForm] button').click();

        await expect(page.locator('[data-testid=successMsg]')).toHaveText(
            'Check your email for details on how to reset your password.'
        );
    });
});


