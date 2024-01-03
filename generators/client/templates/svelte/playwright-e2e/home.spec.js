import { test, expect } from "@playwright/test";
const { authenticationType, skipUserManagement } = require('./jdl-config.js');
const { ApiEndPoint } = require('./api-pom.js');


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
			await expect(page.getByTestId('loginInstructions')).toHaveText('If you want to sign in, you can try the default accounts: - Administrator (login="admin" and password="admin") - User (login="user" and password="user").');
		});

		if (authenticationType !== 'oauth2' && !skipUserManagement) {
			test("should have user registration link", async ({ page }) => {
				await expect(page.getByTestId('svlRegisterHomeLink')).toBeVisible();
				await expect(page.getByTestId('svlRegisterHomeLink')).toHaveAttribute('href', '/account/register');
				await expect(page.getByTestId('svlRegisterHomeLink')).toHaveText('Register a new account');
			});
		}
    });

    test.describe("authenticated user", () => {
        test.beforeEach(async ({ page, context }) => {
			const apiEndPoint = new ApiEndPoint(context);
			await apiEndPoint.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);

            await page.goto('/');
        });

		if (authenticationType === 'oauth2') {
			test.afterEach(() => {
				/*
				*
				*    LOGOUT FUNCTION TO BE HERE
				*
				*/
			});
		}

        test("should greets logged in user", async ({ page }) => {
            await expect(page.getByTestId('greetMsg')).toBeVisible();
            await expect(page.getByTestId('greetMsg')).toHaveText(`You are logged in as user "${process.env.ADMIN_USERNAME}".`);
        });
    });
});


