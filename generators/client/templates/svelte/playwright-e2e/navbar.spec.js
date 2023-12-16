import { test, expect } from "@playwright/test";

test.describe('Navbar', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test.describe('unauthenticated user', () => {
        test('should display application name', async ({ page }) => {
            await page.locator('[data-testid="svlAppName"]').isVisible();
            const appNameText = await page.locator('[data-testid="svlAppName"]').innerText();
            expect(appNameText).toContain('<%= baseName %>');
        });

        test('should display application version', async ({ page }) => {
            await page.locator('[data-testid="svlAppVersion"]').isVisible();
            const appVersionText = await page.locator('[data-testid="svlAppVersion"]').innerText();
            expect(appVersionText).toContain('DEV');
        });

        test('should not display navigation toggle button', async ({ page }) => {
            await expect(page.locator('[data-testid="svlNavBtn"]')).toBeHidden();
        });

        test('should not display account menu', async ({ page }) => {
            await expect(page.locator('[data-testid="svlAcctMenu"]')).toBeHidden();
        });

        test('should display sign in link', async ({ page }) => {
            await page.locator('[data-testid="svlLoginLink"]').isVisible();
            const signInLinkText = await page.locator('[data-testid="svlLoginLink"]').innerText();
            expect(signInLinkText).toContain('Sign in');
        });

        test("should display register link", async ({ page }) => {
            await page.locator('[data-testid="svlRegisterLink"]').isVisible();
            const registerLinkText = await page.locator('[data-testid="svlRegisterLink"]').innerText();
            expect(registerLinkText).toContain('Sign up');
        });
    });

    test.describe('authenticated user', () => {
        test.beforeEach(async ({ page }) => {
            /*
             *
             *  LOGIN FUNCTION TO BE HERE
             *
             */
 
            await page.goto('/');
        });

        test.afterEach(async ({ page }) => {
            /*
             *
             *  LOGOUT FUNCTION TO BE HERE
             *
             */
        });

        test('should not display register link', async ({ page }) => {
            expect(await page.locator('[data-testid="svlRegisterLink"]')).toBeHidden();
        });

        test('should not sign in link', async ({ page }) => {
            expect(await page.locator('[data-testid="svlLoginLink"]')).toBeHidden();
        });

        test('should display account menu', async ({ page }) => {
            const accMenuBtn = await page.locator('[data-testid="svlAcctMenu"]');
            const changePwdLink = await page.locator('[data-testid="svlChgPwdLink"]');
            const settingsLink = await page.locator('[data-testid="svlSettingsLink"]');
            const signOutLink = await page.locator('[data-testid="svlSignoutLink"]');

            expect(accMenuBtn).toBeVisible();
            expect(accMenuBtn).toBeEnabled;
            accMenuBtn.click();
            
            expect(changePwdLink).toBeVisible();
            expect(changePwdLink.innerText()).toContain('/account/password');
            expect(changePwdLink.innerText()).toContain('Change Password');

            expect(settingsLink).toBeVisible();
            expect(settingsLink.innerText()).toContain('/account/settings');
            expect(settingsLink.innerText()).toContain('Settings');

            expect(signOutLink).toBeVisible();
            expect(signOutLink).toHaveUrl('/');
            expect(signOutLink.innerText()).toContain('Sign out');
        });
        
        test('should display administrator menu', async ({ page }) => {
            const adminMenu = await page.locator('[data-testid="svlAdminMenu"]');
            const loggerLink = await page.locator('[data-testid="svlLoggerLink"]');
            const userMgmtLink = await page.locator('[data-testid="svlUserMgmtLink"]');

            expect(adminMenu).toBeVisible();
            expect(adminMenu).toBeEnabled();
            adminMenu.click();

            expect(loggerLink).toBeVisible();
            expect(loggerLink.innerText()).toContain('/admin/logger');
            expect(loggerLink.innerText()).toContain('Loggers');

            expect(userMgmtLink).toBeVisible();
            expect(userMgmtLink.innerText()).toContain('/admin/user-management');
            expect(userMgmtLink.innerText()).toContain('User Management');
        });

        test('should navigate to change password page', async ({ page }) => {
            const changePwdLink = await page.locator('[data-testid="svlChgPwdLink"]');

            await page.locator('[data-testid="svlAccountLink"]').click()
            expect(changePwdLink).toBeVisible();
            changePwdLink.click();
            expect(page).toHaveUrl('/account/settings');
        });

        test('should navigate to settings page', async ({ page }) => {
            const settingsLink = await page.locator('[data-testid="svlSettingsLink"]');

            await page.locator('[data-testid="svlAccountLink"]')).click();
            expect(settingsLink).toBeVisible();
            settingsLink.click();
            expect(page).toHaveUrl('/account/settings');
        });

        test('should logout user', async({ page }) => {
            const loginLink = await page.locator('[data-testid="svlLoginLink"]');
            const signOutLink = await page.locator('[data-testid="svlSignoutLink"]');

            expect(page).toHaveUrl('/');
            expect(signOutLink).toBeVisible();
            signOutLink.click();
            await page.locator('[data-testid="svlAccountLink"]').click();
            expect(loginLink).toBeVisible().toContain('Sign in');
        });
    });

    test.describe(`authenticated 'ROLE_USER' ROLE user`, () => {
        test.beforeEach(async ({ page }) => {
            /*
             *
             *  LOGIN FUNCTION TO BE HERE
             *
             */

            await page.goto('/');
        });

        test.afterEach(async () => {
            /*
             *
             *  LOGOUT FUNCTION TO BE HERE
             *
             */
        });

        test('should not display administrator menu', async ({ page }) => {
            expect(await page.locator('[data-testid="svlAdminMenu"]')).toBeHidden();

    });

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
            const signOutLink = await page.locator('[data-testid="svlSignoutLink"]');

            await page.locator('[data-testid="svlAccountLink"]').click();
            expect(signOutLink).toBeVisible();
            expect(signOutLink.innerText()).toContain('Sign in');
            expect(page).toHaveUrl('/');
        });
    });

});

