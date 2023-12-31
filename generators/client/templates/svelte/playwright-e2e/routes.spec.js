import { test, expect } from "@playwright/test";
const { ApiEndPoint } = require('./api-pom.js');

test.describe("Routes", () => {
    test.beforeEach(async ({ page }) => {
        //
    });

    test.describe("unauthenticated user", () => {
        test("should not allow navigation to settings page", async ({ page }) => {
            await page.goto('/account/settings');
            await expect(page).toHaveURL('/login');

            await expect(page.getByTestId('signInTitle')).toBeVisible();
            await expect(page.getByTestId('signInTitle')).toHaveText('Sign in to <%= baseName %>');
        });

        test("should not allow navigation to user management page", async ({ page }) => {
            await page.goto('/admin/user-management');
            await expect(page).toHaveURL('/login');

            await expect(page.getByTestId('signInTitle')).toBeVisible();
            await expect(page.getByTestId('signInTitle')).toHaveText('Sign in to <%= baseName %>');
        });

        test("should not allow navigation to Loggers page", async ({ page }) => {
            await page.goto('/admin/logger');
            await expect(page).toHaveURL('/login');

            await expect(page.getByTestId('signInTitle')).toBeVisible();
            await expect(page.getByTestId('signInTitle')).toHaveText('Sign in to <%= baseName %>');
        });

        test("should allow navigation to home page", async ({ page }) => {
            await page.goto('/');
            await expect(page).toHaveURL('/');

            await expect(page.getByTestId('welcomeTitle')).toBeVisible();
            await expect(page.getByTestId('welcomeTitle')).toHaveText('Welcome, JHipster Svelte!');
        });
    });

    test.describe("authenticated user", () => {
        test.beforeEach(async ({ page, context }) => {
			const apiEndPoint = new ApiEndPoint(context);
			await apiEndPoint.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
        });


        test.afterEach(async ({ page }) => {
            /*
            *
            *  LOGOUT FUNCTION TO BE HERE
            *
            */
        });

        test("should not allow navigation to login page", async ({ page }) => {
            await page.goto('/oauth2/authorization/oidc');
            await page.goto('/login');

            await expect(page).toHaveURL('/');

            await expect(page.getByTestId('welcomeTitle')).toBeVisible();
            await expect(page.getByTestId('welcomeTitle')).toHaveText('Welcome, JHipster Svelte!');
        });

        test("should not allow navigation to register page", async ({ page }) => {
            await page.goto('/account/register');
            await expect(page).toHaveURL('/');

            await expect(page.getByTestId('welcomeTitle')).toBeVisible();
            await expect(page.getByTestId('welcomeTitle')).toHaveText('Welcome, JHipster Svelte!');
        });

        test("should allow navigation to home page", async ({ page }) => {
            await page.goto('/');
            await expect(page).toHaveURL('/');

            await expect(page.getByTestId('welcomeTitle')).toBeVisible();
            await expect(page.getByTestId('welcomeTitle')).toHaveText('Welcome, JHipster Svelte!');
        });
    });

    test.describe('navigation context', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('/admin/logger');
            await expect(page).toHaveURL('/login');
        });

        test('should navigate to saved context', async ({ page }) => {
            await page.getByLabel('Username').fill(process.env.ADMIN_USERNAME);
            await page.getByLabel('Password').fill(process.env.ADMIN_PASSWORD);
            await page.getByRole('button', { name: "Sign in" }).click();

            await expect(page).toHaveURL('/admin/logger');
            await expect(page.getByTestId('loggersTitle')).toBeVisible();
            await expect(page.getByTestId('loggersTitle')).toHaveText('Loggers');
        });
    });
});

