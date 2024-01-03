import { test, expect } from "@playwright/test";

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {

    await page.goto('/');
  });

  test("should display copyright message", async ({ page }) => {
    await expect(page.getByTestId('copyrightMsg')).toBeVisible();
    await expect(page.getByTestId('copyrightMsg')).toHaveText('Copyright © 2024 JHipster. All Rights Reserved');
  });
});


