import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(/JHipster/);
});

test('get started link', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Sign in' }).click();
	await expect(page).toHaveURL(/.*login/);
});
