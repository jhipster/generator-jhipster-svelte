import { test, expect } from "@playwright/test";

test.describe('User delete dialog page', () => {
    let randomUser;

    test.beforeEach(async ({ page }) => {
        /*
        *
        * LOGIN USER FUNCTION TO BE HERE
        *
        */

        randomUser = 'test' + new Date().getTime();
        /*
        *
        * SAVE USER FUNCTION TO BE HERE
        *
        */

        await page.goto('admin/user-management');
        
        //HOVER AND CLICK DELETE BUTTON
        const userTable = await page.locator('[data-testid=userMgmtTable]');
        const tableRow = await userTable.getByRole('cell', { name: `${randomUser}`, exact: true });
        expect(await tableRow.innerText()).toContain(`${randomUser}`);
        tableRow.hover();

        const deleteBtn = await page.getByRole('button', { name: 'Delete' });
        await deleteBtn.click();
    });

    test.afterEach(async ({ page }) => {
        /*
        *
        * DELETE USER FUNCTION TO BE HERE
        *
        */
    });

    test('should display delete user dialog', async ({ page }) => {
        expect(await page.locator('[data-testid=svlModal] h1').innerText()).toContain('Confirm delete operation');
        expect(await page.locator('[data-testid=svlModal] p').innerText()).toContain('Are you sure you want to delete the user?');
        expect(await page.locator('[data-testid=svlModal] button[name=cancelBtn]')).toBeEnabled();
        expect(await page.locator('[data-testid=svlModal] button[name=confirmDeleteBtn]')).toBeEnabled();
    });

    test('should close the dialog without deleting user', async ({ page }) => {
        await page.getByRole('button', { name: 'Cancel' }).click();
        expect(await page.locator('[data-testid=userMgmtTitle]').innerText()).toContain('User');
    });

    test('should delete the user', async ({ page }) => {
        await page.locator('[data-testid=svlModal] button[name=confirmDeleteBtn]').click();
        expect(await page.locator('[data-testid=toast-success]').innerText()).toContain('A user is deleted with identifier');
        
        expect(await page.locator('[data-testid =userMgmtTitle]').innerText()).toContain('Users');
    });
});

