import { test, expect } from "@playwright/test";

test.describe("Password Recovery & Reset Flow", () => {
  test("should render forget password page", async ({ page }) => {
    await page.goto("/forget-password");
    await expect(page.locator("input[type=\"email\"], input[name=\"email\"]").first()).toBeVisible();
  });
});
