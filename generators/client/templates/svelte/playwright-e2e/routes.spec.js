import { test, expect } from "@playwright/test";

test.describe("Routes", () => {
    test.beforeEach(async ({ page }) => {
        //
    });

    test.describe("unauthenticated user", () => {
        test("should not allow navigation to settings page", async ({ page }) => {
            await page.goto('/account/settings');

            expect(page.url()).toBe('/login');
            const signInTitle = await page.getByTestId('signInTitle');

            expect(await signInTitle).toBeVisible();
            expect(await signInTitle.textContent()).toContain('Sign in to <%= baseName %>');
        });

        test("should not allow navigation to user management page", async ({ page }) => {
            await page.goto('/admin/user-management');

            expect(page.url()).toBe('/login');
            const signInTitle = await page.getByTestId('signInTitle');

            expect(await signInTitle).toBeVisible();
            expect(await signInTitle.textContent()).toContain('Sign in to <%= baseName %>');
        });

        test("should not allow navigation to Loggers page", async ({ page }) => {
            await page.goto('/admin/logger');

            expect(page.url()).toBe('/login');
            const signInTitle = await page.getByTestId('signInTitle');

            expect(await signInTitle.isVisible()).toBe(true);
            expect(await signInTitle.textContent()).toContain('Sign in to <%= baseName %>');
        });

        test("should allow navigation to home page", async ({ page }) => {
            await page.goto('/');

            expect(page).toHaveUrl('/');
            const welcomeTitle = await page.getByTestId('welcomeTitle');

            expect(await welcomeTitle).toBeVisible();
            expect(await welcomeTitle.textContent()).toContain('Welcome, JHipster Svelte!');
        });
    });

    test.describe("authenticated user", () => {
        test.beforeEach(async ({ page }) => {
            /*
            *
            *  LOGIN FUNCTION TO BE HERE
            *
            */
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

            expect(page).toHaveUrl('/');
            const welcomeTitle = await page.getByTestId('welcomeTitle');

            expect(await welcomeTitle).toBeVisible();
            expect(await welcomeTitle.textContent()).toContain('Welcome, JHipster Svelte!');
        });

        test("should not allow navigation to register page", async ({ page }) => {
            await page.goto('/account/register');

            expect(page).toHaveUrl('/');
            const welcomeTitle = await page.getByTestId('welcomeTitle');

            expect(await welcomeTitle).toBeVisible();
            expect(await welcomeTitle.textContent()).toContain('Welcome, JHipster Svelte!');
        });

        test("should allow navigation to home page", async ({ page }) => {
            await page.goto('/');

            expect(page).toHaveUrl('/');
            const welcomeTitle = await page.getByTestId('welcomeTitle');

            expect(await welcomeTitle).toBeVisible();
            expect(await welcomeTitle.textContent()).toContain('Welcome, JHipster Svelte!');
        });
    });

    test.describe('navigation context', () => {
        test.beforeEach(async () => {
            await page.goto('/admin/logger');
            expect(page).toHaveUrl('/login');
        });

        test('should navigate to saved context', async () => {
            await page.getByLabel('Username').fill(process.env.ADMIN_USERNAME);
            await page.getByLabel('Password').fill(process.env.ADMIN_PASSWORD);
            await page.geByRole('button', { name: "Sign in" }).click();
            
            expect(page).toHaveUrl('/admin/logger');
            await expect(page.locator('[data-testid="loggersTitle"]')).toBeVisible();
            const loggersTitleText = await page.locator('[data-testid="loggersTitle"]').innerText();
            expect(loggersTitleText).toContain('Loggers');
        });
    });
});

