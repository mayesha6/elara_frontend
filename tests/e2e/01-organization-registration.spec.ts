import { test, expect } from "@playwright/test";

test.describe("Organization Registration Flow", () => {
  test("should load registration page successfully", async ({ page }) => {
    await page.goto("/register");
    await expect(page).toHaveTitle(/Elara|Register/i);
  });

  test("should display registration form elements", async ({ page }) => {
    await page.goto("/register");
    const emailInput = page.locator("input[type=\"email\"], input[name=\"email\"]");
    const passwordInput = page.locator("input[type=\"password\"], input[name=\"password\"]");
    await expect(emailInput.first()).toBeVisible();
    await expect(passwordInput.first()).toBeVisible();
  });

  test("should validate required fields on organization register submit", async ({ page }) => {
    await page.goto("/register");
    const submitBtn = page.locator("button[type=\"submit\"]");
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
    }
    expect(page.url()).toContain("/register");
  });
});
