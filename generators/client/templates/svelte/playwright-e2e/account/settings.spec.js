import { test, expect } from "@playwright/test";

test.describe('User Settings', () => {
    test.beforeEach(async () => {
        /*
         *
         *  LOGIN FUNCTION TO BE HERE
         *
         */
        await page.goto('/account/settings');
    });

    test('should greet with User Settings title', async () => {
        expect(page.getByText(`User settings for [${process.env.ADMIN_USERNAME}]`)).toBeVisible();
    });

    test('should display current settings', async () => {
        expect(page.getByLabel('First Name')).toContain('<%_ if (databaseTypeSql) { _%>Admin<%_ } else { _%>admin<%_ }_%>');
        expect(page.getByLabel('Last Name')).toContain('Admin');
        expect(pagae.getByLabel('Email')).toContain('admin@localhost');
    });

    test('should display form control validation messages', async () => {
        await page.getByLabel('First Name').fill('AveryLongFirstNameThatExceedsTheMaximumLengthLimitToCheckValidation');
        const firstNameText = await page.locator('[data-testid="firstName-error"]');
        expect(firstNameText).toContain('First name cannot be longer than 50 characters');

        await page.getByLabel('Last Name').fill('AveryLongLastNameThatExceedsTheMaximumLengthLimitToCheckValidation');
        const lastNameText = await page.locator('[data-testid="lastName-error"]');
        expect(lastNameText).toContain('Last name cannot be longer than 50 characters');

        await page.getByLabel('Email').fill('admin@localhost.org');
        await page.getByLabel('Email').fill('');
        const emailText = await page.locator('[data-testid="email-error"]');
        expect(emailText).toContain('Email is mandatory');

        await page.getByLabel('Email').fill('admin@localhost');
        expect(emailText).toContain('Email address is not valid');
        expect(page.getByRole('button', { name: "Update Settings" }).toBeDisabled();
    });

    test('should update user settings', async () => {
        await page.getByLabel('First Name').fill('<%_ if (databaseTypeSql) { _%>Admin<%_} else { _%>admin<%_ }_%>');
        await page.getByLabel('Last Name').fill('Admin');
        await page.getByLabel('Email').fill('admin@localhost.org');
        await page.getByRole('button', { name: 'Update Settings' });

        const successMsgText = await page.locator('[data-testid="successMsg"]').innerText();
        expect(successMsgText).toContain('Settings changed!');

    });
});


