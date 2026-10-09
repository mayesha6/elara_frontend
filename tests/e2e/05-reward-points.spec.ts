import { test, expect } from "@playwright/test";

test.describe("Reward Points & Redemption Flow", () => {
  test("should render redeem rewards page", async ({ page }) => {
    await page.goto("/redeem");
    await expect(page).toHaveURL(/\/redeem/);
  });
});
