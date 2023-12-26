import { test, expect } from "@playwright/test";

test.describe("User login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');

  });

  test("should greets with Sign in", async ({ page }) => {
	await expect(page.getByTestId('signInTitle')).toBeVisible();
	await expect(page.getByTestId('signInTitle')).toHaveText('Sign in to <%= baseName %>');
  });

  test("should display link to register", async ({ page }) => {
	await expect(page.getByTestId('registerLink')).toHaveText('Create an account');
	await expect(page.getByTestId('registerLink')).toHaveAttribute('href', '/account/register');
  });

  test("should display link to forgot password", async ({ page }) => {
	await expect(page.getByTestId('forgotPwdLink')).toHaveText('Forgot password?');
	await expect(page.getByTestId('forgotPwdLink')).toHaveAttribute('href', '/account/reset/init');
  });

  test("should require username and password", async ({ page }) => {
	await expect(page.getByTestId('loginForm')).toHaveText('Sign in');
	await expect(page.getByTestId('loginForm')).toBeDisabled();
  });

  test("should require username", async ({ page }) => {
	await page.getByLabel('Username').fill('admin');
	await page.getByLabel('Username').fill('');

	await expect(page.getByTestId('username-error')).toBeVisible();
	await expect(page.getByTestId('username-error')).toHaveText('Username is mandatory');
  });

  test("should require password", async ({ page }) => {
	await page.getByLabel('Password').fill('admin', { log: false });
	await page.getByLabel('Password').fill('');

	await expect(page.getByTestId('password-error')).toBeVisible();
	await expect(page.getByTestId('password-error')).toHaveText('Password is mandatory');
  });

  test("should require a valid username and password", async ({ page }) => {
	await page.getByLabel('Username').fill('admin');
	await page.getByLabel('Password').fill('invalid', { log: false });
	await page.getByRole('button', { name: 'Sign in' }).click();

	await expect(page.getByTestId('errorMsg')).toHaveText('Incorrect username or password.');
  });

  test("should navigate to / on successful login", async ({ page }) => {
	await page.getByRole('checkbox').check();
	await page.getByLabel('Username').fill('admin');
	await page.getByLabel('Password').fill('admin', { log: false });
	await page.getByRole('button', { name: 'Sign in' }).click();
	await expect(page).toHaveURL('/login');
  });
});
