import { test, expect } from "@playwright/test";

test.describe("User login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');

  });

  test("should greets with Sign in", async ({ page }) => {
    const signInTitle = await page.getByTestId('signInTitle');

    expect (await signInTitle).toBeVisible()
    expect(await signInTitle.textContent()).toContain('Sign in to <%= baseName %>');
  });

  /* test to be here */

  test("should require username", async ({ page }) => {
    const loginForm = await page.getByTestId('loginForm');
    const usernameInput = await loginForm.getByLabel('username');
    const usernameError = await loginForm.getByTestId('username-error');

    await usernameInput.fill('admin');
    await usernameInput.clear();
    await usernameInput.blur();

    expect(await usernameError.isVisible()).toBe(true);
    expect(await usernameError.textContent()).toContain('Username is mandatory');
  });

  test("should require password", async ({ page }) => {
    const loginForm = await page.getByTestId('loginForm');
    const passwordInput = await loginForm.getByLabel('password');
    const passwordError = await loginForm.getByTestId('password-error');

    await passwordInput.fill('admin', { log: false });
    await passwordInput.clear();
    await passwordInput.blur();

    expect(await passwordError.isVisible()).toBe(true);
    expect(await passwordError.textContent()).toContain('Password is mandatory');
  });

  test("should require a valid username and password", async ({ page }) => {
    const loginForm = await page.getByTestId('loginForm');
    const errorMsg = await page.getByTestId('errorMsg');

    await loginForm.getByLabel('username').fill('admin');
    await loginForm.getByLabel('password').fill('invalid{enter}', { log: false });

    await loginForm.getByRole('button', { name: 'Sign in' }).click();

    expect(await errorMsg.textContent()).toContain('Incorrect username or password.');
  });

  test("should navigate to / on successful login", async ({ page }) => {
    const loginForm = await page.getByTestId('loginForm');
    await loginForm.getByRole('checkbox').check();
    await loginForm.getByLabel('Username').fill('admin');
    await loginForm.getByLabel('Password').fill('admin{enter}', { log: false });
    await loginForm.getByRole('button', { name: 'Sign in' }).click();
    expect(page.url()).toContain('/login');
  });
});
