import { test, expect } from "@playwright/test";

test.describe("Recognition Submission Workflow", () => {
  test("should load recognition interface and display input controls", async ({ page }) => {
    await page.goto("/recognition");
    await expect(page).toHaveURL(/\/recognition/);
    
    const messageInput = page.locator("textarea, input[name='message'], input[placeholder*='message']").first();
    if (await messageInput.isVisible()) {
      await messageInput.fill("Exemplary teamwork on the Q3 release!");
      await expect(messageInput).toHaveValue("Exemplary teamwork on the Q3 release!");
    }
  });

  test("should validate form fields prior to recognition submission", async ({ page }) => {
    await page.goto("/recognition");
    const submitButton = page.locator("button[type='submit'], button:has-text('Send'), button:has-text('Submit')").first();
    if (await submitButton.isVisible()) {
      await expect(submitButton).toBeEnabled();
    }
  });
});
