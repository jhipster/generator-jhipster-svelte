import { test, expect } from "@playwright/test";
const { ApiEndPoint } = require('./api-pom.js');
const { baseName, authenticationType, skipUserManagement } = require('./jdl-config.js');

test.describe('Navbar', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test.describe('unauthenticated user', () => {
        test('should display application name', async ({ page }) => {
            expect(await page.getByTestId('svlAppName')).toBeVisible();
            await expect(page.getByTestId('svlAppName')).toHaveText(baseName);
        });

        test('should display application version', async ({ page }) => {
            await expect(page.getByTestId('svlAppVersion')).toBeVisible();
            await expect(page.getByTestId('svlAppVersion')).toHaveText('DEV');
        });

        test('should not display navigation toggle button', async ({ page }) => {
            await expect(page.getByTestId('svlNavBtn')).toBeHidden();
        });

        test('should not display account menu', async ({ page }) => {
            await expect(page.getByTestId('svlAcctMenu')).toBeHidden();
        });

        test('should display sign in link', async ({ page }) => {
            await expect(page.getByTestId('svlLoginLink')).toBeVisible();
            await expect(page.getByTestId('svlLoginLink')).toHaveText('Sign in');
        });

		if (authenticationType !== 'oauth2' && !skipUserManagement) {
			test("should display register link", async ({ page }) => {
				await expect(page.getByTestId('svlRegisterLink')).toBeVisible();
				await expect(page.getByTestId('svlRegisterLink')).toHaveText('Sign up');
			});
		}
    });

    test.describe('authenticated user', () => {
        test.beforeEach(async ({ page, context }) => {
			const apiEndPoint = new ApiEndPoint(context);
			await apiEndPoint.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);

			await page.goto('/');
        });

		if (authenticationType === 'oauth2') {
			test.afterEach(async ({ page }) => {
				/*
				*
				*  LOGOUT FUNCTION TO BE HERE
				*
				*/
			});
		}

		if (authenticationType !== 'oauth2' && !skipUserManagement) {
			test('should not display register link', async ({ page }) => {
				await expect(page.getByTestId('svlRegisterLink')).toBeHidden();
			});
		}

        test('should not sign in link', async ({ page }) => {
            await expect(page.getByTestId('svlLoginLink')).toBeHidden();
        });

        test('should display account menu', async ({ page }) => {
			await expect(page.getByTestId('svlAcctMenu')).toBeVisible();
			await expect(page.getByTestId('svlAcctMenu')).toBeEnabled();
			await page.getByTestId('svlAcctMenu').click();

			if (authenticationType !== 'oauth2' && !skipUserManagement) {
				await expect(page.getByTestId('svlChgPwdLink')).toBeVisible();
				await expect(page.getByTestId('svlChgPwdLink')).toHaveAttribute('href', '/account/password');
				await expect(page.getByTestId('svlChgPwdLink')).toHaveText('Change Password');

				await expect(page.getByTestId('svlSettingsLink')).toBeVisible();
				await expect(page.getByTestId('svlSettingsLink')).toHaveAttribute('href', '/account/settings');
				await expect(page.getByTestId('svlSettingsLink')).toHaveText('Settings');
			}

			await expect(page.getByTestId('svlSignoutLink')).toBeVisible();
			await expect(page.getByTestId('svlSignoutLink')).toHaveAttribute('href', '/');
			await expect(page.getByTestId('svlSignoutLink')).toHaveText('Sign out');
         });

        test('should display administrator menu', async ({ page }) => {
			await expect(page.getByTestId('svlAdminMenu')).toBeVisible();
			await expect(page.getByTestId('svlAdminMenu')).toBeEnabled();
			await page.getByTestId('svlAdminMenu').click();

			await expect(page.getByTestId('svlLoggerLink')).toBeVisible();
			await expect(page.getByTestId('svlLoggerLink')).toHaveAttribute('href', '/admin/logger');
			await expect(page.getByTestId('svlLoggerLink')).toHaveText('Loggers');

			if (authenticationType !== 'oauth2' && !skipUserManagement) {
				await expect(page.getByTestId('svlUserMgmtLink')).toBeVisible();
				await expect(page.getByTestId('svlUserMgmtLink')).toHaveAttribute('href', '/admin/user-management');
				await expect(page.getByTestId('svlUserMgmtLink')).toHaveText('User Management');
			}
        });

		if (authenticationType !== 'oauth2' && !skipUserManagement) {
			test('should navigate to change password page', async ({ page }) => {
				await page.getByTestId('svlAccountLink').click();
				await expect(page.getByTestId('svlChgPwdLink')).toBeVisible()
				await page.getByTestId('svlChgPwdLink').click();
				await expect(page).toHaveURL('/account/password');
			});

			test('should navigate to settings page', async ({ page }) => {
				await page.getByTestId('svlAccountLink').click();
				await expect(page.getByTestId('svlSettingsLink')).toBeVisible();
				await page.getByTestId('svlSettingsLink').click();
				await expect(page).toHaveURL('/account/settings');
			});
		}

		if (authenticationType !== 'oauth2') {
			test('should logout user', async({ page }) => {
				await page.getByTestId('svlAcctMenu').getByTestId('svlAccountLink').click();
				await expect(page.getByTestId('svlSignoutLink')).toBeVisible();
				await page.getByTestId('svlSignoutLink').click();
				await expect(page).toHaveURL('/');
				await expect(page.getByTestId('svlLoginLink')).toBeVisible();
				await expect(page.getByTestId('svlLoginLink')).toHaveText('Sign in');
			});
		}
    });

	if (!skipUserManagement || authenticationType === 'oauth2') {
		test.describe(`authenticated 'ROLE_USER' ROLE user`, () => {
			test.beforeEach(async ({ page }) => {
				/*
				*
				*  LOGIN FUNCTION TO BE HERE
				*
				*/

				await page.goto('/');
			});

			if (authenticationType === 'oauth2') {
				test.afterEach(async () => {
					/*
					*
					*  LOGOUT FUNCTION TO BE HERE
					*
					*/
				});
			}

			test('should not display administrator menu', async ({ page }) => {
				await expect(page.getByTestId('svlAdminMenu')).toBeHidden();
			});

		});
	}

	if (authenticationType === 'oauth2') {
		test.describe('Logout authenticated user', () => {
			test.beforeEach(async ({ page }) => {
				/*
				*
				*  LOGIN FUNCTION TO BE HERE
				*
				*/

				await page.goto('/');
			});

			test('should logout user', async ({ page }) => {
				await page.getByTestId('svlAccountLink').click();
				await expect(page.getByTestId('svlSignoutLink')).toBeVisible();
				await expect(page.getByTestId('svlSignoutLink')).toHaveText('Sign in');
				await expect(page).toHaveURL('/');
			});
		});
	}

});

