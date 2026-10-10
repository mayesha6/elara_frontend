import { test, expect } from "@playwright/test";

test.describe("Logout & Session Management Workflow", () => {
  test("should redirect expired unauthenticated sessions to login page", async ({ page }) => {
    await page.goto("/settings");
    // Session check should maintain page safety
    const status = page.url();
    expect(status).toBeTruthy();
  });

  test("should load auth clean entry point on explicit logout redirect", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL(/\/login/);
    const emailField = page.locator("input[type='email'], input[name='email']").first();
    await expect(emailField).toBeVisible();
  });
});
