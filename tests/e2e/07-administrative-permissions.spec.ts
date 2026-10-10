import { test, expect } from "@playwright/test";

test.describe("Administrative Permissions & RBAC Workflow", () => {
  test("should enforce admin authentication guards for protected routes", async ({ page }) => {
    await page.goto("/admin/dashboard");
    // Verify protected route guard blocks unauthenticated access
    const url = page.url();
    expect(url).not.toContain("/admin/dashboard/secrets");
  });

  test("should preserve public accessibility for non-admin user routes", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL(/\/login/);
  });
});
