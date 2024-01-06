import { test, expect } from "@playwright/test";
const { ApiEndPoint } = require('../api-pom.js');
const { authenticationType, databaseType } = require('../jdl-config.js');

let databaseTypeSql;

if (databaseType === 'sql') {
	databaseTypeSql = true;
} else {
	databaseTypeSql = false;
}

test.describe('Loggers page', () => {
    const loggerName = databaseTypeSql ? 'org.hibernate.validator.internal.engine.groups.ValidationOrderGenerator' : 'org.mongodb.driver';

    test.beforeEach(async ({ page, context }) => {
        const apiEndPoint = new ApiEndPoint(context);
		await apiEndPoint.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
        await page.goto('/admin/logger');
    });
	if (authenticationType === 'oauth2') {
		test.afterEach(async ({ page }) => {
			/*
			*
			*  LOGOUT FUNCTION TO BE HERE
			*
			*/
		});
	}

    test('should greets with loggers page title and filter control', async ({ page }) => {
        await expect(page.getByTestId('loggersTitle')).toBeVisible();
        await expect(page.getByTestId('loggersTitle')).toHaveText('Loggers');
        await expect(page.getByPlaceholder('Filter logger')).toHaveValue('');
    });

    test('should display loggers table', async ({ page }) => {
        await expect(page.getByRole('columnheader')).toBeVisible();
        await expect(page.getByRole('columnheader')).toHaveText('Name');
        await expect(page.getByRole('columnheader')).toHaveCount(1);
    });

    test('should display logger name and the default enabled logger level in the table', async ({ page }) => {
		await page.getByPlaceholder('Filter logger').fill(loggerName);
		await expect(page.locator('[data-testid=loggersTable] td div:nth-child(1)').nth(1)).toHaveText(loggerName);
		await expect(page.locator('[data-testid=loggersTable] td div:nth-child(1) button')).toHaveCount(6);

		await expect(page.getByTestId('offLogLevelBtn')).toBeHidden();
		await expect(page.getByTestId('offLogLevelBtn')).toBeEnabled();

		await expect(page.getByTestId('errorLogLevelBtn')).toBeHidden();
		await expect(page.getByTestId('errorLogLevelBtn')).toBeEnabled();

		await expect(page.getByTestId('warnLogLevelBtn')).toBeVisible();
		await expect(page.getByTestId('warnLogLevelBtn')).toBeDisabled();

		await expect(page.getByTestId('infoLogLevelBtn')).toBeHidden();
		await expect(page.getByTestId('infoLogLevelBtn')).toBeEnabled();

		await expect(page.getByTestId('debugLogLevelBtn')).toBeHidden();
		await expect(page.getByTestId('debugLogLevelBtn')).toBeEnabled();

		await expect(page.getByTestId('traceLogLevelBtn')).toBeHidden();
		await expect(page.getByTestId('traceLogLevelBtn')).toBeEnabled();
    });

    test('should display actions available on the current selected logger', async ({ page }) => {
		await page.getByPlaceholder('Filter logger').fill(loggerName);
		await expect(page.locator('[data-testid=loggersTable] td div:nth-child(1)').nth(1)).toHaveText(loggerName);
		await page.locator('[data-testid=loggersTable] td div:nth-child(1)').nth(1).click();
		await expect(page.locator('[data-testid=loggersTable] td div:nth-child(1) button')).toHaveCount(6);

		await expect(page.getByTestId('offLogLevelBtn')).toBeVisible();
		await expect(page.getByTestId('offLogLevelBtn')).toBeEnabled();

		await expect(page.getByTestId('errorLogLevelBtn')).toBeVisible();
		await expect(page.getByTestId('errorLogLevelBtn')).toBeEnabled();

		await expect(page.getByTestId('warnLogLevelBtn')).toBeVisible();
		await expect(page.getByTestId('warnLogLevelBtn')).toBeDisabled();

		await expect(page.getByTestId('infoLogLevelBtn')).toBeVisible();
		await expect(page.getByTestId('infoLogLevelBtn')).toBeEnabled();

		await expect(page.getByTestId('debugLogLevelBtn')).toBeVisible();
		await expect(page.getByTestId('debugLogLevelBtn')).toBeEnabled();

		await expect(page.getByTestId('traceLogLevelBtn')).toBeVisible();
		await expect(page.getByTestId('traceLogLevelBtn')).toBeEnabled();
    });

    test('should change logger level from WARN -> INFO, INFO -> WARN', async ({ page }) => {
		await page.getByPlaceholder('Filter logger').fill(loggerName);

		await page.route('**/management/loggers/*', (route) => {
			route.continue();
		});

		await expect(page.locator('[data-testid=loggersTable] td div:nth-child(1)').nth(1)).toHaveText(loggerName);
		await page.locator('[data-testid=loggersTable] td div:nth-child(1)').nth(1).click();
		await expect(page.locator('[data-testid=loggersTable] td div:nth-child(1) button')).toHaveCount(6);
		await page.getByTestId('infoLogLevelBtn').click();

		await expect(page.locator('[data-testid=loggersTable] td div:nth-child(1)').nth(1)).toHaveText(loggerName);
		await page.waitForURL('**/management/loggers/*', { timeout: 10000 });	//timeout after 10 seconds

		await page.locator('[data-testid=loggersTable] td div:nth-child(1)').nth(1).click();
		await expect(page.locator('[data-testid=loggersTable] td div:nth-child(1) button')).toHaveCount(6);
		await expect(page.getByTestId('infoLogLevelBtn')).toBeVisible();
		await expect(page.getByTestId('infoLogLevelBtn')).toBeDisabled();
		await page.getByTestId('warnLogLevelBtn').click();
    });

    test('should filter loggers by name', async ({ page }) => {
		await page.getByPlaceholder('Filter logger').fill('');
        const countBeforeFilter = await page.getByRole('cell').count();

        await page.getByPlaceholder('Filter logger').fill('ROOT');
        const countAfterFilter = await page.getByRole('cell').count();

        await expect(countBeforeFilter).toBeGreaterThanOrEqual(countAfterFilter);

        await page.getByPlaceholder('Filter logger').fill('');
        const countAfterFilterClear = await page.getByRole('cell').count();

        await expect(countBeforeFilter).toEqual(countAfterFilterClear);
    });

    test('should validate the pagination controls', async ({ page }) => {
        const pageCtrl = await page.getByTestId('pageCtrl');
        const pageInfo = await pageCtrl.locator('div').nth(0).innerText();
        await expect(pageInfo).toMatch(/1-\d+ of \d+/);

        await expect(page.getByTestId('prevPageCtrl').first()).toBeDisabled();
        await expect(page.getByTestId('nextPageCtrl').first()).toBeEnabled();
    });

});

