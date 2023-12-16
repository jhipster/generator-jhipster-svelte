import { test, expect } from "@playwright/test";

test.describe('Gateway page', () => {
    test.beforeEach(async ({ page }) => {
        /*
        *
        *LOGIN API TO BE HERE
        *
        */
        await page.goto('/admin/gateway');
    });

    test('should greets with Gateway page title', async ({ page }) => {
        await expect(page.locator('[data-testid=gatewayTitle]')).toHaveText('Gateway routes');
    });

    test('should display Gateway routes table', async ({ page }) => {
        await expect(page.locator('[data-testid=gatewayTable]')).toBeVisible();
        await expect(page.locator('[data-testid=gatewayTable] th')).toHaveCount(3);
        await expect(page.locator('[data-testid=gatewayTable] th').nth(0)).toHaveText('Service');
        await expect(page.locator('[data-testid=gatewayTable] th').nth(1)).toHaveText('Route');
        await expect(page.locator('[data-testid=gatewayTable] th').nth(2)).toHaveText('Service Instances');
    });
});


