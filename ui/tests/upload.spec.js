import { test, expect } from "@playwright/test";
test("Upload", async ({ browser, page }) => {
  //Creating new default cognito instance and page without using global variables from playwright
  await page.goto("http://localhost:5173/");
  await expect(page.getByText("Open Bible Stories AI Validator")).toBeVisible();
  await page.getByRole("button", { name: "Upload" }).click();
  await page.setInputFiles('input[type="file"]', "./tests/fixtures/01.md");
  await expect(page.getByText("इस प्रकार से आरम्भ में परमेश्वर")).toBeVisible();
  await page.screenshot({ path: "test-results/upload.png" });
});
