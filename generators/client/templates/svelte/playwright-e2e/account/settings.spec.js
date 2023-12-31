import { test, expect } from "@playwright/test";
const { ApiEndPoint } = require('../api-pom.js');

test.describe('User Settings', () => {
    test.beforeEach(async ({ page, context }) => {
        const apiEndPoint = new ApiEndPoint(context);
		await apiEndPoint.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
        await page.goto('/account/settings');
    });

    test('should greet with User Settings title', async ({ page }) => {
        await expect(page.getByText(`User settings for [${process.env.ADMIN_USERNAME}]`)).toBeVisible();
    });

    test('should display current settings', async ({ page }) => {
        await expect(page.getByLabel('First Name')).toHaveText('<%_ if (databaseTypeSql) { _%>Admin<%_ } else { _%>admin<%_ }_%>');
        await expect(page.getByLabel('Last Name')).toHaveText('Admin');
        await expect(page.getByLabel('Email*')).toHaveText('admin@localhost');
    });

    test('should display form control validation messages', async ({ page }) => {
        await page.getByLabel('First Name').fill('AveryLongFirstNameThatExceedsTheMaximumLengthLimitToCheckValidation');
        await expect(page.getByTestId('firstName-error')).toHaveText('First name cannot be longer than 50 characters');

        await page.getByLabel('Last Name').fill('AveryLongLastNameThatExceedsTheMaximumLengthLimitToCheckValidation');
        await expect(page.getByTestId('lastName-error')).toHaveText('Last name cannot be longer than 50 characters');

        await page.getByLabel('Email*').fill('admin@localhost.org');
        await page.getByLabel('Email*').fill('');
        await expect(page.getByTestId('email-error')).toHaveText('Email is mandatory');

        await page.getByLabel('Email*').fill('admin@localhost');
        await expect(page.getByTestId('email-error')).toHaveText('Email address is not valid');
        await expect(page.getByRole('button', { name: "Update Settings" })).toBeDisabled();
    });

    test('should update user settings', async ({ page }) => {
        await page.getByLabel('First Name').fill('<%_ if (databaseTypeSql) { _%>Admin<%_} else { _%>admin<%_ }_%>');
        await page.getByLabel('Last Name').fill('Admin');
        await page.getByLabel('Email*').fill('admin@localhost.org');
        await expect(page.getByRole('button', { name: 'Update Settings' })).toBeEnabled()
		await expect(page.getByRole('button', { name: 'Update Settings' })).click();
        await expect(page.getByTestId('successMsg')).toHaveText('Settings changed!');

    });
});


