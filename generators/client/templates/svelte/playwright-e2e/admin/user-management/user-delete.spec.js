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
        const userTable = await page.getByTestId('userMgmtTable');
        const tableRow = await userTable.getByRole('cell', { name: `${randomUser}`, exact: true });
        await expect(tableRow.innerText()).toContain(`${randomUser}`);
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
		await page.getByRole('button', { name: 'delete' }).click();
        await expect(page.getByRole('heading').toHaveText('Confirm delete operation');
        await expect(page.getByTestId('svlModal')).toHaveText('Are you sure you want to delete the user?');
        await expect(page.getByRole('button', { name: 'Cancel' })).toBeEnabled();
        await expect(page.getByRole('button', { name: 'Delete' })).toBeEnabled();
    });

    test('should close the dialog without deleting user', async ({ page }) => {
		await page.getByRole('button', { name: 'delete' }).click();
        await page.getByRole('button', { name: 'Cancel' }).click();
        await expect(page.getByTestId('userMgmtTitle')).toHaveText('User');
    });

    test('should delete the user', async ({ page }) => {
        await page.getByRole('button', { name: 'delete' }).click();
		await page.getByRole('button', { name: 'Delete' }).click();
        await expect(page.getByTestId('toast-success')).toHaveText('A user is deleted with identifier');

        await expect(page.getByTestId('userMgmtTitle')).toHaveText('Users');
    });
});

