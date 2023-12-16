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
        expect(await page.getByTestId('loggersTitle')).toBeVisible();
        expect(await page.getByTestId('loggersTitle').innerText()).toContain('Loggers');
        expect(await page.getByPlaceholder('Filter logger')).toHaveValue('');
    });

    test('should display loggers table', async ({ page }) => {
        expect(await page.getByRole('columnheader')).toBeVisible();
        expect(await page.getByRole('columnheader').innerText()).toContain('Name');
        expect(await page.getByRole('columnheader')).toHaveCount(1);
    });

    test('should display logger name and the default enabled logger level in the table', async ({ page }) => {
        const hibernateLoggerName = 'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator';
        const mongodbLoggerName = 'org.mongodb.driver';

        await page.getByPlaceholder('Filter logger').fill(hibernateLoggerName);
        await page.getByPlaceholder('Filter logger').fill(mongodbLoggerName);

        expect(await page.getByTestId('loggersTable').innerText()).toContain(hibernateLoggerName);

        expect(await page.getByTestId('loggersTable').innerText()).toContain(mongodbLoggerName);
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
        
        expect(countBeforeFilter).toBeGreaterThanOrEqual(countAfterFilter);

        await page.getByPlaceholder('Filter logger').fill('');
        const countAfterFilterClear = await page.getByRole('cell').count();

        expect(countBeforeFilter).toHaveValue(countAfterFilterClear);
    });

    test('should validate the pagination controls', async ({ page }) => {
        const pageCtrl = await page.locator('[data-testid=pageCtrl]');
        const pageInfo = await pageCtrl.locator('div').nth(0).innerText();
        expect(pageInfo).toMatch(/1-\d+ of \d+/);

        const prevPageCtrl = await pageCtrl.locator('[data-testid=prevPageCtrl]').nth(0);
        expect(await prevPageCtrl.isEnabled()).toBe(false);

        const nextPageCtrl = await pageCtrl.locator('[data-testid=nextPageCtrl]').nth(1);
        expect(await nextPageCtrl.isEnabled()).toBe(false);
    });

});

