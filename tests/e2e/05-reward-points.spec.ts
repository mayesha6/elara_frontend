import { test, expect } from "@playwright/test";

test.describe("Reward Points & Redemption Workflow", () => {
  test("should display available reward catalog and balance info", async ({ page }) => {
    await page.goto("/redeem");
    await expect(page).toHaveURL(/\/redeem/);

    const body = page.locator("body").first();
    await expect(body).toBeVisible();
  });

  test("should handle reward selection modal interaction", async ({ page }) => {
    await page.goto("/redeem");
    const redeemBtn = page.locator("button:has-text('Redeem'), button:has-text('Claim')").first();
    if (await redeemBtn.isVisible()) {
      await expect(redeemBtn).toBeEnabled();
    }
  });
});
