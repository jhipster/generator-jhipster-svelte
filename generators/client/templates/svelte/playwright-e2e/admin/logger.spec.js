const { test, expect } = require('@playwright/test');

test.describe('Loggers page', () => {
    test.beforeEach(async ({ page }) => {
        /*
         *
         *  LOGIN FUNCTION TO BE HERE
         *
         */
        await page.goto('/admin/logger');
    });

    test.afterEach(async ({ page }) => {
        /*
         *
         *  LOGOUT FUNCTION TO BE HERE
         *
         */
    });

    test('should greets with loggers page title and filter control', async ({ page }) => {
        await expect(page.getByTestId('loggersTitle')).toBeVisible();
        await expect(page.getByTestId('loggersTitle').innerText()).toContain('Loggers');
        await expect(page.getByPlaceholder('Filter logger')).toHaveValue('');
    });

    test('should display loggers table', async ({ page }) => {
        await expect(page.getByRole('columnheader')).toBeVisible();
        await expect(page.getByRole('columnheader').innerText()).toContain('Name');
        await expect(page.getByRole('columnheader')).toHaveCount(1);
    });

    test('should display logger name and the default enabled logger level in the table', async ({ page }) => {
        const hibernateLoggerName = 'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator';
        const mongodbLoggerName = 'org.mongodb.driver';

        await page.getByPlaceholder('Filter logger').fill(hibernateLoggerName);
        await page.getByPlaceholder('Filter logger').fill(mongodbLoggerName);

        await expect(page.getByTestId('loggersTable')).toHaveText(hibernateLoggerName);

        await expect(page.getByTestId('loggersTable')).toHaveText(mongodbLoggerName);
    });

    test('should display actions available on the current selected logger', async ({ page }) = {
        // TODO
    });

    test('should change logger level from WARN -> INFO, INFO -> WARN', async ({ page }) => {
        // TODO
    });

    test('should filter loggers by name', async ({ page }) => {
        const countBeforeFilter = await page.getByRole('cell').count();

        await page.getByPlaceholder('Filter logger').fill('ROOT');
        const countAfterFilter = await page.getByRole('cell').count();

        await expect(countBeforeFilter).toBeGreaterThanOrEqual(countAfterFilter);

        await page.getByPlaceholder('Filter logger').fill('');
        const countAfterFilterClear = await page.getByRole('cell').count();

        await expect(countBeforeFilter).toHaveValue(countAfterFilterClear);
    });

    test('should validate the pagination controls', async ({ page }) => {
        const pageCtrl = await page.getByTestId('pageCtrl');
        const pageInfo = await pageCtrl.locator('div').nth(0).innerText();
        await expect(pageInfo).toMatch(/1-\d+ of \d+/);

        await expect(page.getByTestId('prevPageCtrl').first()).toBeDisabled();
        await expect(page.getByTestId('nextPageCtrl').first()).toBeDisabled();
    });

});

