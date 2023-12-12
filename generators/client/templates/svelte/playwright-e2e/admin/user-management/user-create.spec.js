import { test, expect } from "@playwright/test";

test.describe('Create user page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/admin/user-management/new');
        /*
        *
        *LOGIN FUNCTION TO BE HERE
        *
        */

    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('should greet with Create user title', async ({ page }) => {
        const title = await page.locator('[data-testid=userMgmtTitle]').innerText();
        expect(title).toContain('Create user account');
    });

    test('should require mandatory fields', async ({ page }) => {
        const createBtn = await page.locator('[data-testid=addUserForm] button').nth(2).isEnabled();
        expect(createBtn).toBeFalsy();
    });

    test('should require username', async ({ page }) => {

        await page.getByLabel('username').fill('admin');
        await page.getByLabel('username').fill(' ');

        const usernameError = await page.locator('[data-testid=username-error]').innerText();
        expect(usernameError).toContain('Username is mandatory');
    });

    test('should require email', async ({ page }) => {

        await page.getByLabel('email').fill('admin@localhost.org');
        await page.getByLabel('email').fill('');

        const emailError = await page.locator('[data-testid=email-error]').innerText();
        expect(emailError).toContain('Email is mandatory');
    });

    test('should require roles', async ({ page }) => {
        await page.locator('[name=roles]').click();
        await page.locator('[data-testid=roles-options] input[type=checkbox]').nth(0).dblclick(10);
        await page.locator('[name=roles]').click();

        const rolesError = await page.locator('[data-testid=roles-error]').innerText();
        expect(rolesError).toContain('Select at least one role');
    });

    test('should navigate back to the user list page', async ({ page }) => {
        await page.click('[name=cancelBtn]');

        const pathname = await page.evaluate(() => window.location.pathname);
        expect(pathname).toBe('/admin/user-management');

        const title = await page.locator('[data-testid=userMgmtTitle]').innerText();
        expect(title).toContain('Users');
    });

    test.describe('create account', () => {
        
        let randomUser;

        test.beforeEach(async ({ page }) => {
            randomUser = 'test' + new Date().getTime();
            await page.goto('admin/user-management/new');
        });

        test.afterEach(async ({ page }) => {
            /*
            *
            *DELETE USER FUNCTION TO BE HERE
            *
            */
            await page.close();
        });

        test('should create a new user account', async ({ page }) => {
            await page.getByLabel('username').fill(`${randomUser}`);
            await page.getByLabel('firstname').fill('john');
            await page.getByLabel('lastname').fill('doe');
            await page.getByLabel('email').fill(`${randomUser}+@localhost.org`);
            await page.locator('[data-testid=roles-options] input[type=checkbox]').nth(0).dblclick();


            const createBtn = await page.locator('[data-testid=addUserForm] button').isEnabled();
            expect(createBtn).toBeTruthy();

            await page.locator('[data-testid=addUserForm] button');

            const successToast = await page.locator('[data-testid=toast-success]').innerText();
            expect(successToast).toContain('A user is created with identifier');

            const pathname = await page.evaluate(() => window.location.pathname);
            expect(pathname).toBe('/admin/user-management');

            const title = await page.locator('[data-testid=userMgmtTitle]').innerText();
            expect(title).toContain('Users');
        });
    });
});

