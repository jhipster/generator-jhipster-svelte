import { test, expect } from "@playwright/test";


test.describe("Home page", () => {
    test.beforeEach(async ({ page }) => {

        await page.goto('/');
    });

    test("should greets with welcome title", async ({ page }) => {
        const welcomeTitle = await page.getByTestId('welcomeTitle');

        expect(await welcomeTitle).toBeVisible();
        expect(await welcomeTitle.textContent()).toContain('Welcome, JHipster Svelte!');
    });

    test.describe("unauthenticated user", () => {
        test("should have login instructions", async ({ page }) => {
            const loginInstructions = await page.getByTestId('loginInstructions');

            expect(await loginInstructions).toBeVisible();
            expect(await loginInstructions.textContent()).toContain('you can try the default accounts');
            expect(await loginInstructions.textContent()).toContain('Administrator (login="admin" and password="admin")');
            expect(await loginInstructions.textContent()).toContain('User (login="user" and password="user").');
        });

        test("should have user registration link", async ({ page }) => {
            const registrationLink = await page.getByTestId('svlRegisterHomeLink');

            expect(await registrationLink).toBeVisible();
            expect(await registrationLink.getAttribute('href')).toBe('/account/register');
            expect(await registrationLink.textContent()).toContain('Register a new account');
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
            const greetMsg = await page.getByTestId('greetMsg');

            expect(await greetMsg).toBeVisible();
            expect(await greetMsg.textContent()).toContain(`You are logged in as user "${process.env.ADMIN_USERNAME}".`);
        });
    });
});


