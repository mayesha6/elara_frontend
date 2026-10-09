import { test, expect } from "@playwright/test";

test.describe("User Invitations & Login Flow", () => {
  test("should render login page with email and password fields", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("input[type=\"email\"], input[name=\"email\"]").first()).toBeVisible();
    await expect(page.locator("input[type=\"password\"], input[name=\"password\"]").first()).toBeVisible();
  });

  test("should handle invalid credentials gracefully", async ({ page }) => {
    await page.goto("/login");
    await page.fill("input[type=\"email\"], input[name=\"email\"]", "invalid-user@example.com");
    await page.fill("input[type=\"password\"], input[name=\"password\"]", "WrongPassword123!");
    await page.click("button[type=\"submit\"]");
    // Verify user remains on login page or error message appears
    await expect(page).toHaveURL(/\/login/);
  });
});
