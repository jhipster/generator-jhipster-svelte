import { test, expect } from "@playwright/test";


test.describe("Home page", () => {
    test.beforeEach(async ({ page }) => {

        await page.goto('/');
    });

    test("should greets with welcome title", async ({ page }) => {
		await expect(page.getByTestId('welcomeTitle')).toBeVisible();
		await expect(page.getByTestId('welcomeTitle')).toHaveText('Welcome, JHipster Svelte!');
    });

    test.describe("unauthenticated user", () => {
        test("should have login instructions", async ({ page }) => {
            await expect(page.getByTestId('loginInstructions')).toBeVisible();
            await expect(page.getByTestId('loginInstructions')).toHaveText('you can try the default accounts');
            await expect(page.getByTestId('loginInstructions')).toHaveText('Administrator (login="admin" and password="admin")');
            await expect(page.getByTestId('loginInstructions')).toHaveText('User (login="user" and password="user").');
        });

        test("should have user registration link", async ({ page }) => {
            await expect(page.getByTestId('svlRegisterHomeLink')).toBeVisible();
            await expect(page.getByTestId('svlRegisterHomeLink')).toHaveAttribute('href', '/account/register');
            await expect(page.getByTestId('svlRegisterHomeLink')).toHaveText('Register a new account');
        });
    });

    test.describe("authenticated user", () => {
        test.beforeEach(async ({ page }) => {

            await page.goto('/login');
            await page.getByLabel('Username').fill(process.env.ADMIN_USERNAME);
            await page.getByLabel('Password').fill(process.env.ADMIN_PASSWORD, { log: false });
            await page.getByRole('button', { name: 'Sign in' }).click();

            await page.goto('/');

        });
        test.afterEach(() => {
            //
            //
            //    LOGOUT FUNCTION TO BE HERE
            //
            //
        });

        test("should greets logged in user", async ({ page }) => {
            await expect(page.getByTestId('greetMsg')).toBeVisible();
            await expect(page.getByTestId('greetMsg')).toHaveText(`You are logged in as user "${process.env.ADMIN_USERNAME}".`);
        });
    });
});


