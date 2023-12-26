const { test, expect } = require('@playwright/test');

test.describe('Forgot password', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/account/reset/init');
    });

    test('should greets with forgot password title', async ({ page }) => {
        await expect(page.getByTestId('forgotPwdTitle')).toHaveText('Reset your password');
    });

    test('should verify instructions to reset password', async ({ page }) => {
        await expect(page.getByTestId('warningMsg')).toHaveText("Enter your user account's verified email address.");
    });

    test('should require mandatory fields', async ({ page }) => {
        await expect(page.getByTestId('forgotPwdForm')).toHaveText('Send password reset email')
		await expect(page.getByTestId('forgotPwdForm')).toBeDisabled();
    });

    test('should require email', async ({ page }) => {
        await page.getByLabel('Email').fill('admin');
        await expect(page.getByTestId('email-error')).toHaveText('Email address is not valid');
    });

    test('should reset user password', async ({ page }) => {
        await page.getByLabel('Email').fill('admin@localhost.org');
        await page.getByTestId('forgotPwdForm').click();

        await expect(page.getByTestId('successMsg')).toHaveText(
            'Check your email for details on how to reset your password.'
        );
    });
});


