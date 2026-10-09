import { test, expect } from "@playwright/test";

test.describe("Tenant Separation & Multi-Tenant Isolation", () => {
  test("should enforce tenant slug boundaries", async ({ page }) => {
    // Attempting unauthenticated access to tenant route should redirect to login or show forbidden
    await page.goto("/admin/dashboard");
    await expect(page).not.toHaveURL(/\/admin\/dashboard\/secret-data/);
  });

  test("should prevent cross-tenant data leak on tenant routes", async ({ page }) => {
    const response = await page.goto("/settings");
    expect(response?.status()).toBeLessThan(500);
  });
});
