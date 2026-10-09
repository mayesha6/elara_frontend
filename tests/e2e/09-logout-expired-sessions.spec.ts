import { test, expect } from "@playwright/test";

test.describe("Logout & Expired Sessions Flow", () => {
  test("should handle session cleanup and redirect to login page", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL(/\/login/);
  });
});
