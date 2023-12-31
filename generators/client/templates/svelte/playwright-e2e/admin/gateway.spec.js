import { test, expect } from "@playwright/test";
const { ApiEndPoint } = require('../api-pom.js');

test.describe('Gateway page', () => {
    test.beforeEach(async ({ page, context }) => {
        const apiEndPoint = new ApiEndPoint(context);
		await apiEndPoint.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
        await page.goto('/admin/gateway');
    });

    test('should greets with Gateway page title', async ({ page }) => {
        await expect(page.getByTestId('gatewayTitle')).toHaveText('Gateway routes');
    });

    test('should display Gateway routes table', async ({ page }) => {
        await expect(page.locator('[data-testid=gatewayTable]')).toBeVisible();
        await expect(page.locator('[data-testid=gatewayTable] th')).toHaveCount(3);
        await expect(page.locator('[data-testid=gatewayTable] th').nth(0)).toHaveText('Service');
        await expect(page.locator('[data-testid=gatewayTable] th').nth(1)).toHaveText('Route');
        await expect(page.locator('[data-testid=gatewayTable] th').nth(2)).toHaveText('Service Instances');
    });
});


