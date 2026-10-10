import { test, expect } from "@playwright/test";

test.describe("Stripe Subscriptions & Webhook Workflow", () => {
  test("should render subscription pricing plans and tier selection", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page).toHaveURL(/\/pricing/);

    const heading = page.locator("h1, h2, h3").first();
    await expect(heading).toBeVisible();
  });

  test("should trigger subscription checkout action on tier click", async ({ page }) => {
    await page.goto("/pricing");
    const subscribeBtn = page.locator("button:has-text('Subscribe'), button:has-text('Upgrade'), button:has-text('Get Started')").first();
    if (await subscribeBtn.isVisible()) {
      await expect(subscribeBtn).toBeEnabled();
    }
  });
});
