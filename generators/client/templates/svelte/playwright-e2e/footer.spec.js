import { test, expect } from "@playwright/test";

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {

    await page.goto('/');
  });

  test("should display copyright message", async ({ page }) => {
    const copyrightMsg = await page.getByTestId('copyrightMsg');

    expect(await copyrightMsg).toBeVisible();
    expect(await copyrightMsg.textContent()).toContain('Copyright © 2023 JHipster. All Rights Reserved');
  });
});


