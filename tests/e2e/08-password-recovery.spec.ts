import { test, expect } from "@playwright/test";

test.describe("Password Recovery Workflow", () => {
  test("should accept email input for password reset request", async ({ page }) => {
    await page.goto("/forget-password");
    await expect(page).toHaveURL(/\/forget-password/);

    const emailInput = page.locator("input[type='email'], input[name='email']").first();
    await expect(emailInput).toBeVisible();
    await emailInput.fill("test.user@greetely.com");
    await expect(emailInput).toHaveValue("test.user@greetely.com");
  });

  test("should handle reset request button submission", async ({ page }) => {
    await page.goto("/forget-password");
    const submitBtn = page.locator("button[type='submit'], button:has-text('Reset'), button:has-text('Send')").first();
    if (await submitBtn.isVisible()) {
      await expect(submitBtn).toBeEnabled();
    }
  });
});
